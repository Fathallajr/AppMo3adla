import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { pageTransition } from './shared/animations';
import { ViewportScroller } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, RouterLink, NavbarComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [pageTransition]
})
export class AppComponent implements OnInit {
	title = 'mo3adala-handasa';
	currentRoute = '';
	showLoading = true;

	constructor(private router: Router, private viewportScroller: ViewportScroller) {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		this.currentRoute = this.router.url;
		this.router.events
			.subscribe((event) => {
				// Set the route class before the new view is rendered, preventing
				// internal pages from briefly appearing beneath the fixed navbar.
				if (event instanceof NavigationStart) {
					this.currentRoute = event.url;
				}
				if (event instanceof NavigationEnd) {
					this.currentRoute = event.urlAfterRedirects;
					this.scrollToTop();
				}
			});
	}

	ngOnInit() {
		// التمرير إلى الأعلى عند تحميل الصفحة لأول مرة
		this.scrollToTop();
		
		// Keep the spinner short so refreshes feel immediate.
		setTimeout(() => {
			this.showLoading = false;
		}, 300);
	}

	@HostListener('window:pageshow')
	onPageShow() {
		// Browsers can restore the previous scroll position after a refresh.
		this.scrollToTop();
	}

	scrollToTop() {
		const reset = () => {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			this.viewportScroller.scrollToPosition([0, 0]);
		};

		reset();
		// Run again after layout and browser restoration have completed.
		requestAnimationFrame(reset);
		setTimeout(reset, 0);
		setTimeout(reset, 120);
	}

	getRouteAnimationState() {
		return this.currentRoute;
	}
}
