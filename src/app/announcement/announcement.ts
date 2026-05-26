import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [RouterModule, CommonModule, Navbar],
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