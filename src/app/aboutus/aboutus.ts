import { Component } from '@angular/core';
import { DisplayComponent } from './display';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule, DisplayComponent, Navbar, Footer],
  templateUrl: './aboutus.html',
  styleUrls: ['./aboutus.css'],
})

export class AboutusComponent { }