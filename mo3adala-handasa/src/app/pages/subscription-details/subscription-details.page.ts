import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

type GroupKey = 'groupA' | 'groupB' | 'groupC';

interface ScheduleImage {
	group: string;
	src: string;
	alt: string;
	note?: string;
}

interface GroupFormConfig {
	key: GroupKey;
	label: string;
	description: string;
	buttonText: string;
	link: string;
	isClosed: boolean;
	statusNote?: string;
	allowOpenWhenClosed?: boolean;
}

@Component({
	selector: 'app-subscription-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './subscription-details.page.html',
	styleUrls: ['./subscription-details.page.css']
})
export class SubscriptionDetailsPageComponent implements OnInit, OnDestroy {
	currentMonth = '';
	copiedNumber: string | null = null; // للتحكم في رسالة "تم النسخ"
	isImageModalOpen = false; // للتحكم في فتح/إغلاق الصورة المكبرة
	activeScheduleImage: ScheduleImage | null = null; // الصورة النشطة في الـ modal
	isEnrollmentClosed = false;
	enrollmentReopenMessage = 'سيتم فتح الاشتراك للمشتركين الجدد مع بداية الشهر القادم بإذن الله.';
	shuffledVodafoneNumbers: { number: string; owner: string }[] = [];
	
	private handleVisibilityChange = () => {
		if (typeof document === 'undefined') {
			return;
		}
		
		if (document.visibilityState === 'visible') {
			this.shuffleVodafoneNumbers();
		}
	};
	
	private handleWindowFocus = () => {
		this.shuffleVodafoneNumbers();
	};
	
	subscriptionDetails = {
		month: ' شهر أبريل 2026',
		groupA: {
			name: 'جروب A',
			price: '700',
		},
		groupB: {
			name: 'جروب B',
			price: '800',
		},
		groupC: {
			name: 'جروب C',
			price: '800',
		},
		currency: 'ج',
		features: [
			'فيديوهات تأسيسية في جميع المواد',
			'فيديوهات شرح تفصيلية للمناهج',
			'فيديوهات حل بنوك المسائل',
			'ملازم وملفات PDF للتحميل',
			'امتحانات إلكترونية تفاعلية',
			'تتبع التقدم والدرجات',
			'دعم فني على مدار الساعة',
			'سيستم متابعة كامل (جديد)'
		],
		offers: [
			'خصم 20% للطلاب الجدد',
			'ضمان استرداد المبلغ خلال 7 أيام',
			'وصول مدى الحياة للمحتوى',
			'شهادة إنجاز معتمدة'
		],
		googleForms: {
			groupA: {
				key: 'groupA',
				label: 'جروب A',
				description: 'للمشتركين الأساسيين',
				buttonText: 'سجل فورم جروب A',
				link: 'https://forms.gle/uekJXzUCrUx8P3gA8',
				isClosed: false
			},
			groupB: {
				key: 'groupB',
				label: 'جروب B',
				description: 'للمشتركين الجدد جروب B',
				buttonText: 'سجل فورم جروب B',
				link: 'https://forms.gle/KLuuqT8mKD9e2MFD9',
				isClosed: false
			},
			groupC: {
				key: 'groupC',
				label: 'جروب C',
				description: 'للمشتركين الجدد جروب C',
				buttonText: 'سجل فورم جروب C',
				link: 'https://forms.gle/rrGRbC8vJBzW52vq5',
				isClosed: false
			}
		},
		vodafoneNumbers: [
			{ number: '01040490778', owner: 'احمد ع********* س***' },
			 { number: '01040490779', owner: 'سعد ف** ص*** ا***' },
			//  { number: '01025326080', owner: 'احمد م**** ا***** ز***' },
			{ number: '01080681865', owner: 'Mona k***** A**' },
		],
		scheduleImages: [
			{
				group: 'جدول جروب A',
				src: '/assets/جروب A.jpeg',
				alt: 'جدول محتوى شهر أبريل - جروب A',
				note: '👆 اضغط على الصورة للتكبير'
			},
			{
				group: 'جدول جروب B',
				src: '/assets/جروب B.jpeg',
				alt: 'جدول محتوى شهر أبريل - جروب B',
				note: '👆 اضغط على الصورة للتكبير'
			},
			{
				group: 'جدول جروب C',
				src: '/assets/جروب C.jpeg',
				alt: 'جدول محتوى شهر أبريل - جروب C',
				note: '👆 اضغط على الصورة للتكبير'
			}
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
		subtitle: ' الشهر السابع لدفعة 2026 '
	};

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
			const title = 'تفاصيل الاشتراك - ابلكيشن معادلة كلية هندسة';
			const description = 'تعرف على تفاصيل الاشتراك في أبلكيشن معادلة كلية هندسة والمميزات المتاحة';
			const url = `${siteUrl}/subscription-details`;
			
			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical(url);
		}
		
		// ترتيب الأرقام عشوائياً في كل مرة يتم فتح الصفحة
		this.shuffleVodafoneNumbers();
		this.listenForVisibilityChange();
		
		// this.updateCurrentMonth(); // معطل لاستخدام الشهر المحدد يدوياً
	}
	
	ngOnDestroy(): void {
		if (typeof window === 'undefined' || typeof document === 'undefined') {
			return;
		}
		
		document.removeEventListener('visibilitychange', this.handleVisibilityChange);
		window.removeEventListener('focus', this.handleWindowFocus);
		window.removeEventListener('pageshow', this.handleWindowFocus);
	}
	
	/**
	 * ترتيب أرقام فودافون كاش بشكل عشوائي
	 */
	private shuffleVodafoneNumbers(): void {
		const shuffled = [...this.subscriptionDetails.vodafoneNumbers];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		
		this.shuffledVodafoneNumbers = shuffled;
	}
	
	private listenForVisibilityChange(): void {
		if (typeof window === 'undefined' || typeof document === 'undefined') {
			return;
		}
		
		document.addEventListener('visibilitychange', this.handleVisibilityChange);
		window.addEventListener('focus', this.handleWindowFocus);
		window.addEventListener('pageshow', this.handleWindowFocus);
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

	openGoogleForm(groupKey: GroupKey): void {
		const formConfig = this.subscriptionDetails.googleForms[groupKey] as GroupFormConfig;
		if (!formConfig) {
			console.warn('Form configuration not found for', groupKey);
			return;
		}

		const isFormDisabled = this.isEnrollmentClosed || (formConfig.isClosed && !formConfig.allowOpenWhenClosed);
		if (isFormDisabled) {
			console.warn(`محاولة فتح فورم ${formConfig.label} أثناء الإغلاق`);
			return;
		}

		window.open(formConfig.link, '_blank');
	}

	getGroupForms() {
		return Object.values(this.subscriptionDetails.googleForms) as GroupFormConfig[];
	}

	hasClosedForms(): boolean {
		return this.getGroupForms().some(form => form.isClosed);
	}

	onNumberCardClick(number: string): void {
		if (this.isEnrollmentClosed) {
			console.warn('محاولة نسخ رقم أثناء إغلاق التسجيل');
			return;
		}

		void this.copyToClipboard(number);
	}

	openWhatsApp(): void {
		const message = encodeURIComponent('السلام عليكم، أريد إرسال سكرين شوت التحويل للاشتراك في المنصة');
		const whatsappUrl = `https://wa.me/${this.subscriptionDetails.whatsappNumber}?text=${message}`;
		window.open(whatsappUrl, '_blank');
	}

	formatPrice(price: string): string {
		return `${price} ${this.subscriptionDetails.currency}`;
	}

	getFilteredVodafoneNumbers() {
		return this.shuffledVodafoneNumbers;
	}

	async copyToClipboard(text: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			this.copiedNumber = text; // حفظ الرقم المنسوخ
			console.log('تم نسخ الرقم:', text);
			
			// إخفاء رسالة "تم النسخ" بعد ثانيتين
			setTimeout(() => {
				this.copiedNumber = null;
			}, 2000);
		} catch (err) {
			// طريقة بديلة للنسخ
			this.fallbackCopyTextToClipboard(text);
			this.copiedNumber = text;
			setTimeout(() => {
				this.copiedNumber = null;
			}, 2000);
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

	openImageModal(image: ScheduleImage): void {
		this.activeScheduleImage = image;
		this.isImageModalOpen = true;
		document.body.style.overflow = 'hidden'; // منع التمرير عند فتح الـ modal
	}

	closeImageModal(): void {
		this.isImageModalOpen = false;
		this.activeScheduleImage = null;
		document.body.style.overflow = ''; // استعادة التمرير
	}

	getVideoEmbedUrl(): SafeResourceUrl {
		// https://youtu.be/ZlfNJRv2LJc
		const videoId = 'ZlfNJRv2LJc';
		const url = `https://www.youtube.com/embed/${videoId}`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
