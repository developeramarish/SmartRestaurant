import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url = 'https://localhost:44373/api/products/';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.url).toPromise();
  }

  postProduct(product: Product) {
    return this.http.post(this.url, product);
  }

  deleteProduct(product: Product) {
    return this.http.delete(this.url + product.id);
  }
}
