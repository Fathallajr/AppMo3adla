import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { subPageTransition, fadeInUp, staggerList, waveAnimation, cascadeAnimation } from '../../shared/animations';

@Component({
  selector: 'app-requirements-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './requirements.page.html',
  styleUrls: ['./requirements.page.css'],
  animations: [subPageTransition, fadeInUp, staggerList, waveAnimation, cascadeAnimation]
})
export class RequirementsPageComponent {
  constructor() {}
}
