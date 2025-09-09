import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePageComponent) },
	{ path: 'faq', loadComponent: () => import('./pages/faq/faq.page').then(m => m.FaqPageComponent) },
	{ path: 'contact', loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPageComponent) },
	{ path: 'blog', loadComponent: () => import('./pages/blog/blog.page').then(m => m.BlogPageComponent) },
	{ path: 'blog/:slug', loadComponent: () => import('./pages/blog-post/blog-post.page').then(m => m.BlogPostPageComponent) },
	{ path: 'social', loadComponent: () => import('./pages/social/social.page').then(m => m.SocialPageComponent) },
	{ path: 'engineers', loadComponent: () => import('./pages/engineers/engineers.page').then(m => m.EngineersPageComponent) },
	{ path: 'teacher/:id', loadComponent: () => import('./pages/teacher-details/teacher-details.page').then(m => m.TeacherDetailsPageComponent) },
	{ path: 'requirements', loadComponent: () => import('./pages/requirements/requirements.page').then(m => m.RequirementsPageComponent) },
	{ path: 'schools', loadComponent: () => import('./pages/schools/schools.page').then(m => m.SchoolsPageComponent) },
	{ path: '**', redirectTo: '' },
];
