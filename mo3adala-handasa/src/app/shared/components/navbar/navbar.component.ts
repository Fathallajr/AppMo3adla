import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
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
	isMobileMenuOpen = false;
	isRequirementsDropdownOpen = false;

	constructor(private router: Router) {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				this.scrolled = window.scrollY > 8;
			});
		}
	}

	ngOnInit() {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.currentRoute = event.url;
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
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}
	}

	toggleMobileMenu() {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}

	closeMobileMenu() {
		this.isMobileMenuOpen = false;
	}

	toggleRequirementsDropdown() {
		this.isRequirementsDropdownOpen = !this.isRequirementsDropdownOpen;
	}

	closeRequirementsDropdown() {
		this.isRequirementsDropdownOpen = false;
	}
}
