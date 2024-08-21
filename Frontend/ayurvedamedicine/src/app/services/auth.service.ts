import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081';
  private customerKey = 'customer';
  private adminKey = 'admin';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable();
  email: string | null = null;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/customer`, user);
  }

  getCustomerDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/customer");
  }

  isAuthenticated(): boolean {
    const customerString = localStorage.getItem(this.customerKey);
    const adminString = localStorage.getItem(this.adminKey);
    if (customerString) {
      const customer = JSON.parse(customerString);
      this.email = customer.email;
      return true;
    }if(adminString){
      const admin = JSON.parse(adminString);
      this.email = admin.email;
      return true;
    }
    return false;
  }


  login(credentials: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer`, credentials).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem(this.customerKey, JSON.stringify(response));
          this.setAuthStatus(true);
        }
      })
    );
  }

  
  updateProfile(user: any): Observable<any> {
    // Assuming the user ID is stored in local storage and used to identify the user.
    const customerString = localStorage.getItem(this.customerKey);
    if (customerString) {
      const customer = JSON.parse(customerString);
      return this.http.put(`${this.baseUrl}/customer/${customer.id}`, user);
    } else {
      throw new Error('User not authenticated');
    }
  }


  logout(): void {
    // Clear local storage
    localStorage.removeItem('customers');
    localStorage.removeItem('medicines');
    localStorage.removeItem('orders');
    localStorage.removeItem(this.customerKey);
    localStorage.removeItem(this.adminKey);
    this.email = null;
    this.setAuthStatus(false);
  }

  setAuthStatus(isAuthenticated: boolean): void {
    this.authStatusSubject.next(isAuthenticated);
  }


  adminLogin(credentials: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`, credentials).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem(this.adminKey, JSON.stringify(response));
          this.setAuthStatus(true);
        }
      })
    );
  }
  // adminLogin(email: string, password: string): Observable<boolean> {
  //   return this.http.post<{ token: string }>(`${this.baseUrl}/admin`, { email, password })
  //     .pipe(
  //       map(response => {
  //         localStorage.setItem('token', response.token);
  //         return true;
  //       }),
  //       catchError(error => {
  //         console.error('Login failed', error);
  //         return of(false);
  //       })
  //     );
  // }

}