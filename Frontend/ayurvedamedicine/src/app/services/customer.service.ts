import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:8081/customer'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  updateProfile(customer: any): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.put(url, customer);
  }

  getCustomerDetails(id:number): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + "/"+id);
  }
  
  // getCustomerById(customerId: number): Observable<Customer> {
  //   return this.http.get<Customer>(`${this.baseUrl}/${customerId}`);
  // }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}`, customer);
  }

  deleteCustomer(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

  getAllCustomers() : Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseUrl);
  }
}
