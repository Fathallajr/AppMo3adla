import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { subPageTransition, cardAnimation, staggerList, waveAnimation, cascadeAnimation, fadeInUp } from '../../shared/animations';

@Component({
  selector: 'app-engineers-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './engineers.page.html',
  styleUrls: ['./engineers.page.css'],
  animations: [subPageTransition, cardAnimation, staggerList, waveAnimation, cascadeAnimation, fadeInUp]
})
export class EngineersPageComponent {
  constructor(private router: Router) {}

  viewTeacherDetails(teacherId: number) {
    this.router.navigate(['/teacher', teacherId]);
  }
}
