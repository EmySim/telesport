import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
export class DetailComponent implements OnInit {
  public participations$: Observable<Participation[]> = of([]); // Initialiser comme un tableau vide
  public loading: boolean = true;
  public countryName: string = '';
  public totalParticipations: number = 0;
  public totalNumberofMedals: number = 0;
  public totalNumberofAthletes: number = 0;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer le paramètre de la route et charger les données
    this.route.params.subscribe((params) => {
      const countryId = Number(params['id']);
      //this.countryName = ''; // Si nécessaire, chargez également le nom depuis les données
      this.loading = true;

      //charger les participations
      this.olympicService
        .getParticipationsByCountry(countryId)
        .pipe(
          tap((participations) => {
            this.loading = false;
            // Mettre à jour les totaux
            this.totalParticipations = participations.length;
            this.totalNumberofMedals = participations.reduce(
              (acc, participation) => acc + participation.medalsCount,
              0
            );
            this.totalNumberofAthletes = participations.reduce(
              (acc, participation) => acc + participation.athleteCount,
              0
            );
          }),
          catchError((error) => {
            console.error(
              'Erreur lors du chargement des participations :',
              error
            );
            this.loading = false;
            return of([]); // Retourner un tableau vide en cas d'erreur
          })
        )
        .subscribe();

      this.olympicService
        .getCountryById(countryId)
        .subscribe((name: string) => {
          this.countryName = name;
        });
    });
  }

  // Méthode pour revenir à la page d'accueil
  public backHome(): void {
    this.router.navigate(['/']); // Redirige vers la page d'accueil
  }
}
//nombre de participation

//total de médailles

//nombre d'athletes
