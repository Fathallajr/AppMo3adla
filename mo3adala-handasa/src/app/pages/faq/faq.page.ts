import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { expandCollapse } from '../../shared/animations';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
	selector: 'app-faq-page',
	standalone: true,
	imports: [CommonModule],
	animations: [expandCollapse],
	templateUrl: './faq.page.html',
	styleUrls: ['./faq.page.css'],
})
export class FaqPageComponent {
	openIndex: number | null = null;
	faqs = [
		{ q: 'إزاي أبدأ؟', a: 'تواصل معانا وهنديك خطة واضحة وخطوات البداية.' },
		{ q: 'المحتوى مناسب لمين؟', a: 'مناسب لطلاب الدبلومات والمعاهد الراغبين في دخول هندسة.' },
		{ q: 'متابعة فردية؟', a: 'في دعم ومتابعة مستمرة حسب خطتك.' },
		{ q: 'نماذج امتحانات؟', a: 'أيوة، في نماذج رسمية وتمارين محلولة.' },
		{ q: 'مدة الخطة؟', a: 'بتختلف حسب مستواك، غالبًا من 6-12 أسبوع.' },
		{ q: 'نظام الدفع؟', a: 'مرن وأونلاين، تواصل للتفاصيل.' },
	];
	constructor(private seo: SeoService, private canonical: CanonicalService) {
		const siteUrl = (typeof window !== 'undefined' ? (window as any)['NG_SITE_URL'] : process.env['NG_SITE_URL']) || 'https://example.com';
		const title = 'الأسئلة الشائعة - معادلة كلية هندسة';
		const description = 'إجابات لأكثر الأسئلة شيوعًا حول المعادلة والمحتوى وخطط الدراسة.';
		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url: siteUrl.replace(/\/$/, '') + '/faq' });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical();
	}
	toggle(i: number) { this.openIndex = this.openIndex === i ? null : i; }
}
