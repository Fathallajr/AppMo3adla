import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-social-links',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './social-links.component.html',
	styleUrls: ['./social-links.component.css'],
})
export class SocialLinksComponent {
	@Input() direction: 'row' | 'col' = 'row';
	@Input() size: 'sm' | 'md' = 'sm';

	get links() {
		const w: any = typeof window !== 'undefined' ? window : {};
		return [
			{ key: 'FACEBOOK', label: 'Facebook', url: w['NG_FB'] || '' , icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
			{ key: 'FB_GROUP', label: 'Facebook Group', url: w['NG_FB_GROUP'] || '' , icon: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm-7 8v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z' },
			{ key: 'YOUTUBE', label: 'YouTube', url: w['NG_YT'] || '', icon: 'M10 8l6 4-6 4V8z M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z' },
			{ key: 'INSTAGRAM', label: 'Instagram', url: w['NG_IG'] || '', icon: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 5 5 5 5 0 0 0-5-5Zm6-2a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z' },
			{ key: 'TIKTOK', label: 'TikTok', url: w['NG_TT'] || '', icon: 'M14 2v6a6 6 0 1 1-6 6h4a2 2 0 1 0 2-2V2z' },
			{ key: 'TELEGRAM', label: 'Telegram', url: w['NG_TG'] || '', icon: 'M21 3 3 11l6 2 2 6 4-5 5-11z' },
			{ key: 'PLATFORM', label: 'المنصة', url: w['NG_PLATFORM'] || '', icon: 'M4 6h16v4H4zm0 6h16v8H4z' },
			{ key: 'WHATSAPP', label: 'WhatsApp', url: w['NG_WA'] || (w['NG_WHATSAPP'] ? 'https://api.whatsapp.com/send?phone=' + w['NG_WHATSAPP'] : ''), icon: 'M20 3H4a1 1 0 0 0-1 1v16l4-3h13a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-6.5 12.5A6.5 6.5 0 1 1 20.5 9a6.5 6.5 0 0 1-7 6.5z' },
		].filter(l => !!l.url);
	}
}


