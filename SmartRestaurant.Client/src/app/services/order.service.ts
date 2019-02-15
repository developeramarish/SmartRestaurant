import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly url = 'https://localhost:44373/api/orders/';
  private readonly totalUrl = 'https://localhost:44373/api/ordertotals/';

  orders: Order[];
  total: number;
  order: Order;

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.url).toPromise().then(res => this.orders = res as Order[]);
  }

  getOrder(id: number) {
    return this.http.get(this.url + id);
  }

  postOrder(order: Order) {
    return this.http.post(this.url, order);
  }

  putOrder(order: Order) {
    return this.http.put(this.url + order.id, order);
  }

  deleteOrder(order: Order) {
    return this.http.delete(this.url + order.id);
  }

  getTotal(id: number) {
    return this.http.get(this.totalUrl + id).toPromise().then(res => this.total = res as number);
  }

  payOrder(order: Order) {
    return order.isPaid = !order.isPaid;
  }
}
