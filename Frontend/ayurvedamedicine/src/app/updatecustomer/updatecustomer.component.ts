import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/Customer';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Medicine } from '../model/Medicine';

@Component({
  selector: 'app-updatecustomer',
  standalone: true,
  imports: [RouterLink,FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './updatecustomer.component.html',
  styleUrl: './updatecustomer.component.css'
})
export class UpdatecustomerComponent {

  customer: Customer = {
    id: 0,
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  };

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = +this.route.snapshot.paramMap.get('cid')!;
    this.customerService.getCustomerDetails(customerId).subscribe({
      next: (data: Customer) => {
        this.customer = data;
      },
      error: (err) => {
        console.error('Error fetching medicine data:', err);
      }
    });
  }

  updateCustomer(form: NgForm): void {
    if (form.invalid) {
      return; // Prevents submission if form is invalid
    }

    const updatedCustomer: Customer = {
      ...this.customer,
      ...form.value,
    };

    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: () => {
        alert('Customer updated successfully!');
        this.router.navigate(['/admin/allcustomers']); 
      },
      error: (error) => {
        console.error('Error updating medicine:', error);
      }
    });
  }

 goBack() {
    window.history.back();
  }

}
