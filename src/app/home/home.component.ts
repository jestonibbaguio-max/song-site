import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showVideoModal = true;

  ngOnInit() {
    const seen = sessionStorage.getItem('videoShown');
    this.showVideoModal = !seen;
  }

  closeModal() {
    this.showVideoModal = false;
    sessionStorage.setItem('videoShown', 'true');
  }
}