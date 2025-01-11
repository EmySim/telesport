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

  // Ajouter d'autres méthodes de navigation ici si nécessaire
  navigateToDetail(id: number): void {
    this.router.navigate([`/detail/${id}`]);
  }
}
