import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../model/Customer';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  existingCustomer: any;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  signIn(signindetails: NgForm) {
    if (signindetails.invalid) {
      return; // Prevent submission if the form is invalid
    }
    const { email, password } = signindetails.value;
    if (email !== '' && password !== '') {
      this.authService.login(signindetails.value).subscribe(
        (response: Customer[]) => { // Response is an array of customers
          const customer = response.find(cust => cust.email === email);
          if (customer) {
            if (customer.password === password) {
              this.existingCustomer = customer;
              localStorage.setItem('customer', JSON.stringify(this.existingCustomer));
              this.authService.setAuthStatus(true); 
              this.snackBar.open('You are successfully logged in!', 'Close', {
                duration: 3000
              });
              this.router.navigate(['']); 
            } else {
              this.errorMessage = 'Invalid password.';
              this.authService.setAuthStatus(false); 
            }
          } else {
            this.errorMessage = 'Invalid email address.';
            this.authService.setAuthStatus(false); 
          }
        },
        () => {
          this.errorMessage = 'Login failed. Please try again.';
        }
      );
    }
  }
}
