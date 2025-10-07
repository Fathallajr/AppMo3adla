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
		month: ' أكتوبر',
		price: '700',
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
		googleFormLink: 'https://forms.gle/sQxtMjAikcMt7uSP6',
		vodafoneNumbers: [
			{ number: '01040490778', owner: 'احمد ع********* س***' },
			{ number: '01040490779', owner: 'س ف** ص*** ا***' },
			{ number: '01080681865', owner: 'ابرآم س*** م****' },
			{ number: '01025326080', owner: 'احمد م**** ا***** ز***' }
		],
		requiredInfo: [
			'رقم الموبايل اللي حولت منه 📲',
			'سكرين شوت بالتحويل 🖼',
			'وقت وتاريخ التحويل ⏳'
		],
		whatsappNumber: '201554843745',
		subscriptionWarnings: {
			validity: {
				title: 'مدة صلاحية الاشتراك:',
				points: [
					'الكود شغال لغاية آخر الشهر فقط',
					'مع انتهاء الشهر بيقفل المحتوى تلقائياً',
					'عند تجديد الاشتراك الكود الجديد بيفتحلك كل المحتوى من الأول'
				]
			},
			refund: {
				title: 'سياسة الاسترداد:',
				points: [
					'السحب متاح خلال أسبوع من الاشتراك مع استرداد نصف المبلغ فقط',
					'بعد الأسبوع، لا يُمكن استرداد أي مبلغ'
				]
			}
		},
		subtitle: ' الشهر الأول لدفعة 2026 '
	};

	constructor() { }

	ngOnInit(): void {
		// this.updateCurrentMonth(); // معطل لاستخدام الشهر المحدد يدوياً
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

	openWhatsApp(): void {
		const message = encodeURIComponent('السلام عليكم، أريد إرسال سكرين شوت التحويل للاشتراك في المنصة');
		const whatsappUrl = `https://wa.me/${this.subscriptionDetails.whatsappNumber}?text=${message}`;
		window.open(whatsappUrl, '_blank');
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
