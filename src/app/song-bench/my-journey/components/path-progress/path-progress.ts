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
  /** SVG path image (exported from Figma). */
  @Input() src: string = 'assets/journey/path-progress.svg';

  /** Accessible alt text (screen readers). */
  @Input() alt: string = 'Journey progress path';

  /**
   * Optional max height of the banner area in px.
   * If not provided, CSS will scale naturally using aspect ratio.
   */
  @Input() maxHeightPx?: number;
}
