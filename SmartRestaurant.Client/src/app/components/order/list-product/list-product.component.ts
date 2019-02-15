import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { OrderProductService } from 'src/app/services/order-product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InsertProductComponent } from '../insert-product/insert-product.component';
import { OrderProduct } from 'src/app/models/order-product';
import { ToastrService } from 'ngx-toastr';
import { CompleteOrderComponent } from '../complete-order/complete-order.component';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  order: Order;
  products: Product[];
  total: number;
  payment: Payment;

  constructor(private paymentService: PaymentService, private dialog: MatDialog, private orderService: OrderService, private route: ActivatedRoute, private productService: ProductService, private orderProductService: OrderProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Get current order.
      this.orderService.getOrder(params.id).subscribe(
        res => {
          this.order = res as Order;
          // Get the payment which belongs to current order if there is exist.
          if (this.order.isPaid === true) {
            this.paymentService.getPayment(params.id).then(res => this.payment = res as Payment);
          }
        },
        err => {
          console.log(err);
          alert(err);
        }
      );

      // Get products which belongs to current order.
      this.orderProductService.getOrderProducts(params.id);

      // Get total which belongs to current order.
      this.orderService.getTotal(params.id);
    });

    // Get products to insert product on current order.
    this.productService.getProducts().then(res => this.products = res as Product[]);
  }

  openRegistrationProductDialog(orderID: number, productID: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '15%';
    dialogConfig.data = { orderID, productID }

    this.dialog.open(InsertProductComponent, dialogConfig);
  }

  onDelete(order: Order, product: OrderProduct): void {
    if (confirm('Are you sure to delete this product?')) {
      this.orderProductService.deleteOrderProduct(product).subscribe(
        res => {
          const index = this.orderProductService.orderProducts.indexOf(product);
          this.orderProductService.orderProducts.splice(index, 1);
          this.orderService.getTotal(order.id);
          this.toastr.warning('You have been deleted the product from current order successfully.', 'Successfully');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  onToggle(product: OrderProduct): void {
    if (product.isDone === false) {
      if (confirm('Are you sure to set this product is ready?')) {
        this.orderProductService.putOrderProduct(product).subscribe(
          res => {
            product.isDone = !product.isDone;
            this.toastr.success('You have been changed as ready the product that was not ready on current order successfully.', 'Successfully');
          },
          err => {
            console.log(err);
            alert(err);
          }
        );
      }
    } else {
      if (confirm('Are you sure to revoke this product?')) {
        this.orderProductService.putOrderProduct(product).subscribe(
          res => {
            product.isDone = !product.isDone;
            this.toastr.warning('You have been changed as not ready the product that was ready on current order successfully.', 'Successfully');
          },
          err => {
            console.log(err);
            alert(err);
          }
        );
      }
    }
  }

  setClass(product: OrderProduct) {
    let cl = {
      'table-success': product.isDone
    }

    return cl;
  }

  openCompleteOrderDialog(orderID: number, total: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.panelClass = 'customized-dialog';
    dialogConfig.width = '20%';
    dialogConfig.data = { orderID, total }

    this.dialog.open(CompleteOrderComponent, dialogConfig);
  }

}
