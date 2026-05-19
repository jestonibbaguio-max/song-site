import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [RouterModule, CommonModule, Navbar],
  templateUrl: './announcement.html',
  styleUrls: ['./announcement.css']
})

export class Announcement { }