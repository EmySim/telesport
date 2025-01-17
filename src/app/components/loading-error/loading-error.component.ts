import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-error',
  standalone: true, // Ajout de standalone ici
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="loading-indicator">Loading in progress...</div>
    <div *ngIf="error && !loading" class="error-indicator">{{ error }}</div>
    <div *ngIf="!loading && !error && !dataAvailable" class="no-data-indicator">
      Data unavailable.
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
