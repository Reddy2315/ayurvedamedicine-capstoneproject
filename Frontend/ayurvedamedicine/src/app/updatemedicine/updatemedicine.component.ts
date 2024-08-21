import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Medicine } from '../model/Medicine';
import { MedicineService } from '../services/medicine.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatemedicine',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './updatemedicine.component.html',
  styleUrl: './updatemedicine.component.css'
})
export class UpdatemedicineComponent {

  medicine: Medicine = {
    id: 0,
    name: '',
    price: 0,
    mfd: new Date(),
    expiryDate: new Date(),
    companyName: '',
    category: {
      name: ''
    }
  };

  constructor(
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const medicineId = +this.route.snapshot.paramMap.get('mid')!;
    this.medicineService.getMedicineDetails(medicineId).subscribe({
      next: (data: Medicine) => {
        this.medicine = data;
      },
      error: (err) => {
        console.error('Error fetching medicine data:', err);
      }
    });
  }

  updateMedicine(form: NgForm): void {
    if (form.invalid) {
      return; // Prevents submission if form is invalid
    }

    const updatedMedicine: Medicine = {
      ...this.medicine,
      ...form.value,
    };

    this.medicineService.updateMedicine(updatedMedicine).subscribe({
      next: () => {
        alert('Medicine updated successfully!');
        this.router.navigate(['/admin/medicines/all']); 
      },
      error: (error) => {
        console.error('Error updating medicine:', error);
      }
    });
  }

 goBack() {
    window.history.back();
  }

  
  
}
