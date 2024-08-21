import { Routes } from '@angular/router';
import { FetchallmedicinesComponent } from './fetchallmedicines/fetchallmedicines.component';
import { FetchmedicineComponent } from './fetchmedicine/fetchmedicine.component';
import { HomeComponent } from './home/home.component';
import { AddmedicineComponent } from './addmedicine/addmedicine.component';
import { RegisterComponent } from './customer/register/register.component';
import { LoginComponent } from './customer/login/login.component';
import { MedicinesearchresultsComponent } from './medicinesearchresults/medicinesearchresults.component';
import { AboutComponent } from './about/about.component';
import { OrderlistComponent } from './customer/orderlist/orderlist.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';
import { FetechallcustomersComponent } from './fetechallcustomers/fetechallcustomers.component';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { DeletecustomerComponent } from './deletecustomer/deletecustomer.component';
import { UpdatemedicineComponent } from './updatemedicine/updatemedicine.component';
import { DeletemedicineComponent } from './deletemedicine/deletemedicine.component';
import { FetchallordersComponent } from './fetchallorders/fetchallorders.component';


export const routes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer/profile', component: ProfileComponent },
  { path: 'medicine/:name', component: MedicinesearchresultsComponent },
  { path: 'customer/order-list', component: OrderlistComponent },
  { path: 'admin/medicines/add', component: AddmedicineComponent },
  { path: 'admin/medicines/all', component: FetchallmedicinesComponent },
  { path: 'medicines/get/by-id/:mid', component: FetchmedicineComponent },
  { path: 'medicines/get/by-name/:mname', component: FetchmedicineComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: AdminloginComponent },
  { path: 'admin/dashboard', component: AdmindashboardComponent },
  { path: 'admin/profile', component: AdminprofileComponent },
  { path: 'admin/allcustomers', component: FetechallcustomersComponent },
  { path: 'admin/orderslist', component: FetchallordersComponent },
  { path: 'customer/update/:cid', component:  UpdatecustomerComponent},
  { path: 'customer/delete/:cid', component:  DeletecustomerComponent},
  { path: 'medicine/update/:mid', component:  UpdatemedicineComponent},
  { path: 'medicine/delete/:mid', component:  DeletemedicineComponent},
];

