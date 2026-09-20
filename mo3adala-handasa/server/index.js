const express = require('express');
const fs = require('fs/promises');
const fssync = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;
const LAUNCH_OFFER_ENDPOINT = process.env.LAUNCH_OFFER_ENDPOINT || 'https://script.google.com/macros/s/AKfycbzOMDZcgaUgRacnKnqgngxO_97N5iUU9AVoH1bA5HHEFg0LKS3Lju8ku6yl0nYgrLdQ/exec';
const WHEEL_APPS_SCRIPT_ENDPOINT = process.env.WHEEL_APPS_SCRIPT_ENDPOINT || 'https://script.google.com/macros/s/AKfycbyvJVNsv_v4MCnBVQm4rA7074zhpzVVYWADIJTlTcu9XeqebON6s-tQpnMH11QoE-34/exec';
// Apps Script can be slow while scanning the sheet for an existing phone.
// Give it enough time to finish so the UI does not invite duplicate retries.
const LAUNCH_OFFER_TIMEOUT_MS = 60000;
const WHEEL_CLAIM_TIMEOUT_MS = 30000;
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
	'subscription-engineer',
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
const WHEEL_STATE_FILE = path.join(DATA_DIR, 'wheel-state.json');
const WHEEL_SECRET_FILE = path.join(DATA_DIR, 'wheel-secret.txt');
const WHEEL_APPS_SCRIPT_SECRET = process.env.WHEEL_APPS_SCRIPT_SECRET || readLocalWheelSecret();
const WHEEL_TTL_MS = 30 * 60 * 1000;
const WHEEL_OPTIONS = [
	{ id: 'discount', label: 'خصم 10% على أول شهر', weight: 18, available: true },
	{ id: 'discount-5', label: 'خصم 5% على أول شهر', weight: 8, available: true },
	{ id: 'shipping', label: 'شحن الكتاب مجاناً', weight: 15, available: true },
	{ id: 'cash-gift', label: 'هدية مالية', weight: 10, available: true },
	{ id: 'discount-25', label: 'خصم 25% على أول شهر', weight: 4, available: true },
	{ id: 'content', label: 'محتوى مجاني حصري', weight: 18, available: true },
	{ id: 'lucky-chance', label: 'حظ سعيد', weight: 12, available: false },
	{ id: 'empty-three', label: 'حظ سعيد', weight: 8, available: false },
	{ id: 'free-month', label: 'أول شهر مجاناً', weight: 2, available: true }
];

function readLocalWheelSecret() {
	try {
		return fssync.readFileSync(WHEEL_SECRET_FILE, 'utf8').trim();
	} catch {
		return '';
	}
}

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
app.use(express.urlencoded({ extended: false, limit: '32kb' }));

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

app.post('/api/wheel/spin', (req, res) => {
	const sessionId = typeof req.body?.sessionId === 'string' ? req.body.sessionId.trim() : '';
	if (!sessionId || sessionId.length > 128) return res.status(400).json({ message: 'Invalid wheel session' });

	const state = readWheelState();
	const now = Date.now();
	for (const [token, spin] of Object.entries(state.spins)) {
		if (!spin || now - spin.createdAt > WHEEL_TTL_MS) delete state.spins[token];
	}
	const existing = Object.values(state.spins).find(spin => spin.sessionId === sessionId);
	if (existing?.claimed) return res.status(409).json({ alreadyUsed: true, message: 'Wheel already used' });
	if (existing && existing.gift.id !== 'lucky-chance') return res.json({ token: existing.token, gift: existing.gift });
	if (existing && existing.attempts >= 2) return res.json({ token: existing.token, gift: existing.gift });

	const totalWeight = WHEEL_OPTIONS.reduce((sum, gift) => sum + gift.weight, 0);
	let pick = crypto.randomInt(totalWeight);
	const gift = WHEEL_OPTIONS.find(option => (pick -= option.weight) < 0) || WHEEL_OPTIONS[0];
	const token = crypto.randomBytes(24).toString('hex');
	state.spins[token] = { token, sessionId, gift, attempts: existing ? 2 : 1, createdAt: now, claimed: false };
	if (existing) {
		delete state.spins[existing.token];
		state.spins[token].attempts = 2;
	}
	saveWheelState(state);
	return res.json({ token, gift });
});

async function postToAppsScript(endpoint, values, timeoutMs) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const upstream = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
			body: new URLSearchParams(values).toString(),
			signal: controller.signal
		});
		const responseText = await upstream.text();
		let payload;
		try {
			payload = JSON.parse(responseText);
		} catch {
			throw new Error('invalid-response');
		}
		if (!upstream.ok) throw new Error(payload.message || 'upstream-failed');
		return payload;
	} finally {
		clearTimeout(timeout);
	}
}

// This endpoint is only for the normal site forms. Wheel claims have their own
// endpoint and their own Apps Script deployment below.
const LAUNCH_OFFER_PROGRAMS = [
	// Keep the old values valid so existing saved forms and integrations remain compatible.
	'معادلة هندسة',
	'معادلة حاسبات',
	'معادلة هندسة عربي',
	'معادلة حاسبات عربي',
	'معادلة هندسة إنجليزي',
	'معادلة حاسبات إنجليزي'
];

app.post('/api/launch-offer', async (req, res) => {
	const { name, whatsapp, school, studentType, program, source, consent } = req.body || {};
	if (source === 'عجلة الحظ') {
		return res.status(400).json({ success: false, message: 'Wheel claims must use the dedicated wheel service' });
	}
	const cleanWhatsapp = typeof whatsapp === 'string' ? whatsapp.trim() : '';
	const requiredValues = { name, whatsapp: cleanWhatsapp, school, studentType, program, source, consent };
	const values = { ...requiredValues, whatsapp: `'${cleanWhatsapp}` };

	if (Object.values(requiredValues).some(value => typeof value !== 'string' || !value.trim())) {
		return res.status(400).json({ success: false, message: 'Missing required fields' });
	}

	if (!/^01\d{9}$/.test(cleanWhatsapp)) {
		return res.status(400).json({ success: false, message: 'Invalid WhatsApp number' });
	}
	if (!LAUNCH_OFFER_PROGRAMS.includes(program)) {
		return res.status(400).json({ success: false, message: 'Invalid program' });
	}

	try {
		const payload = await postToAppsScript(LAUNCH_OFFER_ENDPOINT, values, LAUNCH_OFFER_TIMEOUT_MS);
		return res.json(payload);
	} catch (error) {
		const timedOut = error?.name === 'AbortError';
		return res.status(timedOut ? 504 : 502).json({ success: false, message: timedOut ? 'Registration service timed out' : 'Registration service unavailable' });
	}
});

// Wheel claims are intentionally isolated from every other form and Apps Script.
app.post('/api/wheel/claim', async (req, res) => {
	const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
	const whatsapp = normalizePhone(req.body?.whatsapp);
	const program = typeof req.body?.program === 'string' ? req.body.program.trim() : '';
	const wheelToken = typeof req.body?.wheelToken === 'string' ? req.body.wheelToken.trim() : '';

	if (name.length < 2 || name.length > 120) {
		return res.status(400).json({ success: false, message: 'اكتب اسم صحيح.' });
	}
	if (!/^01\d{9}$/.test(whatsapp)) {
		return res.status(400).json({ success: false, message: 'رقم الواتساب يجب أن يبدأ بـ 01 ويتكون من 11 رقم.' });
	}
	if (![
		'معادلة هندسة',
		'معادلة حاسبات',
		'معادلة هندسة عربي',
		'معادلة حاسبات عربي',
		'معادلة هندسة إنجليزي',
		'معادلة حاسبات إنجليزي'
	].includes(program)) {
		return res.status(400).json({ success: false, message: 'اختار نوع المعادلة.' });
	}
	if (!wheelToken) return res.status(400).json({ success: false, message: 'نتيجة العجلة غير موجودة.' });

	const state = readWheelState();
	const spin = state.spins[wheelToken];
	if (!spin || Date.now() - spin.createdAt > WHEEL_TTL_MS) {
		return res.status(409).json({ success: false, message: 'انتهت صلاحية نتيجة العجلة. لف العجلة من جديد.' });
	}
	if (!spin.gift?.available) {
		return res.status(400).json({ success: false, message: 'هذه النتيجة لا تحتوي على هدية قابلة للاستلام.' });
	}
	if (spin.claimed || state.claims[whatsapp]) {
		return res.json({ success: false, alreadyRegistered: true, message: 'تم استلام هدية العجلة بهذا الرقم من قبل.' });
	}
	if (!WHEEL_APPS_SCRIPT_ENDPOINT) {
		return res.status(503).json({ success: false, message: 'خدمة تسجيل العجلة غير مفعلة بعد.' });
	}
	if (!WHEEL_APPS_SCRIPT_SECRET) {
		return res.status(503).json({ success: false, message: 'حماية خدمة العجلة غير مفعلة على السيرفر.' });
	}

	try {
		const createdAt = getNowIso();
		const payload = await postToAppsScript(WHEEL_APPS_SCRIPT_ENDPOINT, {
			name,
			whatsapp,
			program,
			gift: spin.gift.label,
			wheelToken,
			createdAt,
			apiSecret: WHEEL_APPS_SCRIPT_SECRET
		}, WHEEL_CLAIM_TIMEOUT_MS);
		if (!payload.success && !payload.alreadyRegistered) {
			return res.status(502).json({ success: false, message: payload.message || 'تعذر تسجيل هدية العجلة.' });
		}

		spin.claimed = true;
		spin.phone = whatsapp;
		spin.name = name;
		spin.claimedAt = getNowIso();
		state.spins[wheelToken] = spin;
		state.claims[whatsapp] = wheelToken;
		saveWheelState(state);
		return res.json(payload);
	} catch (error) {
		const timedOut = error?.name === 'AbortError';
		return res.status(timedOut ? 504 : 502).json({
			success: false,
			message: timedOut ? 'خدمة تسجيل العجلة اتأخرت. من فضلك ما تضغطش مرة تانية.' : 'تعذر الاتصال بخدمة تسجيل العجلة.'
		});
	}
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
	app.use((req, res, next) => {
		if (req.path === '/admin' || req.path.startsWith('/admin/')) {
			res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
		}
		next();
	});
	app.use(express.static(DIST_DIR, {
		setHeaders: (res, filePath) => {
			if (/\.[a-f0-9]{8,}\.(?:js|css|woff2|png|jpe?g|webp|svg|ico)$/i.test(filePath)) {
				res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
				return;
			}
			if (/(?:index\.html|env\.js|robots\.txt|sitemap\.xml)$/i.test(filePath)) {
				res.setHeader('Cache-Control', 'no-cache');
			}
		}
	}));
}

function readWheelState() {
	try {
		if (fssync.existsSync(WHEEL_STATE_FILE)) return JSON.parse(fssync.readFileSync(WHEEL_STATE_FILE, 'utf8'));
	} catch {}
	return { spins: {}, claims: {} };
}

function saveWheelState(state) {
	fssync.mkdirSync(DATA_DIR, { recursive: true });
	fssync.writeFileSync(WHEEL_STATE_FILE, JSON.stringify(state), 'utf8');
}

function normalizePhone(value) {
	return String(value || '')
		.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - '٠'.charCodeAt(0)))
		.replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - '۰'.charCodeAt(0)))
		.replace(/[^0-9]/g, '');
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
