import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimisation
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = EMPTY; // Flux des données Olympics
  public loading = true; // État de chargement
  public error: string | null = null;
  public countriesCount = 0;
  public totalParticipations = 0;

  //private readonly ERROR_MESSAGE = 'Erreur lors de la récupération des données :';
  private readonly ROUTE_DETAIL = '/detail';

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsData().pipe(
      tap((data: Olympic[]) => this.processOlympicData(data)),
      catchError((error) => {
        this.handleError(error);
        return EMPTY;
      })
    );
  }

  /**
   * Traite les données olympiques pour calculer les métriques.
   * @param data Données olympiques.
   */
  private processOlympicData(data: Olympic[]): void {
    console.log('Données récupérées:', data);
    this.countriesCount = data.length;
    this.totalParticipations = data.reduce(
      (sum, olympic) => sum + olympic.participations.length,
      0
    );
    this.loading = false;
  }

  /**
   * Gère les erreurs et arrête le chargement.
   * @param error Erreur capturée.
   */
  private handleError(error: unknown): void {
    console.error('Erreur lors de la récupération des données :', error);
    this.error = 'An error occurred while loading data.';;
    this.loading = false;
  }

  /**
   * Navigue vers la page détaillée d'un pays.
   * @param event Événement contenant l'ID du pays sélectionné.
   */
  public onCountrySelect(event: { id: number }): void {
    if (event?.id) {
      console.log('Selected country ID:', event.id);
      this.router.navigate([this.ROUTE_DETAIL, event.id]);
    } else {
      console.error('ID du pays invalide dans HomeComponent');
    }
  }
}
