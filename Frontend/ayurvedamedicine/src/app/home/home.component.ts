import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { OrdercustomerComponent } from '../customer/ordercustomer/ordercustomer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OrdercustomerComponent,
    NavbarComponent,
    FooterComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'Ayurveda Medicine';
  userName: string | null = null;
  medicineName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  @Input() medicine: any;

  ngOnInit(): void {
    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      // alert('Please login first!');
      this.router.navigate(['']);
      return;
    }

    // Retrieve the customer object from localStorage
    const customerString = localStorage.getItem('customer');
    
    // If customer data exists, parse it and extract the username
    if (customerString) {
      const customer = JSON.parse(customerString);
      this.userName = customer.userName;
      console.log(`Logged in as: ${this.userName}`);
    } else {
      console.log('No customer data found in localStorage.');
    }
  }

  searchMedicine(): void {
    if (this.medicineName.trim()) {
      this.router.navigate(['/customer/dashboard/medicine', this.medicineName]);
    } else {
      alert('Please enter a valid medicine name.');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
