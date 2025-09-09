import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
  degree: string;
  experience: number;
  specialization: string;
  bio: string;
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    website?: string;
    github?: string;
  };
  courses: string[];
  publications: string[];
  achievements: string[];
}

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-details.page.html',
  styleUrls: ['./teacher-details.page.css']
})
export class TeacherDetailsPageComponent implements OnInit {
  teacher: Teacher | null = null;
  teacherId: number = 0;

  teachers: Teacher[] = [
    {
      id: 1,
      name: ' المهندس أحمد فتح الله',
      subject: 'أستاذ الرياضيات',
      image: '/assets/teachers/ahmed-mohamed.jpg',
      degree: ' الرياضيات التطبيقية',
      experience: 15,
      specialization: 'الجبر والتفاضل والتكامل',
      bio: ' أحمد فتح الله حاصل على دكتوراه في الرياضيات التطبيقية من جامعة القاهرة، وله خبرة واسعة في تدريس الرياضيات للطلاب في مختلف المراحل. يهتم بتطوير طرق التدريس الحديثة وتطبيق التكنولوجيا في التعليم.',
      email: 'ahmedfathallah220@engineering.edu',
      phone: '+201064746369',
      office: 'مبنى الرياضيات - الطابق الثالث - مكتب 301',
      officeHours: 'الأحد - الخميس: 10:00 ص - 2:00 م',
      socialLinks: {
        facebook: 'https://facebook.com/ahmed.mohamed',
        linkedin: 'https://linkedin.com/in/ahmed-mohamed',
        youtube: 'https://youtube.com/@ahmed-mohamed-math'
      },
      courses: ['الجبر الخطي', 'التفاضل والتكامل', 'المعادلات التفاضلية', 'التحليل العددي'],
      publications: [
        'نظرية الأعداد في الرياضيات التطبيقية - 2023',
        'تطبيقات التفاضل في الهندسة - 2022',
        'التحليل العددي للمعادلات المعقدة - 2021'
      ],
      achievements: [
        'جائزة أفضل مدرس في الكلية - 2023',
        'نشر 15 بحث علمي في مجلات دولية',
        'رئيس قسم الرياضيات - 2020-2023'
      ]
    },
    {
      id: 2,
      name: 'د. سارة أحمد',
      subject: 'أستاذة الفيزياء',
      image: '/assets/teachers/sara-ahmed.jpg',
      degree: 'دكتوراه في الفيزياء النظرية',
      experience: 12,
      specialization: 'الميكانيكا والكهرباء',
      bio: 'د. سارة أحمد متخصصة في الفيزياء النظرية ولها إسهامات كبيرة في مجال الميكانيكا الكمية. تعمل على تطوير مناهج الفيزياء لتكون أكثر وضوحاً وسهولة للطلاب.',
      email: 'sara.ahmed@engineering.edu',
      phone: '+20 123 456 7891',
      office: 'مبنى الفيزياء - الطابق الثاني - مكتب 205',
      officeHours: 'الأحد - الأربعاء: 9:00 ص - 1:00 م',
      socialLinks: {
        twitter: 'https://twitter.com/sara_ahmed_physics',
        linkedin: 'https://linkedin.com/in/sara-ahmed-physics',
        website: 'https://sara-ahmed-physics.com'
      },
      courses: ['الفيزياء العامة', 'الميكانيكا الكلاسيكية', 'الكهرباء والمغناطيسية', 'الفيزياء الحديثة'],
      publications: [
        'تطبيقات الميكانيكا الكمية في الهندسة - 2023',
        'دراسة خصائص المواد النانوية - 2022',
        'تطوير أجهزة قياس دقيقة - 2021'
      ],
      achievements: [
        'جائزة التميز في البحث العلمي - 2022',
        'نشر 12 بحث في مجلات عالمية',
        'عضو في الجمعية الفيزيائية المصرية'
      ]
    },
    {
      id: 3,
      name: 'د. محمد حسن',
      subject: 'أستاذ الكيمياء',
      image: '/assets/teachers/mohamed-hassan.jpg',
      degree: 'دكتوراه في الكيمياء العضوية',
      experience: 18,
      specialization: 'الكيمياء التحليلية',
      bio: 'د. محمد حسن خبير في الكيمياء العضوية والتحليلية، له خبرة طويلة في تدريس الكيمياء وتطوير المختبرات. يعمل على ربط الكيمياء بالتطبيقات العملية في الصناعة.',
      email: 'mohamed.hassan@engineering.edu',
      phone: '+20 123 456 7892',
      office: 'مبنى الكيمياء - الطابق الأول - مكتب 101',
      officeHours: 'السبت - الأربعاء: 8:00 ص - 12:00 م',
      socialLinks: {
        facebook: 'https://facebook.com/mohamed.hassan.chemistry',
        linkedin: 'https://linkedin.com/in/mohamed-hassan-chemistry'
      },
      courses: ['الكيمياء العامة', 'الكيمياء العضوية', 'الكيمياء التحليلية', 'كيمياء البوليمرات'],
      publications: [
        'تطوير مواد بوليمرية جديدة - 2023',
        'طرق تحليل متقدمة للمواد الكيميائية - 2022',
        'تطبيقات الكيمياء الخضراء - 2021'
      ],
      achievements: [
        'جائزة الابتكار في الكيمياء - 2023',
        'براءة اختراع في تحليل المواد - 2022',
        'رئيس قسم الكيمياء - 2018-2021'
      ]
    },
    {
      id: 4,
      name: 'د. فاطمة محمود',
      subject: 'أستاذة اللغة الإنجليزية',
      image: '/assets/teachers/fatma-mahmoud.jpg',
      degree: 'ماجستير في الأدب الإنجليزي',
      experience: 10,
      specialization: 'اللغة الإنجليزية التقنية',
      bio: 'د. فاطمة محمود متخصصة في تدريس اللغة الإنجليزية للطلاب في التخصصات الهندسية. تعمل على تطوير مهارات التواصل باللغة الإنجليزية في المجال التقني.',
      email: 'fatma.mahmoud@engineering.edu',
      phone: '+20 123 456 7893',
      office: 'مبنى اللغات - الطابق الأول - مكتب 102',
      officeHours: 'الأحد - الخميس: 11:00 ص - 3:00 م',
      socialLinks: {
        facebook: 'https://facebook.com/fatma.mahmoud.english',
        youtube: 'https://youtube.com/@fatma-english-technical'
      },
      courses: ['اللغة الإنجليزية التقنية', 'التواصل المهني', 'الكتابة الأكاديمية', 'العرض والتقديم'],
      publications: [
        'تطوير منهج اللغة الإنجليزية للهندسة - 2023',
                        'مهارات التواصل في البيئة المهنية - 2022',
                        'استخدام التكنولوجيا في تعليم اللغات - 2021'
      ],
      achievements: [
        'جائزة التميز في التدريس - 2023',
                        'تطوير 5 دورات تدريبية للشركات',
                        'عضو في جمعية مدرسي اللغة الإنجليزية'
      ]
    },
    {
      id: 5,
      name: 'د. علي سعد',
      subject: 'أستاذ الهندسة المدنية',
      image: '/assets/teachers/ali-saad.jpg',
      degree: 'دكتوراه في الهندسة المدنية',
      experience: 20,
      specialization: 'الإنشاءات والخرسانة',
      bio: 'د. علي سعد خبير في الهندسة المدنية مع خبرة واسعة في المشاريع الإنشائية الكبرى. يهتم بتطوير تقنيات البناء المستدامة والخرسانة عالية الأداء.',
      email: 'ali.saad@engineering.edu',
      phone: '+20 123 456 7894',
      office: 'مبنى الهندسة المدنية - الطابق الثالث - مكتب 303',
      officeHours: 'الأحد - الخميس: 9:00 ص - 2:00 م',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/ali-saad-civil',
        website: 'https://ali-saad-civil-engineering.com'
      },
      courses: ['مقاومة المواد', 'تصميم المنشآت الخرسانية', 'الهندسة الجيوتقنية', 'إدارة المشاريع'],
      publications: [
        'تطوير خرسانة عالية الأداء - 2023',
                        'تقنيات البناء المستدام - 2022',
                        'تحليل المنشآت تحت الأحمال الزلزالية - 2021'
      ],
      achievements: [
        'جائزة الابتكار في البناء - 2023',
                        'استشارة في 50+ مشروع إنشائي',
                        'رئيس قسم الهندسة المدنية - 2015-2020'
      ]
    },
    {
      id: 6,
      name: 'د. نور رضا',
      subject: 'أستاذة هندسة الحاسبات',
      image: '/assets/teachers/nour-reda.jpg',
      degree: 'دكتوراه في علوم الحاسبات',
      experience: 14,
      specialization: 'البرمجة وهندسة البرمجيات',
      bio: 'د. نور رضا متخصصة في علوم الحاسبات وهندسة البرمجيات. تعمل على تطوير تطبيقات ذكية وتدريس أحدث تقنيات البرمجة للطلاب.',
      email: 'nour.reda@engineering.edu',
      phone: '+20 123 456 7895',
      office: 'مبنى الحاسبات - الطابق الرابع - مكتب 404',
      officeHours: 'الأحد - الأربعاء: 10:00 ص - 2:00 م',
      socialLinks: {
        twitter: 'https://twitter.com/nour_reda_cs',
        linkedin: 'https://linkedin.com/in/nour-reda-cs',
        github: 'https://github.com/nour-reda-cs'
      },
      courses: ['برمجة الحاسوب', 'هندسة البرمجيات', 'قواعد البيانات', 'الذكاء الاصطناعي'],
      publications: [
        'تطوير أنظمة ذكية للتعليم - 2023',
                        'أمن المعلومات في التطبيقات - 2022',
                        'تطبيقات الذكاء الاصطناعي في الهندسة - 2021'
      ],
      achievements: [
        'جائزة التميز التقني - 2023',
                        'تطوير 10+ تطبيقات تعليمية',
                        'عضو في جمعية مهندسي البرمجيات'
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teacherId = +params['id'];
      this.teacher = this.teachers.find(t => t.id === this.teacherId) || null;
      
      if (!this.teacher) {
        this.router.navigate(['/engineers']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/engineers']);
  }
}
