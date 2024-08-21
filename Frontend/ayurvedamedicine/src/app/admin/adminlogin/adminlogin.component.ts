import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin } from '../../model/Admin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, FormsModule, CommonModule
  ],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  existingAdmin: any;
  errorMessage: string | null = null;


  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  adminSignIn(signindetails: NgForm) {
    if (signindetails.invalid) {
      return; // Prevent submission if the form is invalid
    }
    const { email, password } = signindetails.value;
    if (email !== '' && password !== '') {
      this.authService.adminLogin(signindetails.value).subscribe(
        (response: Admin[]) => { // Response is an array of customers
          const admin = response.find(cust => cust.email === email);
          if (admin) {
            if (admin.password === password) {
              this.existingAdmin = admin;
              console.log(admin);

              localStorage.setItem('admin', JSON.stringify(this.existingAdmin));
              this.authService.setAuthStatus(true);
              this.snackBar.open('You are successfully logged in!', 'Close', {
                duration: 3000
              });
              this.router.navigate(['/admin/dashboard']);
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
