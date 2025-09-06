import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
	selector: 'app-contact-page',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './contact.page.html',
	styleUrls: ['./contact.page.css'],
})
export class ContactPageComponent {
	private readonly seo = inject(SeoService);
	private readonly canonical = inject(CanonicalService);
	endpoint = (typeof window !== 'undefined' ? (window as any)['NG_FORMSPREE_ENDPOINT'] : process.env['NG_FORMSPREE_ENDPOINT']) || '';
	whatsapp = (typeof window !== 'undefined' ? (window as any)['NG_WHATSAPP'] : process.env['NG_WHATSAPP']) || '';
	loading = false;
	success = false;
	error = false;
	model: any = {};

	constructor() {
		if (typeof window !== 'undefined') {
			const title = 'تواصل - ابلكيشن معادلة كلية هندسة';
			const description = 'ابعتلنا بياناتك وهنكلمك خلال 24 ساعة';
			this.seo.setTitle(title);
			this.seo.setDescription(description);
			this.seo.setOgTags({ title, description, url: (window as any)['NG_SITE_URL'] + '/contact' });
			this.seo.setTwitterTags({ title, description });
			this.canonical.setCanonical();
		}
	}

	async submit() {
		this.loading = true; this.success = false; this.error = false;
		try {
			const res = await fetch(this.endpoint || 'https://formspree.io/f/XXXXXXX', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.model),
			});
			this.success = res.ok;
			if (!res.ok) throw new Error('Failed');
			this.model = {};
		} catch {
			this.error = true;
		} finally {
			this.loading = false;
		}
	}
}


