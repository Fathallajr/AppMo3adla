import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css'],
})
export class FooterComponent { 
	year = new Date().getFullYear();
	showFollowUpLinks = false;

	constructor(private viewportScroller: ViewportScroller) {}

	scrollToTop() {
		// التمرير إلى الأعلى بسلاسة
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
		
		// استخدام ViewportScroller كبديل
		this.viewportScroller.scrollToPosition([0, 0]);
	}
}
