import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { Payment } from 'src/app/models/payment';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dailyGains: number;
  weeklyGains: number;
  monthlyGains: number;
  tables: Table[];

  constructor(private paymentService: PaymentService, private tableService: TableService) { }

  ngOnInit() {
    this.paymentService.getDailyGains().subscribe(res => this.dailyGains = res as number);
    this.paymentService.getWeeklyGains().subscribe(res => this.weeklyGains = res as number);
    this.paymentService.getMonthlyGains().subscribe(res => this.monthlyGains = res as number);
    this.tableService.getTables().then(res => this.tables = res as Table[]);
  }

  setClass(table: Table) {
    let cl = {
      'text-white bg-primary': !table.isAvailable
    }

    return cl;
  }

}
