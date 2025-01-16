import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimisation
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = EMPTY; // Flux des données Olympics
  public loading = true; // État de chargement
  public countriesCount = 0;
  public totalParticipations = 0;

  private readonly ERROR_MESSAGE = 'Erreur lors de la récupération des données :';
  private readonly ROUTE_DETAIL = '/detail';

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympicsData().pipe(
      tap((data: Olympic[]) => this.processOlympicData(data)),
      catchError((error) => this.handleError(error))
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
   * @returns Observable vide.
   */
  private handleError(error: unknown): Observable<never> {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error('Error message:', (error as { message: string }).message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    this.loading = false;
    return EMPTY;
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
