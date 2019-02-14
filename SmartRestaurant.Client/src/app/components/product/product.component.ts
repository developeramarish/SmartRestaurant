import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  title: string = 'PRODUCTS';

  constructor(private service: ProductService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getProducts().then(res => this.products = res as Product[]);
  }

  form = this.fb.group({
    productName: [null, Validators.compose([Validators.required, Validators.maxLength(35)])],
    price: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
    tax: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')])],
  });

  reset(form: NgForm): void {
    form.reset();
  }

  onSubmit(form: NgForm): void {
    this.service.postProduct(form.value).subscribe(
      (res: Product) => {
        this.products.push(res);
        this.toastr.success('You have been inserted the product successfully.', 'Successfully.');
        form.reset();
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(product: Product): void {
    if (confirm('Are you sure to delete product ' + product.productName + '?')) {
      this.service.deleteProduct(product).subscribe(
        res => {
          const index = this.products.indexOf(product);
          this.products.splice(index, 1);
          this.toastr.warning('You have been deleted the product successfully.', 'Successfully.');
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

}
