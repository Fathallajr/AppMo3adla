import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { MonthlyContentService } from '../../core/services/monthly-content.service';

type GroupKey = 'groupC';

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
	copiedNumber: string | null = null;
	isImageModalOpen = false;
	activeScheduleImage: ScheduleImage | null = null;
	isEnrollmentClosed = true;
	enrollmentReopenMessage = 'سيتم فتح الاشتراك للمشتركين الجدد مع بداية الشهر القادم بإذن الله.';
	shuffledVodafoneNumbers: { number: string; owner: string }[] = [];
	readonly selectedGroup: GroupKey = 'groupC';
	isWarningExpanded = false;
	isVideoLoaded = false;

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

	private applyLoadedState(state: any): void {
		if (!state) {
			return;
		}

		this.isEnrollmentClosed = state.isEnrollmentClosed ?? this.isEnrollmentClosed;
		this.enrollmentReopenMessage = state.enrollmentReopenMessage ?? this.enrollmentReopenMessage;
		this.subscriptionDetails = state.subscriptionDetails ?? this.subscriptionDetails;
		this.shuffleVodafoneNumbers();
	}

	subscriptionDetails = {
		month: ' شهر مايو 2026',
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
			groupC: {
				key: 'groupC',
				label: 'جروب C',
				description: 'للمشتركين الجدد جروب C',
				buttonText: 'سجل فورم جروب C',
				link: 'https://forms.gle/mXzLb7Bnff43GUxK8',
				isClosed: true
			}
		},
		vodafoneNumbers: [
			{ number: '01040490778', owner: 'احمد ع********* س***' },
			{ number: '01040490779', owner: 'سعد ف** ص*** ا***' },
			{ number: '01025326080', owner: 'احمد م**** ا***** ز***' },
			{ number: '01080681865', owner: 'Mona k***** A**' },
		],
		scheduleImages: [
			{
				group: 'جدول جروب C',
				src: 'assets/جدول C.jpeg',
				alt: 'جدول محتوى شهر مايو - جروب C',
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
		subtitle: ' الشهر الثامن لدفعة 2026 — جروب C '
	};

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService,
		private sanitizer: DomSanitizer,
		private monthlyContent: MonthlyContentService
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
			const title = 'تفاصيل اشتراك جروب C - ابلكيشن معادلة كلية هندسة';
			const description = 'تعرف على تفاصيل اشتراك جروب C في أبلكيشن معادلة كلية هندسة والمميزات والجدول والفورم';
			const url = `${siteUrl}/subscription-details`;

			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical(url);
		}

		this.shuffleVodafoneNumbers();
		this.listenForVisibilityChange();

		this.monthlyContent
			.loadPageState('subscription-details', {
				isEnrollmentClosed: this.isEnrollmentClosed,
				enrollmentReopenMessage: this.enrollmentReopenMessage,
				subscriptionDetails: this.subscriptionDetails
			})
			.subscribe(state => this.applyLoadedState(state));
	}

	ngOnDestroy(): void {
		if (typeof window === 'undefined' || typeof document === 'undefined') {
			return;
		}

		document.removeEventListener('visibilitychange', this.handleVisibilityChange);
		window.removeEventListener('focus', this.handleWindowFocus);
		window.removeEventListener('pageshow', this.handleWindowFocus);
	}

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

	openGoogleForm(): void {
		const formConfig = this.subscriptionDetails.googleForms.groupC as GroupFormConfig;
		if (!formConfig) {
			return;
		}

		const isFormDisabled = this.isEnrollmentClosed || (formConfig.isClosed && !formConfig.allowOpenWhenClosed);
		if (isFormDisabled) {
			return;
		}

		window.open(formConfig.link, '_blank');
	}

	getSelectedForm(): GroupFormConfig {
		return this.subscriptionDetails.googleForms.groupC as GroupFormConfig;
	}

	getSelectedPrice(): string {
		return this.subscriptionDetails.groupC.price;
	}

	getSelectedGroupName(): string {
		return this.subscriptionDetails.groupC.name;
	}

	toggleWarning(): void {
		this.isWarningExpanded = !this.isWarningExpanded;
	}

	onNumberCardClick(number: string): void {
		if (this.isEnrollmentClosed) {
			return;
		}

		void this.copyToClipboard(number);
	}

	openWhatsApp(): void {
		const message = encodeURIComponent('السلام عليكم، أريد إرسال سكرين شوت التحويل للاشتراك في جروب C');
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
			this.copiedNumber = text;
			setTimeout(() => {
				this.copiedNumber = null;
			}, 2000);
		} catch {
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
		} catch {
			// ignore
		}

		document.body.removeChild(textArea);
	}

	openImageModal(image: ScheduleImage): void {
		this.activeScheduleImage = image;
		this.isImageModalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	closeImageModal(): void {
		this.isImageModalOpen = false;
		this.activeScheduleImage = null;
		document.body.style.overflow = '';
	}

	loadVideo(): void {
		this.isVideoLoaded = true;
	}

	getVideoEmbedUrl(): SafeResourceUrl {
		const videoId = 'kABsJAL3Si8';
		const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	getVideoThumbnail(): string {
		const videoId = 'kABsJAL3Si8';
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	}
}
