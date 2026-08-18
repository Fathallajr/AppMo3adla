import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fadeInUp } from '../../animations';

@Component({
	selector: 'app-what-is-equation',
	standalone: true,
	imports: [CommonModule],
	animations: [fadeInUp],
	templateUrl: './what-is-equation.component.html',
	styleUrls: ['./what-is-equation.component.css'],
})
export class WhatIsEquationComponent {
	@Input() title = 'يعني إيه معادلة كلية هندسة؟';
	@Input() text = 'اختبار ومعادلة تؤهّلك لدخول كلية الهندسة لطلاب الدبلومات والمعاهد. بنوفّر لك شرح مبسّط وخطط مذاكرة وتمارين تساعدك تتأهل وتنجح.';
	isVideoLoaded = false;

	constructor(private sanitizer: DomSanitizer) {}

	loadVideo(): void {
		this.isVideoLoaded = true;
	}

	getVideoThumbnail(): string {
		return 'https://img.youtube.com/vi/KWeC2tNedQs/hqdefault.jpg';
	}

	getVideoEmbedUrl(): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/KWeC2tNedQs?autoplay=1&rel=0');
	}
}


