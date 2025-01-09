import { Component, Input, OnChanges } from '@angular/core';
import { Participation } from 'src/app/core/models/Participation';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent implements OnChanges {
  @Input() data: Participation[] = [];

  public chartData: { year: number; value: number }[] = [];

  ngOnChanges(): void {
    if (this.data) {
      this.chartData = this.data.map((p) => ({
        year: p.year,
        value: p.medalsCount, // Utiliser le nombre de médailles par exemple
      }));
    }
  }
}
