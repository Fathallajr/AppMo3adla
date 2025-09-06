import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInUp, staggerList } from '../../animations';

@Component({
	selector: 'app-success-students',
	standalone: true,
	imports: [CommonModule],
	animations: [fadeInUp, staggerList],
	templateUrl: './success-students.component.html',
	styleUrls: ['./success-students.component.css'],
})
export class SuccessStudentsComponent {
	@Input() title = 'طلابنا الناجحين';
	@Input() images: { src: string; alt?: string }[] = [];

	@ViewChild('track') track?: ElementRef<HTMLDivElement>;

	private getScrollAmount(): number {
		const trackEl = this.track?.nativeElement;
		if (!trackEl) return 0;
		const firstItem = trackEl.querySelector('figure') as HTMLElement | null;
		if (!firstItem) return trackEl.clientWidth * 0.9;
		const computedGap = 16; // approximate Tailwind gap-4
		return firstItem.offsetWidth + computedGap;
	}

	scrollNext(): void {
		const trackEl = this.track?.nativeElement;
		if (!trackEl) return;
		const isRtl = getComputedStyle(trackEl).direction === 'rtl';
		const amount = this.getScrollAmount();
		trackEl.scrollBy({ left: isRtl ? -amount : amount, behavior: 'smooth' });
	}

	scrollPrev(): void {
		const trackEl = this.track?.nativeElement;
		if (!trackEl) return;
		const isRtl = getComputedStyle(trackEl).direction === 'rtl';
		const amount = this.getScrollAmount();
		trackEl.scrollBy({ left: isRtl ? amount : -amount, behavior: 'smooth' });
	}
}


