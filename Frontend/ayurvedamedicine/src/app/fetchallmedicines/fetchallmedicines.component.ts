import { Component } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fetchallmedicines',
  standalone: true,
  imports: [CommonModule,RouterLink,MatTableModule,MatButtonModule],
  templateUrl: './fetchallmedicines.component.html',
  styleUrl: './fetchallmedicines.component.css'
})
export class FetchallmedicinesComponent {

  medicines:any

   displayedColumns: string[] = ['id', 'medicineName', 'medicinePrice', 'mfd','expiryDate','comapnyName','categoryName',"edit", "delete"];
 
   constructor(private medicineService:MedicineService,private router :Router) {
   }

   ngOnInit() {
    console.log("inside fetchallmedicines");
    this.medicineService.getAllMedicines().subscribe((data)=> this.medicines = data);
   }

   deleteMedicine(): void {
    if (!this.medicines) {
      return;
    }

    const confirmDelete = confirm(`Are you sure want to delete?`);
    if (confirmDelete) {
      this.medicineService.deleteMedicine(this.medicines.id).subscribe({
        next: () => {
          alert('Medicine deleted successfully!');
          this.router.navigate(['/admin/medicine/all']); // Redirect to medicines list after deletion
        },
        error: (error) => {
          console.error('Error deleting medicine', error);
        }
      });
    }
  }

   goBack() {
    window.history.back();
  }
}
