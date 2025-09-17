import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { pageTransition } from './shared/animations';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [pageTransition]
})
export class AppComponent implements OnInit {
	title = 'mo3adala-handasa';
	currentRoute = '';
	showLoading = true;
	loadingProgress = 0;

	constructor(private router: Router, private viewportScroller: ViewportScroller) {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.currentRoute = event.url;
				// التمرير إلى الأعلى عند تغيير الصفحة
				this.scrollToTop();
			});
	}

	ngOnInit() {
		// التمرير إلى الأعلى عند تحميل الصفحة لأول مرة
		this.scrollToTop();
		
		// Progressive loading - سرعة متوسطة
		const interval = setInterval(() => {
			this.loadingProgress += 10;
			if (this.loadingProgress >= 100) {
				this.loadingProgress = 100;
				clearInterval(interval);
				// إخفاء Loading بعد وصول 100%
				setTimeout(() => {
					this.showLoading = false;
				}, 400);
			}
		}, 150);
	}

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

	getRouteAnimationState() {
		return this.currentRoute;
	}
}
