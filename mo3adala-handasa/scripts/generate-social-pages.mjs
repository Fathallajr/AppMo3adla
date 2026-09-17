import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const distRoot = path.join(root, 'dist');
const templatePath = path.join(distRoot, 'index.html');
const newsSourcePath = path.join(root, 'src', 'app', 'pages', 'news-detail', 'news-detail.page.ts');
const siteUrl = (process.env.NG_SITE_URL || 'https://www.appmo3adla.com').replace(/\/$/, '');

const defaultMeta = {
  title: 'ابلكيشن معادلة كلية هندسة - دايماً في ضهرك',
  description: 'أفضل منصة تعليمية للدبلوم الفني للدخول لكلية الهندسة. دروس مبسطة وشرح واضح ومتابعة مستمرة.',
  image: '/assets/logo.png'
};

const pageMeta = {
  '/': defaultMeta,
  '/faq': { title: 'الأسئلة الشائعة - ابلكيشن معادلة كلية هندسة', description: 'إجابات أهم الأسئلة عن معادلة كلية الهندسة والتقديم والاشتراكات.', image: '/assets/logo.png' },
  '/news/equation': { title: 'أخبار معادلة كلية الهندسة', description: 'آخر أخبار ومواعيد وشروط معادلة كلية الهندسة.', image: '/assets/logo.png' },
  '/success-stories': { title: 'قصص النجاح - ابلكيشن معادلة كلية هندسة', description: 'تجارب وقصص نجاح طلاب معادلة كلية الهندسة.', image: '/assets/success.png' },
  '/success-story': { title: 'قصص النجاح - ابلكيشن معادلة كلية هندسة', description: 'شاهد قصص نجاح طلاب أبلكيشن معادلة كلية هندسة.', image: '/assets/success.png' },
  '/subscription-ab-reviews': { title: 'اشتراك هندسة | ابلكيشن معادلة كلية هندسة', description: 'اشترك في محتوى هندسة المنظم لطلاب دفعة 2027، مع شرح ومراجعة ومتابعة مستمرة.', image: '/assets/جداول مراجعات شهر 8/جدول جروب A-B.png' },
  '/subscription-engineer': { title: 'اشتراك هندسة | ابلكيشن معادلة كلية هندسة', description: 'اشترك في محتوى هندسة المنظم لطلاب دفعة 2027، مع شرح ومراجعة ومتابعة مستمرة.', image: '/assets/جداول مراجعات شهر 8/جدول جروب A-B.png' },
  '/subscription-computers': { title: 'اشتراك حاسبات | ابلكيشن معادلة كلية هندسة', description: 'اشترك في محتوى حاسبات المنظم والمناسب لطلاب المعادلة، مع خطة واضحة للمذاكرة والمراجعة.', image: '/assets/جداول مراجعات شهر 8/جدول جروب C.png' },
  '/subscription-intensive': { title: 'الاشتراك المكثف - ابلكيشن معادلة كلية هندسة', description: 'تفاصيل الاشتراك المكثف وخطة الاستعداد لاختبارات المعادلة.', image: '/assets/logo.png' },
  '/engineers': { title: 'المهندسين والمدرسين - ابلكيشن معادلة كلية هندسة', description: 'تعرف على فريق المهندسين والمدرسين في أبلكيشن معادلة كلية هندسة.', image: '/assets/logo.png' },
  '/requirements': { title: 'متطلبات المعادلة - ابلكيشن معادلة كلية هندسة', description: 'تعرف على متطلبات وشروط التقديم لمعادلة كلية الهندسة.', image: '/assets/logo.png' },
  '/schools': { title: 'المدارس والمعاهد - ابلكيشن معادلة كلية هندسة', description: 'المدارس والمعاهد المؤهلة للتقديم في معادلة كلية الهندسة.', image: '/assets/logo.png' },
  '/batch-2027': { title: 'دفعة 2027 - ابلكيشن معادلة كلية هندسة', description: 'كل ما يخص دفعة 2027 وخطة الاستعداد لمعادلة كلية الهندسة.', image: '/assets/جروب السنة الجديدة 2027.png' }
};

const routeRedirects = {
  '/subscription-ab-reviews': '/subscription-engineer'
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function absoluteUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}/${encodeURI(value.replace(/^\//, ''))}`;
}

function parseNewsMeta() {
  const source = fs.readFileSync(newsSourcePath, 'utf8');
  const pattern = /^\s*'([^']+)':\s*\{.*?\btitle:\s*'([^']+)'.*?\bimage:\s*'([^']+)'/gms;
  const result = {};
  for (const match of source.matchAll(pattern)) {
    const [, id, title, image] = match;
    result[`/news/detail/${id}`] = {
      title: `${title} - ابلكيشن معادلة كلية هندسة`,
      description: `${title}. أحدث أخبار وتفاصيل معادلة كلية الهندسة.`,
      image
    };
  }
  return result;
}

function replaceMeta(html, route, meta) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(`${siteUrl}${route === '/' ? '/' : route}`);
  const image = escapeHtml(absoluteUrl(meta.image || defaultMeta.image));
  const replacements = [
    [/<title>.*?<\/title>/i, `<title>${title}</title>`],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${canonical}$2`],
    [/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+property="og:image"\s+content=")[^"]*(")/i, `$1${image}$2`],
    [/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+property="twitter:url"\s+content=")[^"]*(")/i, `$1${canonical}$2`],
    [/(<meta\s+property="twitter:title"\s+content=")[^"]*(")/i, `$1${title}$2`],
    [/(<meta\s+property="twitter:description"\s+content=")[^"]*(")/i, `$1${description}$2`],
    [/(<meta\s+property="twitter:image"\s+content=")[^"]*(")/i, `$1${image}$2`],
    [/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${canonical}$2`]
  ];
  return replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), html);
}

function writeRoute(template, route, meta) {
  const targetDir = route === '/' ? distRoot : path.join(distRoot, ...route.split('/').filter(Boolean));
  fs.mkdirSync(targetDir, { recursive: true });
  let html = replaceMeta(template, route, meta);
  const redirectTo = routeRedirects[route];
  if (redirectTo) {
    html = html.replace(
      '</head>',
      `<meta http-equiv="refresh" content="0;url=${redirectTo}">\n  <script>location.replace(${JSON.stringify(redirectTo)});</script>\n</head>`
    );
  }
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
}

function main() {
  if (!fs.existsSync(templatePath)) throw new Error(`Missing Angular build output: ${templatePath}`);
  const template = fs.readFileSync(templatePath, 'utf8');
  const routesFile = path.join(root, 'src', 'assets', 'routes.json');
  const routes = JSON.parse(fs.readFileSync(routesFile, 'utf8'));
  const allMeta = { ...pageMeta, ...parseNewsMeta() };

  for (const route of routes) writeRoute(template, route, allMeta[route] || defaultMeta);
  console.log(`Generated social metadata HTML for ${routes.length} routes.`);
}

main();
