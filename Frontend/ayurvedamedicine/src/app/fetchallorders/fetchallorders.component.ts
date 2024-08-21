import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../model/Order';
import { OrderService } from '../services/order.service';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Medicine } from '../model/Medicine';
import { MedicineService } from '../services/medicine.service';
import { OrderItem } from '../model/OrderItem';
import { Customer } from '../model/Customer';

@Component({
  selector: 'app-fetchallorders',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule],
  templateUrl: './fetchallorders.component.html',
  styleUrls: ['./fetchallorders.component.css']
})
export class FetchallordersComponent implements OnInit {

  orders: Order[] = [];
  customers: Customer[] = [];
  medicines: Medicine[] = [];
  displayedColumns: string[] = ['id', 'customerName', 'customerEmail', 'customerAddress', 'orderAmount', 'orderDate', 'status', 'items', 'action'];

  constructor(
    private orderService: OrderService,
    private medicineService: MedicineService,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCustomerAndMedicineData();
    this.loadOrders();
  }

  loadCustomerAndMedicineData(): void {
    const storedCustomers = localStorage.getItem('customers');
    const storedMedicines = localStorage.getItem('medicines');

    if (storedCustomers && storedMedicines) {
      this.customers = JSON.parse(storedCustomers);
      this.medicines = JSON.parse(storedMedicines);
    } else {
      this.customerService.getAllCustomers().subscribe((data) => {
        this.customers = data;
        localStorage.setItem('customers', JSON.stringify(this.customers));
      });

      this.medicineService.getAllMedicines().subscribe((data) => {
        this.medicines = data;
        localStorage.setItem('medicines', JSON.stringify(this.medicines));
        window.location.reload();
      });
    }
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      localStorage.setItem('orders', JSON.stringify(this.orders));
      this.orders.forEach(order => {
        order.customerDetails = this.customers.find(customer => customer.id === order.customerId);
        order.orderItems.forEach((item: any) => {
          item.medicineDetails = this.medicines.find(medicine => medicine.id === item.medicineId);
        });
      });
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  updateOrderStatus(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        this.loadOrders(); // Reload orders after canceling
        window.alert("Order cancelled successfully");
      },
      error: (error) => {
        console.error('Error canceling order:', error);
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
