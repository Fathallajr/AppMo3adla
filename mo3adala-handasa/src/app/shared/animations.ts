import { animate, query, stagger, state, style, transition, trigger, group } from '@angular/animations';

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

// انيميشن التنقلات بين الصفحات - Fade بسيط وجميل
export const pageTransition = trigger('pageTransition', [
  transition('* => *', [
    query(':leave', [
      style({ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 1
      })
    ], { optional: true }),
    
    query(':enter', [
      style({ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    
    group([
      query(':leave', [
        animate('300ms ease-in-out', style({
          opacity: 0
        }))
      ], { optional: true }),
      
      query(':enter', [
        animate('300ms ease-in-out', style({
          opacity: 1
        }))
      ], { optional: true })
    ])
  ])
]);

// انيميشن للصفحة الرئيسية - Fade بسيط
export const homePageTransition = trigger('homePageTransition', [
  transition('* => home', [
    query(':enter', [
      style({ 
        opacity: 0
      }),
      animate('400ms ease-in-out', style({
        opacity: 1
      }))
    ], { optional: true })
  ])
]);

// انيميشن للصفحات الفرعية - Fade بسيط
export const subPageTransition = trigger('subPageTransition', [
  transition('* => *', [
    query(':enter', [
      style({ 
        opacity: 0
      }),
      animate('400ms ease-in-out', style({
        opacity: 1
      }))
    ], { optional: true })
  ])
]);

// انيميشن للبطاقات - Fade بسيط
export const cardAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0
    }),
    animate('500ms ease-in-out', style({
      opacity: 1
    }))
  ])
]);

// انيميشن للروابط - Fade بسيط
export const linkHoverAnimation = trigger('linkHoverAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0
    }),
    animate('300ms ease-in-out', style({
      opacity: 1
    }))
  ])
]);

// انيميشن جديد للعناصر - Fade بسيط
export const waveAnimation = trigger('waveAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0
    }),
    animate('400ms ease-in-out', style({
      opacity: 1
    }))
  ])
]);

// انيميشن للعناصر المتتالية - Fade مع stagger
export const cascadeAnimation = trigger('cascadeAnimation', [
  transition(':enter', [
    query(':enter', [
      style({ 
        opacity: 0
      }),
      stagger(100, [
        animate('400ms ease-in-out', style({
          opacity: 1
        }))
      ])
    ], { optional: true })
  ])
]);


