import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer],
  templateUrl: './aboutus.html',
  styleUrls: ['./aboutus.css'],
})
export class AboutusComponent {

  positiveChangeCards = [
    {
      title: 'Code of Business Ethics',
      paragraphs: [
        'At Accenture, our people care deeply about doing the right thing. Together, we have proven that we can succeed—providing value to our clients and shareholders and opportunities for our people—while being a powerful force for good. Our shared commitment to operating with the highest ethical standards and making a positive difference in everything we do is what makes Accenture special.'
      ],
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Sustainability',
      paragraphs: [
        'We help our clients advance their environmental, social, and governance goals by connecting sustainability to their transformations, operate our business with a strong commitment to the environment, ethics and human rights, and work to create value in communities around the world.'
      ],
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Inclusion and Diversity',
      paragraphs: [
        'We hire and develop people who have different backgrounds, different perspectives and different lived experiences. These differences ensure that we have and attract the cognitive diversity needed to drive innovation.'
      ],
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Responsible AI',
      paragraphs: [
        'Powerful AI tools like generative AI bring unprecedented opportunities as well as new risks. We help clients design, deploy and use AI responsibly to create value and build trust.'
      ],
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Transparent Workforce',
      paragraphs: [
        'We are one of the largest and most mature IT companies in the Philippines, with a long and successful track record of delivering complex technology-based solutions and outsourcing capabilities.',
        'As of August 31, 2022'
      ],
      achievements: [
        '35+ Years in the Philippines',
        '9000+ Clients serviced worldwide',
        '85K+ Employees'
      ],
      socialImpactTitle: 'Our Social Impact',
      socialImpact: [
        'Most valuable corporate response - Recognized at the Asia-Pacific Stevie Awards.',
        'Business resiliency award - Recognized at the Business Continuity Institute APAC Awards.',
        'Top sustainability advocate in Asia - Recognized at the ACES Awards.',
        'Industry champion of the year - Recognized for helping grow the IT-BPM industry.',
        'Green leadership award - Recognized at the Asia Responsible Enterprise Award.',
        'Environmental performance award - Recognized by PEZA.'
      ]
    }
  ];

}