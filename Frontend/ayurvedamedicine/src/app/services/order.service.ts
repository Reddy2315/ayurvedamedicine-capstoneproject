import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/Order';
import { OrderList } from '../model/OrderList';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = "http://localhost:8081/orders"

  constructor(private http: HttpClient) { }


  placeOrder(order: Order): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl, order, { headers: headers });
  }
  
  getOrdersByCustomerId(customerId: string): Observable<OrderList[]> {
    return this.http.get<OrderList[]>(`${this.baseUrl}/customer/${customerId}`);
  }


  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  // Update order status
  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${orderId}/status`, { status });
  }

  // Fetch order details by ID 
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cancel-order/${orderId}`);
  }


}
