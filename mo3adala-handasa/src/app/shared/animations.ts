import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(16px)' }),
		animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
]);

export const staggerList = trigger('staggerList', [
	transition(':enter', [
		query(':enter', [
			style({ opacity: 0, transform: 'translateY(12px)' }),
			stagger(100, animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))),
		], { optional: true })
	])
]);

export const expandCollapse = trigger('expandCollapse', [
	state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })),
	state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
	transition('void <=> *', animate('300ms ease-in-out')),
]);


