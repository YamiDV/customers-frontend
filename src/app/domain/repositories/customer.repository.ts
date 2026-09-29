import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerRequest } from '../models/customer-request.model';
import { CustomerSearch } from '../models/customer-search.model';
import { CustomerIndicators } from '../models/customer-indicators.model';

export abstract class CustomerRepository {

  abstract createCustomer(
    customer: CustomerRequest
  ): Observable<Customer>;

  abstract getCustomers(
    search: CustomerSearch
  ): Observable<Customer[]>;

  abstract getCustomerIndicators():
    Observable<CustomerIndicators>;

}