import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerRequest } from '../../domain/models/customer-request.model';
import { Customer } from '../../domain/models/customer.model';
import { CustomerSearch } from '../../domain/models/customer-search.model';

@Injectable()
export class CustomerHttpRepository implements CustomerRepository {

  private readonly apiUrl =
    'http://localhost:8080/api/customers';

  constructor(
    private readonly http: HttpClient
  ) {}

  createCustomer(
    customer: CustomerRequest
  ): Observable<Customer> {

    return this.http.post<Customer>(
      `${this.apiUrl}/register`,
      customer
    );
  }

  getCustomers(search: CustomerSearch): Observable<Customer[]> {

  return this.http.get<Customer[]>(
    `${this.apiUrl}/find`,
    {
      params: {
        filterType: search.filterType,
        searchTerm: search.searchTerm
      }
    }
  );
}
}