import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MedicineService } from '../services/medicine.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { catchError, Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { searchMedicines } from '../model/SearchMedicines';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medicinesearchresults',
  standalone: true,
  imports: [
    RouterLink,
  CommonModule,
  FormsModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule
  ],
  templateUrl: './medicinesearchresults.component.html',
  styleUrls: ['./medicinesearchresults.component.css']
})
export class MedicinesearchresultsComponent {

  medicine: searchMedicines | null = null; // Single object or null
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private medicineService: MedicineService,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchQuery = params['name'];
      this.searchMedicines();
    });
  }


  goBack() {
    window.history.back();
  }

  searchMedicines(): void {
    this.medicineService.findByMedicineName(this.searchQuery).pipe(
      tap(data => {
        console.log('Data received in component:', data);
        this.medicine = data;
      }),
      catchError(error => {
        console.error('Error fetching search results', error);
        this.medicine = null;
        return of(null); // Return null in case of error
      })
    ).subscribe(() => {
      console.log('Medicine:', this.medicine);
      this.cd.detectChanges();
    });
  }
}
