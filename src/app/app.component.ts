import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    // Utilisez getOlympicsData pour charger les données
    this.olympicService.getOlympicsData().pipe(take(1)).subscribe({
      next: () => console.log('Données initiales chargées dans AppComponent'),
      error: (err) => console.error('Erreur lors du chargement initial des données :', err),
    });
  }
}