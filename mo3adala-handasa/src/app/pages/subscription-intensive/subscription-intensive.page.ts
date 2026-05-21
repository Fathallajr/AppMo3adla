import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { MonthlyContentService } from '../../core/services/monthly-content.service';

interface ScheduleImage {
	group: string;
	src: string;
	alt: string;
	note?: string;
}

@Component({
	selector: 'app-subscription-intensive',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './subscription-intensive.page.html',
	styleUrls: ['./subscription-intensive.page.css']
})
export class SubscriptionIntensivePageComponent implements OnInit, OnDestroy {
	copiedNumber: string | null = null;
	isImageModalOpen = false;
	activeScheduleImage: ScheduleImage | null = null;
	isEnrollmentClosed = false;
	isWarningExpanded = false;
	isVideoLoaded = false;
	selectedPlan: 'installments' | 'full' | null = null;
	shuffledVodafoneNumbers: { number: string; owner: string }[] = [];

	private handleVisibilityChange = () => {
		if (typeof document === 'undefined') return;
		if (document.visibilityState === 'visible') this.shuffleVodafoneNumbers();
	};

	private handleWindowFocus = () => {
		this.shuffleVodafoneNumbers();
	};

	private applyLoadedState(state: any): void {
		if (!state) {
			return;
		}

		this.isEnrollmentClosed = state.isEnrollmentClosed ?? this.isEnrollmentClosed;
		this.subscriptionDetails = state.subscriptionDetails ?? this.subscriptionDetails;
		this.shuffleVodafoneNumbers();
	}

	subscriptionDetails = {
		title: 'الاشتراك المكثف',
		subtitle: 'كورس مكثف لكلية الهندسة - دفعة 2026',
		googleFormLink: 'https://forms.gle/CA4CshRiJgR6zUgH9',
		paymentPlans: {
			installments: {
				label: 'الدفع على قسطين',
				installment1: { amount: '2200', label: 'القسط الأول', note: 'وقت الاشتراك' },
				installment2: { amount: '1600', label: 'القسط الثاني', note: 'ابتداءً من 7 أغسطس' },
				total: '3800'
			},
			full: {
				label: 'الدفع كاملًا',
				amount: '3500',
				originalAmount: '3800',
				saving: '300'
			}
		},
		currency: 'ج',
		vodafoneNumbers: [
			{ number: '01080594862', owner: 'Ahmed A*****' },
			{ number: '01001793817', owner: 'Saad F** S*' },
			{ number: '01021069340', owner: 'Mona k***** A**' },
			{ number: '01021201970', owner: 'Mona k***** A**' },
		],
		requiredInfo: [
			'رقم الموبايل اللي حولت منه 📲',
			'سكرين شوت بالتحويل 🖼',
			'وقت وتاريخ التحويل ⏳'
		],
		whatsappNumber: '201554843745',
		subscriptionWarnings: {
			refund: {
				title: 'سياسة الاسترداد:',
				points: [
					'لا يوجد استرداد أو سحب للاشتراك نهائيًا لأي سبب من الأسباب'
				]
			},
			validity: {
				title: 'مدة صلاحية الاشتراك:',
				points: [
					'المنصة شغالة لغاية اخر القسط الاول فقط',
					'مع إنتهاء القسط الاول المحتوى بيقفل تلقائي',
					'عند التجديد بيتفتح لك كل المحتوى من الأول',
					'في خطة الدفع الكامل المنصة بتفضل شغالة لحد ليالي الامتحان'
				]
			}
		}
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
			const title = 'تفاصيل الاشتراك المكثف - ابلكيشن معادلة كلية هندسة';
			const description = 'تعرف على تفاصيل الاشتراك المكثف في أبلكيشن معادلة كلية هندسة والمميزات المتاحة';
			const url = `${siteUrl}/subscription-intensive`;

			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical(url);
		}

		this.shuffleVodafoneNumbers();
		this.listenForVisibilityChange();

		this.monthlyContent
			.loadPageState('subscription-intensive', {
				isEnrollmentClosed: this.isEnrollmentClosed,
				subscriptionDetails: this.subscriptionDetails
			})
			.subscribe(state => this.applyLoadedState(state));
	}

	ngOnDestroy(): void {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;
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
		if (typeof window === 'undefined' || typeof document === 'undefined') return;
		document.addEventListener('visibilitychange', this.handleVisibilityChange);
		window.addEventListener('focus', this.handleWindowFocus);
		window.addEventListener('pageshow', this.handleWindowFocus);
	}

	selectPlan(plan: 'installments' | 'full'): void {
		this.selectedPlan = plan;
		if (typeof document !== 'undefined') {
			setTimeout(() => {
				const el = document.getElementById('step-payment');
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100);
		}
	}

	getSelectedAmount(): string | null {
		if (!this.selectedPlan) return null;
		if (this.selectedPlan === 'full') {
			return this.subscriptionDetails.paymentPlans.full.amount;
		}
		return this.subscriptionDetails.paymentPlans.installments.installment1.amount;
	}

	getSelectedPlanLabel(): string | null {
		if (!this.selectedPlan) return null;
		return this.selectedPlan === 'full'
			? this.subscriptionDetails.paymentPlans.full.label
			: this.subscriptionDetails.paymentPlans.installments.label;
	}

	toggleWarning(): void {
		this.isWarningExpanded = !this.isWarningExpanded;
	}

	openGoogleForm(): void {
		if (this.isEnrollmentClosed) return;
		window.open(this.subscriptionDetails.googleFormLink, '_blank');
	}

	onNumberCardClick(number: string): void {
		if (this.isEnrollmentClosed) return;
		void this.copyToClipboard(number);
	}

	openWhatsApp(): void {
		const message = encodeURIComponent('السلام عليكم، أريد إرسال سكرين شوت التحويل للاشتراك في الكورس المكثف');
		const whatsappUrl = `https://wa.me/${this.subscriptionDetails.whatsappNumber}?text=${message}`;
		window.open(whatsappUrl, '_blank');
	}

	getFilteredVodafoneNumbers() {
		return this.shuffledVodafoneNumbers;
	}

	async copyToClipboard(text: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(text);
			this.copiedNumber = text;
			setTimeout(() => { this.copiedNumber = null; }, 2000);
		} catch (err) {
			this.fallbackCopyTextToClipboard(text);
			this.copiedNumber = text;
			setTimeout(() => { this.copiedNumber = null; }, 2000);
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
		} catch (err) {
			console.error('فشل في نسخ الرقم:', err);
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
		const videoId = 'Viy_dZ-Fn8w';
		const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	getVideoThumbnail(): string {
		const videoId = 'Viy_dZ-Fn8w';
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	}
}
