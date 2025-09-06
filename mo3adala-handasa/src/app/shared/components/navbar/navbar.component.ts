import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, NgIf, SocialLinksComponent],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	scrolled = false;
	showSocial = false;
	constructor() {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				this.scrolled = window.scrollY > 8;
			});
		}
	}
}
