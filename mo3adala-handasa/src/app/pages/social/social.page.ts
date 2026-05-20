import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
	selector: 'app-social-page',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './social.page.html',
	styleUrls: ['./social.page.css'],
})
export class SocialPageComponent {
	constructor(private seo: SeoService, private canonical: CanonicalService) {
		const siteUrl = (typeof window !== 'undefined' ? (window as any)['NG_SITE_URL'] : process.env['NG_SITE_URL']) || 'https://example.com';
		const title = 'تابعنا - معادلة كلية هندسة';
		const description = 'كل روابط حساباتنا على السوشيال ميديا في مكان واحد.';
		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url: siteUrl.replace(/\/$/, '') + '/social' });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical();
	}
}


