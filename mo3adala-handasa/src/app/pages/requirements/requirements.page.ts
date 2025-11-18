import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { subPageTransition, fadeInUp, staggerList, waveAnimation, cascadeAnimation } from '../../shared/animations';
import { SeoService } from '../../core/seo.service';
import { CanonicalService } from '../../core/canonical.service';

@Component({
  selector: 'app-requirements-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './requirements.page.html',
  styleUrls: ['./requirements.page.css'],
  animations: [subPageTransition, fadeInUp, staggerList, waveAnimation, cascadeAnimation]
})
export class RequirementsPageComponent implements OnInit {
  constructor(
    private seo: SeoService,
    private canonical: CanonicalService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const siteUrl = (window as any)['NG_SITE_URL'] || 'https://appmo3adla.com';
      const title = 'شروط التقديم - ابلكيشن معادلة كلية هندسة';
      const description = 'تعرف على شروط التقديم لمعادلة كلية الهندسة والمتطلبات اللازمة للدخول لكلية الهندسة';
      const url = `${siteUrl}/requirements`;
      
      this.seo.setTitle(title);
      this.seo.setDescription(description);
      this.seo.setOgTags({ title, description, url });
      this.seo.setTwitterTags({ title, description });
      this.canonical.setCanonical(url);
    }
  }
}
