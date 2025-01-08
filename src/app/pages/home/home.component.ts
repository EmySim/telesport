import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';  
import { PieChartComponent } from '../../componants/pie-chart/pie-chart.component'
import { BannerModule } from '../../componants/banner/banner.module'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true, // Rend ce composant autonome
  imports: [
    CommonModule,
    PieChartComponent,
    BannerModule
  ], 
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]); // Observable vide initialisé
  public loading: boolean = true;  // État de chargement

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData().subscribe({
      next: (data: Olympic[] | null) => {
        if (data) {
          this.olympics$ = of(data);
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
  }
