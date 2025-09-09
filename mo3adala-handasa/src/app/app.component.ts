import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { pageTransition } from './shared/animations';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, FooterComponent, LoadingComponent],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [pageTransition]
})
export class AppComponent {
	title = 'mo3adala-handasa';
	currentRoute = '';

	constructor(private router: Router) {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
				this.currentRoute = event.url;
			});
	}

	getRouteAnimationState() {
		return this.currentRoute;
	}
}
