import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CustomerService } from '../../../../application/services/customer.service';
import { CustomerRequest } from '../../../../domain/models/customer-request.model';


@Component({
  imports: [
     ReactiveFormsModule
  ],
  selector: 'app-customer-form',
  styleUrl: './customer-form.scss',
  templateUrl: './customer-form.html',
})
export class CustomerForm {

  customerForm: FormGroup;

  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly customerService: CustomerService
  ) {

    this.customerForm = this.fb.group({

      firstName: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],

      lastName: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      dni: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]],

      birthDate: ['', [
        Validators.required
      ]]
    });
  }

  submit(): void {

    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const customerRequest: CustomerRequest =
      this.customerForm.getRawValue();

    this.customerService
      .createCustomer(customerRequest)
      .subscribe({

        next: customer => {

          this.successMessage =
            `Cliente ${customer.firstName} registrado correctamente`;

          this.errorMessage = '';

          this.customerForm.reset();
        },

        error: error => {

          console.error(error);

          this.successMessage = '';

          this.errorMessage =
            'No se pudo registrar el cliente';
        }

      });
  }
}