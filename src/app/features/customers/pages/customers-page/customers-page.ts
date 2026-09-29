import { Component } from '@angular/core';

import { Sidebar } from '../../../../shared/components/sidebar/sidebar';
import { Header } from '../../../../shared/components/header/header';

import { CustomerForm } from '../../components/customer-form/customer-form';
import { CustomerSearch } from '../../components/customer-search/customer-search';

@Component({
  imports: [
    Sidebar,
    Header,
    CustomerForm,
    CustomerSearch
  ],
  selector: 'app-customers-page',
  styleUrl: './customers-page.scss',
  templateUrl: './customers-page.html',
})
export class CustomersPage {

  selectedOption: 'register' | 'search' = 'register';

  showRegister(): void {
    this.selectedOption = 'register';
  }

  showSearch(): void {
    this.selectedOption = 'search';
  }
}