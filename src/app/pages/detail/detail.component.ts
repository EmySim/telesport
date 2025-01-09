import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Import manquant
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
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    // Récupérer le paramètre de la route
    this.route.params.subscribe((params) => {
      const countryId = Number(params['id']); // Assurez-vous que c'est un nombre
      this.countryName = ''; // Si nécessaire, chargez également le nom depuis les données
      this.loading = true;

      this.participations$ = this.olympicService
        .getParticipationsByCountry(countryId)
        .pipe(
          tap(() => (this.loading = false)),
          catchError((error) => {
            console.error(
              'Erreur lors du chargement des participations :',
              error
            );
            this.loading = false;
            return of([]);
          })
        );
    });
  }
}

//nombre de participation

//total de médailles

//nombre d'athletes
