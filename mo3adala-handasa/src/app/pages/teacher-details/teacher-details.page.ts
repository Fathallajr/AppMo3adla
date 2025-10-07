import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    whatsapp?: string;
    youtube?: string;
  };
  demoVideo?: {
    youtubeId?: string;
    duration?: string;
    level?: string;
    topic?: string;
    description?: string;
  };
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
      name: 'م/ أحمد فتح الله',
      subject: ' ',
      image: 'assets/teacher.jpg',
      degree: '  ',
      experience: 9,
      specialization: 'الرياضيات العامة والخاصة',
      bio: '',
      email: 'ahmed.fathallah@engineering.edu',
      phone: '+201554843745',
      office: 'مبنى الرياضيات - الطابق الثالث - مكتب 301',
      officeHours: 'الأحد - الخميس: 10:00 ص - 2:00 م',
      socialLinks: {
        facebook: 'https://www.facebook.com/share/1D7WGR9Ccz/',
        whatsapp: 'https://wa.me/201554843745',
        youtube: 'https://youtube.com/@mr-ahmed-fathallah?si=QVMnPGojPl1KKAkm'
      },
      demoVideo: {
        youtubeId: 'djoD3N7lbfk',
        duration: '15 دقيقة',
        level: 'مبتدئ',
        topic: 'مقدمة في التفاضل والتكامل',
        description: 'شرح مبسط لمفاهيم التفاضل والتكامل الأساسية'
      }
    },
    {
      id: 2,
      name: 'م/ أحمد أبو زيد',
      subject: '',
      image: 'assets/teacher1.jpg',
      degree: '',
      experience: 6,
      specialization: 'الميكانيكا',
      bio: '',
      email: 'ahmed.abouzeid@engineering.edu',
      phone: '+201151016262',
      office: 'مبنى الميكانيكا - الطابق الثاني - مكتب 205',
      officeHours: 'الأحد - الأربعاء: 9:00 ص - 1:00 م',
      socialLinks: {
        facebook: 'https://www.facebook.com/share/19rxae4tSv/',
        whatsapp: 'https://wa.me/201151016262',
        youtube: 'https://youtube.com/@ahmed_abozeid?si=6iNPTZ2o5zAuuIsN'
      },
      demoVideo: {
        youtubeId: 'KjYtUgx7Txk',
        duration: '12 دقيقة',
        level: 'متوسط',
        topic: 'مقدمة في الميكانيكا',
        description: 'شرح أساسيات الميكانيكا والهندسة الميكانيكية'
      }
    },
    {
      id: 3,
      name: 'د/ سعد العميري',
      subject: '',
      image: 'assets/teacher4.jpg',
      degree: '',
      experience: 4,
      specialization: 'الكيمياء ',
      bio: '',
      email: 'saad.alomairi@engineering.edu',
      phone: '+201148068718',
      office: 'مبنى الكيمياء - الطابق الأول - مكتب 101',
      officeHours: 'السبت - الأربعاء: 8:00 ص - 12:00 م',
      socialLinks: {
        facebook: 'https://www.facebook.com/share/1BBUji24Kc/',
        whatsapp: 'https://wa.me/201148068718',
        youtube: 'https://youtube.com/@saadalaamairy6005?si=euH312iqEJN4ehb4'
      },
      demoVideo: {
        youtubeId: '91tK2WkVK5U',
        duration: '18 دقيقة',
        level: 'متقدم',
        topic: 'الكيمياء التحليلية',
        description: 'شرح مفاهيم الكيمياء التحليلية والتطبيقات العملية'
      }
    },
    {
      id: 4,
      name: 'م/ أحمد الشامي',
      subject: '',
      image: 'assets/teacher3.jpg',
      degree: 'ماجستير في الفيزياء',
      experience: 5,
      specialization: 'الفيزياء',
      bio: '',
      email: 'ahmed.alshami@engineering.edu',
      phone: '+201000278286',
      office: 'مبنى الفيزياء - الطابق الثاني - مكتب 202',
      officeHours: 'الأحد - الخميس: 11:00 ص - 3:00 م',
      socialLinks: {
        facebook: 'https://www.facebook.com/share/1B4CMMLdP7/',
        whatsapp: 'https://wa.me/201000278286',
        youtube: 'https://youtube.com/@pi-in-physics?si=cwgjm8J4_Bdu-6cI'
      },
      demoVideo: {
        youtubeId: 'qDbUWRfLieI',
        duration: '20 دقيقة',
        level: 'متوسط',
        topic: 'الفيزياء العامة',
        description: 'شرح أساسيات الفيزياء والميكانيكا'
      }
    },
    {
      id: 5,
      name: 'م/ إبرام سامي',
      subject: '',
      image: 'assets/teacher2.jpg',
      degree: '',
      experience: 11,
      specialization: 'اللغة الإنجليزية ',
      bio: '',
      email: 'ibram.samy@engineering.edu',
      phone: '+201099267711',
      office: 'مبنى اللغات - الطابق الثالث - مكتب 303',
      officeHours: 'الأحد - الخميس: 9:00 ص - 2:00 م',
      socialLinks: {
        facebook: 'https://www.facebook.com/share/1B6khgmjSt/',
        whatsapp: 'https://wa.me/201099267711',
        youtube: 'https://youtube.com/@ebraamsamy7649?si=rOKfbKl3jmdKnHro'
      },
      demoVideo: {
        youtubeId: 'xtBmX2DMMBo',
        duration: '14 دقيقة',
        level: 'متقدم',
        topic: 'اللغة الإنجليزية التقنية',
        description: 'شرح مفاهيم اللغة الإنجليزية التقنية والأكاديمية'
      }
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {}

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

  getVideoEmbedUrl(): SafeResourceUrl {
    if (!this.teacher?.demoVideo?.youtubeId) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
    
    const url = `https://www.youtube.com/embed/${this.teacher.demoVideo.youtubeId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
