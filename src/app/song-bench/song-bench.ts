import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-song-bench',
  standalone: true,
  imports: [RouterLink, Navbar],
  templateUrl: './song-bench.html',
  styleUrl: './song-bench.css'
})
export class SongBench {}
