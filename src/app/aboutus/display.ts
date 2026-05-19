import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  label: string;
  text?: string;
  image?: string;  
  points?: string[];
  sections?: { text: string; points?: string[] }[];
  isExpanded: boolean;

  highlightCurrentClick?: boolean;
  highlightTopDuePrevClick?: boolean;
  highlightCurrentHover?: boolean;
  highlightTopDuePrevHover?: boolean;
}

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.html',
  styleUrls: ['./display.css'],
})
export class DisplayComponent {

  items: Item[] = [
    { label: 'Code of Business Ethics', 
      text: 'At Accenture, our people care deeply about doing the right thing. Together, we have proven that we can succeed—providing value to our clients and shareholders and opportunities for our people—while being a powerful force for good. Our shared commitment to operating with the highest ethical standards and making a positive difference in everything we do is what makes Accenture special.', 
      image: 'assets/images/coe.png',
      isExpanded: false },
    { label: 'Sustainability', 
      text: 'We help our clients advance their environmental, social and governance goals by connecting sustainability to their transformations; operate our business with a strong commitment to the environment, ethics and human rights; and work to create value in communities around the world.',
      image: 'assets/images/sustainability.png',
      isExpanded: false },
    { label: 'Inclusion and Diversity', 
      text: 'We hire and develop people who have different backgrounds, different perspectives, and different lived experiences. These differences ensure that we have and attract the cognitive diversity to deliver a variety of perspectives, observations, and insights which are essential to drive the innovation needed to reinvent.', 
      image: 'assets/images/diversity.png',
      isExpanded: false },
    { label: 'Responsible AI', 
      text: 'Powerful AI tools like generative AI bring unprecedented opportunities as well as new risks. We help clients to take intentional actions to design, deploy and use AI to create value and build trust.', 
      image: 'assets/images/ai.png',
      isExpanded: false },
    { 
      label: 'Transparent Workforce', isExpanded: false, 
      sections: [
        { text: 'We are one of the largest and most mature IT companies in the Philippines, with a long and successful track record of delivering complex technology-based solutions and outsourcing capabilities. (As of August 31, 2022)', points: ['35+ - Years in the Philippines','9000+ - Clients serviced worldwide','85K+ - Employees'] },
        { text: 'Our social impact', points: ['Most valuable corporate response - Recognized at the Asia-Pacific Stevie Awards for our effective COVID-19 response','Business resiliency award - Recognized at the Business Continuity Institute (BCI) APAC Awards for Most Effective Recovery and Business Resilience Services','Top sustainability advocate in Asia - Recognized at the Asia Corporate Excellence and Sustainability (ACES) Awards for our commitment to implementing responsible business strategies','Industry champion of the year - Recognized at ACES for our commitment to grow the IT-BPM industry in the Philippines.','Green leadership award - Recognized at the Asia Responsible Enterprise Award (AREA) for achieving efficient operations through innovation','Environmental performance award - Recognized by the Philippine Economic Zone Authority (PEZA) for our environment and sustainability practices'] }
      ] 
    }
  ];

  // Toggle click highlight and expansion
  toggle(index: number) {
    this.items.forEach(item => {
      item.highlightCurrentClick = false;
      item.highlightTopDuePrevClick = false;
    });

    this.items[index].highlightCurrentClick = true;
    if (index + 1 < this.items.length) {
      this.items[index + 1].highlightTopDuePrevClick = true;
    }

    this.items.forEach((item, i) => {
      item.isExpanded = i === index ? !item.isExpanded : false;
    });
  }

  hover(index: number) {
    this.items.forEach(item => {
      item.highlightCurrentHover = false;
      item.highlightTopDuePrevHover = false;
    });

    this.items[index].highlightCurrentHover = true;
    if (index + 1 < this.items.length) {
      this.items[index + 1].highlightTopDuePrevHover = true;
    }
  }

  leaveHover() {
    this.items.forEach(item => {
      item.highlightCurrentHover = false;
      item.highlightTopDuePrevHover = false;
    });
  }
  hasActiveOrHover(): boolean {
  return this.items.some(item =>
    item.highlightCurrentClick || item.highlightCurrentHover
  );
}
}