import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-atcp-song',
  standalone: true,
  imports: [Navbar],
  templateUrl: './atcp-song.html',
  styleUrl: './atcp-song.css'
})
export class AtcpSong {}