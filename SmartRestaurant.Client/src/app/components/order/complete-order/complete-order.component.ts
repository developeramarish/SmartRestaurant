import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { PaymentMethod } from 'src/app/models/payment-method';
import { PaymentMethodService } from 'src/app/services/payment-method.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.css']
})
export class CompleteOrderComponent implements OnInit {
  title: string = 'COMPLETE ORDER';
  paymentMethods: PaymentMethod[];

  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private paymentMethodService: PaymentMethodService, private paymentService: PaymentService, private toastr: ToastrService) { }

  ngOnInit() {
    this.paymentMethodService.getPaymentMethods().subscribe(res => this.paymentMethods = res as PaymentMethod[]);
  }

  form = this.fb.group({
    orderID: [this.data.orderID],
    total: [this.data.total],
    paymentMethodID: [null, Validators.required]
  });

  onSubmit(form: NgForm) {
    this.paymentService.postPayment(form.value).subscribe(
      res => {
        this.toastr.success('You have been completed the order successfully.', 'Successfully');
        form.reset();
      },
      err => {
        console.log(err);
        alert(err);
      }
    );
  }
}
