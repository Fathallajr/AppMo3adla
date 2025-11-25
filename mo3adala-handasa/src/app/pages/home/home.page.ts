import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { fadeInUp, staggerList, homePageTransition, cardAnimation } from '../../shared/animations';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';
import { JsonLdService } from '../../core/jsonld.service';
import { WhatIsEquationComponent } from '../../shared/components/what-is-equation/what-is-equation.component';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [CommonModule, RouterLink, WhatIsEquationComponent],
	animations: [fadeInUp, staggerList, homePageTransition, cardAnimation],
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
	@ViewChild('reviewsTrack', { static: false }) reviewsTrack!: ElementRef<HTMLDivElement>;
	@ViewChild('photosTrack', { static: false }) photosTrack!: ElementRef<HTMLDivElement>;
	@ViewChild('heroVideo', { static: false }) heroVideo!: ElementRef<HTMLVideoElement>;
	
	features = ['مناهج بسيطة مُحدّثة 2026 ', 'شرح + أمثلة + امتحانات إلكترونية', 'خطط مذاكرة تناسب وقتك', 'دعم ومتابعة علي مدار 24 ساعة'];
	
	// Lightbox state
	selectedPhoto: string | null = null;
	
	// Photos of successful students 2025
	studentPhotos2025 = [
		'طلاب 2025/WhatsApp Image 2025-10-28 at 16.40.57_bf8b0500.jpg',
		'طلاب 2025/WhatsApp Image 2025-10-28 at 18.22.25_1031edee.jpg',
		'طلاب 2025/WhatsApp Image 2025-10-28 at 18.52.05_6cf2a0b2.jpg',
		'طلاب 2025/IMG-20251027-WA0015.jpg',
		'طلاب 2025/IMG-20251027-WA0016.jpg',
		'طلاب 2025/IMG-20251027-WA0017.jpg',
		'طلاب 2025/IMG-20251027-WA0018.jpg',
		'طلاب 2025/IMG-20251027-WA0019.jpg',
		'طلاب 2025/IMG-20251027-WA0020.jpg',
		'طلاب 2025/IMG-20251027-WA0021.jpg',
		'طلاب 2025/IMG-20251027-WA0022.jpg',
		'طلاب 2025/IMG-20251027-WA0023.jpg',
		'طلاب 2025/IMG-20251027-WA0086.jpg',
		'طلاب 2025/IMG-20251027-WA0024.jpg',
		'طلاب 2025/IMG-20251027-WA0025.jpg',
		'طلاب 2025/IMG-20251027-WA0026.jpg',
		'طلاب 2025/IMG-20251027-WA0027.jpg',
		'طلاب 2025/IMG-20251027-WA0028.jpg',
		'طلاب 2025/IMG-20251027-WA0029.jpg',
		'طلاب 2025/IMG-20251027-WA0030.jpg',
		'طلاب 2025/IMG-20251027-WA0031.jpg',
		'طلاب 2025/IMG-20251027-WA0032.jpg',
		'طلاب 2025/IMG-20251027-WA0033.jpg',
		'طلاب 2025/IMG-20251027-WA0034.jpg',
		'طلاب 2025/IMG-20251027-WA0035.jpg',
		'طلاب 2025/IMG-20251027-WA0036.jpg',
		'طلاب 2025/IMG-20251027-WA0037.jpg',
		'طلاب 2025/IMG-20251027-WA0038.jpg',
		'طلاب 2025/IMG-20251027-WA0039.jpg',
		'طلاب 2025/IMG-20251027-WA0040.jpg',
		'طلاب 2025/IMG-20251027-WA0041.jpg',
		'طلاب 2025/IMG-20251027-WA0042.jpg',
		'طلاب 2025/IMG-20251027-WA0043.jpg',
		'طلاب 2025/IMG-20251027-WA0044.jpg',
		'طلاب 2025/IMG-20251027-WA0045.jpg',
		'طلاب 2025/IMG-20251027-WA0046.jpg',
		'طلاب 2025/IMG-20251027-WA0047.jpg',
		'طلاب 2025/IMG-20251027-WA0048.jpg',
		'طلاب 2025/IMG-20251027-WA0049.jpg',
		'طلاب 2025/IMG-20251027-WA0050.jpg',
		'طلاب 2025/IMG-20251027-WA0051.jpg',
		'طلاب 2025/IMG-20251027-WA0052.jpg',
		'طلاب 2025/IMG-20251027-WA0053.jpg',
		'طلاب 2025/IMG-20251027-WA0054.jpg',
		'طلاب 2025/IMG-20251027-WA0055.jpg',
		'طلاب 2025/IMG-20251027-WA0056.jpg',
		'طلاب 2025/IMG-20251027-WA0057.jpg',
		'طلاب 2025/IMG-20251027-WA0058.jpg',
		'طلاب 2025/IMG-20251027-WA0059.jpg',
		'طلاب 2025/IMG-20251027-WA0060.jpg',
		'طلاب 2025/IMG-20251027-WA0061.jpg',
		'طلاب 2025/IMG-20251027-WA0062.jpg',
		'طلاب 2025/IMG-20251027-WA0063.jpg',
		'طلاب 2025/IMG-20251027-WA0064.jpg',
		'طلاب 2025/IMG-20251027-WA0065.jpg',
		'طلاب 2025/IMG-20251027-WA0066.jpg',
		'طلاب 2025/IMG-20251027-WA0067.jpg',
		'طلاب 2025/IMG-20251027-WA0068.jpg',
		'طلاب 2025/IMG-20251027-WA0069.jpg',
		'طلاب 2025/IMG-20251027-WA0070.jpg',
		'طلاب 2025/IMG-20251027-WA0071.jpg',
		'طلاب 2025/IMG-20251027-WA0072.jpg',
		'طلاب 2025/IMG-20251027-WA0073.jpg',
		'طلاب 2025/IMG-20251027-WA0074.jpg',
		'طلاب 2025/IMG-20251027-WA0076.jpg',
		'طلاب 2025/IMG-20251027-WA0077.jpg',
		'طلاب 2025/IMG-20251027-WA0078.jpg',
		'طلاب 2025/IMG-20251027-WA0079.jpg',
		'طلاب 2025/IMG-20251027-WA0080.jpg',
		'طلاب 2025/IMG-20251027-WA0081.jpg',
		'طلاب 2025/IMG-20251027-WA0082.jpg',
		'طلاب 2025/IMG-20251027-WA0083.jpg',
		'طلاب 2025/IMG-20251027-WA0084.jpg',
		'طلاب 2025/IMG-20251027-WA0085.jpg'
	];
	
	constructor(private seo: SeoService, private canonical: CanonicalService, private jsonld: JsonLdService) {
		const siteUrl = (typeof window !== 'undefined' ? (window as any)['NG_SITE_URL'] : process.env['NG_SITE_URL']) || 'https://example.com';
		const title = 'ابلكيشن معادلة كلية هندسة';
		const description = 'بنجهّزك لاجتياز معادلة كلية الهندسة بخطوات واضحة ومحتوى مُبسّط وتمارين عملية.';
		this.seo.setTitle(title);
		this.seo.setDescription(description);
		this.seo.setOgTags({ title, description, url: siteUrl });
		this.seo.setTwitterTags({ title, description });
		this.canonical.setCanonical();
		this.jsonld.setJsonLd({
			"@context": "https://schema.org",
			"@type": "Organization",
			name: 'معادلة كلية هندسة',
			url: siteUrl
		});
		this.jsonld.setJsonLd({
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: 'معادلة كلية هندسة',
			url: siteUrl,
			potentialAction: {
				"@type": "SearchAction",
				target: siteUrl.replace(/\/$/, '') + '/blog?search={query}',
				"query-input": "required name=query"
			}
		}, 'website-ld');
	}

	ngOnInit() {
		// العودة إلى أعلى الصفحة عند تحميل الصفحة
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
		
		// Preload critical images for faster loading
		this.preloadImages();
	}

	ngAfterViewInit() {
		// Setup video autoplay after view is initialized
		this.setupVideoAutoplay();
	}
	
	private setupVideoAutoplay() {
		if (typeof window !== 'undefined') {
			// Try multiple times with different delays
			const tryPlay = () => {
				const video = this.heroVideo?.nativeElement;
				if (video) {
					console.log('Attempting to play video...');
					// Ensure video is muted for autoplay
					video.muted = true;
					video.setAttribute('muted', 'true');
					video.volume = 0;
					
					// Force video to be visible
					video.style.display = 'block';
					video.style.opacity = '1';
					video.style.zIndex = '2';
					
					const playPromise = video.play();
					if (playPromise !== undefined) {
						playPromise.then(() => {
							console.log('Video started playing!');
							// Ensure video stays playing
							video.currentTime = 0;
						}).catch(error => {
							console.log('Video play failed:', error);
							// Try again after user interaction
							const playOnInteraction = () => {
								video.play().then(() => {
									console.log('Video started after user interaction!');
									document.removeEventListener('click', playOnInteraction);
									document.removeEventListener('touchstart', playOnInteraction);
								}).catch(() => {});
							};
							document.addEventListener('click', playOnInteraction, { once: true });
							document.addEventListener('touchstart', playOnInteraction, { once: true });
						});
					}
				} else {
					console.log('Video element not found');
				}
			};

			// Try immediately
			setTimeout(tryPlay, 100);
			
			// Try after video loads
			setTimeout(tryPlay, 500);
			
			// Try after 1 second
			setTimeout(tryPlay, 1000);
			
			// Try after 2 seconds
			setTimeout(tryPlay, 2000);
		}
	}
	
	private preloadImages() {
		if (typeof window !== 'undefined') {
			const criticalImages = [
				'/assets/teacher.png',
				'/assets/student1.png'
			];
			
			criticalImages.forEach(src => {
				const img = new Image();
				img.src = src;
			});
		}
	}

	scrollReviewsPrev() {
		if (this.reviewsTrack) {
			const track = this.reviewsTrack.nativeElement;
			const cardWidth = track.querySelector('.carousel-figure')?.clientWidth || 300;
			track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
		}
	}

	scrollReviewsNext() {
		if (this.reviewsTrack) {
			const track = this.reviewsTrack.nativeElement;
			const cardWidth = track.querySelector('.carousel-figure')?.clientWidth || 300;
			track.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
		}
	}

	scrollPhotosPrev() {
		if (this.photosTrack) {
			const track = this.photosTrack.nativeElement;
			const cardWidth = track.querySelector('.photo-card')?.clientWidth || 200;
			track.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
		}
	}

	scrollPhotosNext() {
		if (this.photosTrack) {
			const track = this.photosTrack.nativeElement;
			const cardWidth = track.querySelector('.photo-card')?.clientWidth || 200;
			track.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
		}
	}

	openPhoto(photo: string) {
		this.selectedPhoto = photo;
		// Prevent body scroll when modal is open
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	closePhoto() {
		this.selectedPhoto = null;
		// Restore body scroll
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'auto';
		}
	}

	onVideoReady() {
		console.log('Video metadata loaded');
		const video = this.heroVideo?.nativeElement;
		if (video) {
			video.muted = true;
			video.play().catch(error => {
				console.log('Video play failed on ready:', error);
			});
		}
	}

	onVideoCanPlay() {
		console.log('Video can play');
		const video = this.heroVideo?.nativeElement;
		if (video) {
			video.muted = true;
			video.play().catch(error => {
				console.log('Video play failed on canplay:', error);
			});
		}
	}

	onVideoError() {
		console.log('Video error occurred');
		const video = this.heroVideo?.nativeElement;
		if (video) {
			// Try to reload the video
			video.load();
			// Try to play again after a short delay
			setTimeout(() => {
				if (video) {
					video.muted = true;
					video.play().catch(error => {
						console.log('Video play failed after error:', error);
					});
				}
			}, 500);
		}
	}

}
