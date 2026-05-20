import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
}


