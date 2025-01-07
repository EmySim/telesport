import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Import de Observable et of
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic'; // Import de l'interface Olympic


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);// Ajout de BehaviorSubject pour les olympiades

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[] | null> {
    if (this.olympics$.value !== null) {
      return this.olympics$.asObservable(); // Si les données sont déjà chargées, on les renvoie
    } 

    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => 
        this.olympics$.next(value)),
      catchError((error) => {
        console.error('Echec du chargement des données olympiques', error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return of(null); // Retourne un flux observable avec `null` en cas d'erreur
      })
    );
  }

  // Méthode pour obtenir les données olympiques
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.pipe(
      map(olympics => olympics || [])  // Si olympics est null, retourner un tableau vide
    );
  }
}
