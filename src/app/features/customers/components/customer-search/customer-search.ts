import { Component, OnInit,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CustomerService } from '../../../../application/services/customer.service';
import { Customer } from '../../../../domain/models/customer.model';
import { CustomerSearch as CustomerSearchModel } from '../../../../domain/models/customer-search.model';

@Component({
  selector: 'app-customer-search',
  imports: [
    FormsModule
  ],
  templateUrl: './customer-search.html',
  styleUrl: './customer-search.scss'
})
export class CustomerSearch implements OnInit {

  customers = signal<Customer[]>([]);

  loading = signal(false);

  errorMessage = signal('');

  filterType: 'ALL' | 'DNI' | 'EMAIL' = 'ALL';

  searchTerm = '';

  constructor(
    private readonly customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {

    const search: CustomerSearchModel = {
      filterType: this.filterType,
      searchTerm: this.searchTerm
    };

    this.loading.set(true);
    this.errorMessage.set('');

    this.customerService
      .getCustomers(search)
      .subscribe({

        next: customers => {

          this.customers.set(customers);

          this.loading.set(false);
        },

        error: error => {

          console.error(error);

          this.errorMessage.set(
            'No se pudieron obtener los clientes'
          );

          this.loading.set(false);
        }

      });
  }

  search(): void {
    this.loadCustomers();
  }

  clearFilters(): void {

    this.filterType = 'ALL';
    this.searchTerm = '';

    this.loadCustomers();
  }
}