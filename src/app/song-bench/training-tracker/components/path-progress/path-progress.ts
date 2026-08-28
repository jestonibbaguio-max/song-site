import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-path-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './path-progress.html',
  styleUrls: ['./path-progress.css'],
})
export class PathProgress {
  @Input() src: string = 'assets/training/training.svg';
  @Input() alt: string = 'Training progress path';
  @Input() maxHeightPx?: number;
}
