import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';
import { BackHomeButtonComponent } from '../../components/back-home-button/back-home-button.component';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [CommonModule, BackHomeButtonComponent],
})
export class NotFoundComponent implements OnInit {
  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

    ngOnInit(): void {}

  backHome(): void {
    this.navigationService.navigateToHome();
  }
}
