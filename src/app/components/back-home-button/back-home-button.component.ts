import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-back-home-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-home-button.component.html',
  styleUrls: ['./back-home-button.component.scss'], 
})
export class BackHomeButtonComponent {
  constructor(private navigationService: NavigationService) {}

  backHome(): void {
    this.navigationService.navigateToHome();
  }
}
