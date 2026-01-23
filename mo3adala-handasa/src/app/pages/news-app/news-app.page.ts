import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
	selector: 'app-news-app',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './news-app.page.html',
	styleUrls: ['./news-app.page.css']
})
export class NewsAppPageComponent implements OnInit {
	newsItems = [
		{
			id: -1,
			title: 'انطلاق جروب C رسميًا على ابلكيشن معادلة كلية الهندسة',
			excerpt: 'لو بتدور على بداية قوية وطريق واضح الي كلية الهندسة؟ لو لسه مبدأتش وخايف من الوقت؟ 🔥 جروب C بدأ رسميًا',
			date: '2026-01-24',
			image: '/assets/جروب جديد.jpg.jpeg',
			slug: 'group-c-launch-2026',
			category: 'الكورسات والدورات',
			important: true
		},
		{
			id: 0,
			title: '7 أيام تجريبية مجاناً لطلاب المعادلة',
			excerpt: 'جرب الابلكيشن بالكامل واحصل على كود مجاني لمدة 7 أيام – العرض ساري لفترة محدودة',
			date: '2026-01-21',
			image: '/assets/اكواد مجانية.jpg',
			slug: 'free-week-codes-2025',
			category: 'عروض خاصة',
			important: true
		},
		{
			id: 1,
			title: 'تفاصيل خطة الإنجليزي مع دكتور عمر أحمد أسطورة اللغة الانجليزية وصلت 🔥',
			excerpt: 'الإنجليزي من النهاردة اتحول من عقدة… إلى لعبة 💪 - خطة شاملة لتعلم اللغة الإنجليزية مع دكتور عمر أحمد',
			date: '2025-11-03',
			image: '/assets/خبر الإنجليزي.jpg',
			slug: 'english-plan-dr-omar-2025',
			category: 'الكورسات والدورات',
			important: false
		},
		{
			id: 2,
			title: 'نظام المتابعة في الابلكيشن حاجة تانية ',
			excerpt: 'المتابعة في الابلكيشن حاجة تانية - نظام تقييمات شامل مع ثواب وعقاب لضمان التزام الطلاب',
			date: '2025-11-01',
			image: '/assets/نظام المتابعة.jpg',
			slug: 'monitoring-system-2025',
			category: 'أنظمة الأبلكيشن',
			important: false
		},
		{
			id: 3,
			title: 'كتاب امتحانات الأبلكيشن',
			excerpt: 'كتاب امتحانات الأبلكيشن يضم مجموعة كبيرة من الامتحانات الشاملة التي تساعد الطالب على التدرب على شكل الأسئلة الحقيقية',
			date: '2025-05-20',
			image: '/assets/كتاب.jpg',
			slug: 'App-Book-2025',
			category: 'الكتب والمراجع',
			important: false
		},
		{
			id: 4,
			title: 'الكورس المكثف الجديد',
			excerpt: 'يغطي شرحًا كاملًا للمنهج الدراسي ويركز على أهم النقاط الأساسية في المادة مع حل تدريبات متنوعة للتطبيق العملي',
			date: '2025-06-22',
			image: '/assets/مكثف.jpg',
			slug: 'intensive-course-2025',
			category: 'الكورسات والدورات',
			important: false
		},
		// {
		// 	id: 4,
		// 	title: 'إضافة نظام الدردشة المباشرة مع المدرسين',
		// 	excerpt: 'يمكن الآن للطلاب التواصل مباشرة مع المدرسين عبر نظام الدردشة المدمج',
		// 	date: '2024-01-12',
		// 	image: '/assets/logo2.png',
		// 	slug: 'live-chat-teachers'
		// },
		// {
		// 	id: 5,
		// 	title: 'تحديث قاعدة البيانات التعليمية',
		// 	excerpt: 'تم إضافة أكثر من 500 سؤال جديد ومراجعة شاملة للمحتوى التعليمي',
		// 	date: '2024-01-08',
		// 	image: '/assets/logo2.png',
		// 	slug: 'database-update-500-questions'
		// },
		// {
		// 	id: 6,
		// 	title: 'إضافة نظام الاختبارات التفاعلية',
		// 	excerpt: 'تم إضافة نظام اختبارات تفاعلية مع تقييم فوري للنتائج ونصائح للتحسين',
		// 	date: '2024-01-05',
		// 	image: '/assets/logo2.png',
		// 	slug: 'interactive-tests-system'
		// },
		// {
		// 	id: 7,
		// 	title: 'تحسينات في واجهة المستخدم',
		// 	excerpt: 'تم تحديث واجهة المستخدم لتكون أكثر سهولة ووضوحاً مع دعم أفضل للهواتف الذكية',
		// 	date: '2024-01-02',
		// 	image: '/assets/logo2.png',
		// 	slug: 'ui-improvements-mobile'
		// },
		// {
		// 	id: 8,
		// 	title: 'إضافة نظام الإشعارات الذكية',
		// 	excerpt: 'يمكن الآن للطلاب تلقي إشعارات مخصصة حول مواعيد الامتحانات والتحديثات المهمة',
		// 	date: '2023-12-28',
		// 	image: '/assets/logo2.png',
		// 	slug: 'smart-notifications-system'
		// }
	];

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
			const title = 'أخبار الأبلكيشن - ابلكيشن معادلة كلية هندسة';
			const description = 'تابع آخر أخبار وتحديثات أبلكيشن معادلة كلية هندسة والعروض الخاصة والمنتجات الجديدة';
			const url = `${siteUrl}/news-app`;
			
			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical(url);
		}
	}

	formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('ar-EG', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
}
