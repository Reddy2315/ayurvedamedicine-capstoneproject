import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatLineModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    MatFormField,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatLabel,
    MatMenuModule,
    CommonModule,
    FormsModule,
    MatTooltipModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userName: string | null = null;
  userType:string|null=null;
  medicineName: string = '';
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      if (this.isAuthenticated) {
        const customerString = localStorage.getItem('customer');
        const adminString = localStorage.getItem('admin');
        if (customerString) {
          const customer = JSON.parse(customerString);
          this.userName = customer.userName;
          this.userType=customer.userType;
        }
        if(adminString){
          const admin = JSON.parse(adminString);
          this.userName = admin.userName;
          this.userType=admin.userType;
        }
      } else {
        this.userName = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to login page after logout
  }

  searchMedicine() {
    if (this.medicineName.trim()) {
      this.router.navigate(['/medicine', this.medicineName]);
    }
    this.medicineName = '';
  }


}
