import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { JsonLdService } from '../../core/jsonld.service';
import { fadeInUp } from '../../shared/animations';

@Component({
	selector: 'app-blog-post-page',
	standalone: true,
	imports: [CommonModule],
	animations: [fadeInUp],
	templateUrl: './blog-post.page.html',
	styleUrls: ['./blog-post.page.css'],
})
export class BlogPostPageComponent {
	private readonly route = inject(ActivatedRoute);
	private readonly sanitizer = inject(DomSanitizer);
	private readonly seo = inject(SeoService);
	private readonly canonical = inject(CanonicalService);
	private readonly jsonld = inject(JsonLdService);
	post: { slug: string; title: string; description: string; date: string; html: SafeHtml } | null = null;

	constructor() {
		if (typeof window === 'undefined') return;
		const slug = this.route.snapshot.paramMap.get('slug')!;
		fetch('/assets/content.json').then(r => r.json()).then(data => {
			const found = (data.posts || []).find((p: any) => p.slug === slug);
			if (found) {
				this.post = { ...found, html: this.sanitizer.bypassSecurityTrustHtml(found.html) };
				this.seo.setTitle(found.title);
				this.seo.setDescription(found.description);
				this.seo.setOgTags({ title: found.title, description: found.description, url: (window as any)['NG_SITE_URL'] + '/blog/' + found.slug });
				this.seo.setTwitterTags({ title: found.title, description: found.description });
				this.canonical.setCanonical();
				this.jsonld.setJsonLd({
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: found.title,
					description: found.description,
					datePublished: found.date,
					mainEntityOfPage: {
						"@type": "WebPage",
						"@id": ((window as any)['NG_SITE_URL'] || 'https://example.com') + '/blog/' + found.slug
					}
				});
				this.loadGiscus();
			}
		});
	}

	private loadGiscus() {
		const w: any = typeof window !== 'undefined' ? window : {};
		const d = document;
		const container = d.getElementById('giscus_container');
		if (!container) return;
		const s = d.createElement('script');
		s.src = 'https://giscus.app/client.js';
		s.async = true;
		s.crossOrigin = 'anonymous';
		s.setAttribute('data-repo', w['NG_GISCUS_REPO'] || '');
		s.setAttribute('data-repo-id', w['NG_GISCUS_REPO_ID'] || '');
		s.setAttribute('data-category', w['NG_GISCUS_CATEGORY'] || '');
		s.setAttribute('data-category-id', w['NG_GISCUS_CATEGORY_ID'] || '');
		s.setAttribute('data-mapping', 'pathname');
		s.setAttribute('data-lang', 'ar');
		s.setAttribute('data-theme', 'light');
		container.innerHTML = '';
		container.appendChild(s);
	}
}
