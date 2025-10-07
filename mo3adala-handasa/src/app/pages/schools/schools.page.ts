import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { subPageTransition, fadeInUp, staggerList, cardAnimation } from '../../shared/animations';

@Component({
  selector: 'app-schools-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.css'],
  animations: [subPageTransition, fadeInUp, staggerList, cardAnimation]
})
export class SchoolsPageComponent {
  searchTerm = '';
  selectedFilter = 'الكل';
  pageSize = 24;
  displayedCount = this.pageSize;
  
  filterOptions = [
    'الكل',
    'المعاهد الفنية',
    'مدارس الثانوية الصناعية نظام 3 سنوات',
    'مدارس الثانوية الصناعية نظام 5 سنوات',
    'مدارس تكنولوجية نظام 3 سنوات',
    'مدارس تكنولوجية نظام 5 سنوات'
  ];

  allSchools = [] as Array<{ id: number; name: string; type: string; category: string; logo: string }>;

  private nextId = 1;

  private addSchool(name: string, category: string, logo?: string, typeOverride?: string) {
    this.allSchools.push({
      id: this.nextId++,
      name,
      type: typeOverride || (category.includes('تكنولوجية') ? 'مدرسة تكنولوجية' : (category === 'المعاهد الفنية' ? 'معهد فني' : 'مدرسة صناعية')),
      category,
      logo: logo || '/assets/schools/tech-school.png'
    });
  }

  ngOnInit() {
    const category3 = 'مدارس الثانوية الصناعية نظام 3 سنوات';
    const newIndustrial3YearSchools: { name: string; logo?: string }[] = [
      { name: 'ناصر الثانوية الفنية بنات' },
      { name: 'مبارك كول', logo:'/assets/schools/mobarak-koll.png' },// logooooooooooooooooooo
      { name: '15 مايو الثانوية الصناعية بنات' },
      { name: 'الثانوية الكهربائية العسكرية ببني سويف' },
      { name: 'الإسكندرية الصناعية للبترول والنقل البحري', logo: '/assets/schools/الاسكندرية الثانوية الصناعية للبترول والنقل البحرى والصناعات.jpeg' },
      { name: 'السيدة نفيسة الإلكترونية بنات' },
      { name: 'المعهد الفني للعلوم والتكنولوجيا', logo: '/assets/schools/المعهد الفنى للعلوم والتكنولوجيا.png' },
      { name: 'معهد السالزيان دون بوسكو IPI' },
      { name: '24 اكتوبر' },
      { name: 'قليوب الثانوية الصناعية بنين' },
      { name: 'دمياط الثانوية الميكانيكية العسكرية' },
      { name: 'بني سويف الثانوية الكهربائية العسكرية' },
      { name: 'الشهيد احمد محمد احمد الشناوي' },
      { name: 'مياه الشرب والصرف الصحي', logo: '/assets/schools/ْالمدرسة الثانوية الفنية لمياه الشرب والصرف الصحي.jpeg' },
      { name: 'أبو عطوة الثانوية صناعة بنات' },
      { name: 'الإسكندرية للبترول والبتروكيماويات' },
      { name: 'عرب جهينة الصناعية ' },
      { name: 'العبور الثانوية الصناعية المشتركة' },
      { name: 'ديروط الثانوية الصناعية بنين' },
      { name: 'الفيوم الميكانيكية الصناعية' },
      { name: 'سمارت للحاسبات والإلكترونات', logo: '/assets/schools/سمارت للحاسبات والالكترونات.jpeg' },
      { name: 'الثانوية الفنية للتعليم والتدريب المزدوج' },
      { name: 'السيدة خديجة الصناعية بنات' },
      { name: 'كفر صقر الصناعية' },
      { name: 'الشهيد ماجد فرج الثانوية الصناعية العسكرية' },
      { name: 'بني سويف الثانوية الكهربائية العسكرية بنين' },
      { name: 'المحلة الثانوية الميكانيكية العسكرية' },
      { name: 'كفر الدوار الثانوية الصناعية' },
      { name: 'إمبابة الثانوية الصناعية' },
      { name: 'الشهيد خالد محمد السيد دبور الزخرفية الثانوية بنين' },
      { name: 'ساحل سليم الثانوية الصناعية' },
      { name: 'كفر الزيات الثانوية الصناعية بنات' },
      { name: 'الشهيد هاني لطفي حرك الثانوية بنات' },
      { name: 'سمنود الثانوية الصناعية المهني' },
      { name: 'برج العرب الثانوية الصناعية العسكرية' },
      { name: 'ابو حمص الثانوية الصناعية بنين' },
      { name: 'ادكو الثانوية الصناعية العسكرية بنين' },
      { name: 'سيدي سالم الثانوية الصناعية العسكرية' },
      { name: 'محمد حسين هلال الثانوية الصناعية العسكري' },
      { name: 'رشيد الثانوية الصناعية العسكرية' },
      { name: 'الشهيد الطيار محمد بهجت شقير' },
      { name: 'فوه الثانوية الصناعية النسيجية بنات' },
      { name: 'أرمنت الثانوية الميكانيكية' },
      { name: 'السادات الثانوية الميكانيكية العسكرية' },
      { name: 'الأورمان الثانوية الفنية المتقدمة للحاسبات والإلكترونيات' },
      { name: 'قلين الثانوية الصناعية' },
      { name: 'عين حلوان الثانوية الصناعية (العسكرية)' },
      { name: 'الشهيد محمد فوزي الحوفي' },
      { name: 'الجيزة الكهربية' },
      { name: 'غمرة الثانوية الصناعية' },
      { name: 'أخميم الثانوية الصناعية بنات' },
      { name: 'نزلة محمد سمهان' },
      { name: 'بني حرب الصناعية المعمارية بنين' },
      { name: 'تلا الصناعية' },
      { name: 'بي العرب' },
      { name: 'النوبارية الصناعية المشتركة' },
      { name: 'السلام الثانوية الصناعية بنات' },
      { name: 'محمد صلاح الثانوية الصناعية العسكرية بنين' },
      { name: 'الحوامدية الصناعية للتعليم المزدوج' },
      { name: 'ناصر الثانوية' },
      { name: 'ديرب نجم الصناعية بنين' },
      { name: 'مصطفى حسانين عمر' },
      { name: 'أبورواش الثانوية الصناعية المشتركة' },
      { name: 'بنها الثانوية الزخرفية بنين' },
      { name: 'سلطان عويس' },
      { name: 'أبو تيج الثانوية الصناعية' },
      { name: 'الشهيد يحيى البحيري الصناعية العسكرية' },
      { name: 'الديب الصناعية بنات' },
      { name: 'الثانوية الفنية للتعليم والتدريب المزدوج للتأسيس العسكري' },
      { name: 'مركز التميز للصناعات الهندسية' }
    ];

    newIndustrial3YearSchools.forEach(s => this.addSchool(s.name, category3, s.logo));

    // Additional 3-year industrial schools (deduplicated by name)
    const additionalIndustrial3: { name: string; logo?: string }[] = [
      { name: 'أحمد عرابي الثانوية الصناعية' },
      { name: 'الثانوية الصناعية بنقادة' },
      { name: 'السيدة خديجة أم المؤمنين الصناعية بنات' },
      { name: 'المعادي الثانوية الصناعية بنات' },
      { name: 'تل بني عمران الثانوية المشتركة' },
      { name: 'المطرية الصناعية' },
      { name: 'الشهيد طيار محمد بهجت' },
      { name: 'القرين الثانوية الصناعية العسكرية المشتركة' },
      { name: 'الدرافيل الصناعية المشتركة' },
      { name: 'المصرية للتلمذة الصناعية' },
      { name: 'المريم الثانوية الصناعية الحديثة' },
      { name: 'الصباح الصناعية بنات' },
      { name: 'الشهيد محمد عبد الله حسين الفنية بنات' },
      { name: 'منوف الثانوية الصناعية العسكرية بنين' },
      { name: 'الشهيد محمد فوزي الحوفي' },
      { name: 'أخميم الثانوية الصناعية بنات' },
      { name: 'صالح عوض الله الثانوية الصناعية' },
      { name: 'الشهيد سامي علي نصر الدين الصناعية بنات' },
      { name: 'النوبارية الثانوية الصناعية المشتركة' },
      { name: 'صلاح العيوطي الفنية بنات' },
      { name: 'نكلا الثانوية الصناعية' },
      { name: 'كفر صقر الثانوية الصناعية' },
      { name: 'طنطا الثانوية الكهربية' },
      { name: 'شبرا الثانوية الميكانيكية العسكرية' },
      { name: 'الغردقة الثانوية الصناعية' },
      { name: 'غمرة الثانوية الصناعية بنين' },
      { name: 'إسنا الثانوية الصناعية بنات' },
      { name: 'الغنايم الثانوية الصناعية المشتركة العسكرية' },
      { name: 'الشهيد حسام جمال جمعة الثانوية الصناعية' },
      { name: 'المنفلوطي الثانوية الصناعية المشتركة' },
      { name: 'الخصوص الثانوية الصناعية بنين' },
      { name: 'كفر الشيخ الثانوية الصناعية العسكرية بنين' },
      { name: 'خزام الثانوية المشتركة' },
      { name: 'الشهيد أحمد الكفراوي' },
      { name: 'منيا القمح الصناعية بنين' },
      { name: 'السلام الصناعية بنات' },
      { name: 'المشير طنطاوي الثانوية بنين' },
      { name: 'حلوان الثانوية الميكانيكية العسكرية' },
      { name: 'أبو حماد الصناعية' },
      { name: 'قويسنا الثانوية الصناعية العسكرية بنين' },
      { name: 'محمد فوزي الحوفي' },
      { name: 'كفر الدوار الثانوية الميكانيكية' },
      { name: 'الدلنجات الصناعية بنين' },
      { name: 'أبو صوير الثانوية الصناعية المشتركة' },
      { name: 'أخميم الثانوية الصناعية بنات' },
      { name: 'كفر شكر الثانوية الصناعية بنين' },
      { name: 'الشهيد محمد عبد الله حسين' },
      { name: 'الشهيد فارس النعمان' },
      { name: 'السويس الثانوية الفنية الصناعية' },
      { name: 'الحسينية الثانوية الفنية الصناعية المشتركة' },
      { name: 'المحمودية الثانوية الصناعية بنات' },
      { name: 'إدكو الثانوية الصناعية بنين' },
      { name: 'رقي المعارف الثانوية الصناعية بنات' },
      { name: 'محمد صلاح الثانوية الصناعية العسكرية' },
      { name: 'أبوكساه الثانوية الصناعية العسكرية بنين' },
      { name: 'أسيوط الثانوية الصناعية بنات' },
      { name: 'الشهيد يحيى البحيري الثانوية الصناعية' },
      { name: 'بلطيم الثانوية الصناعية بنين' },
      { name: 'الشهيد محمد رضا الشناوي' },
      { name: 'كوم حمادة الصناعية بنات' },
      { name: 'الشهيد محمد عرفة' },
      { name: 'الصف الثانوية الصناعية بنات' },
      { name: 'المنشأة الثانوية الفنية الجديدة بنات' },
      { name: 'هيثم سامي حمد الثانوية الفنية بنات' },
      { name: 'بني سويف الثانوية الميكانيكية' },
      { name: 'الشهيد محمود محمد أحمد الثانوية الصناعية المشتركة' },
      { name: 'إبراهيم عثمان الثانوية الصناعية' },
      { name: 'بدير الحديدي الثانوية الصناعية' },
      { name: 'ببا الثانوية الصناعية العسكرية بنين' },
      { name: 'أويش الحجر الثانوية الصناعية' },
      { name: 'الخصوص الثانوية الصناعية بنين' },
      { name: 'محمد حسين هلال' },
      { name: 'حجازة الصناعية' },
      { name: 'تفتيش كفر سعد الثانوية الصناعية العسكرية بنين' },
      { name: 'سرسو البرامون الثانوية الصناعية العسكرية' }
    ];
    additionalIndustrial3.forEach(s => {
      if (!this.allSchools.some(x => x.name === s.name)) {
        this.addSchool(s.name, category3, s.logo);
      }
    });

    const category5 = 'مدارس الثانوية الصناعية نظام 5 سنوات';
    const newIndustrial5YearSchools: { name: string; logo?: string }[] = [
      { name: 'السلام المعمارية العسكرية' },
      { name: 'الإسكندرية الفنية المتقدمة' },
      { name: 'دار السلام المعمارية الفنية المتقدمة' },
      { name: 'معهد السالزيان دون بوسكو ITI', logo: '/assets/schools/معهد السالزيان دون بوسكو.jpeg' },
      { name: 'مدرسة مطروح الثانوية الصناعية العسكرية بنبن' },
      { name: 'الشهيد احمد محمد احمد الشناوي' },
      { name: 'جلال فهمي الفنية المتقدمة', logo: '/assets/schools/جلال فهمي الفنيه المتقدمه.jpeg' },
      { name: 'صالح عوض الله' },
      { name: 'العبور الثانوية الصناعية العسكرية المشتركة' },
      { name: 'هواره الصناعية المتقدمة' },
      { name: 'الفنية المتقدمة لتكنولوجيا الصيانة' },
      { name: '15 مايو الفنية المتقدمة العسكرية' },
      { name: 'السلطان عويس الفنية العسكرية المتقدمة' },
      { name: '6 أكتوبر الفنية المتقدمة' },
      { name: 'الثانوية الفنية المتقدمة الصناعية العسكرية' },
      { name: 'محمد صالح حرب الفنية الصناعية المتقدمة' },
      { name: 'الورديان الفنية المتقدمة العسكرية' },
      { name: 'الحديد والصلب الفنية المتقدمة' }
    ];

    newIndustrial5YearSchools.forEach(s => this.addSchool(s.name, category5, s.logo));

    // المعاهد الفنية
    const institutesCategory = 'المعاهد الفنية';
    const institutes: { name: string; logo?: string; type?: string }[] = [
      { name: 'المعهد الفني الصناعي' },
      { name: 'معهد مساحة' },
      { name: 'معهد فني صحي' }
    ];
    institutes.forEach(s => this.addSchool(s.name, institutesCategory, s.logo, s.type || 'معهد فني'));

    // مدارس تكنولوجية نظام 3 سنوات
    const tech3Category = 'مدارس تكنولوجية نظام 3 سنوات';
    const tech3Schools: { name: string; logo?: string }[] = [
      { name: 'WE', logo: '/assets/schools/مدرسة WE للتكنولوجيا التطبيقية_.jpg' },
      { name: 'الشهيد عمرو مصطفى حسني' },
      { name: 'السويدي الدولية للتكنولوجيا (STA)' },
      { name: 'محمد متولي الشعراوي تكنولوجيا تطبيقية' },
      { name: 'عمار للتكنولوجيا التطبيقية', logo: '/assets/schools/عمار للتكنولوجيا التطبيقيه.jpg' },
      { name: 'حلوان للتكنولوجيا التطبيقية' },
      { name: 'الإنتاج الحربي للتكنولوجيا التطبيقية' },
      { name: 'إلكترو مصر للتكنولوجيا التطبيقية', logo: '/assets/schools/إلكترو مصر للتكنولوجيا التطبيقية.jpeg' },
      { name: 'الفنون للتكنولوجيا التطبيقية' },
      { name: 'العربي للتكنولوجيا التطبيقية', logo: '/assets/schools/العربي للتكنولوجيا التطبيقية.png' },
      { name: 'إيجيبت جولد للتكنولوجيا التطبيقية', logo: '/assets/schools/إيجيبت جولد للتكنولوجيا التطبيقية.jpeg' },
      { name: 'الصالحية للتكنولوجيا التطبيقية' },
      { name: 'STEP' },
      { name: 'بنك مصر للتكنولوجيا التطبيقية وصناعات دوائية' },
      { name: 'Mountain View', logo: '/assets/schools/Mountain View.jpeg' },
      { name: 'فولكس فاجن للكتنولوجية التطبيقية' },
      { name: 'المجمع التكنولوجي المتكامل' },
      { name: 'ظهر للتكنولوجيا التطبيقية' },
      { name: 'غبور 2', logo: '/assets/schools/غبور.jpg' },
      { name: 'الفنية المتقدمة لتكنولوجيا الصيانة' },
      { name: 'أكاديمية مصر الدولية للحاسبات والذكاء الاصطناعي (MICA)', logo: '/assets/schools/أكاديمية مصر الدولية للحاسبات والذكاء الاصطناعي .jpeg' },
      { name: 'النقل النهري للتكنولوجيا التطبيقية' },
      { name: 'HST', logo: '/assets/schools/HST School for Applied Technology.jpeg' },
      { name: 'نهضة مصر المعمارية' },
      { name: 'تكنولوجيا تطبيقية للميكاترونكس' },
      { name: 'فريش الدولية للتكنولوجيا التطبيقية' },
      { name: 'الأكاديمية الحديثة للطباعة' },
      { name: 'معهد هليوبوليس للتكنولوجيا' }
    ];
    tech3Schools.forEach(s => this.addSchool(s.name, tech3Category, s.logo));

    // مدارس تكنولوجية نظام 5 سنوات
    const tech5Category = 'مدارس تكنولوجية نظام 5 سنوات';
    const tech5Schools: { name: string; logo?: string }[] = [
      { name: 'الفنية المتقدمة لتكنولوجيا الصيانة' }
    ];
    tech5Schools.forEach(s => this.addSchool(s.name, tech5Category, s.logo));
  }

  constructor() {}

  get schools() {
    let filteredSchools = this.allSchools;

    // Apply category filter
    if (this.selectedFilter !== 'الكل') {
      filteredSchools = filteredSchools.filter(school => {
        if (this.selectedFilter === 'المعاهد الفنية') {
          return school.category === 'المعاهد الفنية' || school.category.includes('معهد');
        }
        return school.category === this.selectedFilter;
      });
    }

    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filteredSchools = filteredSchools.filter(school =>
        school.name.toLowerCase().includes(term) ||
        school.type.toLowerCase().includes(term)
      );
    }

    return filteredSchools.slice(0, this.displayedCount);
  }

  get totalFilteredCount(): number {
    let filteredSchools = this.allSchools;
    if (this.selectedFilter !== 'الكل') {
      filteredSchools = filteredSchools.filter(school => {
        if (this.selectedFilter === 'المعاهد الفنية') {
          return school.category === 'المعاهد الفنية' || school.category.includes('معهد');
        }
        return school.category === this.selectedFilter;
      });
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filteredSchools = filteredSchools.filter(school =>
        school.name.toLowerCase().includes(term) ||
        school.type.toLowerCase().includes(term)
      );
    }
    return filteredSchools.length;
  }

  get canLoadMore(): boolean {
    return this.displayedCount < this.totalFilteredCount;
  }

  loadMore() {
    this.displayedCount += this.pageSize;
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.displayedCount = this.pageSize;
  }

  onSearchChange() {
    // Search happens automatically through the getter
    this.displayedCount = this.pageSize;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedFilter = 'الكل';
    this.displayedCount = this.pageSize;
  }

  getCountByCategory(category: string): number {
    if (category === 'المعاهد الفنية') {
      return this.allSchools.filter(school => 
        school.category === 'المعاهد الفنية' || school.category.includes('معهد')
      ).length;
    }
    return this.allSchools.filter(school => school.category === category).length;
  }

}
