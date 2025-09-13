import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-news-detail',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './news-detail.page.html',
	styleUrls: ['./news-detail.page.css']
})
export class NewsDetailPageComponent implements OnInit {
	newsItem: any = null;
	newsId: string = '';

	// Mock data - في التطبيق الحقيقي ستحصل على البيانات من API
	newsData: { [key: string]: any } = {
		'equation-requirements-2024': {
			id: 'equation-requirements-2024',
			title: 'تحديثات جديدة في شروط المعادلة للعام 2024',
			content: `
				<p>تم الإعلان عن تحديثات مهمة في شروط المعادلة للطلاب الراغبين في الالتحاق بكليات الهندسة. هذه التحديثات تأتي في إطار تطوير النظام التعليمي وتحسين جودة التعليم الهندسي.</p>
				
				<h3>الشروط الجديدة تشمل:</h3>
				<ul>
					<li>تحديث متطلبات الدرجات المطلوبة في المواد الأساسية</li>
					<li>إضافة مواد جديدة للتقييم</li>
					<li>تطوير نظام التقييم ليكون أكثر شمولية</li>
					<li>تحسين آليات المراجعة والاعتماد</li>
				</ul>
				
				<h3>المواعيد المهمة:</h3>
				<ul>
					<li>بداية التسجيل: 1 مارس 2024</li>
					<li>آخر موعد للتسجيل: 30 أبريل 2024</li>
					<li>موعد الامتحانات: يونيو 2024</li>
					<li>إعلان النتائج: يوليو 2024</li>
				</ul>
				
				<p>ننصح جميع الطلاب الراغبين في الالتحاق بكليات الهندسة بمراجعة الشروط الجديدة والتأكد من استيفاء جميع المتطلبات قبل التقديم.</p>
			`,
			date: '2024-01-15',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'new-approved-schools-2024': {
			id: 'new-approved-schools-2024',
			title: 'قائمة جديدة من المدارس المعتمدة للمعادلة',
			content: `
				<p>تم إضافة 15 مدرسة جديدة إلى قائمة المدارس المعتمدة للمعادلة في مختلف المحافظات. هذه المدارس تم تقييمها بعناية للتأكد من استيفاءها للمعايير المطلوبة.</p>
				
				<h3>المدارس الجديدة تشمل:</h3>
				<ul>
					<li>مدرسة النهضة الثانوية - القاهرة</li>
					<li>مدرسة المستقبل - الإسكندرية</li>
					<li>مدرسة التميز - الجيزة</li>
					<li>مدرسة الأمل - أسيوط</li>
					<li>مدرسة النور - المنيا</li>
				</ul>
				
				<h3>معايير الاعتماد:</h3>
				<p>تم تقييم المدارس بناءً على عدة معايير منها:</p>
				<ul>
					<li>جودة المناهج التعليمية</li>
					<li>كفاءة المدرسين</li>
					<li>المرافق والتجهيزات</li>
					<li>نتائج الطلاب في الامتحانات</li>
				</ul>
				
				<p>هذا التوسع في قائمة المدارس المعتمدة سيساعد في توفير فرص أكثر للطلاب في مختلف المحافظات.</p>
			`,
			date: '2024-01-10',
			image: '/assets/logo2.png',
			category: 'أخبار المعادلة',
			author: 'فريق المعادلة'
		},
		'app-update-2-1-0': {
			id: 'app-update-2-1-0',
			title: 'تحديث جديد للتطبيق - إصدار 2.1.0',
			content: `
				<p>نحن سعداء بالإعلان عن إطلاق التحديث الجديد للتطبيق - الإصدار 2.1.0. هذا التحديث يجلب ميزات جديدة وتحسينات مهمة لتجربة المستخدم.</p>
				
				<h3>الميزات الجديدة:</h3>
				<ul>
					<li>واجهة مستخدم محسنة وسهلة الاستخدام</li>
					<li>نظام إشعارات ذكي ومتقدم</li>
					<li>تحسينات في سرعة التطبيق</li>
					<li>إضافة نظام التتبع الذكي للدرجات</li>
					<li>دردشة مباشرة مع المدرسين</li>
				</ul>
				
				<h3>التحسينات التقنية:</h3>
				<ul>
					<li>تقليل وقت التحميل بنسبة 40%</li>
					<li>تحسين استهلاك البطارية</li>
					<li>إصلاح الأخطاء المعروفة</li>
					<li>تحسين الأمان والحماية</li>
				</ul>
				
				<h3>كيفية التحديث:</h3>
				<p>يمكنك تحديث التطبيق من خلال:</p>
				<ul>
					<li>متجر Google Play (أندرويد)</li>
					<li>App Store (iOS)</li>
					<li>الموقع الرسمي للتطبيق</li>
				</ul>
				
				<p>ننصح جميع المستخدمين بتحديث التطبيق للاستفادة من الميزات الجديدة والتحسينات.</p>
			`,
			date: '2024-01-20',
			image: '/assets/logo2.png',
			category: 'أخبار التطبيق',
			author: 'فريق التطوير'
		},
		'smart-grades-tracking': {
			id: 'smart-grades-tracking',
			title: 'إضافة نظام التتبع الذكي للدرجات',
			content: `
				<p>نحن متحمسون للإعلان عن إضافة نظام التتبع الذكي للدرجات، والذي سيساعد الطلاب على متابعة تقدمهم الأكاديمي بشكل أفضل.</p>
				
				<h3>مميزات النظام الجديد:</h3>
				<ul>
					<li>تتبع الدرجات في جميع المواد</li>
					<li>رسوم بيانية لتطور الأداء</li>
					<li>تنبيهات عند انخفاض الدرجات</li>
					<li>توصيات للتحسين</li>
					<li>مقارنة الأداء مع المتوسط العام</li>
				</ul>
				
				<h3>كيفية الاستخدام:</h3>
				<ol>
					<li>ادخل إلى قسم "درجاتي" في التطبيق</li>
					<li>اختر المادة التي تريد متابعة درجاتها</li>
					<li>شاهد الرسوم البيانية والإحصائيات</li>
					<li>اتبع التوصيات المقدمة للتحسين</li>
				</ol>
				
				<h3>الفوائد للطلاب:</h3>
				<ul>
					<li>متابعة مستمرة للتقدم الأكاديمي</li>
					<li>تحديد نقاط الضعف مبكراً</li>
					<li>تحفيز للتحسين المستمر</li>
					<li>تنظيم أفضل للدراسة</li>
				</ul>
				
				<p>هذا النظام سيساعد الطلاب على تحقيق أفضل النتائج في دراستهم.</p>
			`,
			date: '2024-01-18',
			image: '/assets/logo2.png',
			category: 'أخبار التطبيق',
			author: 'فريق التطوير'
		}
	};

	constructor(
		private route: ActivatedRoute,
		private location: Location
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.newsId = params['id'];
			this.newsItem = this.newsData[this.newsId];
		});
	}

	formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('ar-EG', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	goBack(): void {
		this.location.back();
	}

	async shareNews(): Promise<void> {
		const url = window.location.href;
		
		if (navigator.share) {
			// استخدام Web Share API إذا كان متاحاً (في الهواتف المحمولة)
			try {
				await navigator.share({
					title: this.newsItem?.title || 'خبر من موقع معادلة كلية الهندسة',
					text: this.newsItem?.content?.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
					url: url
				});
			} catch (err) {
				// إذا ألغى المستخدم المشاركة
				console.log('تم إلغاء المشاركة');
			}
		} else {
			// نسخ الرابط إلى الحافظة
			try {
				await navigator.clipboard.writeText(url);
				alert('تم نسخ الرابط إلى الحافظة!');
			} catch (err) {
				// طريقة بديلة للنسخ
				this.fallbackCopyTextToClipboard(url);
			}
		}
	}

	private fallbackCopyTextToClipboard(text: string): void {
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		textArea.style.top = '-999999px';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			document.execCommand('copy');
			alert('تم نسخ الرابط إلى الحافظة!');
		} catch (err) {
			alert('حدث خطأ في نسخ الرابط. الرابط: ' + text);
		}
		
		document.body.removeChild(textArea);
	}
}
