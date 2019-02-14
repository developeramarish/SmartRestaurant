import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderProduct } from '../models/order-product';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {
  private readonly url = 'https://localhost:44373/api/orderproducts/';

  orderProducts: OrderProduct[];

  constructor(private http: HttpClient) { }

  getOrderProducts(id: number) {
    return this.http.get(this.url + id).toPromise().then(res => this.orderProducts = res as OrderProduct[]);
  }

  postOrderProduct(product: OrderProduct) {
    return this.http.post(this.url, product);
  }

  deleteOrderProduct(product: OrderProduct) {
    return this.http.delete(this.url + product.id);
  }

  putOrderProduct(product: OrderProduct) {
    return this.http.put(this.url + product.id, product);
  }
}
