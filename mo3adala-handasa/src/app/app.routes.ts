import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePageComponent) },
	{ path: 'admin/login', loadComponent: () => import('./pages/admin/admin-login.page').then(m => m.AdminLoginPageComponent) },
	{ path: 'admin/:pageKey', canActivate: [adminGuard], loadComponent: () => import('./pages/admin/admin-dashboard.page').then(m => m.AdminDashboardPageComponent) },
	{ path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./pages/admin/admin-dashboard.page').then(m => m.AdminDashboardPageComponent) },
	{ path: 'photos-2025', loadComponent: () => import('./pages/photos-2025/photos-2025.page').then(m => m.Photos2025PageComponent) },
	{ path: 'faq', loadComponent: () => import('./pages/faq/faq.page').then(m => m.FaqPageComponent) },
	{ path: 'contact', loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPageComponent) },
	{ path: 'news/equation', loadComponent: () => import('./pages/news-equation/news-equation.page').then(m => m.NewsEquationPageComponent) },
	{ path: 'news/app', loadComponent: () => import('./pages/news-app/news-app.page').then(m => m.NewsAppPageComponent) },
	{ path: 'news/detail/:id', loadComponent: () => import('./pages/news-detail/news-detail.page').then(m => m.NewsDetailPageComponent) },
	{ path: 'success-stories/:id', loadComponent: () => import('./pages/success-story-detail/success-story-detail.page').then(m => m.SuccessStoryDetailPageComponent) },
	{ path: 'success-stories', loadComponent: () => import('./pages/success-stories/success-stories.page').then(m => m.SuccessStoriesPageComponent) },
	{ path: 'subscription-details', loadComponent: () => import('./pages/subscription-details/subscription-details.page').then(m => m.SubscriptionDetailsPageComponent) },
	{ path: 'subscription-ab-reviews', loadComponent: () => import('./pages/subscription-ab-reviews/subscription-ab-reviews.page').then(m => m.SubscriptionAbReviewsPageComponent) },
	{ path: 'subscription-intensive', loadComponent: () => import('./pages/subscription-intensive/subscription-intensive.page').then(m => m.SubscriptionIntensivePageComponent) },
	{ path: 'social', loadComponent: () => import('./pages/social/social.page').then(m => m.SocialPageComponent) },
	{ path: 'engineers', loadComponent: () => import('./pages/engineers/engineers.page').then(m => m.EngineersPageComponent) },
	{ path: 'teacher/:id', loadComponent: () => import('./pages/teacher-details/teacher-details.page').then(m => m.TeacherDetailsPageComponent) },
	{ path: 'requirements', loadComponent: () => import('./pages/requirements/requirements.page').then(m => m.RequirementsPageComponent) },
	{ path: 'schools', loadComponent: () => import('./pages/schools/schools.page').then(m => m.SchoolsPageComponent) },
	{ path: '**', redirectTo: '' },
];
