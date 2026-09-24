import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CanonicalService } from '../../core/canonical.service';
import { SeoService } from '../../core/seo.service';
import { StyledSelectComponent } from '../../shared/components/styled-select/styled-select.component';

const PHONE_PATTERN = /^01\d{9}$/;
const WHEEL_SPIN_DURATION_MS = 7500;

function normalizePhone(value: string): string {
	return value
		.replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - '٠'.charCodeAt(0)))
		.replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - '۰'.charCodeAt(0)))
		.replace(/\D/g, '');
}

@Component({
	selector: 'app-batch-2027',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterLink, StyledSelectComponent],
	templateUrl: './batch-2027.page.html',
	styleUrls: ['./batch-2027.page.css']
})
export class Batch2027PageComponent implements OnInit, OnDestroy {
	showHeroSubscriptionChoices = false;
	readonly giftOptions = [
		{ id: 'cash-50', label: '50 جنيه', value: '50 جنيه', detail: 'هدية مالية', available: true, emoji: '50 جنيه', weight: 30 },
		{ id: 'lucky-chance', label: 'حظ سعيد', value: 'فرصة', detail: 'محاولة إضافية', available: false, emoji: 'حظ سعيد', weight: 60 },
		{ id: 'discount-10', label: 'خصم 10%', value: '10%', detail: 'خصم على أول شهر', available: true, emoji: 'خصم 10%', weight: 10 },
		{ id: 'cash-200', label: '200 جنيه', value: '200 جنيه', detail: 'هدية مالية', available: true, emoji: '200 جنيه', weight: 30 },
		{ id: 'lucky-empty-1', label: 'حظ سعيد', value: 'فارغ', detail: 'حظ سعيد', available: false, emoji: 'حظ سعيد', weight: 60 },
		{ id: 'discount-15', label: 'خصم 15%', value: '15%', detail: 'خصم على أول شهر', available: true, emoji: 'خصم 15%', weight: 10 },
		{ id: 'cash-100', label: '100 جنيه', value: '100 جنيه', detail: 'هدية مالية', available: true, emoji: '100 جنيه', weight: 30 },
		{ id: 'lucky-empty-2', label: 'حظ سعيد', value: 'فارغ', detail: 'حظ سعيد', available: false, emoji: 'حظ سعيد', weight: 60 },
		{ id: 'discount-20', label: 'خصم 20%', value: '20%', detail: 'خصم على أول شهر', available: true, emoji: 'خصم 20%', weight: 10 },
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
	wheelToken = '';
	wheelSessionId = '';
	wheelClaim = { name: '', whatsapp: '', program: '' };
	programOptions = [
		'معادلة هندسة عربي',
		'معادلة حاسبات عربي',
		'معادلة هندسة إنجليزي',
		'معادلة حاسبات إنجليزي'
	];
	wheelClaimError = '';
	wheelClaimSubmitting = false;
	wheelClaimComplete = false;
	wheelUsed = false;
	wheelAlreadyUsed = false;
	private giftRevealTimer?: ReturnType<typeof setTimeout>;
	private wheelTimer?: number;

	toggleHeroSubscriptionChoices(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.showHeroSubscriptionChoices = !this.showHeroSubscriptionChoices;
	}

	closeHeroSubscriptionChoices(): void {
		this.showHeroSubscriptionChoices = false;
	}

	lead = {
		name: '', whatsapp: '', school: '', studentType: '', program: '', source: ''
	};
	offerStudentTypeOptions = ['المعاهد الفنية', 'مدارس الثانوية الصناعية نظام 3 سنوات', 'مدارس الثانوية الصناعية نظام 5 سنوات', 'مدارس تكنولوجيا تطبيقية نظام 3 سنوات', 'مدارس تكنولوجيا تطبيقية نظام 5 سنوات'];
	offerSourceOptions = ['فيسبوك', 'إنستجرام', 'تيك توك', 'يوتيوب', 'ترشيح من صديق', 'أخرى'];
	offerContactConsent = false;
	offerSubmitting = false;
	offerSubmitted = false;
	offerError = '';
	private readonly launchOfferEndpoint = '/api/launch-offer';
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
			if (this.wheelUsed || this.wheelLocked) this.wheelClaimError = 'اللفة خلصت. شكرًا لمشاركتك.';
			return;
		}
		this.spinGiftWheel();
	}

	private async spinGiftWheel(): Promise<void> {
		if (this.giftWheelSpinning) return;
		this.giftWheelSpinning = true;
		this.wheelResult = null;
		this.selectedGift = '';
		this.wheelAlreadyUsed = false;
		this.wheelAttempts += 1;
		try {
		const response = await fetch('/api/wheel/spin', {
			method: 'POST', headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ sessionId: this.wheelSessionId })
		});
		const payload = await response.json();
		if (!response.ok) {
			this.wheelAttempts -= 1;
			this.giftWheelSpinning = false;
			this.wheelClaimError = payload.message || 'تعذر تشغيل العجلة. حاول تاني.';
			return;
		}
		this.wheelToken = payload.token;
		const resultIndex = this.giftOptions.findIndex(gift => gift.id === payload.gift?.id);
		if (resultIndex < 0) {
			this.wheelAttempts -= 1;
			this.giftWheelSpinning = false;
			this.wheelClaimError = 'تعذر قراءة نتيجة العجلة. حاول تاني.';
			return;
		}
		this.wheelRotation += 1440 + (360 - (resultIndex * 40 + 20));
		this.wheelTimer = window.setTimeout(() => {
			this.wheelResult = this.giftOptions[resultIndex];
			this.selectedGift = '';
			this.wheelUsed = !this.wheelResult.available;
			this.wheelLocked = true;
			this.giftWheelSpinning = false;
		}, WHEEL_SPIN_DURATION_MS);
		} catch {
			this.wheelAttempts -= 1;
			this.giftWheelSpinning = false;
			this.wheelClaimError = 'تعذر تشغيل العجلة. حاول تاني.';
		}
	}

	updateWheelPhone(value: string): void {
		this.wheelClaim.whatsapp = normalizePhone(value).slice(0, 11);
		this.wheelClaimError = '';
	}

	get wheelPhoneLength(): number {
		return this.wheelClaim.whatsapp.length;
	}

	async submitWheelClaim(): Promise<void> {
		if (this.wheelClaimSubmitting) return;
		this.wheelClaimError = '';
		this.wheelAlreadyUsed = false;
		const name = this.wheelClaim.name.trim();
		const program = this.wheelClaim.program.trim();
		const whatsapp = normalizePhone(this.wheelClaim.whatsapp);
		this.wheelClaim.whatsapp = whatsapp;
		if (name.length < 2) {
			this.wheelClaimError = 'اكتب اسمك الأول والثاني على الأقل.';
			return;
		}
		if (!this.programOptions.includes(program)) {
			this.wheelClaimError = 'اختار نوع المعادلة الأول.';
			return;
		}
		if (!PHONE_PATTERN.test(whatsapp)) {
			this.wheelClaimError = `اكتب رقم واتساب مصري صحيح من 11 رقم يبدأ بـ 01. المكتوب حاليًا ${whatsapp.length} رقم.`;
			return;
		}
		if (!this.wheelToken || !this.wheelResult?.available) {
			this.wheelClaimError = 'لف العجلة أولًا للحصول على هدية.';
			return;
		}

		this.wheelClaimSubmitting = true;
		const controller = new AbortController();
		const timeout = window.setTimeout(() => controller.abort(), 35000);
		try {
			const response = await fetch('/api/wheel/claim', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, whatsapp, program, wheelToken: this.wheelToken }),
				signal: controller.signal
			});
			const payload = await response.json() as { success?: boolean; alreadyRegistered?: boolean; message?: string };
			if (payload.alreadyRegistered) {
				this.wheelClaimError = payload.message || 'تم استلام هدية العجلة بهذا الرقم من قبل.';
				this.wheelAlreadyUsed = true;
				this.wheelUsed = true;
				return;
			}
			if (!response.ok || !payload.success) throw new Error(payload.message || 'تعذر تسجيل هدية العجلة.');
			this.wheelClaimComplete = true;
			this.selectedGift = this.wheelResult.label;
			this.wheelUsed = true;
		} catch (error) {
			this.wheelClaimError = error instanceof DOMException && error.name === 'AbortError'
				? 'خدمة تسجيل العجلة اتأخرت. من فضلك ما تضغطش مرة تانية.'
				: error instanceof Error ? error.message : 'تعذر تسجيل هدية العجلة.';
		} finally {
			window.clearTimeout(timeout);
			this.wheelClaimSubmitting = false;
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
			`الاسم: ${this.wheelClaim.name.trim() || 'غير مسجل'}`,
			`رقم الواتساب: ${this.wheelClaim.whatsapp || 'غير مسجل'}`,
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
		this.wheelSessionId = sessionStorage.getItem('batch-2027-wheel-session') || crypto.randomUUID();
		sessionStorage.setItem('batch-2027-wheel-session', this.wheelSessionId);

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
		const controller = new AbortController();
		const timeout = window.setTimeout(() => controller.abort(), 70000);
		const response = await fetch(this.launchOfferEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
			body: new URLSearchParams(data).toString(),
			signal: controller.signal
		});
		try {
			const responseText = await response.text();
			let payload: { success?: boolean; alreadyRegistered?: boolean; message?: string };
			try {
				payload = JSON.parse(responseText);
			} catch {
				throw new Error('invalid-response');
			}
			if (!response.ok) throw new Error(payload.message || `request-failed-${response.status}`);
			return payload;
		} finally {
			window.clearTimeout(timeout);
		}
	}

	async submitLaunchOffer(): Promise<void> {
		if (this.offerSubmitting) return;
		if (!this.lead.name.trim() || !this.lead.whatsapp.trim() || !this.lead.school.trim() || !this.lead.studentType || !this.lead.program || !this.lead.source) return;
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
		const lead = { name: this.lead.name.trim(), whatsapp: this.lead.whatsapp.trim(), school: this.lead.school.trim(), studentType: this.lead.studentType, program: this.lead.program, source: this.lead.source, consent: this.offerContactConsent ? 'نعم' : 'لا' };
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
