import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, PieChartComponent],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = EMPTY; // flux des données Olympics
  public loading: boolean = true; // État de chargement
  public countriesCount: number = 0;
  public totalParticipations: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsData().pipe(
      tap((data: Olympic[]) => {
        console.log('Données récupérées:', data);

        // Calculer les métriques
        this.countriesCount = data.length;
        this.totalParticipations = data.reduce(
          (sum, olympic) => sum + olympic.participations.length,
          0
        );
        this.loading = false;
      }),
      catchError((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        this.loading = false;
        return EMPTY;
      })
    );
  }
  // Sélection d'un pays et navigation vers sa page détaillée
  public onCountrySelect(event: { id: number }): void {
    if (event.id !== undefined && event.id !== null) {
      console.log('Selected country ID:', event.id);
      // Effectuer la redirection vers la page de détails avec l'ID du pays
      this.router.navigate(['/detail', event.id]);
    } else {
      console.error('ID du pays est undefined ou null dans HomeComponent');
    }
  }
}
