import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { MonthlyContentService } from '../../core/services/monthly-content.service';

interface ScheduleImage {
	group: string;
	src: string;
	alt: string;
	note?: string;
}

interface ReviewFormConfig {
	label: string;
	description: string;
	buttonText: string;
	link: string;
	isClosed: boolean;
	allowOpenWhenClosed?: boolean;
}

@Component({
	selector: 'app-subscription-ab-reviews',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './subscription-ab-reviews.page.html',
	styleUrls: ['./subscription-ab-reviews.page.css']
})
export class SubscriptionAbReviewsPageComponent implements OnInit, OnDestroy {
	copiedNumber: string | null = null;
	isImageModalOpen = false;
	activeScheduleImage: ScheduleImage | null = null;
	isEnrollmentClosed = false;
	enrollmentReopenMessage = 'سيتم فتح الاشتراك مع بداية الشهر القادم بإذن الله.';
	shuffledVodafoneNumbers: { number: string; owner: string }[] = [];
	isVideoLoaded = false;
	closingDays = 0;
	closingHours = 0;
	closingMinutes = 0;
	closingSeconds = 0;
	closingDateLabel = '';

	private closingTimer: ReturnType<typeof setInterval> | null = null;

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

		const loaded = state.subscriptionDetails;
		if (loaded) {
			const legacyForm = loaded.googleForm ?? loaded.googleForms?.groupAB ?? loaded.googleForms?.groupA ?? loaded.googleForms?.groupB;
			this.subscriptionDetails = {
				...this.subscriptionDetails,
				...loaded,
				review: {
					...this.subscriptionDetails.review,
					...(loaded.review ?? {}),
					name: loaded.review?.name ?? this.subscriptionDetails.review.name,
					price: loaded.review?.price ?? loaded.groupB?.price ?? loaded.groupA?.price ?? '800'
				},
				googleForm: {
					...this.subscriptionDetails.googleForm,
					...(legacyForm ?? {})
				},
				vodafoneNumbers: loaded.vodafoneNumbers?.length
					? loaded.vodafoneNumbers
					: this.subscriptionDetails.vodafoneNumbers,
				scheduleImages: loaded.scheduleImages?.length
					? loaded.scheduleImages
					: this.subscriptionDetails.scheduleImages,
				subscriptionWarnings: {
					validity: {
						...this.subscriptionDetails.subscriptionWarnings.validity,
						...(loaded.subscriptionWarnings?.validity ?? {})
					},
					refund: {
						...this.subscriptionDetails.subscriptionWarnings.refund,
						...(loaded.subscriptionWarnings?.refund ?? {})
					}
				}
			};
		}

		this.shuffleVodafoneNumbers();
	}

	subscriptionDetails = {
		month: 'الشهر الأول — أكتوبر',
		review: {
			name: 'اشتراك الشهر الأول',
			price: '800'
		},
		currency: 'ج',
		features: [
			'محاضرات تأسيسية من الصفر',
			'محتوى السبورة (PDF)',
			'حل الواجبات بالتفصيل',
			'اختبارات إلكترونية تقييمية أسبوعياً',
			'متابعة مستمرة طوال الشهر'
		],
		googleForm: {
			label: 'اشتراك الشهر الأول — دفعة 2027',
			description: 'فورم اشتراك شهر أكتوبر',
			buttonText: 'سجل فورم الاشتراك',
			link: 'https://forms.gle/yPCxfeX73FmGg2cn8',
			isClosed: false
		},
		vodafoneNumbers: [
			{ number: '01025326080', owner: 'احمد م**** ا***** ز***' },
			{ number: '01040490779', owner: 'سعد ف** ص*** ا***' },
			{ number: '01040490778', owner: 'احمد ع********* س***' },
			{ number: '01080681865', owner: 'Mona k***** A**' }
		],
		scheduleImages: [],
		requiredInfo: [
			'رقم الموبايل اللي حولت منه',
			'سكرين شوت بالتحويل',
			'وقت وتاريخ التحويل'
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
				title: 'سياسة الاسترداد',
				points: [
					'⚠️ لا يوجد استرداد أو سحب للاشتراك نهائيًا لأي سبب من الأسباب.'
				]
			}
		},
		subtitle: 'أول خطوة في رحلة دفعة 2027 — أكتوبر'
	};

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService,
		private monthlyContent: MonthlyContentService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://www.appmo3adla.com';
			const title = 'اشتراك الشهر الأول - أكتوبر | دفعة 2027';
			const description = 'تفاصيل اشتراك الشهر الأول لشهر أكتوبر وبداية رحلة دفعة 2027.';
			const url = `${siteUrl}/subscription-ab-reviews`;

			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical(url);
		}

		this.shuffleVodafoneNumbers();
		this.listenForVisibilityChange();
		this.updateClosingCountdown();
		this.closingTimer = setInterval(() => this.updateClosingCountdown(), 1000);

		this.monthlyContent
			.loadPageState('subscription-ab-reviews', {
				isEnrollmentClosed: this.isEnrollmentClosed,
				enrollmentReopenMessage: this.enrollmentReopenMessage,
				subscriptionDetails: this.subscriptionDetails
			})
			.subscribe(state => this.applyLoadedState(state));
	}

	ngOnDestroy(): void {
		if (this.closingTimer) {
			clearInterval(this.closingTimer);
			this.closingTimer = null;
		}

		if (typeof window === 'undefined' || typeof document === 'undefined') {
			return;
		}

		document.removeEventListener('visibilitychange', this.handleVisibilityChange);
		window.removeEventListener('focus', this.handleWindowFocus);
		window.removeEventListener('pageshow', this.handleWindowFocus);
	}

	private getNextClosingDate(): Date {
		const now = new Date();
		const closingDate = new Date(now.getFullYear(), now.getMonth(), 10, 22, 0, 0, 0);

		if (now >= closingDate) {
			closingDate.setMonth(closingDate.getMonth() + 1);
		}

		return closingDate;
	}

	private updateClosingCountdown(): void {
		const closingDate = this.getNextClosingDate();
		const remaining = Math.max(0, closingDate.getTime() - Date.now());
		const totalSeconds = Math.floor(remaining / 1000);
		this.closingDateLabel = new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
			day: 'numeric',
			month: 'long',
		}).format(closingDate);

		this.closingDays = Math.floor(totalSeconds / 86400);
		this.closingHours = Math.floor((totalSeconds % 86400) / 3600);
		this.closingMinutes = Math.floor((totalSeconds % 3600) / 60);
		this.closingSeconds = totalSeconds % 60;
	}

	loadVideo(): void {
		this.isVideoLoaded = true;
	}

	getVideoEmbedUrl(): SafeResourceUrl {
		const videoId = 'H2_dh3SsfiI';
		const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	getVideoThumbnail(): string {
		const videoId = 'H2_dh3SsfiI';
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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
		const form = this.getForm();
		const isFormDisabled = this.isEnrollmentClosed || (form.isClosed && !form.allowOpenWhenClosed);
		if (isFormDisabled) {
			return;
		}

		window.open(form.link, '_blank');
	}

	getForm(): ReviewFormConfig {
		return this.subscriptionDetails.googleForm as ReviewFormConfig;
	}

	getPrice(): string {
		return this.subscriptionDetails.review.price;
	}

	getReviewName(): string {
		return this.subscriptionDetails.review.name;
	}

	getSelectedSchedules(): ScheduleImage[] {
		return this.subscriptionDetails.scheduleImages.slice(0, 1);
	}

	onNumberCardClick(number: string): void {
		if (this.isEnrollmentClosed) {
			return;
		}

		void this.copyToClipboard(number);
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

}
