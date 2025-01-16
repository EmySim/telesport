import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'TooltipComponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})

export class TooltipComponent {
  @Input() country?: string;
  @Input() medalsCount?: number;
  @Input() city?: string;
}
