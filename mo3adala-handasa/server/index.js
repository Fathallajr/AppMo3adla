const express = require('express');
const fs = require('fs/promises');
const fssync = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'jr1';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'jr1';
const PAGE_KEYS = [
	'home',
	'photos-2025',
	'faq',
	'contact',
	'news-equation',
	'news-app',
	'news-detail',
	'subscription-details',
	'subscription-ab-reviews',
	'subscription-intensive',
	'social',
	'engineers',
	'teacher-details',
	'requirements',
	'schools'
];
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000;
const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'content-store.json');
const TOKENS_FILE = path.join(DATA_DIR, 'tokens.json');

function loadTokens() {
	try {
		if (fssync.existsSync(TOKENS_FILE)) {
			const raw = fssync.readFileSync(TOKENS_FILE, 'utf8');
			const data = JSON.parse(raw);
			const map = new Map();
			const now = Date.now();
			for (const [k, v] of Object.entries(data)) {
				if (typeof v === 'number' && v > now) map.set(k, v);
			}
			return map;
		}
	} catch {}
	return new Map();
}

function saveTokens(map) {
	try {
		const obj = Object.fromEntries(map);
		fssync.mkdirSync(DATA_DIR, { recursive: true });
		fssync.writeFileSync(TOKENS_FILE, JSON.stringify(obj), 'utf8');
	} catch {}
}

const TOKENS = loadTokens();
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const INDEX_FILE = path.join(DIST_DIR, 'index.html');

if (!fssync.existsSync(UPLOADS_DIR)) {
	fssync.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const uploadStorage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
		cb(null, Date.now() + '-' + crypto.randomBytes(4).toString('hex') + ext);
	}
});
const upload = multer({
	storage: uploadStorage,
	limits: { fileSize: 8 * 1024 * 1024 },
	fileFilter: (_req, file, cb) => {
		const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
		cb(null, allowed.includes(file.mimetype));
	}
});

app.use(express.json({ limit: '2mb' }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}
	next();
});

function getNowIso() {
	return new Date().toISOString();
}

async function ensureStore() {
	await fs.mkdir(DATA_DIR, { recursive: true });

	if (!fssync.existsSync(STORE_FILE)) {
		await fs.writeFile(STORE_FILE, JSON.stringify({ pages: {} }, null, 2), 'utf8');
	}
}

async function readStore() {
	await ensureStore();
	const raw = await fs.readFile(STORE_FILE, 'utf8');
	try {
		const parsed = JSON.parse(raw);
		if (!parsed.pages || typeof parsed.pages !== 'object') {
			return { pages: {} };
		}
		return parsed;
	} catch {
		return { pages: {} };
	}
}

async function writeStore(store) {
	await ensureStore();
	await fs.writeFile(STORE_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function issueToken() {
	const token = crypto.randomBytes(24).toString('hex');
	TOKENS.set(token, Date.now() + TOKEN_TTL_MS);
	saveTokens(TOKENS);
	return token;
}

function requireAdmin(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

	if (!token || !TOKENS.has(token)) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const expiresAt = TOKENS.get(token);
	if (Date.now() > expiresAt) {
		TOKENS.delete(token);
		saveTokens(TOKENS);
		return res.status(401).json({ message: 'Session expired' });
	}

	next();
}

app.get('/api/health', (req, res) => {
	res.json({ ok: true, now: getNowIso() });
});

app.post('/api/auth/login', (req, res) => {
	const { username, password } = req.body || {};

	if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const token = issueToken();
	res.json({
		token,
		expiresAt: new Date(Date.now() + TOKEN_TTL_MS).toISOString()
	});
});

function noCache(res) {
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
}

app.get('/api/content', async (req, res) => {
	noCache(res);
	const store = await readStore();
	const summaries = PAGE_KEYS.map(key => {
		const entry = store.pages[key];
		return {
			key,
			hasContent: Boolean(entry && entry.data),
			updatedAt: entry?.updatedAt
		};
	});

	res.json(summaries);
});

app.get('/api/content/:pageKey', async (req, res) => {
	noCache(res);
	const { pageKey } = req.params;

	if (!PAGE_KEYS.includes(pageKey)) {
		return res.status(404).json({ message: 'Unknown page' });
	}

	const store = await readStore();
	const entry = store.pages[pageKey];

	if (!entry || !entry.data) {
		return res.status(404).json({ message: 'Content not found' });
	}

	res.json(entry.data);
});

app.put('/api/content/:pageKey', requireAdmin, async (req, res) => {
	const { pageKey } = req.params;

	if (!PAGE_KEYS.includes(pageKey)) {
		return res.status(404).json({ message: 'Unknown page' });
	}

	const store = await readStore();
	store.pages[pageKey] = {
		data: req.body,
		updatedAt: getNowIso()
	};

	await writeStore(store);
	res.json(store.pages[pageKey].data);
});

app.post('/api/uploads', requireAdmin, upload.single('file'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file uploaded or unsupported format' });
	}

	res.json({ url: `/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static(UPLOADS_DIR));

if (fssync.existsSync(DIST_DIR)) {
	app.use(express.static(DIST_DIR));
}

app.get('*', (req, res, next) => {
	if (req.path.startsWith('/api')) {
		return next();
	}

	if (fssync.existsSync(INDEX_FILE)) {
		return res.sendFile(INDEX_FILE);
	}

	return res.status(404).send('Build the Angular app first.');
});

app.listen(PORT, () => {
	console.log(`Admin API listening on http://localhost:${PORT}`);
});
