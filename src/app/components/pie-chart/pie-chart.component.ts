import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Olympic } from '../../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnChanges  {
  @Input() olympics: Olympic[] = [];
  @Output() countrySelect = new EventEmitter<{ id: number }>();

  // Données formatées pour ngx-charts
  chartData: { name: string; value: number; id: number }[] = [];
  view: [number, number] = [700, 400]; // Taille du graphique
  showLegend: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['olympics'] && this.olympics) {
      this.formatChartData();
    }
  }

  //constructor(private router: Router) {}


  // Formater les données pour le graphique
  private formatChartData(): void {
    this.chartData = this.olympics.map((olympic) => ({
      name: olympic.country,
      value: olympic.participations.reduce(
        (total, participation) => total + participation.medalsCount,
        0
      ),
      id: olympic.id,
    }));
  }

  // Gérer le clic sur un pays
  public onCountryClick(event: { name: string }): void {
    const selectedCountry = this.chartData.find(
      (country) => country.name === event.name
    );
    if (selectedCountry) {
      this.countrySelect.emit({ id: selectedCountry.id });
    }
  }
}
