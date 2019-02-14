import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  title: string = 'CREATE A NEW ORDER';
  tables: Table[];

  constructor(private orderService: OrderService, private fb: FormBuilder, private tableService: TableService, private toastr: ToastrService) { }

  ngOnInit() {
    this.tableService.getAvailableTables().then(res => this.tables = res as Table[]);
  }

  form = this.fb.group({
    orderName: [null, Validators.compose([Validators.required, Validators.maxLength(35)])],
    tableID: [null, Validators.required]
  });

  setName(event) {
    this.form.reset({
      orderName: this.tables[event.selectedIndex].tableName + "'s Order" + ' on ' + new Date().getDate() + '.' + new Date().getMonth() + '.' + new Date().getFullYear(),
      tableID: event.value
    })
  }

  onSubmit(form: NgForm) {
    this.orderService.postOrder(form.value).subscribe(
      res => {
        this.tableService.getAvailableTables().then(res => this.tables = res as Table[]);
        this.orderService.getOrders();
        this.toastr.success('You have been created the order successfully.', 'Successfully');
        form.reset();
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

}
