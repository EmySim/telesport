import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs'; // Import de Observable et of
import { catchError, tap, map, shareReplay  } from 'rxjs/operators';
import { Olympic } from '../models/Olympic'; // Import de l'interface Olympic
import { Participation } from '../models/Participation';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics: Olympic[] = []; // Stockage local des données olympiques
  private dataLoaded$ = new BehaviorSubject<boolean>(false); // Indicateur de chargement des données
  private loadDataObservable$: Observable<Olympic[]> | null = null; // Observable de chargement partagé

  constructor(private http: HttpClient) {}

  // Charger les données depuis le fichier JSON et les stocker en mémoire
  private loadInitialData(): Observable<Olympic[]> {
    if (!this.loadDataObservable$) {
      this.loadDataObservable$ = this.http.get<Olympic[]>(this.olympicUrl).pipe(
        tap((data) => {
          this.olympics = data; // Mise à jour du stockage local
          this.dataLoaded$.next(true); // Signaler que les données ont été chargées
          console.log('Données chargées depuis JSON :', data);
        }),
        catchError((err) => {
          console.error('Erreur lors du chargement des données JSON :', err);
          throw err;
        }),
        shareReplay(1) // Partage le même Observable pour éviter plusieurs requêtes
      );
    }
    return this.loadDataObservable$;
  }

  // Fournir un Observable des données olympiques
  getOlympicsData(): Observable<Olympic[]> {
    if (this.olympics.length) {
      return of(this.olympics); // Retourne les données déjà chargées
    }
    if (this.dataLoaded$.value) {
      return of(this.olympics); // Si les données sont déjà marquées comme chargées, retourner directement
    }
    return this.loadInitialData(); // Charge les données si elles ne sont pas encore en mémoire
  }

  // Récupérer le nom d'un pays par son ID
  getCountryById(countryId: number): Observable<string> {
    return this.getOlympicsData().pipe(
      map((olympics: Olympic[]) => {
        const country = olympics.find((o: Olympic) => o.id === countryId);
        return country ? country.country : 'Unknown Country'; // Retourne le nom ou "Unknown Country"
      }),
      catchError((err) => {
        console.error('Erreur lors de la recherche du pays par ID :', err);
        return of('Unknown Country'); // Retourne un pays par défaut en cas d'erreur
      })
    );
  }

  // Récupérer les participations d'un pays par son ID
  getParticipationsByCountry(countryId: number): Observable<Participation[]> {
    const olympic = this.olympics.find((o) => o.id === countryId);
    return of(olympic ? olympic.participations : []);
  }
}
