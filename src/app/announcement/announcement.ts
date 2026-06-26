import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [RouterModule, CommonModule, Navbar, Footer],
  templateUrl: './announcement.html',
  styleUrls: ['./announcement.css']
})
export class Announcement implements OnInit, OnDestroy {

  activeIndex = 0;
  autoSlideInterval: any;

  certificates = [
    { name: 'Mark Anthony Bayona', image: 'assets/images/congrats1.png' },
    { name: 'Alison Ignacio', image: 'assets/images/congrats2.png' },
    { name: 'Ardione David', image: 'assets/images/congrats3.png' },
    { name: 'Henry Fernandez', image: 'assets/images/congrats4.png' }
  ];

  trainings = [
    {
      title: 'Technology Quotient (TQ)',
      description: 'New technologies are helping our clients reinvent their businesses. Stay relevant and take this time to complete foundational courses on new technologies.',
      link: 'https://www.pluralsight.com',
      linkLabel: 'Pluralsight'
    },
    {
      title: 'Gen AI Trainings',
      description: 'Gen AI is rapidly changing the world and has revolutionized the way we work. You are encouraged to learn more and use this cutting-edge technology so you can do your share in helping Accenture and our clients maximize the true value that Gen AI can bring.',
      link: '#',
      linkLabel: 'Buhay Accenture'
    },
    {
      title: 'Workday: Required Trainings',
      description: 'Visit Learning Home in Workday and find required trainings you need to take on the Required for you section.',
      link: '#',
      linkLabel: 'Workday'
    },
    {
      title: 'Global Mental Health Ally Training',
      description: 'The Mental Health Ally (MHA) Program is a global initiative that equips people to foster a supportive, inclusive workplace. As an ally, you will learn how to listen, respond with confidence, and connect colleagues to appropriate support.',
      link: '#',
      linkLabel: 'Workday'
    },
    {
      title: 'IS Gold Advocate',
      description: 'Achieve a Top Notch Secure Behavior Score by staying up to date with your IS Advocate training and other recommended actions.',
      link: '#',
      linkLabel: 'ISA Dashboard'
    },
    {
      title: 'Coding Standards',
      description: 'The main objective of coding standards is to define a set of rules and principles to distinguish good code from bad code, so that we can understand how to write code that adheres to good practices.',
      link: '#',
      linkLabel: 'CIO Organization'
    }
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 3000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.certificates.length;
  }

  prev(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.certificates.length) % this.certificates.length;
  }

  setIndex(index: number): void {
    this.activeIndex = index;
  }

  getCardClass(index: number): string {
    if (index === this.activeIndex) return 'center';

    const prevIndex =
      (this.activeIndex - 1 + this.certificates.length) % this.certificates.length;
    const nextIndex =
      (this.activeIndex + 1) % this.certificates.length;

    if (index === prevIndex) return 'left';
    if (index === nextIndex) return 'right';

    return 'hidden';
  }
}