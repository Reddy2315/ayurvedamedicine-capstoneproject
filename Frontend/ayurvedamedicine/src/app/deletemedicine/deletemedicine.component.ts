import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from '../model/Medicine';
import { MedicineService } from '../services/medicine.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deletemedicine',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './deletemedicine.component.html',
  styleUrl: './deletemedicine.component.css'
})
export class DeletemedicineComponent {

  medicine: Medicine | undefined;

  constructor(
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    const medicineId = Number(this.route.snapshot.paramMap.get('mid'));
    if (medicineId) {
      this.medicineService.getMedicineDetails(medicineId).subscribe({
        next: (data) => {
          this.medicine = data; // Populate the medicine object
        },
        error: (error) => {
          console.error('Error fetching medicine details', error);
        }
      });
    }
  }

  deleteMedicine(): void {
    if (this.medicine && this.medicine.id) {
      this.medicineService.deleteMedicine(this.medicine.id).subscribe(
        () => {
          this.snackBar.open('Medicine deleted successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/admin/medicines/all']);
        }
      );
    }
  }
  

  goBack() {
    window.history.back();
  }
}
