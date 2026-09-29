import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { CustomerRepository } from './domain/repositories/customer.repository';
import { CustomerHttpRepository } from './infrastructure/repositories/customer-http.repository';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideRouter(routes),
    provideHttpClient(),

    {
      provide: CustomerRepository,
      useClass: CustomerHttpRepository
    }
  ]
};