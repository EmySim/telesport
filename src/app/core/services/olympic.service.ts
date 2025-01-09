import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import de Observable et of
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic'; // Import de l'interface Olympic
import { Participation } from '../models/Participation';
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  private olympics: Olympic[] = []; // Stockage local des données olympiques
  
  constructor(private http: HttpClient) {}

   // Charger les données depuis le fichier JSON et les stocker en mémoire
  loadInitialData(): Observable<Olympic[]> {
    return new Observable<Olympic[]>((observer) => {
      this.http.get<Olympic[]>(this.olympicUrl).subscribe({
        next: (data) => {
          this.olympics = data; // Stockage des données chargées
          observer.next(data);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

// Fournir un Observable des données olympiques
getOlympicsData(): Observable<Olympic[]> {
  if (this.olympics.length) {
    return of(this.olympics); // Retourne les données déjà chargées
  }
  return this.loadInitialData(); // Charge les données si elles ne sont pas encore en mémoire
}

 // Récupérer le nom d'un pays par son ID
  getCountryById(countryId: number): Observable<string> {
    return this.getOlympicsData().pipe(
      map((olympics: Olympic[]) => {
        const country = olympics.find((o: Olympic) => o.id === countryId);
        return country ? country.country : 'Unknown Country'; // Retourne le nom ou "Unknown Country"
      })
    );
  }

  // Récupérer les participations d'un pays par son ID
  getParticipationsByCountry(countryId: number): Observable<Participation[]> {
    const olympic = this.olympics.find((o) => o.id === countryId);
    return of(olympic ? olympic.participations : []);
  }
}

