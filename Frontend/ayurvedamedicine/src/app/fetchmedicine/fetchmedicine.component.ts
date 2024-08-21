import { Component } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { Medicine } from '../model/Medicine';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fetchmedicine',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatIconModule,MatButtonModule ],
  templateUrl: './fetchmedicine.component.html',
  styleUrl: './fetchmedicine.component.css'
})
export class FetchmedicineComponent {

  selectedMedicine: any;

  constructor(private medicineService: MedicineService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let MedicneId: number = Number(params.get("mid"));
      this.fetchProductDetails(MedicneId);
    })
  }

  fetchProductDetails(id: number) {
    this.medicineService.getMedicineDetails(id).subscribe({
      next: data => this.selectedMedicine = data,
      error: err => console.log(err)
    })
  }

  goBack() {
    window.history.back();
  }
  

}
