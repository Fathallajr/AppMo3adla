import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-news-equation',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './news-equation.page.html',
	styleUrls: ['./news-equation.page.css']
})
export class NewsEquationPageComponent implements OnInit {
	newsItems = [
		{
			id: 1,
			title: 'تحديثات جديدة في شروط المعادلة للعام 2024',
			excerpt: 'تم الإعلان عن تحديثات مهمة في شروط المعادلة للطلاب الراغبين في الالتحاق بكليات الهندسة',
			date: '2024-01-15',
			image: '/assets/logo2.png',
			slug: 'equation-requirements-2024'
		},
		{
			id: 2,
			title: 'قائمة جديدة من المدارس المعتمدة للمعادلة',
			excerpt: 'تم إضافة 15 مدرسة جديدة إلى قائمة المدارس المعتمدة للمعادلة في مختلف المحافظات',
			date: '2024-01-10',
			image: '/assets/logo2.png',
			slug: 'new-approved-schools-2024'
		},
		{
			id: 3,
			title: 'مواعيد امتحانات المعادلة للفصل الدراسي الثاني',
			excerpt: 'تم الإعلان عن مواعيد امتحانات المعادلة للفصل الدراسي الثاني مع إجراءات التسجيل',
			date: '2024-01-05',
			image: '/assets/logo2.png',
			slug: 'exam-schedule-semester-2'
		},
		{
			id: 4,
			title: 'تحديثات في نظام التقديم الإلكتروني',
			excerpt: 'تم تطوير نظام التقديم الإلكتروني ليكون أكثر سهولة وسرعة للطلاب',
			date: '2024-01-01',
			image: '/assets/logo2.png',
			slug: 'electronic-application-update'
		},
		{
			id: 5,
			title: 'ورش عمل مجانية لطلاب المعادلة',
			excerpt: 'تنظيم ورش عمل مجانية لمساعدة الطلاب في التحضير لامتحانات المعادلة',
			date: '2023-12-28',
			image: '/assets/logo2.png',
			slug: 'free-workshops-students'
		},
		{
			id: 6,
			title: 'نتائج امتحانات المعادلة للفصل الأول',
			excerpt: 'تم الإعلان عن نتائج امتحانات المعادلة للفصل الدراسي الأول مع إحصائيات النجاح',
			date: '2023-12-20',
			image: '/assets/logo2.png',
			slug: 'exam-results-semester-1'
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
