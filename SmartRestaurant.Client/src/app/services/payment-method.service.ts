import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod } from '../models/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private readonly url = 'https://localhost:44373/api/paymentmethods/';

  constructor(private http: HttpClient) { }

  getPaymentMethods() {
    return this.http.get(this.url);
  }

  postPaymentMethod(method: PaymentMethod) {
    return this.http.post(this.url, method);
  }

  deletePaymentMethod(method: PaymentMethod) {
    return this.http.delete(this.url + method.id);
  }
}
