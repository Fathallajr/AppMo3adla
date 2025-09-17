import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
	selector: 'app-contact-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.css'],
})
export class ContactPageComponent {
	private readonly seo = inject(SeoService);
	private readonly canonical = inject(CanonicalService);
	studentWhatsapp = (typeof window !== 'undefined' ? (window as any)['NG_STUDENT_WHATSAPP'] : process.env['NG_STUDENT_WHATSAPP']) || '201064746369';
	parentWhatsapp = (typeof window !== 'undefined' ? (window as any)['NG_PARENT_WHATSAPP'] : process.env['NG_PARENT_WHATSAPP']) || '201234567890';
	phoneNumber = (typeof window !== 'undefined' ? (window as any)['NG_PHONE_NUMBER'] : process.env['NG_PHONE_NUMBER']) || '+201064746369';

	constructor() {
		if (typeof window !== 'undefined') {
			const title = 'تواصل معنا - ابلكيشن معادلة كلية هندسة';
			const description = 'تواصل معنا عبر واتساب للطلاب وأولياء الأمور أو اتصل بنا مباشرة. نحن هنا لمساعدتك في رحلتك التعليمية';
			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url: (window as any)['NG_SITE_URL'] + '/contact' });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical();
		}
	}
}


