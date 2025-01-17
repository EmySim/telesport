import { Component, Input, OnChanges } from '@angular/core';
import { Participation } from 'src/app/core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgxChartsModule, TooltipComponent],
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnChanges {
  @Input() participations: Participation[] = []; // Données des participations

  // Données formatées pour ngx-charts
  chartData: {
    name: string;
    series: { name: string; value: number; city: string }[];
  }[] = [];
  view: [number, number] = [700, 400];

  // Options du graphique
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  showYAxisLabel = false;
  xAxisLabel = 'Années';

  /**
   * Méthode déclenchée lorsqu'une propriété @Input() change.
   */
  ngOnChanges(): void {
    if (this.participations?.length) {
      this.formatChartData();
    } else {
      this.chartData = [];
    }
  }

  /**
   * Formate les données pour ngx-charts.
   */
  private formatChartData(): void {
    this.chartData = [
      {
        name: 'Medals',
        series: this.participations.map((p: Participation) => ({
          name: p.year.toString(),
          value: p.medalsCount,
          city: p.city,
        })),
      },
    ];
  }
}
