import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { describe, beforeEach, expect, it, vi } from 'vitest';

import { CustomerService } from './customer.service';
import { CustomerRepository } from '../../domain/repositories/customer.repository';

describe('CustomerService', () => {

  let service: CustomerService;

  const repositoryMock = {
    createCustomer: vi.fn(),
    getCustomers: vi.fn(),
    getCustomerIndicators: vi.fn()
  };

  beforeEach(() => {

    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        CustomerService,
        {
          provide: CustomerRepository,
          useValue: repositoryMock
        }
      ]
    });

    service = TestBed.inject(CustomerService);
  });

  it('should create a customer', () => {

    const request = {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan@gmail.com',
      dni: '12345678',
      birthDate: '1998-05-15'
    };

    const expectedCustomer = {
      id: 1,
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan@gmail.com',
      dni: '12345678',
      createdAt: '2026-09-29T10:00:00',
      birthDate: '1998-05-15'
    };

    repositoryMock.createCustomer.mockReturnValue(
      of(expectedCustomer)
    );

    service.createCustomer(request)
      .subscribe(customer => {

        expect(customer).toEqual(expectedCustomer);

        expect(repositoryMock.createCustomer)
          .toHaveBeenCalledWith(request);
      });
  });

});