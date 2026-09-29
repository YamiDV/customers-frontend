import { Component } from '@angular/core';
import { Sidebar } from  '../../../../shared/components/sidebar/sidebar';
import { Header } from '../../../../shared/components/header/header';

@Component({
  imports: [
    Sidebar,
    Header
  ],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.scss',
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {}
