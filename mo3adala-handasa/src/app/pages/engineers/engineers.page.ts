import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { subPageTransition, cardAnimation, staggerList, waveAnimation, cascadeAnimation, fadeInUp } from '../../shared/animations';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
  selector: 'app-engineers-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './engineers.page.html',
  styleUrls: ['./engineers.page.css'],
  animations: [subPageTransition, cardAnimation, staggerList, waveAnimation, cascadeAnimation, fadeInUp]
})
export class EngineersPageComponent implements OnInit {
  constructor(
    private router: Router,
    private seo: SeoService,
    private canonical: CanonicalService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
      const title = 'فريق المدرسين - ابلكيشن معادلة كلية هندسة';
      const description = 'تعرف على فريق المدرسين المتخصصين في معادلة كلية الهندسة وخبراتهم في تدريس المواد المختلفة';
      const url = `${siteUrl}/engineers`;
      
      this.seo.setTitle(title);
      this.seo.setDescription(description);
      this.seo.setOgTags({ title, description, url });
      this.seo.setTwitterTags({ title, description });
      this.canonical.setCanonical(url);
    }
  }

  viewTeacherDetails(teacherId: number) {
    this.router.navigate(['/teacher', teacherId]);
  }
}
