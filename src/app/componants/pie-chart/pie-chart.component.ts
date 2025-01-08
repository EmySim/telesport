import { Component, Input, OnInit } from '@angular/core';
import { Olympic } from '../../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() olympics: Olympic[] = [];

  // Données formatées pour ngx-charts
  chartData: { name: string; value: number }[] = [];
  view: [number, number] = [700, 400]; // Taille du graphique
  showLegend: boolean = true;

  ngOnInit(): void {
    this.chartData = this.olympics.map((olympic) => ({
      name: olympic.country,
      value: olympic.participations.reduce(
        (total, participation) => total + participation.medalsCount,
        0
      ),
    }));
  }
}