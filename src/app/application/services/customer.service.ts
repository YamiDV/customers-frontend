import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerRequest } from '../../domain/models/customer-request.model';
import { Customer } from '../../domain/models/customer.model';
import { CustomerSearch } from '../../domain/models/customer-search.model';
import { CustomerIndicators } from '../../domain/models/customer-indicators.model';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private readonly customerRepository: CustomerRepository
    ) { }

    createCustomer(
        customerRequest: CustomerRequest
    ): Observable<Customer> {

        return this.customerRepository
            .createCustomer(customerRequest);
    }

    getCustomers(
        search: CustomerSearch
    ): Observable<Customer[]> {

        return this.customerRepository.getCustomers(search);
    }

    getCustomerIndicators():
        Observable<CustomerIndicators> {

        return this.customerRepository
            .getCustomerIndicators();
    }

}