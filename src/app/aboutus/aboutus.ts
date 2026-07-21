import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

interface PositiveChangeCard {
  title: string;
  description: string;
  subtext?: string;
  achievements: string[];
  socialImpactTitle: string;
  socialImpact: string[];
}

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer],
  templateUrl: './aboutus.html',
  styleUrls: ['./aboutus.css'],
})
export class AboutusComponent {
  videoError = false;

  onVideoError(): void {
    this.videoError = true;
  }

  positiveChangeCards: PositiveChangeCard[] = [
    {
      title: 'Code of Business Ethics',
      description: 'At Accenture, our people care deeply about doing the right thing. Together, we have proven that we can succeed—providing value to our clients and shareholders and opportunities for our people—while being a powerful force for good. Our shared commitment to operating with the highest ethical standards and making a positive difference in everything we do is what makes Accenture special.',
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Sustainability',
      description: 'We help our clients advance their environmental, social and governance goals by connecting sustainability to their transformations; operate our business with a strong commitment to the environment, ethics and human rights; and work to create value in communities around the world.',
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Inclusion and Diversity',
      description: 'We hire and develop people who have different backgrounds, different perspectives, and different lived experiences. These differences ensure that we have and attract the cognitive diversity to deliver a variety of perspectives, observations, and insights which are essential to drive the innovation needed to reinvent.',
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Responsible AI',
      description: 'Powerful AI tools like generative AI bring unprecedented opportunities as well as new risks. We help clients to take intentional actions to design, deploy and use AI to create value and build trust.',
      achievements: [],
      socialImpactTitle: '',
      socialImpact: []
    },
    {
      title: 'Transparent Workforce',
      description: 'We are one of the largest and most mature IT companies in the Philippines, with a long and successful track record of delivering complex technology-based solutions and outsourcing capabilities.',
      subtext: 'As of August 31, 2022',
      achievements: [
        '35+ - Years in the Philippines',
        '9000+ - Clients serviced worldwide',
        '85K+ - Employees'
      ],
      socialImpactTitle: 'Our social impact',
      socialImpact: [
        'Most valuable corporate response - Recognized at the Asia-Pacific Stevie Awards for our effective COVID-19 response',
        'Business resiliency award - Recognized at the Business Continuity Institute (BCI) APAC Awards for Most Effective Recovery and Business Resilience Services',
        'Top sustainability advocate in Asia - Recognized at the Asia Corporate Excellence and Sustainability (ACES) Awards for our commitment to implementing responsible business strategies',
        'Industry champion of the year - Recognized at ACES for our commitment to grow the IT-BPM industry in the Philippines.',
        'Green leadership award - Recognized at the Asia Responsible Enterprise Award (AREA) for achieving efficient operations through innovation',
        'Environmental performance award - Recognized by the Philippine Economic Zone Authority (PEZA) for our environment and sustainability practices'
      ]
    }
  ];

}
