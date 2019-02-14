import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { OrderProductService } from 'src/app/services/order-product.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateOrderProductComponent } from './create-order-product/create-order-product.component';
import { OrderProduct } from 'src/app/models/order-product';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {
  order: Order;
  products: Product[];
  total: number;

  constructor(private dialog: MatDialog, private orderService: OrderService, private route: ActivatedRoute, private productService: ProductService, private orderProductService: OrderProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Get current order.
      this.orderService.getOrder(params.id).subscribe(
        res => {
          this.order = res as Order;
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

    this.dialog.open(CreateOrderProductComponent, dialogConfig);
  }

  onDelete(order: Order, product: OrderProduct): void {
    if (confirm('Are you sure to delete this product?')) {
      this.orderProductService.deleteOrderProduct(product).subscribe(
        res => {
          const index = this.orderProductService.orderProducts.indexOf(product);
          this.orderProductService.orderProducts.splice(index, 1);
          this.orderService.getTotal(order.id);
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
      if (confirm('Are you sure to confirm this product?')) {
        this.orderProductService.putOrderProduct(product).subscribe(
          res => {
            product.isDone = !product.isDone;
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

}
