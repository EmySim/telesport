import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="loading-indicator">
      <h2>Loading in progress...</h2>
    </div>
    <div *ngIf="error && !loading" class="error-indicator">
      <h2>{{ error }}</h2>
    </div>
    <div *ngIf="!loading && !error && !dataAvailable" class="no-data-indicator">
      <h2>Data unavailable.</h2>
    </div>
    <ng-content *ngIf="!loading && !error && dataAvailable"></ng-content>
  `,
  styleUrls: ['./loading-error.component.scss'],
})
export class LoadingErrorComponent {
  @Input() loading = false; 
  @Input() error: string | null = null; 
  @Input() dataAvailable = false;
}
