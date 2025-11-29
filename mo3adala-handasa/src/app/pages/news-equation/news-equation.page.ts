import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
	selector: 'app-news-equation',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './news-equation.page.html',
	styleUrls: ['./news-equation.page.css']
})
export class NewsEquationPageComponent implements OnInit {
	newsItems = [
		// {
		// 	id: 1,
		// 	title: 'كتاب امتحانات الأبلكيشن',
		// 	excerpt: 'كتاب امتحانات الأبلكيشن يضم مجموعة كبيرة من الامتحانات الشاملة التي تساعد الطالب على التدرب على شكل الأسئلة الحقيقية ويحتوي على إجابات نموذجية',
		// 	date: '2025-05-20',
		// 	image: '/assets/logo2.png',
		// 	slug: 'App-Book-2025',
		// 	content: 'كتاب امتحانات الأبلكيشن يضم مجموعة كبيرة من الامتحانات الشاملة التي تساعد الطالب على التدرب على شكل الأسئلة الحقيقية ويحتوي على إجابات نموذجية لزيادة الفهم والثقة',
		// 	category: 'الكتب والمراجع',
		// 	important: false
		// },
		{
			id: 2,
			title: 'فرصة واحدة فقط لاختبارات المعادلة لدفعة 2025',
			excerpt: 'اعتباراً من دفعة عام 2025، أصبحت فرص التقدم لاختبارات المعادلة فرصة واحدة فقط خلال عامين متتاليين تحسب ابتداء من عام حصول الطالب على المؤهل والعام الذي يليه',
			date: '2025-06-22',
			image: '/assets/success.png',
			slug: 'one-chance-only-2025',
			content: 'اعتباراً من دفعة عام 2025 من الطلاب الحاصلين على الدبلومات والمعاهد الفنية والمتقدمين لامتحانات الدبلومات والمعاهد في العام الجامعي 2025/2026 أصبحت فرص التقدم لاختبارات الدبلومات والمعاهد هذا العام ٢٠٢٥ هي فرصة واحدة فقط خلال عامين متتاليين تحسب ابتداء من عام حصول الطالب على المؤهل والعام الذي يليه',
			category: 'شروط المعادلة',
			important: false
		},
		{
			id: 3,
			title: 'قبول خريجي مدارس التكنولوجيا التطبيقية في المعادلة',
			excerpt: 'السماح لخريجي مدارس التكنولوجيا التطبيقية وتكنولوجيا المعلومات والذكاء الاصطناعي من الحاصلين على 75% فأكثر بأداء امتحانات المعادلة',
			date: '2025-06-22',
			image: '/assets/we.jpg',
			slug: 'tech-schools-acceptance-2025',
			content: 'السماح للطلاب خريجي مدرسة تكنولوجيا المعلومات بالإسماعيلية ومدرسة أي تك - I-TECH) وخريجي مدارس التكنولوجيا التطبيقية تخصص تكنولوجيا المعلومات - الذكاء الاصطناعي - برمجيات وخريجي مدارس WE للتكنولوجيا التطبيقية من الحاصلين على 75% فأكثر من مجموع درجات شهادة الدبلوم بأداء امتحانات في مواد (رياضة - رياضة - فيزياء - لغة انجليزية مع اختبارات الدبلومات والمعاهد التي تعقد بكليات الهندسة المعنية وتحت إشراف أمانة المجلس الأعلى للجامعات، وذلك اعتباراً من دفعة 2025 فقط.',
			category: 'قبول خاص',
			important: false
		},
		// {
		// 	id: 3,
		// 	title: 'تحديثات جديدة في شروط المعادلة للعام 2026',
		// 	excerpt: 'تم الإعلان عن تحديثات مهمة في شروط المعادلة للطلاب الراغبين في الالتحاق بكليات الهندسة',
		// 	date: '2024-01-15',
		// 	image: '/assets/success.png',
		// 	slug: 'equation-requirements-2024'
		// },
		// {
		// 	id: 2,
		// 	title: 'قائمة جديدة من المدارس المعتمدة للمعادلة',
		// 	excerpt: 'تم إضافة 15 مدرسة جديدة إلى قائمة المدارس المعتمدة للمعادلة في مختلف المحافظات',
		// 	date: '2024-01-10',
		// 	image: '/assets/logo2.png',
		// 	slug: 'new-approved-schools-2024'
		// },
		// {
		// 	id: 3,
		// 	title: 'مواعيد امتحانات المعادلة للفصل الدراسي الثاني',
		// 	excerpt: 'تم الإعلان عن مواعيد امتحانات المعادلة للفصل الدراسي الثاني مع إجراءات التسجيل',
		// 	date: '2024-01-05',
		// 	image: '/assets/logo2.png',
		// 	slug: 'exam-schedule-semester-2'
		// },
		// {
		// 	id: 4,
		// 	title: 'تحديثات في نظام التقديم الإلكتروني',
		// 	excerpt: 'تم تطوير نظام التقديم الإلكتروني ليكون أكثر سهولة وسرعة للطلاب',
		// 	date: '2024-01-01',
		// 	image: '/assets/logo2.png',
		// 	slug: 'electronic-application-update'
		// },
		// {
		// 	id: 5,
		// 	title: 'ورش عمل مجانية لطلاب المعادلة',
		// 	excerpt: 'تنظيم ورش عمل مجانية لمساعدة الطلاب في التحضير لامتحانات المعادلة',
		// 	date: '2023-12-28',
		// 	image: '/assets/logo2.png',
		// 	slug: 'free-workshops-students'
		// },
		// // {
		// 	id: 6,
		// 	title: 'نتائج امتحانات المعادلة للفصل الأول',
		// 	excerpt: 'تم الإعلان عن نتائج امتحانات المعادلة للفصل الدراسي الأول مع إحصائيات النجاح',
		// 	date: '2023-12-20',
		// 	image: '/assets/logo2.png',
		// 	slug: 'exam-results-semester-1'
		// }
	];

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
			const title = 'أخبار المعادلة - ابلكيشن معادلة كلية هندسة';
			const description = 'تابع آخر أخبار وتحديثات معادلة كلية الهندسة والقرارات الجديدة المتعلقة بالامتحانات';
			const url = `${siteUrl}/news-equation`;
			
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
