import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
			id: 1,
			title: 'كتاب امتحانات الأبلكيشن',
			excerpt: 'كتاب امتحانات الأبلكيشن يضم مجموعة كبيرة من الامتحانات الشاملة التي تساعد الطالب على التدرب على شكل الأسئلة الحقيقية',
			date: '2025-05-20',
			image: '/assets/news1.png',
			slug: 'App-Book-2025',
			category: 'الكتب والمراجع',
			important: false
		},
		{
			id: 2,
			title: 'جروب كلمات اللغة الإنجليزية',
			excerpt: 'يضم مجموعة كبيرة من أهم الكلمات الشائعة فى الإمتحانات ويساعد الطالب على بناء حصيلة لغوية قوية',
			date: '2025-06-22',
			image: '/assets/news2.png',
			slug: 'english-words-group-2025',
			category: 'التعليم والتدريب',
			important: false
		},
		{
			id: 3,
			title: 'الكورس المكثف الجديد',
			excerpt: 'يغطي شرحًا كاملًا للمنهج الدراسي ويركز على أهم النقاط الأساسية في المادة مع حل تدريبات متنوعة للتطبيق العملي',
			date: '2025-06-22',
			image: '/assets/news4.png',
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

	constructor() { }

	ngOnInit(): void {
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
