import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsPageKey, cmsPageDefaults, cmsPageOptions } from '../../core/cms-page.registry';
import { AdminAuthService } from '../../core/services/admin-auth.service';
import { MonthlyContentService } from '../../core/services/monthly-content.service';
import { ContactFormComponent } from './forms/contact-form.component';
import { FaqFormComponent } from './forms/faq-form.component';
import { HomeFormComponent } from './forms/home-form.component';
import { NewsFormComponent } from './forms/news-form.component';
import { SubDetailsFormComponent } from './forms/sub-details-form.component';
import { SubAbReviewsFormComponent } from './forms/sub-ab-reviews-form.component';
import { SubIntensiveFormComponent } from './forms/sub-intensive-form.component';

interface PageOption {
	key: CmsPageKey;
	route: string;
	title: string;
	description: string;
	group: string;
}

@Component({
	selector: 'app-admin-dashboard-page',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ContactFormComponent,
		FaqFormComponent,
		HomeFormComponent,
		NewsFormComponent,
		SubDetailsFormComponent,
		SubAbReviewsFormComponent,
		SubIntensiveFormComponent
	],
	templateUrl: './admin-dashboard.page.html',
	styleUrls: ['./admin-dashboard.page.css']
})
export class AdminDashboardPageComponent implements OnInit {
	pageOptions: PageOption[] = cmsPageOptions;

	selectedPageKey: CmsPageKey = 'home';
	currentContent: unknown = null;
	statusMessage = '';
	errorMessage = '';
	isSaving = false;
	isLoading = false;
	pageSummaries: Record<string, { hasContent: boolean; updatedAt?: string }> = {};

	constructor(
		private contentService: MonthlyContentService,
		private auth: AdminAuthService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.refreshSummaries();
		this.route.paramMap.subscribe(params => {
			const pageKey = this.resolvePageKey(params.get('pageKey'));
			this.selectedPageKey = pageKey;
			this.loadPage(pageKey);
		});
	}

	selectPage(pageKey: CmsPageKey): void {
		if (pageKey === this.selectedPageKey) return;
		void this.router.navigate(['/admin', pageKey]);
	}

	loadPage(pageKey: CmsPageKey): void {
		this.statusMessage = '';
		this.errorMessage = '';
		this.isLoading = true;
		this.currentContent = structuredClone(cmsPageDefaults[pageKey]);

		this.contentService.loadPageState(pageKey, cmsPageDefaults[pageKey]).subscribe({
			next: content => {
				this.currentContent = content;
				this.isLoading = false;
			},
			error: () => {
				this.isLoading = false;
				this.errorMessage = 'تعذر تحميل المحتوى من السيرفر، تم عرض القالب الافتراضي.';
			}
		});
	}

	refreshSummaries(): void {
		this.contentService.listPages().subscribe({
			next: summaries => {
				this.pageSummaries = summaries.reduce<Record<string, { hasContent: boolean; updatedAt?: string }>>((acc, item) => {
					acc[item.key] = { hasContent: item.hasContent, updatedAt: item.updatedAt };
					return acc;
				}, {});
			},
			error: () => { this.pageSummaries = {}; }
		});
	}

	resetToDefaults(): void {
		this.currentContent = structuredClone(cmsPageDefaults[this.selectedPageKey]);
		this.statusMessage = 'تم الرجوع للقالب الافتراضي.';
		this.errorMessage = '';
	}

	save(): void {
		this.errorMessage = '';
		this.statusMessage = '';
		this.isSaving = true;

		this.contentService.savePageState(this.selectedPageKey, this.currentContent).subscribe({
			next: saved => {
				this.isSaving = false;
				this.currentContent = saved;
				this.statusMessage = 'تم الحفظ على السيرفر بنجاح ✓';
				this.refreshSummaries();
			},
			error: (err: HttpErrorResponse) => {
				this.isSaving = false;
				if (err.status === 401) {
					this.handleSessionExpired();
					return;
				}
				this.errorMessage = 'فشل حفظ التعديلات على السيرفر.';
			}
		});
	}

	private handleSessionExpired(): void {
		this.auth.logout();
		this.errorMessage = 'انتهت الجلسة. جاري التحويل لتسجيل الدخول...';
		setTimeout(() => void this.router.navigateByUrl('/admin/login'), 1500);
	}

	logout(): void {
		this.auth.logout();
		void this.router.navigateByUrl('/admin/login');
	}

	formatUpdatedAt(value?: string): string {
		if (!value) return 'لم يتم الحفظ بعد';
		return new Date(value).toLocaleString('ar-EG');
	}

	isSelected(pageKey: CmsPageKey): boolean {
		return this.selectedPageKey === pageKey;
	}

	getCurrentSummary(): { hasContent: boolean; updatedAt?: string } | null {
		return this.pageSummaries[this.selectedPageKey] || null;
	}

	get selectedPageTitle(): string {
		return this.pageOptions.find(page => page.key === this.selectedPageKey)?.title || '';
	}

	get selectedPageRoute(): string {
		return this.pageOptions.find(page => page.key === this.selectedPageKey)?.route || '';
	}

	get hasCustomForm(): boolean {
		return ['home', 'faq', 'contact', 'subscription-details', 'subscription-ab-reviews', 'subscription-intensive', 'news-app', 'news-equation'].includes(this.selectedPageKey);
	}

	get groupedPageOptions(): Array<{ group: string; pages: PageOption[] }> {
		return this.pageOptions.reduce<Array<{ group: string; pages: PageOption[] }>>((groups, page) => {
			const existingGroup = groups.find(item => item.group === page.group);
			if (existingGroup) { existingGroup.pages.push(page); return groups; }
			groups.push({ group: page.group, pages: [page] });
			return groups;
		}, []);
	}

	private resolvePageKey(value: string | null): CmsPageKey {
		const page = this.pageOptions.find(item => item.key === value);
		return page?.key || 'home';
	}
}
