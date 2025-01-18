import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
//import { Olympic } from '../../core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule, TooltipComponent],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent {
  @Input() chartData: { name: string; value: number; id: number }[] = [];
  @Output() countrySelect = new EventEmitter<{ id: number }>();

  view: [number, number] = [700, 400];


  onCountrySelect(event: { name: string }): void {
    const selectedCountry = this.chartData.find(
      (data) => data.name === event.name
    );
    if (selectedCountry) {
      this.countrySelect.emit({ id: selectedCountry.id });
    }
  }
}
