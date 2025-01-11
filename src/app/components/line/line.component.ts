import { Component, Input, OnChanges } from '@angular/core';
import { Participation } from 'src/app/core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss',
})
export class LineComponent implements OnChanges {
  @Input() participations: Participation[] = []; // Données des participations

  // Données formatées pour ngx-charts
  chartData: { name: string; series: { name: string; value: number }[] }[] = [];
  view: [number, number] = [700, 400]; // Taille du graphique
  // Options du graphique
  showLegend: boolean = true;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Années';
  yAxisLabel: string = 'Nombre';

  ngOnChanges(): void {
    if (this.participations && this.participations.length > 0) {
      this.formatChartData();
    }
  }

  //Formate les données pour ngx-charts
   
  private formatChartData(): void {
    this.chartData = [
      {
        name: 'Participations',
        series: this.participations.map((p: Participation) => ({
          name: p.year.toString(),
          value: 1, // Chaque année représente une participation
        })),
      },
      {
        name: 'Médailles',
        series: this.participations.map((p: Participation) => ({
          name: p.year.toString(),
          value: p.medalsCount,
        })),
      },
      {
        name: 'Athlètes',
        series: this.participations.map((p: Participation) => ({
          name: p.year.toString(),
          value: p.athleteCount,
        })),
      },
    ];
  }
}
