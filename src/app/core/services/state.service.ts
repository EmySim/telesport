import { Injectable, Input} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service global à toute l'application
})
export class StateService {
  @Input() dataLoaded: boolean = false;
  // Comportement par défaut pour chaque état
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private dataAvailableSubject = new BehaviorSubject<boolean>(false);

  // Expose les états sous forme d'Observable
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  dataAvailable$ = this.dataAvailableSubject.asObservable();

  /**
   * Change l'état de `loading`
   * @param isLoading Si true, on indique que le chargement est en cours
   */
  setLoading(isLoading: boolean): void {
    console.log('Loading state:', isLoading);
    this.loadingSubject.next(isLoading);
  }

  /**
   * Change l'état d'erreur
   * @param errorMessage Le message d'erreur à afficher
   */
  setError(errorMessage: string | null): void {
    console.log('Error state:', errorMessage);
    this.errorSubject.next(errorMessage);
  }

  /**
   * Change l'état `dataAvailable`
   * @param isAvailable Si true, les données sont disponibles
   */
  setDataAvailable(isAvailable: boolean): void {
    console.log('Data available state:', isAvailable);
    this.dataAvailableSubject.next(isAvailable);
  }

  /**
   * Réinitialise tous les états (utilisé en cas de réinitialisation de l'interface)
   */
  resetStates(): void {
    this.setLoading(false);
    this.setError(null);
    this.setDataAvailable(false);
  }
}
