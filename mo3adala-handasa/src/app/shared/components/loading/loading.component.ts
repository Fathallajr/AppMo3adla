import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  showLoading = true;
  loadingProgress = 0;
  loadingText = 'جاري تحميل المحتوى...';
  fadeOut = false;

  ngOnInit() {
    this.simulateLoading();
  }

  simulateLoading() {
    const loadingSteps = [
      { progress: 0, text: 'جاري التحميل ...' },
      { progress: 100, text: 'تم التحميل بنجاح!' }
    ];

    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        this.loadingProgress = step.progress;
        this.loadingText = step.text;
        currentStep++;
      } else {
        clearInterval(interval);
        
        // إخفاء الـ loading بعد 800ms
        setTimeout(() => {
          this.fadeOut = true;
          setTimeout(() => {
            this.showLoading = false;
          }, 500);
        }, 800);
      }
    }, 600);
  }
}
