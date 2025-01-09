import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
  ],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]); // Observable vide initialisé
  public loading: boolean = true; // État de chargement
  public countriesCount: number = 0; // Compteur pour le nombre de pays
  public totalParticipations: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    // Récupération des données depuis le service
    this.olympics$ = this.olympicService.loadInitialData();
    this.olympics$.subscribe({
      next: (data: Olympic[]) => {
        this.calculateCounts(data); // Calculer les métriques
        //this.buildChartData(data);
        this.loading = false; // Fin de chargement
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données :', error);
        this.loading = false; // Fin de chargement en cas d'erreur
      },
    });
  }

  // Calcul du nombre de pays et du nombre total de participations
  private calculateCounts(olympics: Olympic[]): void {
    this.countriesCount = olympics.length;
    this.totalParticipations = olympics.reduce(
      (total, olympic) => total + olympic.participations.length,
      0
    );
  }

  // Naviguer vers la page détail en cliquant sur une section
  public onCountrySelect(event: { id: number }): void {
    this.router.navigate(['/detail', event.id]);
  }
}
