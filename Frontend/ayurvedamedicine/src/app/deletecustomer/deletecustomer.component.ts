import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Customer } from '../model/Customer';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deletecustomer',
  standalone: true,
  imports: [RouterLink,
    CommonModule, MatButtonModule
  ],
  templateUrl: './deletecustomer.component.html',
  styleUrl: './deletecustomer.component.css'
})
export class DeletecustomerComponent {

  customer: Customer | undefined;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    const customerId = Number(this.route.snapshot.paramMap.get('cid'));
    if (customerId) {
      this.customerService.getCustomerDetails(customerId).subscribe({
        next: (data) => {
          this.customer = data; // Populate the medicine object
        },
        error: (error) => {
          console.error('Error fetching medicine details', error);
        }
      });
    }
  }

  deleteCustomer(): void {
    if (this.customer && this.customer.id) {
      this.customerService.deleteCustomer(this.customer.id).subscribe(
        () => {
          this.snackBar.open('Customer deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/admin/allcustomers']);
        }
      );
    }
  }
  
  goBack() {
    window.history.back();
  }
}
