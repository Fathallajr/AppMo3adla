import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { MonthlyContentService } from '../../core/services/monthly-content.service';

interface ScheduleImage {
	groupKey: ReviewGroupKey;
	group: string;
	src: string;
	alt: string;
	note?: string;
}

type ReviewGroupKey = 'groupAB' | 'groupC';

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
	styleUrls: ['../subscription-details/subscription-details.page.css']
})
export class SubscriptionAbReviewsPageComponent implements OnInit, OnDestroy {
	copiedNumber: string | null = null;
	isImageModalOpen = false;
	activeScheduleImage: ScheduleImage | null = null;
	isEnrollmentClosed = false;
	enrollmentReopenMessage = 'سيتم فتح المراجعات مع بداية الشهر القادم بإذن الله.';
	shuffledVodafoneNumbers: { number: string; owner: string }[] = [];
	isWarningExpanded = false;
	isVideoLoaded = false;
	selectedGroup: ReviewGroupKey = 'groupAB';

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
			const legacyForm = loaded.googleForm ?? loaded.googleForms?.groupA ?? loaded.googleForms?.groupB;
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
				groups: {
					groupAB: { ...this.subscriptionDetails.groups.groupAB, ...(loaded.groups?.groupAB ?? {}) },
					groupC: { ...this.subscriptionDetails.groups.groupC, ...(loaded.groups?.groupC ?? {}) }
				},
				googleForms: {
					groupAB: { ...this.subscriptionDetails.googleForms.groupAB, ...(loaded.googleForms?.groupAB ?? {}) },
					groupC: { ...this.subscriptionDetails.googleForms.groupC, ...(loaded.googleForms?.groupC ?? {}) }
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
		month: 'مراجعات شهر أغسطس 2026',
		review: {
			name: 'مراجعات A-B-C',
			price: '800'
		},
		groups: {
			groupAB: { name: 'مراجعات A-B', price: '800' },
			groupC: { name: 'مراجعات C', price: '800' }
		},
		currency: 'ج',
		features: [
			'فيديوهات المراجعة',
			'محتوى السبورة (PDF)',
			'فيديوهات حل الواجبات بالتفصيل',
			'اختبارات إلكترونية تقييمية أسبوعياً',
			'playlist شرح المنهج كاملاً'
		],
		googleForm: {
			label: 'مراجعات A-B',
			description: 'فورم اشتراك مراجعات أغسطس',
			buttonText: 'سجل فورم المراجعة',
			link: 'https://forms.gle/J6CBxzZuFCEz2AmA6',
			isClosed: false
		},
		googleForms: {
			groupAB: {
				label: 'مراجعات A-B', description: 'فورم اشتراك مراجعات A-B', buttonText: 'سجل فورم مراجعات A-B',
				link: 'https://forms.gle/J6CBxzZuFCEz2AmA6', isClosed: false
			},
			groupC: {
				label: 'مراجعات C', description: 'فورم اشتراك مراجعات C', buttonText: 'سجل فورم مراجعات C',
				link: 'https://forms.gle/jwKoocsd4m7yANQW6', isClosed: false
			}
		},
		vodafoneNumbers: [
			{ number: '01025326080', owner: 'احمد م**** ا***** ز***' },
			{ number: '01040490779', owner: 'سعد ف** ص*** ا***' },
			{ number: '01040490778', owner: 'احمد ع********* س***' },
			{ number: '01080681865', owner: 'Mona k***** A**' }
		],
		scheduleImages: [
			{
				groupKey: 'groupAB' as ReviewGroupKey,
				group: 'جدول مراجعات A-B',
				src: '/assets/جداول مراجعات شهر 8/جدول جروب A-B.png',
				alt: 'جدول مراجعات شهر أغسطس - جروب A و B',
				note: '👆 اضغط على الصورة للتكبير'
			},
			{
				groupKey: 'groupC' as ReviewGroupKey,
				group: 'جدول مراجعات C',
				src: '/assets/جداول مراجعات شهر 8/جدول جروب C.png',
				alt: 'جدول مراجعات شهر أغسطس - جروب C',
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
				title: 'سياسة الاسترداد',
				points: [
					'⚠️ لا يوجد استرداد أو سحب للاشتراك نهائيًا لأي سبب من الأسباب.'
				]
			}
		},
		subtitle: 'مراجعات جروبات A و B و C — دفعة 2026'
	};

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService,
		private monthlyContent: MonthlyContentService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
			const title = 'مراجعات A-B-C - ابلكيشن معادلة كلية هندسة';
			const description = 'تفاصيل مراجعات جروبات A وB وC مع فورم وجدول منفصل لكل اختيار.';
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

	openGoogleForm(): void {
		const form = this.getForm();
		const isFormDisabled = this.isEnrollmentClosed || (form.isClosed && !form.allowOpenWhenClosed);
		if (isFormDisabled) {
			return;
		}

		window.open(form.link, '_blank');
	}

	getForm(): ReviewFormConfig {
		return this.subscriptionDetails.googleForms[this.selectedGroup] as ReviewFormConfig;
	}

	getPrice(): string {
		return this.subscriptionDetails.groups[this.selectedGroup].price;
	}

	getReviewName(): string {
		return this.subscriptionDetails.groups[this.selectedGroup].name;
	}

	selectGroup(group: ReviewGroupKey): void {
		this.selectedGroup = group;
	}

	getSelectedSchedules(): ScheduleImage[] {
		return this.subscriptionDetails.scheduleImages.filter(schedule => schedule.groupKey === this.selectedGroup);
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
		const videoId = 'j66ECxbdYHs';
		const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	getVideoThumbnail(): string {
		const videoId = 'j66ECxbdYHs';
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	}
}
