import { Component, OnInit } from '@angular/core';
import { Display1Component } from './display1';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule, RouterModule, Display1Component, Navbar],
  templateUrl: './journey.html',
  styleUrls: ['./journey.css'],
})

export class JourneyComponent implements OnInit { 

  items: any[] = [];
ngOnInit() {
 const data = localStorage.getItem('items');
 this.items = data ? JSON.parse(data) : [];
}
}