import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  // Rediriger vers la page d'accueil
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  // vers page détail
  navigateToDetail(id: number): void {
    this.router.navigate([`/detail/${id}`]);
  }

  // vers 404
  navigateToNotFound(): void {
    this.router.navigate(['/**']);
  }
}
