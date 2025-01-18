import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StateService } from 'src/app/core/services/state.service';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { LoadingErrorComponent } from '../../components/loading-error/loading-error.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, PieChartComponent, LoadingErrorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimisation des performances
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = EMPTY; // Flux des données Olympics
  public loading: boolean = true;
  public error: string | null = null;
  public dataAvailable: boolean = false;
  public chartData: { name: string; value: number; id: number }[] = []; //données graphique
  public countriesCount = 0; // Nombre de pays
  public totalParticipations = 0; // Nombre total de participations

  //private readonly ERROR_MESSAGE = 'Erreur lors de la récupération des données :';
  private readonly ROUTE_DETAIL = '/detail';
  
  constructor(
    private olympicService: OlympicService, 
    private router: Router,
    public stateService: StateService 
  ) {}

  ngOnInit(): void {
    this.stateService.setLoading(true); // Mise à jour de l'état de chargement
    console.log('Initialisation du chargement');
    
    this.olympics$ = this.olympicService.getOlympicsData().pipe(
      tap((data: Olympic[]) => {
        console.log('Données récupérées:', data);
        this.processOlympicData(data);
        this.stateService.setDataAvailable(true);
  }),
      catchError((error) => {
        this.stateService.setError('An error occurred while loading data.');
        return EMPTY;
      }),
      finalize(() => {
        console.log('Finalisation du chargement');
        this.stateService.setLoading(false); // Fin du chargement
      })
  );
}

  /**
   * Traite les données olympiques pour calculer les métriques.
   * @param data Données olympiques.
   */
  private processOlympicData(data: Olympic[]): void {
    console.log('Données récupérées:', data);
    this.chartData = data.map((olympic) => ({
      name: olympic.country,
      value: olympic.participations.reduce((sum, p) => sum + p.medalsCount, 0),
      id: olympic.id,
    }));

    this.countriesCount = data.length;
    this.totalParticipations = data.reduce(
      (sum, olympic) => sum + olympic.participations.length,
      0
    );
    this.stateService.setLoading(false);  // Fin du chargement
  }

  /**
   * Navigue vers la page détaillée d'un pays.
   * @param event Événement contenant l'ID du pays sélectionné.
   */
  public onCountrySelect(event: { id: number }): void {
    if (event?.id) {
      console.log('Selected country ID:', event.id);
      this.router.navigate([this.ROUTE_DETAIL, event.id]);
    } 
  }
}
