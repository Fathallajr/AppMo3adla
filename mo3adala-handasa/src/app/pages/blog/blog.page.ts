import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

interface PostMeta { slug: string; title: string; description: string; date: string; }

@Component({
	selector: 'app-blog-page',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './blog.page.html',
	styleUrls: ['./blog.page.css'],
})
export class BlogPageComponent {
	private readonly seo = inject(SeoService);
	private readonly canonical = inject(CanonicalService);
	posts: PostMeta[] = [];
	constructor() {
		const siteUrl = (typeof window !== 'undefined' ? (window as any)['NG_SITE_URL'] : process.env['NG_SITE_URL']) || 'https://example.com';
		const title = 'المدونة - معادلة كلية هندسة';
		const description = 'مقالات ونصائح عملية للاستعداد لاجتياز معادلة كلية الهندسة.';
		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url: siteUrl.replace(/\/$/, '') + '/blog' });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical();

		if (typeof window !== 'undefined') {
			fetch('/assets/content.json').then(r => r.json()).then(data => {
				this.posts = (data?.posts || []).map((p: any) => ({ slug: p.slug, title: p.title, description: p.description, date: p.date }));
			});
		}
	}
}
