import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { SharedData } from '../shareddata.service';
import { OrderItem } from '../../../orderItem';

@Component({
  selector: 'cust-ord',
  templateUrl: './customerorder.component.html',
})
export class CustomerOrderComponent {
  IsUserValid: boolean = false;
  SharedMessage: string = '';
  constructor(private svcCust: CustomerService, private svcData: SharedData) {
    this.svcData.getLoginStatus().subscribe((s) => {
      //this.IsUserValid = s;
      console.log('Customer Order ' + s);
      this.IsUserValid = s;
    });
    this.OrderForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      ordDate: new FormControl(''),
    });
    this.getAllOrders();
  }
  AllOrders: OrderItem[] = [];
  OrderForm: FormGroup;

  getAllOrders() {
    this.svcData.getorderItems().subscribe((l) => {
      this.AllOrders = l;
      console.log('all orders ' + l[0]?.quantity);
    });
  }

  submitForm() {
    const ord = {
      firstname: this.OrderForm.controls['firstname'].value,
      lastname: this.OrderForm.controls['lastname'].value,
      ordDate: this.OrderForm.controls['ordDate'].value,
    };

    this.svcCust.saveOrder(ord);

    this.getAllOrders();
  }
}
