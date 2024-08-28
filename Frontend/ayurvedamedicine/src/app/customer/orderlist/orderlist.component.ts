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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {

  orders: OrderList[] = [];
  filteredOrders: OrderList[] = [];
  filterCriteria: { orderDate: Date | null; orderStatus: string | null } = { orderDate: null, orderStatus: null };
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
           
            this.filteredOrders = [...this.orders]; // Initialize filteredOrders with all orders

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
      this.snackBar.open('Please login to view orders.', 'Close', {
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
          this.filteredOrders = [...this.orders]; // Update filteredOrders as well
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

  filterOrdersByDate() {
    if (this.filterCriteria.orderDate) {
      // Convert the selected date to a string in YYYY-MM-DD format
      const selectedDate = new Date(this.filterCriteria.orderDate).toISOString().split('T')[0];
      
      // Filter the orders by comparing only the date part of the orderDate
      this.filteredOrders = this.orders.filter(order => {
        const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
        return orderDate === selectedDate;
      });
  
      // Reset the orderDate in the form after filtering
      this.filterCriteria.orderDate = null;
    } else {
      this.filteredOrders = [...this.orders]; // Show all orders if no date is selected
    }
  }
  
  filterOrdersByStatus() {
    if (this.filterCriteria.orderStatus) {
      this.filteredOrders = this.orders.filter(order => order.status === this.filterCriteria.orderStatus);
    } else {
      this.filteredOrders = [...this.orders];
    }
  }

  resetFilters() {
    this.filterCriteria.orderDate = null;
    this.filterCriteria.orderStatus = null;
    this.loadOrders();
  }

 

}








// import { Component } from '@angular/core';
// import { OrderList } from '../../model/OrderList';
// import { OrderService } from '../../services/order.service';
// import { AuthService } from '../../services/auth.service';
// import { RouterLink } from '@angular/router';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { CommonModule } from '@angular/common';
// import { MedicineService } from '../../services/medicine.service';
// import { forkJoin } from 'rxjs';
// import { Medicine } from '../../model/Medicine';
// import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-orderlist',
//   standalone: true,
//   imports: [
//     RouterLink,
//     CommonModule,
//     FormsModule,
//     MatCardModule,
//     MatButtonModule,
//     MatIconModule,
//     MatFormFieldModule,
//     MatInputModule
//   ],
//   templateUrl: './orderlist.component.html',
//   styleUrls: ['./orderlist.component.css']
// })
// export class OrderlistComponent {

//   orders: OrderList[] = [];
//   filteredOrders: OrderList[] = [];
//   filterCriteria: { orderDate: Date | null } = { orderDate: null };
//   customerId: string | null = null;
//   medicineMap: { [id: number]: Medicine } = {}; // Use a map for efficient lookups

//   constructor(
//     private orderService: OrderService,
//     private authService: AuthService,
//     private medicineService: MedicineService,
//     private snackBar: MatSnackBar // Inject MatSnackBar
//   ) {}

//   ngOnInit() {
//     this.loadCustomerIdAndOrders();
//   }

//   goBack() {
//     window.history.back();
//   }

//   private loadCustomerIdAndOrders() {
//     const customerString = localStorage.getItem('customer');
//     if (customerString) {
//       const customer = JSON.parse(customerString);
//       this.customerId = customer.id;

//       if (this.customerId) {
//         this.loadOrders();
//       } else {
//         this.snackBar.open('No customer ID found.', 'Close', {
//           duration: 3000
//         });
//       }
//     }
//   }

//   private loadOrders() {
//     if (this.authService.isAuthenticated()) {
//       if (this.customerId) {
//         this.orderService.getOrdersByCustomerId(this.customerId).subscribe({
//           next: (data: OrderList[]) => {
//             this.orders = data;

//             // Collect medicine IDs
//             const medicineIds = new Set<number>();
//             data.forEach(order => {
//               order.orderItems.forEach(item => {
//                 medicineIds.add(item.medicineId);
//               });
//             });

//             // Fetch medicine details
//             this.fetchMedicineDetails(Array.from(medicineIds));
//           },
//           error: (error) => {
//             console.error('Error fetching orders:', error);
//             this.snackBar.open('Error fetching orders.', 'Close', {
//               duration: 3000
//             });
//           }
//         });
//       }
//     } else {
//       this.snackBar.open('Please log in to view orders.', 'Close', {
//         duration: 3000
//       });
//     }
//   }

//   private fetchMedicineDetails(medicineIds: number[]) {
//     const observables = medicineIds.map(id => this.medicineService.getMedicineDetails(id));

//     forkJoin(observables).subscribe({
//       next: (medicines: Medicine[]) => {
//         this.medicineMap = medicines.reduce((map, medicine) => {
//           map[medicine.id] = medicine;
//           return map;
//         }, {} as { [id: number]: Medicine });
//       },
//       error: (error) => {
//         console.error('Error fetching medicine details:', error);
//         this.snackBar.open('Error fetching medicine details.', 'Close', {
//           duration: 3000
//         });
//       }
//     });
//   }

//   cancelOrder(orderId: number) {
//     if (confirm('Are you sure you want to cancel this order?')) {
//       this.orderService.cancelOrder(orderId).subscribe({
//         next: (response) => {
//           // Update the orders list to reflect the canceled order
//           this.orders = this.orders.map(order =>
//             order.id === orderId ? { ...order, status: 'Cancelled' } : order
//           );
//           this.snackBar.open('Order canceled successfully.', 'Close', {
//             duration: 3000
//           });
//         },
//         error: (error) => {
//           console.error('Error canceling order:', error);
//           this.snackBar.open('Failed to cancel order.', 'Close', {
//             duration: 3000
//           });
//         }
//       });
//     }
//   }

//   isCancelButtonDisabled(orderStatus: string): boolean {
//     return orderStatus === 'Cancelled';
//   }

//   filterOrdersByDate(){
//     if (this.filterCriteria.orderDate) {
//       // Convert the selected date to a string in YYYY-MM-DD format
//       const selectedDate = new Date(this.filterCriteria.orderDate).toISOString().split('T')[0];
      
//       // Filter the orders by comparing only the date part of the orderDate
//       this.filteredOrders = this.orders.filter(order => {
//         const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
//         return orderDate === selectedDate;
//       });
//     } else {
//        this.loadOrders(); // If no date is selected, show all orders
//     }
//   }
  
  

// }

