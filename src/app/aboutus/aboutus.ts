import { Component } from '@angular/core';
import { DisplayComponent } from './display';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule, DisplayComponent, Navbar],
  templateUrl: './aboutus.html',
  styleUrls: ['./aboutus.css'],
})

export class AboutusComponent { }