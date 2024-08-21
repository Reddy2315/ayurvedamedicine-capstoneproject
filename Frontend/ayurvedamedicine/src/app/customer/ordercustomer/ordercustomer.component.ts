import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../services/medicine.service';
import { OrderService } from '../../services/order.service';
import { Medicine } from '../../model/Medicine';
import { Order } from '../../model/Order';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ImagesliderComponent } from '../../imageslider/imageslider.component';

@Component({
  selector: 'app-ordercustomer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    ImagesliderComponent
    
  ],
  templateUrl: './ordercustomer.component.html',
  styleUrls: ['./ordercustomer.component.css']
})
export class OrdercustomerComponent implements OnInit {
  medicines: Medicine[] = [];
  quantities: number[] = [];
  order: Order | null = null;
  userId: any;
  isAuthenticated = false;
  private authSubscription: Subscription | null = null;
  constructor(
    private medicineService: MedicineService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }



  

 
  ngOnInit() {


      this.authSubscription = this.authService.authStatus$.subscribe(status => {
        this.isAuthenticated = status;
      });

    this.loadQuantities();
    this.loadOrder();
    this.fetchMedicines();

    // Retrieve the customer object from localStorage
    const customerString = localStorage.getItem('customer');
    if (customerString) {
      const customer = JSON.parse(customerString);
      this.userId = customer.id;
      console.log(`Logged in as id: ${this.userId}`);
    } else {
      console.log('No customer data found in localStorage.');
    }
  }

  isCustomer() {
    if (this.authService.isAuthenticated()) {
      // Proceed with order if authenticated
      return true;
    } else {
      // Prompt login if not authenticated
      window.alert("Please login first!");
      this.router.navigate(['login']);
      return false;
    }
  }

  saveOrder(addOrderForm: any) {
    if (!this.isCustomer()) {
      return;
    }

    const formValues = addOrderForm.value;
    const order: Order = {
      id: 0,
      status:'',
      customerId: this.userId,
      orderItems: this.medicines
        .map((medicine, index) => ({
          medicineId: medicine.id,
          quantity: this.quantities[index] || 0
        }))
        .filter(item => item.quantity > 0)
    };


    if (order.orderItems.length === 0) {
      alert("Please add at least one item to the order!...");
      return;
    }

    sessionStorage.setItem('order', JSON.stringify(order));

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        alert("Order Placed Successfully!...");
        this.resetForm(addOrderForm);
      },
      error: () => {
        alert("Failed to place order. If you want place the order Please Login!...");
      }
    });
  }

  private fetchMedicines() {
    this.medicineService.getAllMedicines().subscribe({
      next: (data: Medicine[]) => {
        this.medicines = data;
        if (this.quantities.length === 0) {
          this.quantities = Array(this.medicines.length).fill(0);
        }
      },
      error: (error) => {
        console.error('Error fetching medicines:', error);
      }
    });
  }

  private loadQuantities() {
    const storedQuantities = sessionStorage.getItem('quantities');
    if (storedQuantities) {
      this.quantities = JSON.parse(storedQuantities);
    } else {
      this.quantities = [];
    }
  }

  private loadOrder() {
    const orderData = sessionStorage.getItem('order');
    if (orderData) {
      this.order = JSON.parse(orderData);
    } else {
      console.error('No order data found in session storage.');
    }
  }

  increaseQuantity(index: number) {
    if (index >= 0 && index < this.quantities.length) {
      this.quantities[index] = (this.quantities[index] || 0) + 1;
      this.saveQuantitiesToSession();
    }
  }

  decreaseQuantity(index: number) {
    if (index >= 0 && index < this.quantities.length && this.quantities[index] > 0) {
      this.quantities[index] = (this.quantities[index] || 0) - 1;
      this.saveQuantitiesToSession();
    }
  }

  private saveQuantitiesToSession() {
    sessionStorage.setItem('quantities', JSON.stringify(this.quantities));
  }

  public resetForm(form: any) {
    form.resetForm();
    this.quantities = Array(this.medicines.length).fill(0);
    this.saveQuantitiesToSession();
  }
}
