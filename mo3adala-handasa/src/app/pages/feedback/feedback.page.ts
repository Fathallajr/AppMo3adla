import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-feedback-page',
	standalone: true,
	imports: [CommonModule, FormsModule, RouterLink],
	templateUrl: './feedback.page.html',
	styleUrls: ['./feedback.page.css'],
})
export class FeedbackPageComponent {
	submitted = false;
	submitting = false;
	submitError = '';
	private readonly feedbackEndpoint = 'https://script.google.com/macros/s/AKfycbx7ijUGUMkI7kk0RNgV4I_OS0GMLvjpypkeZWmNl0V4x7Xk5epvCxggWvQU1krZpQyW/exec';

	async submitFeedback(form: NgForm): Promise<void> {
		if (form.invalid || this.submitting) return;

		this.submitting = true;
		this.submitError = '';
		try {
			await fetch(this.feedbackEndpoint, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'text/plain;charset=utf-8' },
				body: JSON.stringify({
					name: form.value.name,
					university: form.value.university,
					rating: form.value.rating,
					message: form.value.message,
				}),
			});
			this.submitted = true;
		} catch {
			this.submitError = 'حصلت مشكلة أثناء الإرسال. حاول تاني من فضلك.';
		} finally {
			this.submitting = false;
		}
	}
}
