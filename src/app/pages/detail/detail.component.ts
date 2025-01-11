import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, finalize, takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Participation } from 'src/app/core/models/Participation';
import { LineComponent } from '../../components/line/line.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [CommonModule, LineComponent],
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  public participations$: Observable<Participation[]> = new Observable(); // Observable pour les participations
  public loading: boolean = true; // État de chargement
  public countryName: string = ''; // Nom du pays
  public totalParticipations: number = 0; // Nombre total de participations
  public totalNumberofMedals: number = 0; // Nombre total de médailles
  public totalNumberofAthletes: number = 0; // Nombre total d'athlètes

  private destroy$ = new Subject<void>(); // Pour se désabonner proprement

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du pays à partir de la route et charger les données
    this.route.params
      .pipe(
        takeUntil(this.destroy$) // S'abonner au flux de paramètres tant que le composant est vivant
      )
      .subscribe((params) => {
        const countryId = Number(params['id']); // Convertir l'ID en nombre
        this.loadCountryName(countryId); // Charger le nom du pays
        this.loadParticipations(countryId); // Charger les participations
      });
  }

  /**
   * Charge le nom du pays via une requête HTTP GET
   * @param countryId ID du pays
   */
  private loadCountryName(countryId: number): void {
    this.olympicService
      .getCountryById(countryId)
      .pipe(
        takeUntil(this.destroy$) // Gestion propre de l'abonnement
      )
      .subscribe({
        next: (name: string) => {
          console.log(`Country ID: ${countryId}, Country Name: ${name}`);
          this.countryName = name;
        },
        error: (error) => {
          console.error(
            `Erreur lors de la récupération du nom du pays (ID: ${countryId}) :`,
            error
          );
        },
      });
  }

  /**
   * Charge les participations d'un pays via une requête HTTP GET
   * @param countryId ID du pays
   */
  private loadParticipations(countryId: number): void {
    this.participations$ = this.olympicService
      .getParticipationsByCountry(countryId)
      .pipe(
        tap((participations) => {
          this.loading = false;
          this.calculateMetrics(participations); // Calculer les métriques
        }),
        catchError((error) => {
          console.error(
            `Erreur lors du chargement des participations pour le pays (ID: ${countryId}) :`,
            error
          );
          return []; // Retourner un tableau vide en cas d'erreur
        }),
        finalize(() => {
          this.loading = false; // Assurez-vous que l'indicateur de chargement est arrêté dans tous les cas
        }),
        takeUntil(this.destroy$) // Annuler l'abonnement lorsque le composant est détruit
      );
  }

  /**
   * Calcule les métriques à partir des participations
   * @param participations Liste des participations
   */
  private calculateMetrics(participations: Participation[]): void {
    // Calcul des métriques en une seule fois pour éviter de parcourir plusieurs fois le tableau
    this.totalParticipations = participations.length; // Nombre de participations
    const totals = participations.reduce(
      (acc, participation) => {
        acc.medals += participation.medalsCount;
        acc.athletes += participation.athleteCount;
        return acc;
      },
      { medals: 0, athletes: 0 }
    );

    this.totalNumberofMedals = totals.medals;
    this.totalNumberofAthletes = totals.athletes;

    console.log(
      `Number of entries (participations): ${this.totalParticipations}`
    );
    console.log(`Total number of medals: ${this.totalNumberofMedals}`);
    console.log(`Total number of athletes: ${this.totalNumberofAthletes}`);
  }

  /**
   * Redirige vers la page d'accueil
   */
  public backHome(): void {
    this.router.navigate(['/']);
  }

  // Méthode pour se désabonner proprement lors de la destruction du composant
  ngOnDestroy(): void {
    this.destroy$.next(); // Émet une valeur pour signaler la destruction
    this.destroy$.complete(); // Complète le Subject pour éviter les fuites de mémoire
    console.log('CountryDetailComponent détruit');
  }
}
