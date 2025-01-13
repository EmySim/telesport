import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { Olympic } from '../../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnChanges {
  @Input() olympics: Olympic[] = [];
  @Output() countrySelect = new EventEmitter<{ id: number }>();

  // Données formatées pour ngx-charts
  chartData: { name: string; value: number; id: number }[] = [];
  view: [number, number] = [700, 400]; // Taille du graphique

  // Méthode appelée à chaque changement d'input (nouvelle liste olympiques)
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Données reçues par le pie chart:', this.olympics);
    if (changes['olympics'] && this.olympics?.length > 0) {
      this.formatChartData();
    }
  }

  // Formater les données pour le graphique : : Calculer le nombre total de médailles par pays
  private formatChartData(): void {
    this.chartData = this.olympics.map((olympic) => ({
      name: olympic.country,
      value: olympic.participations.reduce(
        (total, participation) => total + participation.medalsCount,
        0
      ),
      id: olympic.id,
      icon: 'fa-award'
    }));
  }

  // Méthode pour émettre l'événement de sélection d'un pays
  onCountrySelect(event: { name: string; value: number; label: string }): void {
    console.log('Événement sélectionné :', event);

    // Rechercher le pays correspondant dans les données formatées
    const selectedCountry = this.chartData.find(
      (data) => data.name === event.name
    );

    if (selectedCountry?.id !== undefined) {
      this.countrySelect.emit({ id: selectedCountry.id });
    } else {
      console.error(
        'ID du pays est undefined ou introuvable dans chartData pour:',
        event
      );
    }
  }
}
