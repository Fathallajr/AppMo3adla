import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, CommonModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	scrolled = false;
	showSocial = false;
	currentRoute = '';
	showFollowUpButton = false;
	isMobileMenuOpen = false;
	isRequirementsDropdownOpen = false;
	isNewsDropdownOpen = false;
	isMobileNewsDropdownOpen = false;
	isMobileRequirementsDropdownOpen = false;
	isPlatformDropdownOpen = false;
	isMobilePlatformDropdownOpen = false;
	isMobile = false;

	constructor(private router: Router, private viewportScroller: ViewportScroller) {
		if (typeof window !== 'undefined') {
			this.checkScreenSize();
			window.addEventListener('scroll', () => {
				this.scrolled = window.scrollY > 8;
			});
			window.addEventListener('resize', () => {
				this.checkScreenSize();
			});
		}
	}

	checkScreenSize() {
		if (typeof window !== 'undefined') {
			this.isMobile = window.innerWidth < 1280;
		}
	}

	ngOnInit() {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.currentRoute = event.url;
				// إغلاق جميع القوائم المنسدلة عند الانتقال لصفحة جديدة
				this.closeAllDropdowns();
			});
	}

	isActiveRoute(route: string): boolean {
		if (route === '/' && this.currentRoute === '/') {
			return true;
		}
		if (route !== '/' && this.currentRoute.startsWith(route)) {
			return true;
		}
		return false;
	}

	scrollToTop() {
		if (typeof window !== 'undefined') {
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

	toggleMobileMenu() {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}

	closeMobileMenu() {
		this.isMobileMenuOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المحمولة
		this.scrollToTop();
	}

	toggleRequirementsDropdown() {
		this.isRequirementsDropdownOpen = !this.isRequirementsDropdownOpen;
	}

	closeRequirementsDropdown() {
		this.isRequirementsDropdownOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المنسدلة
		this.scrollToTop();
	}

	toggleNewsDropdown() {
		this.isNewsDropdownOpen = !this.isNewsDropdownOpen;
	}

	closeNewsDropdown() {
		this.isNewsDropdownOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المنسدلة
		this.scrollToTop();
	}

	toggleMobileNewsDropdown() {
		this.isMobileNewsDropdownOpen = !this.isMobileNewsDropdownOpen;
	}

	toggleMobileRequirementsDropdown() {
		this.isMobileRequirementsDropdownOpen = !this.isMobileRequirementsDropdownOpen;
	}

	closeMobileNewsDropdown() {
		this.isMobileNewsDropdownOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المنسدلة المحمولة
		this.scrollToTop();
	}

	closeMobileRequirementsDropdown() {
		this.isMobileRequirementsDropdownOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المنسدلة المحمولة
		this.scrollToTop();
	}

	togglePlatformDropdown() {
		this.isPlatformDropdownOpen = !this.isPlatformDropdownOpen;
	}

	closePlatformDropdown() {
		this.isPlatformDropdownOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المنسدلة
		this.scrollToTop();
	}

	toggleMobilePlatformDropdown() {
		this.isMobilePlatformDropdownOpen = !this.isMobilePlatformDropdownOpen;
	}

	closeMobilePlatformDropdown() {
		this.isMobilePlatformDropdownOpen = false;
		// التمرير إلى الأعلى عند إغلاق القائمة المنسدلة المحمولة
		this.scrollToTop();
	}

	// دالة لإغلاق جميع القوائم المنسدلة
	closeAllDropdowns() {
		// إغلاق القوائم المنسدلة للديسكتوب
		this.isRequirementsDropdownOpen = false;
		this.isNewsDropdownOpen = false;
		this.isPlatformDropdownOpen = false;
		
		// إغلاق القوائم المنسدلة للموبايل
		this.isMobileNewsDropdownOpen = false;
		this.isMobileRequirementsDropdownOpen = false;
		this.isMobilePlatformDropdownOpen = false;
		
		// إغلاق القائمة المحمولة الرئيسية
		this.isMobileMenuOpen = false;
	}
}
