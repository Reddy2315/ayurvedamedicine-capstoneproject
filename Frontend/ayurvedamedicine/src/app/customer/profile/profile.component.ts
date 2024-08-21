import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {  MatCardModule } from '@angular/material/card';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule  
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  customer: any = {};

  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      this.customer = JSON.parse(storedCustomer);
    }
  }


  goBack() {
    window.history.back();
  }

  updateProfile(form: NgForm) {
    if (form.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this.customerService.updateProfile(this.customer).subscribe({
      next: () => {
        // Update localStorage with new customer data
        localStorage.setItem('customer', JSON.stringify(this.customer));
    
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 1000
        });
        window.location.reload();
      },
      error: () => {
        this.snackBar.open('Profile update failed. Please try again.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  resetForm(form: NgForm) {
    form.reset();
    this.customer = JSON.parse(localStorage.getItem('customer') || '{}');
  }
}
