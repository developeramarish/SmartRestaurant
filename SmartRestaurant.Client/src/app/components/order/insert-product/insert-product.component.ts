import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { OrderProductService } from 'src/app/services/order-product.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductComponent implements OnInit {
  title: string = 'INSERT A PRODUCT';
  order: Order;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private orderProductService: OrderProductService, private orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  form = this.fb.group({
    orderID: [this.data.orderID],
    productID: [this.data.productID],
    quantity: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1}$')])],
  });

  onSubmit(form: NgForm): void {
    this.orderProductService.postOrderProduct(form.value).subscribe(
      res => {
        this.orderProductService.getOrderProducts(this.data.orderID);
        this.orderService.getTotal(this.data.orderID);
        this.toastr.success('You have been inserted the product to current order.', 'Successfully');
        this.orderService.getOrder(this.data.orderID).subscribe(
          res => {
            this.order = res as Order;
            if (this.order.isActive === false) {
              this.orderService.putOrder(this.order).subscribe(
                res => {
                  console.log(res);
                },
                err => {
                  console.log(err);
                }
              );
            }
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

}
