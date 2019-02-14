import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly url = 'https://localhost:44373/api/payments/';

  payments: Payment[];

  constructor(private http: HttpClient) { }

  postPayment(payment: Payment) {
    return this.http.post(this.url, payment);
  }
}
