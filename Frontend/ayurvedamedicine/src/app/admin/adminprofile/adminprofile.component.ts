import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-adminprofile',
  standalone: true,
  imports: [RouterLink,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule],
  templateUrl: './adminprofile.component.html',
  styleUrl: './adminprofile.component.css'
})
export class AdminprofileComponent {
  admin: any = {};

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      this.admin = JSON.parse(storedAdmin);
    }
  }

  goBack() {
    window.history.back();
  }

  updateAdminProfile(form: NgForm) {
    if (form.invalid) {
      return; // Prevent submission if the form is invalid
    }

    this.adminService.updateProfile(this.admin).subscribe({
      next: () => {
        // Update localStorage with new customer data
        localStorage.setItem('admin', JSON.stringify(this.admin));
    
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000
        });
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
    this.admin = JSON.parse(localStorage.getItem('customer') || '{}');
  }
}
