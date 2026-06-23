import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../navbar/navbar';
import { Footer } from "../footer/footer";

interface LinkCard {
  title: string;
  description: string;
  linkText: string;
  url: string;
  external?: boolean;
}

interface LinkSection {
  title: string;
  cards: LinkCard[];
}

@Component({
  selector: 'app-atcp-song-links',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './atcp-song-links.html',
  styleUrls: ['./atcp-song-links.css']
})
export class AtcpSongLinks {
  sections: LinkSection[] = [
    {
      title: 'Learn more about Song',
      cards: [
        {
          title: 'ATCP Song Leadership',
          description: 'Lorem ipsum dolor sit amet adipiscing consectetur elit.',
          linkText: 'ATCP Song Leadership',
          url: '/atcp-song',
          external: false
        },
        {
          title: 'ATCP Song Viva Engage',
          description: 'Lorem ipsum dolor sit amet adipiscing consectetur elit.',
          linkText: 'Viva Engage: ATCP Song',
          url: 'https://engage.cloud.microsoft/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiI5NDcyMjk4MTg4OCJ9/all'
        },
        {
          title: 'ATCP Song Technologies',
          description: 'Lorem ipsum dolor sit amet adipiscing consectetur elit.',
          linkText: 'ATCP Song Technologies',
          url: '/song3',
          external: false
        },
        {
          title: 'ATCP Song Bench',
          description: 'Lorem ipsum dolor sit amet adipiscing consectetur elit.',
          linkText: 'ATCP Song Bench',
          url: '/song-bench',
          external: false
        }
      ]
    },
    {
      title: 'Other important links',
      cards: [
        {
          title: 'Accenture Song',
          description: 'Customer-facing design and creative arm of Accenture, operating at the intersection of creativity, technology, and business consultancy.',
          linkText: 'Accenture Song',
          url: '#'
        },
        {
          title: 'Accenture Support',
          description: 'Centralized, self-service framework for employees to access assistance across technology, human resources, and internal operations.',
          linkText: 'Accenture Support',
          url: 'https://support.accenture.com'
        },
        {
          title: 'Buhay Accenture',
          description: 'Official internal site for Accenture in the Philippines, serving as the primary hub for company news, culture, and employee resources.',
          linkText: 'Buhay Accenture',
          url: 'https://in.accenture.com/philippines/'
        },
        {
          title: 'IS Advocate',
          description: 'Increase security awareness and promote secure behavior adoption by completing assigned interactive learning activities as well as track progress, and improve Secure Behavior Score (SBS) in the Information Security Advocate Dashboard.',
          linkText: 'IS Advocate Dashboard',
          url: 'https://isadvocate.accenture.com/'
        },
        {
          title: 'MyTE: My Time and Expenses',
          description: 'Accenture global application for recording time and submitting business expenses.',
          linkText: 'MyTE',
          url: 'https://myte.accenture.com/'
        },
        {
          title: 'Philippine Employee Self-service Hub (PESH)',
          description: 'One-stop hub exclusive for Philippines employees to get employee-related information and requests and offers extensive list of features like comprehensive pay slips, donations and leave balances.',
          linkText: 'PESH',
          url: 'https://pesh.accenture.com/home'
        },
        {
          title: 'Workday: ABCD Reflection',
          description: 'ABCD self-reflections is your opportunity to reflect on your Areas of Impact, Behaviors, Collaboration, and Development. You can use this as preparation for a talent discussion and/or career conversation.',
          linkText: 'Workday: ABCD Reflection',
          url: 'https://wd103.myworkday.com/accenture/d/task/12709$1289.htmld'
        },
        {
          title: 'Workday: CV',
          description: 'Create or generate a default one-pager CV with the help of AI, or access your a full-version of your CV with detailed sections.',
          linkText: 'Workday: CV',
          url: 'https://wd103.myworkday.com/accenture/d/task/2998$2739.htmld#TABTASKID=21200%241'
        },
        {
          title: 'Workday: Skills and Specialization',
          description: 'Map employee skills, experience, and specializations to support career growth, learning recommendations, and talent management.',
          linkText: 'Workday: Skills and Specialization',
          url: 'https://wd103.myworkday.com/accenture/d/task/2998$2739.htmld#TABTASKID=21200%24300'
        },
        {
          title: 'Workday: Trainings',
          description: 'Enhance growth through personalized, skills-driven recommendations and embedded learning in daily workflows. Search, enroll, and track a wide selection of courses, while providing managers with tools to assign training and monitor team progress.',
          linkText: 'Workday: Trainings',
          url: 'https://wd103.myworkday.com/accenture/learning'
        }
      ]
    }
  ];
}
