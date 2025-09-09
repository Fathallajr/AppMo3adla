import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { fadeInUp, staggerList, homePageTransition, cardAnimation } from '../../shared/animations';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { JsonLdService } from '../../core/jsonld.service';
import { WhatIsEquationComponent } from '../../shared/components/what-is-equation/what-is-equation.component';
import { SuccessStudentsComponent } from '../../shared/components/success-students/success-students.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [CommonModule, RouterLink, WhatIsEquationComponent, SuccessStudentsComponent],
	animations: [fadeInUp, staggerList, homePageTransition, cardAnimation],
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.css'],
})
export class HomePageComponent {
	@ViewChild('reviewsTrack', { static: false }) reviewsTrack!: ElementRef<HTMLDivElement>;
	
	features = ['مناهج بسيطة مُحدّثة 2026 ', 'شرح + أمثلة + امتحانات إلكترونية', 'خطط مذاكرة تناسب وقتك', 'دعم ومتابعة علي مدار 24 ساعة'];
	
	constructor(private seo: SeoService, private canonical: CanonicalService, private jsonld: JsonLdService) {
		const siteUrl = (typeof window !== 'undefined' ? (window as any)['NG_SITE_URL'] : process.env['NG_SITE_URL']) || 'https://example.com';
		const title = 'معادلة كلية هندسة — طريقك السريع لدخول هندسة';
		const description = 'بنجهّزك لاجتياز معادلة كلية الهندسة بخطوات واضحة ومحتوى مُبسّط وتمارين عملية.';
		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url: siteUrl });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical();
		this.jsonld.setJsonLd({
			"@context": "https://schema.org",
			"@type": "Organization",
			name: 'معادلة كلية هندسة',
			url: siteUrl
		});
		this.jsonld.setJsonLd({
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: 'معادلة كلية هندسة',
			url: siteUrl,
			potentialAction: {
				"@type": "SearchAction",
				target: siteUrl.replace(/\/$/, '') + '/blog?search={query}',
				"query-input": "required name=query"
			}
		}, 'website-ld');
	}

	scrollReviewsPrev() {
		if (this.reviewsTrack) {
			const track = this.reviewsTrack.nativeElement;
			const cardWidth = track.querySelector('.carousel-figure')?.clientWidth || 300;
			track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
		}
	}

	scrollReviewsNext() {
		if (this.reviewsTrack) {
			const track = this.reviewsTrack.nativeElement;
			const cardWidth = track.querySelector('.carousel-figure')?.clientWidth || 300;
			track.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
		}
	}
}
