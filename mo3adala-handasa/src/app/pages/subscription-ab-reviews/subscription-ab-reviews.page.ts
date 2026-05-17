import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { MonthlyContentService } from '../../core/services/monthly-content.service';

type GroupKey = 'groupA' | 'groupB';

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
	selector: 'app-subscription-ab-reviews',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './subscription-ab-reviews.page.html',
	styleUrls: ['../subscription-details/subscription-details.page.css']
})
export class SubscriptionAbReviewsPageComponent implements OnInit, OnDestroy {
	copiedNumber: string | null = null;
	isImageModalOpen = false;
	activeScheduleImage: ScheduleImage | null = null;
	isEnrollmentClosed = true;
	enrollmentReopenMessage = 'سيتم فتح المراجعات مع بداية الشهر القادم بإذن الله.';
	shuffledVodafoneNumbers: { number: string; owner: string }[] = [];
	selectedGroup: GroupKey | null = null;
	isWarningExpanded = false;

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
		month: 'مراجعات شهر مايو 2026',
		groupA: {
			name: 'جروب A',
			price: '700',
		},
		groupB: {
			name: 'جروب B',
			price: '800',
		},
		currency: 'ج',
		features: [
			'مراجعات شاملة لمواد جروب A و B',
			'فيديوهات حل ومراجعة',
			'ملازم وملفات PDF للتحميل',
			'امتحانات إلكترونية تفاعلية',
			'دعم فني على مدار الساعة'
		],
		googleForms: {
			groupA: {
				key: 'groupA',
				label: 'جروب A',
				description: 'فورم مراجعة جروب A',
				buttonText: 'سجل فورم جروب A',
				link: 'https://forms.gle/DXsVyF3kPvWXwkHG8',
				isClosed: false
			},
			groupB: {
				key: 'groupB',
				label: 'جروب B',
				description: 'فورم مراجعة جروب B',
				buttonText: 'سجل فورم جروب B',
				link: 'https://forms.gle/NDYjPGQug76Damm6A',
				isClosed: false
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
				group: 'جدول جروب A',
				src: '/assets/جروب A.png',
				alt: 'جدول مراجعة شهر مايو - جروب A',
				note: '👆 اضغط على الصورة للتكبير'
			},
			{
				group: 'جدول جروب B',
				src: '/assets/جروب B.png',
				alt: 'جدول مراجعة شهر مايو - جروب B',
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
				title: 'مدة صلاحية المراجعة:',
				points: [
					'الكود شغال لغاية آخر الشهر فقط',
					'مع انتهاء الشهر بيقفل المحتوى تلقائياً'
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
		subtitle: 'مراجعات جروب A و B — دفعة 2026'
	};

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService,
		private monthlyContent: MonthlyContentService
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
			const title = 'مراجعات A-B - ابلكيشن معادلة كلية هندسة';
			const description = 'تفاصيل مراجعات جروب A و B والفورمات والجداول والدفع';
			const url = `${siteUrl}/subscription-ab-reviews`;

			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical(url);
		}

		this.shuffleVodafoneNumbers();
		this.listenForVisibilityChange();

		this.monthlyContent
			.loadPageState('subscription-ab-reviews', {
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

	openGoogleForm(groupKey: GroupKey): void {
		const formConfig = this.subscriptionDetails.googleForms[groupKey] as GroupFormConfig;
		if (!formConfig) {
			return;
		}

		const isFormDisabled = this.isEnrollmentClosed || (formConfig.isClosed && !formConfig.allowOpenWhenClosed);
		if (isFormDisabled) {
			return;
		}

		window.open(formConfig.link, '_blank');
	}

	selectGroup(key: GroupKey): void {
		this.selectedGroup = key;
		if (typeof document !== 'undefined') {
			setTimeout(() => {
				const el = document.getElementById('step-payment');
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100);
		}
	}

	toggleWarning(): void {
		this.isWarningExpanded = !this.isWarningExpanded;
	}

	getSelectedForm(): GroupFormConfig | null {
		if (!this.selectedGroup) return null;
		return this.subscriptionDetails.googleForms[this.selectedGroup] as GroupFormConfig;
	}

	getSelectedPrice(): string | null {
		if (!this.selectedGroup) return null;
		return this.subscriptionDetails[this.selectedGroup].price;
	}

	getSelectedGroupName(): string | null {
		if (!this.selectedGroup) return null;
		return this.subscriptionDetails[this.selectedGroup].name;
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
