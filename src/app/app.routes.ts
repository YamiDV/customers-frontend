import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/pages/dashboard-page/dashboard-page';
import { CustomersPage } from './features/customers/pages/customers-page/customers-page';
import { IndicatorsPage } from './features/indicators/pages/indicators-page/indicators-page';

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
    path: 'indicators',
    component: IndicatorsPage
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];