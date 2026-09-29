import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BirthStatistics } from '../../../../domain/models/birth-statistics.model';

import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  imports: [],
  selector: 'app-births-chart',
  styleUrl: './births-chart.scss',
  templateUrl: './births-chart.html',
})
export class BirthsChart implements AfterViewInit {

  @Input() data: BirthStatistics[] = [];

  @ViewChild('birthChart')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart(): void {

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    const labels = this.data.map(item =>
      `${months[item.month - 1]} ${item.year}`
    );

    const values = this.data.map(item =>
      item.totalBirths
    );

    const config: ChartConfiguration = {
      type: 'bar',

      data: {
        labels,

        datasets: [
          {
            label: 'Clientes nacidos',
            data: values
          }
        ]
      },

      options: {
        responsive: true,

        plugins: {
          legend: {
            display: true
          }
        },

        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.chart = new Chart(
      this.chartCanvas.nativeElement,
      config
    );
  }
}
