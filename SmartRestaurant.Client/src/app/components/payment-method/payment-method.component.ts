import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethod } from 'src/app/models/payment-method';
import { FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  paymentMethods: PaymentMethod[];
  title: string = 'PAYMENT METHODS';

  constructor(private service: PaymentMethodService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit() {
    this.service.getPaymentMethods().subscribe(res => this.paymentMethods = res as PaymentMethod[]);
  }

  form = this.fb.group({
    name: [null, Validators.compose([Validators.required, Validators.maxLength(45)])]
  });

  onSubmit(form: NgForm): void {
    this.service.postPaymentMethod(form.value).subscribe(
      (res: PaymentMethod) => {
        this.toastr.success('You have been inserted the payment method successfully.', 'Successfully');
        this.paymentMethods.push(res);
        form.reset();
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }

  onDelete(method: PaymentMethod): void {
    if (confirm('Are you sure to delete ' + method.name + '?')) {
      this.service.deletePaymentMethod(method).subscribe(
        res => {
          this.toastr.warning('You have been deleted the payment method successfully.', 'Successfully');
          const index = this.paymentMethods.indexOf(method);
          this.paymentMethods.splice(index, 1);
        },
        err => {
          console.log(err);
          alert(err);
        }
      );
    }
  }

  reset(form: NgForm) {
    form.reset();
  }

}
