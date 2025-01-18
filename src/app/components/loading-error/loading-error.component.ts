import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-error.component.html',
  styleUrls: ['./loading-error.component.scss'],
})
export class LoadingErrorComponent {
  @Input() loading = false; 
  @Input() error: string | null = null; 
  @Input() dataAvailable = false;

  ngOnChanges(): void {
    console.log('Loading:', this.loading);
    console.log('Error:', this.error);
    console.log('Data available:', this.dataAvailable);
  }
}
