import { Component } from '@angular/core';
import { OrderList } from '../../model/OrderList';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../services/medicine.service';
import { forkJoin } from 'rxjs';
import { Medicine } from '../../model/Medicine';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {

  orders: OrderList[] = [];
  customerId: string | null = null;
  medicineMap: { [id: number]: Medicine } = {}; // Use a map for efficient lookups

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private medicineService: MedicineService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCustomerIdAndOrders();
  }

  goBack() {
    window.history.back();
  }

  private loadCustomerIdAndOrders() {
    const customerString = localStorage.getItem('customer');
    if (customerString) {
      const customer = JSON.parse(customerString);
      this.customerId = customer.id;

      if (this.customerId) {
        this.loadOrders();
      } else {
        this.snackBar.open('No customer ID found.', 'Close', {
          duration: 3000
        });
      }
    }
  }

  private loadOrders() {
    if (this.authService.isAuthenticated()) {
      if (this.customerId) {
        this.orderService.getOrdersByCustomerId(this.customerId).subscribe({
          next: (data: OrderList[]) => {
            this.orders = data;

            // Collect medicine IDs
            const medicineIds = new Set<number>();
            data.forEach(order => {
              order.orderItems.forEach(item => {
                medicineIds.add(item.medicineId);
              });
            });

            // Fetch medicine details
            this.fetchMedicineDetails(Array.from(medicineIds));
          },
          error: (error) => {
            console.error('Error fetching orders:', error);
            this.snackBar.open('Error fetching orders.', 'Close', {
              duration: 3000
            });
          }
        });
      }
    } else {
      this.snackBar.open('Please log in to view orders.', 'Close', {
        duration: 3000
      });
    }
  }

  private fetchMedicineDetails(medicineIds: number[]) {
    const observables = medicineIds.map(id => this.medicineService.getMedicineDetails(id));

    forkJoin(observables).subscribe({
      next: (medicines: Medicine[]) => {
        this.medicineMap = medicines.reduce((map, medicine) => {
          map[medicine.id] = medicine;
          return map;
        }, {} as { [id: number]: Medicine });
      },
      error: (error) => {
        console.error('Error fetching medicine details:', error);
        this.snackBar.open('Error fetching medicine details.', 'Close', {
          duration: 3000
        });
      }
    });
  }

  cancelOrder(orderId: number) {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: (response) => {
          // Update the orders list to reflect the canceled order
          this.orders = this.orders.map(order =>
            order.id === orderId ? { ...order, status: 'Cancelled' } : order
          );
          this.snackBar.open('Order canceled successfully.', 'Close', {
            duration: 3000
          });
        },
        error: (error) => {
          console.error('Error canceling order:', error);
          this.snackBar.open('Failed to cancel order.', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  isCancelButtonDisabled(orderStatus: string): boolean {
    return orderStatus === 'Cancelled';
  }
}

