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
			title: 'تحديث جديد للتطبيق - إصدار 2.1.0',
			excerpt: 'تم إضافة ميزات جديدة للتطبيق تشمل تحسينات في واجهة المستخدم وإضافة نظام الإشعارات',
			date: '2024-01-20',
			image: '/assets/logo2.png',
			slug: 'app-update-2-1-0'
		},
		{
			id: 2,
			title: 'إضافة نظام التتبع الذكي للدرجات',
			excerpt: 'يمكن الآن للطلاب تتبع درجاتهم ومتابعة تقدمهم في المواد المختلفة',
			date: '2024-01-18',
			image: '/assets/logo2.png',
			slug: 'smart-grades-tracking'
		},
		{
			id: 3,
			title: 'تحسينات في سرعة التطبيق والأداء',
			excerpt: 'تم تحسين أداء التطبيق بشكل كبير مع تقليل وقت التحميل بنسبة 40%',
			date: '2024-01-15',
			image: '/assets/logo2.png',
			slug: 'performance-improvements'
		},
		{
			id: 4,
			title: 'إضافة نظام الدردشة المباشرة مع المدرسين',
			excerpt: 'يمكن الآن للطلاب التواصل مباشرة مع المدرسين عبر نظام الدردشة المدمج',
			date: '2024-01-12',
			image: '/assets/logo2.png',
			slug: 'live-chat-teachers'
		},
		{
			id: 5,
			title: 'تحديث قاعدة البيانات التعليمية',
			excerpt: 'تم إضافة أكثر من 500 سؤال جديد ومراجعة شاملة للمحتوى التعليمي',
			date: '2024-01-08',
			image: '/assets/logo2.png',
			slug: 'database-update-500-questions'
		},
		{
			id: 6,
			title: 'إضافة نظام الاختبارات التفاعلية',
			excerpt: 'تم إضافة نظام اختبارات تفاعلية مع تقييم فوري للنتائج ونصائح للتحسين',
			date: '2024-01-05',
			image: '/assets/logo2.png',
			slug: 'interactive-tests-system'
		},
		{
			id: 7,
			title: 'تحسينات في واجهة المستخدم',
			excerpt: 'تم تحديث واجهة المستخدم لتكون أكثر سهولة ووضوحاً مع دعم أفضل للهواتف الذكية',
			date: '2024-01-02',
			image: '/assets/logo2.png',
			slug: 'ui-improvements-mobile'
		},
		{
			id: 8,
			title: 'إضافة نظام الإشعارات الذكية',
			excerpt: 'يمكن الآن للطلاب تلقي إشعارات مخصصة حول مواعيد الامتحانات والتحديثات المهمة',
			date: '2023-12-28',
			image: '/assets/logo2.png',
			slug: 'smart-notifications-system'
		}
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
