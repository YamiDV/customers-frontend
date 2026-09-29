import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { CustomersPage } from './features/customers/pages/customers-page/customers-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'customers',
    component: CustomersPage
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];