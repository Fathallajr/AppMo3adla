import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CanonicalService } from '../../core/canonical.service';
import { SeoService } from '../../core/seo.service';
import { fadeInUp, staggerList } from '../../shared/animations';
import { StoryCategory, SuccessStory, successStories } from './success-stories.data';

@Component({
	selector: 'app-success-stories',
	standalone: true,
	imports: [CommonModule, RouterLink],
	animations: [fadeInUp, staggerList],
	templateUrl: './success-stories.page.html',
	styleUrls: ['./success-stories.page.css']
})
export class SuccessStoriesPageComponent implements OnInit {
	activeCategory: StoryCategory = 'all';

	categories: { key: StoryCategory; label: string; hint: string }[] = [
		{ key: 'all', label: 'كل القصص', hint: 'المراجعات والمكثف' },
		{ key: 'reviews', label: 'طلاب المراجعات', hint: 'A-B' },
		{ key: 'intensive', label: 'طلاب المكثف', hint: 'الكورس المكثف' }
	];

	stories: SuccessStory[] = successStories;

	constructor(
		private seo: SeoService,
		private canonical: CanonicalService
	) {}

	ngOnInit(): void {
		if (typeof window === 'undefined') {
			return;
		}

		const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
		const title = 'قصص نجاح طلاب المراجعات والمكثف - ابلكيشن معادلة كلية هندسة';
		const description = 'شاهد قصص نجاح طلاب مراجعات A-B والكورس المكثف وتجاربهم مع خطة المذاكرة والمتابعة.';
		const url = `${siteUrl}/success-stories`;

		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical(url);
	}

	get filteredStories(): SuccessStory[] {
		if (this.activeCategory === 'all') {
			return this.stories;
		}

		return this.stories.filter(story => story.category === this.activeCategory);
	}

	setCategory(category: StoryCategory): void {
		this.activeCategory = category;
	}
}
