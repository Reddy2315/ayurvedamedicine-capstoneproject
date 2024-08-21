import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8081/admin'; 

  constructor(private http: HttpClient) {}

  updateProfile(customer: any): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.put(url, customer);
  }
}
