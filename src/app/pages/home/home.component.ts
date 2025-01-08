import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';  
import { PieChartComponent } from '../../componants/pie-chart/pie-chart.component'
import { BannerComponent } from '../../componants/banner/banner.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true, // Rend ce composant autonome
  imports: [
    CommonModule,
    PieChartComponent,
    BannerComponent
  ], 
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]); // Observable vide initialisé
  public loading: boolean = true;  // État de chargement
  public countriesCount: number = 0; // Compteur pour le nombre de pays
  public totalParticipations: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe({
      next: (data: Olympic[] | null) => {
        if (data) {
          this.olympics$ = of(data); // Si les données sont présentes, on les assigne
          this.calculateCounts(data); // Calculer les counts après récupération des données
            console.log('Données reçues:', data); // Affichage des données dans la console
          } else {
            this.olympics$ = of([]); // Si les données sont nulles, émettre un tableau vide
          }
          this.loading = false; // Désactive l'état de chargement une fois les données chargées
        },
        error: (error) => {
            console.error('Erreur lors du chargement des données:', error);
          this.loading = false; // Désactive l'état de chargement en cas d'erreur
        }
      });
  }

  // Calcul du nombre de pays et du nombre total de participations
  private calculateCounts(olympics: Olympic[]): void {
    this.countriesCount = olympics.length;
    this.totalParticipations = olympics.reduce((total, olympic) => total + olympic.participations.length, 0);
  }
}