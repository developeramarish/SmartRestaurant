import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { OrderProductService } from 'src/app/services/order-product.service';
import { OrderProduct } from 'src/app/models/order-product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-order-product',
  templateUrl: './create-order-product.component.html',
  styleUrls: ['./create-order-product.component.css']
})
export class CreateOrderProductComponent implements OnInit {
  title: string = 'INSERT A PRODUCT';

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private orderProductService: OrderProductService, private orderService: OrderService) { }

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
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

}
