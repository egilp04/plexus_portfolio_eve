import { Component, computed, input } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardTitle, MatCard } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bar-char',
  standalone: true,
  imports: [BaseChartDirective, MatCardTitle, MatCard, TranslateModule],
  templateUrl: './bar-char.component.html',
  styleUrl: './bar-char.component.scss',
})
export class BarCharComponent {
  labels = input<string[]>([]);
  values = input<number[]>([]);
  title = input<string>('');
  colors = input<string[]>([]);

  barChartType: ChartType = 'bar';

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  chartData = computed<ChartData<'bar'>>(() => ({
    labels: this.labels(),
    datasets: [
      {
        data: this.values(),
        backgroundColor: this.colors(),
      },
    ],
  }));
}
