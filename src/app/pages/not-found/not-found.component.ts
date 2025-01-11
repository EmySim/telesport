import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    
  }

  // appel le service de navigation gohome.

  backHome(): void {
    this.navigationService.navigateToHome();
  }
}
