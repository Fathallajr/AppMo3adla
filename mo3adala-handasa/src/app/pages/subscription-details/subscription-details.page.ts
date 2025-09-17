import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-subscription-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './subscription-details.page.html',
	styleUrls: ['./subscription-details.page.css']
})
export class SubscriptionDetailsPageComponent implements OnInit {
	currentMonth = '';
	subscriptionDetails = {
		month: 'يناير 2024',
		price: '500',
		currency: 'ج',
		features: [
			'فيديوهات تأسيسية في جميع المواد',
			'فيديوهات شرح تفصيلية للمناهج',
			'فيديوهات حل بنوك المسائل',
			'ملازم وملفات PDF للتحميل',
			'امتحانات إلكترونية تفاعلية',
			'مراجعة مستمرة مع المدرسين',
			'دردشة مباشرة مع فريق الدعم',
			'تتبع التقدم والدرجات',
			'إشعارات للامتحانات والمواعيد',
			'دعم فني على مدار الساعة'
		],
		offers: [
			'خصم 20% للطلاب الجدد',
			'ضمان استرداد المبلغ خلال 7 أيام',
			'وصول مدى الحياة للمحتوى',
			'شهادة إنجاز معتمدة'
		],
		googleFormLink: 'https://forms.gle/MfMS3vVHU9gcdum87',
		vodafoneNumbers: [
			'01040490778',
			'01040490779',
			'01080681865',
			'01025326080'
		],
		requiredInfo: [
			'رقم الموبايل اللي حولت منه 📲',
			'سكرين شوت بالتحويل 🖼',
			'وقت وتاريخ التحويل ⏳'
		],
		warningMessage: 'لا يوجد سحب إشتراك نهائيا لأي سبب من الأسباب',
		subtitle: 'مسك الختام .. الجولة الحاسمة '
	};

	constructor() { }

	ngOnInit(): void {
		this.updateCurrentMonth();
	}

	private updateCurrentMonth(): void {
		const now = new Date();
		const months = [
			'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
			'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
		];
		
		this.currentMonth = `${months[now.getMonth()]} ${now.getFullYear()}`;
		this.subscriptionDetails.month = this.currentMonth;
	}

	openGoogleForm(): void {
		window.open(this.subscriptionDetails.googleFormLink, '_blank');
	}

	formatPrice(price: string): string {
		return `${price} ${this.subscriptionDetails.currency}`;
	}

	async copyToClipboard(text: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			// يمكن إضافة إشعار هنا
			console.log('تم نسخ الرقم:', text);
		} catch (err) {
			// طريقة بديلة للنسخ
			this.fallbackCopyTextToClipboard(text);
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
			console.log('تم نسخ الرقم:', text);
		} catch (err) {
			console.error('فشل في نسخ الرقم:', err);
		}
		
		document.body.removeChild(textArea);
	}
}
