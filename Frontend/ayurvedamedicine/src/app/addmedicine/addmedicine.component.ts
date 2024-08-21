import { Component } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Medicine } from '../model/Medicine';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addmedicine',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './addmedicine.component.html',
  styleUrls: ['./addmedicine.component.css']  // Corrected property name from styleUrl to styleUrls
})
export class AddmedicineComponent {

  constructor(private medicineService: MedicineService) { }

  saveMedicine(form: NgForm): void {
    if (form.invalid) {
      return; // Prevents submission if form is invalid
    }

    const formValue = form.value;
    
    // Transform form data to match Medicine interface
    const medicine: Medicine = {
      id: 0, // or some default value
      name: formValue.name,
      price: formValue.price,
      mfd: formValue.mfd,
      expiryDate: formValue.expiryDate,
      companyName: formValue.companyName || '', 
      category: {
        name: formValue.categoryName
      }
    };

    this.medicineService.addNewMedicine(medicine).subscribe({
      next: () => {
        alert('Medicine added successfully!');
        form.resetForm(); // Correctly reset the form
      },
      error: (error) => {
        console.error('Error adding medicine', error);
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
