import { Component, OnInit, signal } from '@angular/core';

import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { Header } from '../../../../shared/components/header/header';

import { IndicatorCard } from '../../components/indicator-card/indicator-card';
import { BirthsChart } from '../../components/births-chart/births-chart';

import { CustomerService } from '../../../../application/services/customer.service';
import { CustomerIndicators } from '../../../../domain/models/customer-indicators.model';

@Component({
  imports: [
    Sidebar,
    Header,
    IndicatorCard,
    BirthsChart
  ],
  selector: 'app-indicators-page',
  styleUrl: './indicators-page.scss',
  templateUrl: './indicators-page.html',
})
export class IndicatorsPage implements OnInit {

  indicators = signal<CustomerIndicators | null>(null);

  loading = signal(false);

  errorMessage = signal('');

  constructor(
    private readonly customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadIndicators();
  }

  loadIndicators(): void {

    this.loading.set(true);
    this.errorMessage.set('');

    this.customerService
      .getCustomerIndicators()
      .subscribe({

        next: data => {
          this.indicators.set(data);
          this.loading.set(false);
        },

        error: error => {
          console.error(error);

          this.errorMessage.set(
            'No se pudieron cargar los indicadores'
          );

          this.loading.set(false);
        }

      });
  }

  formatMonthYear(month: number, year: number): string {

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

    return `${months[month - 1]} ${year}`;
  }

  formatMonth(month: number): string {

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

    return months[month - 1];
  }

}
