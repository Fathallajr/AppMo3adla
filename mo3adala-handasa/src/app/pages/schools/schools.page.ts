import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { subPageTransition, fadeInUp, staggerList, cardAnimation } from '../../shared/animations';

@Component({
  selector: 'app-schools-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.css'],
  animations: [subPageTransition, fadeInUp, staggerList, cardAnimation]
})
export class SchoolsPageComponent {
  schools = [
    {
      id: 1,
      name: 'المعهد الفني الصناعي',
      type: 'معهد فني',
      logo: '/assets/schools/technical-institute.png',
      description: 'أحد أعرق المعاهد الفنية في مصر',
      programs: ['هندسة ميكانيكية', 'هندسة كهربائية', 'هندسة مدنية'],
      established: '1950',
      students: '5000+'
    },
    {
      id: 2,
      name: 'معهد الإلكترونيات',
      type: 'معهد متخصص',
      logo: '/assets/schools/electronics-institute.png',
      description: 'متخصص في الهندسة الإلكترونية والحاسبات',
      programs: ['هندسة إلكترونية', 'هندسة حاسبات', 'هندسة اتصالات'],
      established: '1975',
      students: '3000+'
    },
    {
      id: 3,
      name: 'المعهد العالي للهندسة',
      type: 'معهد عالي',
      logo: '/assets/schools/higher-engineering.png',
      description: 'يقدم برامج هندسية متقدمة',
      programs: ['هندسة معمارية', 'هندسة كيميائية', 'هندسة نووية'],
      established: '1980',
      students: '4000+'
    },
    {
      id: 4,
      name: 'معهد البترول والتعدين',
      type: 'معهد متخصص',
      logo: '/assets/schools/petroleum-mining.png',
      description: 'رائد في هندسة البترول والتعدين',
      programs: ['هندسة بترول', 'هندسة تعدين', 'هندسة جيولوجية'],
      established: '1965',
      students: '2500+'
    },
    {
      id: 5,
      name: 'المعهد العالي للتكنولوجيا',
      type: 'معهد تكنولوجي',
      logo: '/assets/schools/technology-institute.png',
      description: 'متخصص في التكنولوجيا الحديثة',
      programs: ['هندسة برمجيات', 'هندسة شبكات', 'هندسة ذكاء اصطناعي'],
      established: '1990',
      students: '3500+'
    },
    {
      id: 6,
      name: 'معهد الهندسة البحرية',
      type: 'معهد متخصص',
      logo: '/assets/schools/marine-engineering.png',
      description: 'رائد في الهندسة البحرية والنقل البحري',
      programs: ['هندسة بحرية', 'هندسة موانئ', 'هندسة سفن'],
      established: '1970',
      students: '2000+'
    },
    {
      id: 7,
      name: 'معهد الهندسة الزراعية',
      type: 'معهد متخصص',
      logo: '/assets/schools/agricultural-engineering.png',
      description: 'متخصص في الهندسة الزراعية والري',
      programs: ['هندسة زراعية', 'هندسة ري', 'هندسة مياه'],
      established: '1985',
      students: '1800+'
    },
    {
      id: 8,
      name: 'معهد الهندسة الطبية',
      type: 'معهد متخصص',
      logo: '/assets/schools/medical-engineering.png',
      description: 'رائد في الهندسة الطبية والأجهزة',
      programs: ['هندسة طبية', 'هندسة أجهزة', 'هندسة حيوية'],
      established: '1995',
      students: '2200+'
    },
    {
      id: 9,
      name: 'معهد الهندسة البيئية',
      type: 'معهد متخصص',
      logo: '/assets/schools/environmental-engineering.png',
      description: 'متخصص في الهندسة البيئية والاستدامة',
      programs: ['هندسة بيئية', 'هندسة طاقة', 'هندسة استدامة'],
      established: '2000',
      students: '1600+'
    },
    {
      id: 10,
      name: 'معهد الهندسة النووية',
      type: 'معهد متخصص',
      logo: '/assets/schools/nuclear-engineering.png',
      description: 'متخصص في الهندسة النووية والطاقة',
      programs: ['هندسة نووية', 'هندسة طاقة', 'هندسة إشعاع'],
      established: '1978',
      students: '1200+'
    },
    {
      id: 11,
      name: 'معهد الهندسة الكيميائية',
      type: 'معهد متخصص',
      logo: '/assets/schools/chemical-engineering.png',
      description: 'رائد في الهندسة الكيميائية والصناعية',
      programs: ['هندسة كيميائية', 'هندسة صناعية', 'هندسة عمليات'],
      established: '1972',
      students: '2800+'
    },
    {
      id: 12,
      name: 'معهد الهندسة الميكانيكية',
      type: 'معهد متخصص',
      logo: '/assets/schools/mechanical-engineering.png',
      description: 'متخصص في الهندسة الميكانيكية والتصنيع',
      programs: ['هندسة ميكانيكية', 'هندسة تصنيع', 'هندسة إنتاج'],
      established: '1968',
      students: '3200+'
    }
  ];

  constructor() {}
}
