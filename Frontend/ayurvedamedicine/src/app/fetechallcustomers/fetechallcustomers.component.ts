import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CustomersList } from '../model/CustomersList';

@Component({
  selector: 'app-fetechallcustomers',
  standalone: true,
  imports: [RouterLink,MatButtonModule,CommonModule,MatTableModule],
  templateUrl: './fetechallcustomers.component.html',
  styleUrl: './fetechallcustomers.component.css'
})
export class FetechallcustomersComponent {

  customers:CustomersList[]=[];

   displayedColumns: string[] = ['id', 'userName', 'email','password','phoneNumber','address', "edit", "delete"];
 
   constructor(private customerService:CustomerService) {
   }

   ngOnInit() {
    console.log("inside fetchall customers");
    this.customerService.getAllCustomers().subscribe((data)=> this.customers = data);
    console.log("customers list" ,this.customers);
   }

   
  maskPassword(password: string): string {
    return '**********';
  }

  goBack() {
    window.history.back();
  }
}
