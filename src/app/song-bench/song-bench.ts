import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-song-bench',
  standalone: true,
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './song-bench.html',
  styleUrl: './song-bench.css'
})
export class SongBench {}
