import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly url = 'https://localhost:44373/api/payments/';

  // Statistics Services
  private readonly dailyGainsUrl = 'https://localhost:44373/api/dailygains/';
  private readonly weeklyGainsUrl = 'https://localhost:44373/api/weeklygains/';
  private readonly monthlyGainsUrl = 'https://localhost:44373/api/monthlygains/';

  payments: Payment[];

  constructor(private http: HttpClient) { }

  postPayment(payment: Payment) {
    return this.http.post(this.url, payment);
  }

  getPayment(id: number) {
    return this.http.get(this.url + id).toPromise();
  }

  getDailyGains() {
    return this.http.get(this.dailyGainsUrl);
  }
  
  getWeeklyGains() {
    return this.http.get(this.weeklyGainsUrl);
  }

  getMonthlyGains() {
    return this.http.get(this.monthlyGainsUrl);
  }
}
