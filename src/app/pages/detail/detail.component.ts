import {Component,OnInit,OnDestroy, ChangeDetectionStrategy,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, tap, finalize, takeUntil } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Participation } from 'src/app/core/models/Participation';
import { LineComponent } from '../../components/line/line.component';
import { BackHomeButtonComponent } from '../../components/back-home-button/back-home-button.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  standalone: true,
  imports: [CommonModule, LineComponent, BackHomeButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // Ajout pour limiter les cycles de détection
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  public participations$: Observable<Participation[]> = EMPTY;
  public loading = true;
  //public noDataAvailable = false;  // Flag pour absence de données
  //public errorOccurred = false;    // Flag pour erreur de chargement
  public countryName = '';
  public totalParticipations = 0;
  public totalNumberofMedals = 0;
  public totalNumberofAthletes = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const countryId = Number(params['id']);
      this.loadCountryName(countryId);
      this.loadParticipations(countryId);
    });
  }

  private loadCountryName(countryId: number): void {
    this.olympicService
      .getCountryById(countryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (name: string) => (this.countryName = name),
        error: (error) => console.error(`Erreur chargement nom pays :`, error),
      });
  }

  private loadParticipations(countryId: number): void {
    this.participations$ = this.olympicService.getParticipationsByCountry(countryId).pipe(
      tap((participations) => this.calculateMetrics(participations)),
      catchError((error) => {
        console.error(`Erreur chargement participations :`, error);
        return EMPTY; // Renvoie un observable vide en cas d'erreur
      }),
      finalize(() => (this.loading = false)),
      takeUntil(this.destroy$)
    );
  }

  private calculateMetrics(participations: Participation[]): void {
    this.totalParticipations = participations.length;
    const { medals, athletes } = participations.reduce(
      (acc, participation) => ({
        medals: acc.medals + participation.medalsCount,
        athletes: acc.athletes + participation.athleteCount,
      }),
      { medals: 0, athletes: 0 }
    );
  
      this.totalNumberofMedals = medals;
      this.totalNumberofAthletes = athletes;
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
