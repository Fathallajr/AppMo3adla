import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CanonicalService } from '../../core/canonical.service';
import { SeoService } from '../../core/seo.service';

const PHONE_PATTERN = /^01\d{9}$/;
const EXTRA_ATTEMPT_GIFT_ID = 'lucky-chance';
const WHEEL_SPIN_DURATION_MS = 7500;

@Component({
	selector: 'app-batch-2027',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterLink],
	templateUrl: './batch-2027.page.html',
	styleUrls: ['./batch-2027.page.css']
})
export class Batch2027PageComponent implements OnInit, OnDestroy {
	readonly giftOptions = [
		{ id: 'discount', label: 'خصم 10% على أول شهر', value: '10%', detail: 'خصم على أول شهر', available: true, emoji: 'خصم 10%', weight: 18 },
		{ id: 'discount-5', label: 'خصم 5% على أول شهر', value: '5%', detail: 'خصم على أول شهر', available: true, emoji: 'خصم 5%', weight: 8 },
		{ id: 'shipping', label: 'شحن الكتاب مجاناً', value: 'مجاناً', detail: 'شحن الكتاب', available: true, emoji: 'شحن مجاني', weight: 15 },
		{ id: 'cash-gift', label: 'هدية مالية', value: 'مالية', detail: 'هدية مالية', available: true, emoji: 'هدية مالية', weight: 10 },
		{ id: 'discount-25', label: 'خصم 25% على أول شهر', value: '25%', detail: 'خصم على أول شهر', available: true, emoji: 'خصم 25%', weight: 4 },
		{ id: 'content', label: 'محتوى مجاني حصري', value: 'محتوى', detail: 'محتوى حصري', available: true, emoji: 'محتوى مجاني', weight: 18 },
		{ id: 'lucky-chance', label: 'حظ سعيد', value: 'فرصة', detail: 'محاولة إضافية', available: false, emoji: 'حظ سعيد', weight: 12 },
		{ id: 'empty-three', label: 'حظ سعيد', value: 'فارغ', detail: 'حظ سعيد', available: false, emoji: 'حظ سعيد', weight: 8 },
		{ id: 'free-month', label: 'أول شهر مجاناً', value: 'مجاناً', detail: 'أول شهر', available: true, emoji: 'شهر مجاني', weight: 2 }
	];
	giftAvailable = true;
	showGiftResult = false;
	giftOpening = false;
	giftRewardsVisible = false;
	selectedGift = '';
	openedGift = '';
	giftWheelSpinning = false;
	wheelRotation = 0;
	wheelAttempts = 0;
	wheelLocked = false;
	wheelResult: (typeof this.giftOptions)[number] | null = null;
	showWheelEntry = false;
	wheelEntryName = '';
	wheelEntryPhone = '';
	wheelEntryError = '';
	wheelChecking = false;
	wheelVerified = false;
	wheelUsed = false;
	private giftRevealTimer?: ReturnType<typeof setTimeout>;
	private wheelTimer?: number;

	lead = {
		name: '', whatsapp: '', school: '', studentType: '', source: ''
	};
	offerStudentTypeOptions = ['المعاهد الفنية', 'مدارس الثانوية الصناعية نظام 3 سنوات', 'مدارس الثانوية الصناعية نظام 5 سنوات', 'مدارس تكنولوجيا تطبيقية نظام 3 سنوات', 'مدارس تكنولوجيا تطبيقية نظام 5 سنوات'];
	offerSourceOptions = ['فيسبوك', 'إنستجرام', 'تيك توك', 'يوتيوب', 'ترشيح من صديق', 'أخرى'];
	offerContactConsent = false;
	offerSubmitting = false;
	offerSubmitted = false;
	offerError = '';
	private readonly launchOfferEndpoint = 'https://script.google.com/macros/s/AKfycbzOMDZcgaUgRacnKnqgngxO_97N5iUU9AVoH1bA5HHEFg0LKS3Lju8ku6yl0nYgrLdQ/exec';
	private readonly giftWhatsAppNumber = '201080681865';

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService
	) {}

	openGiftBox(): void {
		this.showGiftResult = true;
		this.giftOpening = false;
		this.giftRewardsVisible = this.giftAvailable;
		this.selectedGift = '';
		this.openedGift = '';
		if (this.giftRevealTimer) clearTimeout(this.giftRevealTimer);
	}

	startGiftWheel(): void {
		if (this.giftWheelSpinning || this.wheelUsed || this.wheelLocked) {
			if (this.wheelUsed || this.wheelLocked) this.wheelEntryError = 'اللفة خلصت. لو ظهرت لك «حظ سعيد» تقدر تجرب مرة إضافية.';
			return;
		}
		this.spinGiftWheel();
	}

	private spinGiftWheel(): void {
		if (this.giftWheelSpinning) return;
		this.giftWheelSpinning = true;
		this.wheelResult = null;
		this.selectedGift = '';
		this.wheelAttempts += 1;
		const totalWeight = this.giftOptions.reduce((total, gift) => total + gift.weight, 0);
		let pick = Math.random() * totalWeight;
		const resultIndex = this.giftOptions.findIndex(gift => (pick -= gift.weight) < 0);
		this.wheelRotation += 1440 + (360 - (resultIndex * 40 + 20));
		this.wheelTimer = window.setTimeout(() => {
			this.wheelResult = this.giftOptions[resultIndex];
			this.selectedGift = '';
			const hasExtraAttempt = this.wheelResult.id === EXTRA_ATTEMPT_GIFT_ID && this.wheelAttempts < 2;
			this.wheelUsed = !this.wheelResult.available && !hasExtraAttempt;
			this.wheelLocked = this.wheelAttempts >= 2 || !hasExtraAttempt;
			this.giftWheelSpinning = false;
		}, WHEEL_SPIN_DURATION_MS);
	}

	isExtraAttemptResult(gift: (typeof this.giftOptions)[number] | null): boolean {
		return gift?.id === EXTRA_ATTEMPT_GIFT_ID;
	}

	async verifyWheelEntry(): Promise<void> {
		this.wheelEntryError = '';
		if (!this.wheelEntryName.trim() || !PHONE_PATTERN.test(this.wheelEntryPhone.trim())) {
			this.wheelEntryError = 'اكتب اسمك ورقم واتساب صحيح يبدأ بـ 01 ويتكون من 11 رقم.';
			return;
		}
		if (this.wheelChecking) return;
		this.wheelChecking = true;
		try {
			const wonGift = this.wheelResult?.label || '';
			const payload = await this.postLead({ name: this.wheelEntryName.trim(), whatsapp: this.wheelEntryPhone.trim(), school: 'عجلة حظ دفعة 2027', studentType: 'دفعة 2027', source: 'عجلة الحظ', discount: wonGift, gift: wonGift, reward: wonGift, consent: 'نعم' });
			if (payload.alreadyRegistered) {
				this.wheelEntryError = 'أنت استفدت من هديتك قبل كده.';
				this.wheelUsed = true;
				return;
			}
			if (!payload.success) throw new Error(payload.message || 'request-failed');
			this.wheelVerified = true;
			this.showWheelEntry = false;
			this.selectedGift = this.wheelResult?.label || '';
			this.wheelUsed = true;
		} catch {
			this.wheelEntryError = 'حصلت مشكلة في التحقق. حاول تاني من فضلك.';
		} finally {
			this.wheelChecking = false;
		}
	}


	closeGiftResult(): void {
		if (this.wheelTimer) clearTimeout(this.wheelTimer);
		this.showGiftResult = false;
		this.giftOpening = false;
		this.giftRewardsVisible = false;
		this.openedGift = '';
		this.giftWheelSpinning = false;
		this.wheelResult = null;
		if (this.giftRevealTimer) clearTimeout(this.giftRevealTimer);
	}

	openSmallGift(gift: (typeof this.giftOptions)[number]): void {
		this.openedGift = gift.id;
		this.selectedGift = gift.available ? gift.label : '';
	}

	claimGiftOnWhatsApp(): void {
		this.openGiftWhatsApp();
	}

	private openGiftWhatsApp(): void {
		const message = [
			'السلام عليكم، عايز أستلم هدية دفعة 2027.',
			`الاسم: ${this.wheelEntryName.trim() || 'غير مسجل'}`,
			`رقم الواتساب: ${this.wheelEntryPhone.trim() || 'غير مسجل'}`,
			`الخصم/الهدية: ${this.selectedGift || 'خصم 10% وشحن الكتاب مجاناً'}`
		].join('\n');
		const whatsappUrl = `https://wa.me/${this.giftWhatsAppNumber}?text=${encodeURIComponent(message)}`;
		const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
		if (!whatsappWindow) window.location.href = whatsappUrl;
	}

	ngOnDestroy(): void {
		if (this.giftRevealTimer) clearTimeout(this.giftRevealTimer);
		if (this.wheelTimer) clearTimeout(this.wheelTimer);
	}

	ngOnInit(): void {
		if (typeof window === 'undefined') return;

		const siteUrl = (window as any)['NG_SITE_URL'] || 'https://www.appmo3adla.com';
		const title = 'دفعة 2027 | ابدأ صح مع أبلكيشن معادلة كلية هندسة';
		const description = 'انضم لدفعة 2027 واحصل على محتوى مجاني، هدايا وخصومات وخطة واضحة تساعدك تبدأ طريق معادلة كلية الهندسة.';
		const url = `${siteUrl}/batch-2027`;

		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical(url);
	}

	private async postLead(data: Record<string, string>): Promise<{ success?: boolean; alreadyRegistered?: boolean; message?: string }> {
		const response = await fetch(this.launchOfferEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
			body: new URLSearchParams(data).toString()
		});
		if (!response.ok) throw new Error(`request-failed-${response.status}`);

		const responseText = await response.text();
		try {
			return JSON.parse(responseText);
		} catch {
			throw new Error('invalid-response');
		}
	}

	async submitLaunchOffer(): Promise<void> {
		if (this.offerSubmitting) return;
		if (!this.lead.name.trim() || !this.lead.whatsapp.trim() || !this.lead.school.trim() || !this.lead.studentType || !this.lead.source) return;
		if (!this.offerContactConsent) {
			this.offerError = 'لازم توافق على التواصل قبل إرسال البيانات.';
			return;
		}
		if (!PHONE_PATTERN.test(this.lead.whatsapp.trim())) {
			this.offerError = 'اكتب رقم واتساب صحيح يبدأ بـ 01 ويتكون من 11 رقم.';
			return;
		}
		this.offerSubmitting = true;
		this.offerError = '';
		const lead = { name: this.lead.name.trim(), whatsapp: this.lead.whatsapp.trim(), school: this.lead.school.trim(), studentType: this.lead.studentType, source: this.lead.source, consent: this.offerContactConsent ? 'نعم' : 'لا' };
		try {
			const payload = await this.postLead(lead);
			if (payload.alreadyRegistered) {
				this.offerError = 'رقم الواتساب ده مسجل بالفعل.';
				return;
			}
			if (!payload.success) throw new Error(payload.message || 'request-failed');
			this.offerSubmitted = true;
			if (typeof window !== 'undefined') localStorage.setItem('launch-offer-lead', JSON.stringify({ ...lead, createdAt: new Date().toISOString() }));
		} catch {
			this.offerError = 'حصلت مشكلة بسيطة في الاتصال. حاول تاني من فضلك.';
		} finally {
			this.offerSubmitting = false;
		}
	}
}
