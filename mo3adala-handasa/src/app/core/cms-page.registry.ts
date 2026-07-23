import { monthlyContentDefaults } from './monthly-content.defaults';

export type CmsPageKey =
	| 'home'
	| 'photos-2025'
	| 'faq'
	| 'contact'
	| 'news-equation'
	| 'news-app'
	| 'news-detail'
	| 'subscription-details'
	| 'subscription-ab-reviews'
	| 'subscription-intensive'
	| 'social'
	| 'engineers'
	| 'teacher-details'
	| 'requirements'
	| 'schools';

export interface CmsPageOption {
	key: CmsPageKey;
	route: string;
	title: string;
	description: string;
	group: string;
}

export const cmsPageOptions: CmsPageOption[] = [
	{ key: 'home', route: '/', title: 'الرئيسية', description: 'الهيرو، المميزات، الصور، ونصوص الصفحة الرئيسية', group: 'صفحات أساسية' },
	{ key: 'photos-2025', route: '/photos-2025', title: 'صور طلاب 2025', description: 'معرض الصور والترتيب والعناوين', group: 'صفحات أساسية' },
	{ key: 'faq', route: '/faq', title: 'الأسئلة الشائعة', description: 'الأسئلة والإجابات وترتيب ظهورها', group: 'صفحات أساسية' },
	{ key: 'contact', route: '/contact', title: 'تواصل معنا', description: 'أرقام الواتساب والتليفون ونصوص التواصل', group: 'صفحات أساسية' },
	{ key: 'requirements', route: '/requirements', title: 'شروط المعادلة', description: 'شروط التقديم والتنبيهات والمستندات', group: 'صفحات أساسية' },
	{ key: 'social', route: '/social', title: 'السوشيال ميديا', description: 'روابط المنصات الاجتماعية وأزرار المتابعة', group: 'صفحات أساسية' },
	{ key: 'news-app', route: '/news/app', title: 'أخبار الأبلكيشن', description: 'قائمة الأخبار والكروت والعروض', group: 'الأخبار' },
	{ key: 'news-equation', route: '/news/equation', title: 'أخبار المعادلة', description: 'أخبار وشروط وتحديثات المعادلة', group: 'الأخبار' },
	{ key: 'news-detail', route: '/news/detail/:id', title: 'تفاصيل الخبر', description: 'محتوى المقالات الطويلة وصور الأخبار', group: 'الأخبار' },
	{ key: 'engineers', route: '/engineers', title: 'المهندسين والمدرسين', description: 'كروت المدرسين وترتيبهم وبياناتهم', group: 'الأشخاص' },
	{ key: 'teacher-details', route: '/teacher/:id', title: 'تفاصيل المدرس', description: 'صفحات البروفايل والفيديوهات ووسائل التواصل', group: 'الأشخاص' },
	{ key: 'schools', route: '/schools', title: 'المدارس والمعاهد', description: 'الدليل والقوائم والفلترة', group: 'الدليل والمعارض' },
	{ key: 'subscription-ab-reviews', route: '/subscription-ab-reviews', title: 'مراجعات A-B-C', description: 'مراجعات جروبات A وB وC والفورمات والجداول المنفصلة', group: 'الاشتراكات' },
	{ key: 'subscription-intensive', route: '/subscription-intensive', title: 'الاشتراك المكثف', description: 'خطط المكثف والدفع والفودافون كاش', group: 'الاشتراكات' },
];

export const cmsPageDefaults: Record<CmsPageKey, unknown> = {
	home: {
		visible: true,
		seo: {
			title: 'ابلكيشن معادلة كلية هندسة',
			description: 'بنجهّزك لاجتياز معادلة كلية الهندسة بخطوات واضحة ومحتوى مُبسّط وتمارين عملية.'
		},
		hero: {
			title: 'ابلكيشن معادلة كلية هندسة',
			features: ['مناهج بسيطة مُحدّثة 2026 ', 'شرح + أمثلة + امتحانات إلكترونية', 'خطط مذاكرة تناسب وقتك', 'دعم ومتابعة علي مدار 24 ساعة'],
			descriptions: [
				{ text: 'أعلي نسبة نجاح في مصر', highlight: ['أعلي نسبة نجاح', 'مصر'] },
				{ text: 'قوانين اللعبة اتغيــرت', highlight: [' اللعبة', ' اتغيــرت'] },
				{ text: 'أكبر فريق مساعدين في مصر لطلاب المعادلة', highlight: ['أكبر فريق مساعدين', 'مصر', 'طلاب المعادلة'] },
				{ text: 'بنجهزك لإجتياز معادلة هندسة بسهولة', highlight: ['بنجهزك', 'معادلة هندسة', 'بسهولة'] },
				{ text: 'دعم ومتابعة علي مدار اليوم', highlight: ['دعم ومتابعة', 'مدار اليوم'] },
				{ text: 'طاقم هندسي علي أعلي مستوي', highlight: ['طاقم هندسي', 'أعلي مستوي'] }
			]
		},
		photos: {
			visible: true,
			items: []
		}
	},
	'photos-2025': {
		visible: true,
		title: 'صور طلاب 2025',
		description: 'معرض نجاح طلاب المعادلة',
		albums: []
	},
	faq: {
		visible: true,
		seo: {
			title: 'الأسئلة الشائعة - معادلة كلية هندسة',
			description: 'إجابات لأكثر الأسئلة شيوعًا حول المعادلة والمحتوى وخطط الدراسة.'
		},
		faqs: [
			{ q: 'يعنى ايه معادلة كلية هندسة؟', a: 'هى مسابقة بينظمها المجلس الاعلي للجامعات لطلاب التعليم الفني الصناعي للالتحاق باحدي كليات الهندسة الحكومية.' },
			{ q: 'مين الطلاب المسموح ليهم التقديم على المعادلة؟', a: 'طلاب التعليم الفني الصناعي الدبلومات و المعاهد الفنية الصناعية.' }
		]
	},
	contact: {
		visible: true,
		studentWhatsapp: '201554843745',
		parentWhatsapp: '201554843745',
		phoneNumber: '+201554843745',
		seo: {
			title: 'تواصل معنا - ابلكيشن معادلة كلية هندسة',
			description: 'تواصل معنا عبر واتساب للطلاب وأولياء الأمور أو اتصل بنا مباشرة.'
		}
	},
	'news-equation': {
		visible: true,
		title: 'أخبار المعادلة',
		items: []
	},
	'news-app': {
		visible: true,
		title: 'أخبار الأبلكيشن',
		items: []
	},
	'news-detail': {
		visible: true,
		articles: []
	},
	'engineers': {
		visible: true,
		title: 'المهندسين والمدرسين',
		people: []
	},
	'teacher-details': {
		visible: true,
		profiles: []
	},
	requirements: {
		visible: true,
		title: 'شروط المعادلة',
		sections: []
	},
	schools: {
		visible: true,
		title: 'المدارس والمعاهد',
		items: []
	},
	social: {
		visible: true,
		links: []
	},
	'subscription-details': monthlyContentDefaults['subscription-details'],
	'subscription-ab-reviews': monthlyContentDefaults['subscription-ab-reviews'],
	'subscription-intensive': monthlyContentDefaults['subscription-intensive']
};

