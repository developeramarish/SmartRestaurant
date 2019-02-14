import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { TableService } from 'src/app/services/table.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  title: string = 'ORDERS';

  constructor(private orderService: OrderService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit() {
    this.orderService.getOrders();
  }

  openRegistrationOrderDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '20%';

    this.dialog.open(CreateOrderComponent, dialogConfig);
  }


  onDelete(order: Order): void {
    if (confirm('Are you sure to delete order ' + order.orderName + '?')) {
      this.orderService.deleteOrder(order).subscribe(
        res => {
          const index = this.orderService.orders.indexOf(order);
          this.orderService.orders.splice(index, 1);
          this.toastr.warning('You have been deleted the order successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  setClass(order: Order) {
    let cl = {
      'table-success': order.isActive
    }

    return cl;
  }
}
