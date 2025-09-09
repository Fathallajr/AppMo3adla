import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

// انيميشن التنقلات بين الصفحات
export const pageTransition = trigger('pageTransition', [
  transition('* => *', [
    // إخفاء الصفحة الحالية
    query(':leave', [
      style({ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 1,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    
    // إظهار الصفحة الجديدة
    query(':enter', [
      style({ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'translateX(100%)'
      })
    ], { optional: true }),
    
    // تنفيذ الانيميشن
    group([
      // إخفاء الصفحة الحالية
      query(':leave', [
        animate('300ms ease-in-out', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ], { optional: true }),
      
      // إظهار الصفحة الجديدة
      query(':enter', [
        animate('300ms ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        }))
      ], { optional: true })
    ])
  ])
]);

// انيميشن للصفحة الرئيسية
export const homePageTransition = trigger('homePageTransition', [
  transition('* => home', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'scale(0.9) translateY(20px)'
      }),
      animate('400ms ease-out', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      }))
    ], { optional: true })
  ])
]);

// انيميشن للصفحات الفرعية
export const subPageTransition = trigger('subPageTransition', [
  transition('* => *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateY(30px)'
      }),
      animate('350ms ease-out', style({
        opacity: 1,
        transform: 'translateY(0)'
      }))
    ], { optional: true })
  ])
]);

// انيميشن للصفحات الخاصة (المدرسين، التفاصيل)
export const specialPageTransition = trigger('specialPageTransition', [
  transition('* => *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateX(50px) scale(0.95)'
      }),
      animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
        opacity: 1,
        transform: 'translateX(0) scale(1)'
      }))
    ], { optional: true })
  ])
]);

// انيميشن للعناصر الداخلية
export const staggerAnimation = trigger('staggerAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ 
        opacity: 0,
        transform: 'translateY(20px)'
      }),
      stagger(100, [
        animate('300ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ], { optional: true })
  ])
]);

// انيميشن للبطاقات
export const cardAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0,
      transform: 'translateY(30px) scale(0.9)'
    }),
    animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
      opacity: 1,
      transform: 'translateY(0) scale(1)'
    }))
  ])
]);

// انيميشن للروابط
export const linkHoverAnimation = trigger('linkHoverAnimation', [
  transition(':enter', [
    style({ 
      transform: 'scale(1)'
    }),
    animate('200ms ease-in-out', style({
      transform: 'scale(1.05)'
    })),
    animate('200ms ease-in-out', style({
      transform: 'scale(1)'
    }))
  ])
]);

// انيميشن للتحميل
export const loadingAnimation = trigger('loadingAnimation', [
  transition(':enter', [
    style({ 
      opacity: 0
    }),
    animate('200ms ease-in', style({
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('200ms ease-out', style({
      opacity: 0
    }))
  ])
]);
