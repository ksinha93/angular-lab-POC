import { AfterContentChecked, Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

import { OrderItem } from '../../../orderItem';
import { SharedData } from '../services/shareddata.service';
import { PreviewComponent } from '../order/preview.component';
import { AfterContentInit } from '@angular/core';

@Component({
  selector: 'cust-ord',
  templateUrl: './customerorder.component.html',
})
export class CustomerOrderComponent
  implements AfterContentInit, AfterContentChecked
{
  IsUserValid: boolean = false;
  SharedMessage: string = '';
  constructor(private svcCust: CustomerService, private svcData: SharedData) {
    this.svcData.getLoginStatus().subscribe((s) => {
      this.IsUserValid = s;
    });
    this.OrderForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      emailId: new FormControl(''),
      address: new FormControl('', Validators.required),
      ordDate: new FormControl('', Validators.required),
    });
    this.getAllOrders();
  }
  ngAfterContentChecked(): void {
    console.log('checked');
  }
  ngAfterContentInit(): void {
    console.log('init');
  }
  AllOrders: OrderItem[] = [];
  OrderForm: FormGroup;

  getAllOrders() {
    this.svcData.getorderItems().subscribe((l) => {
      this.AllOrders = l;
    });
  }

  submitForm(ordForm) {
    const custDetails = {
      firstName: ordForm.firstName,
      lastName: ordForm.lastName,
      mobileNumber: ordForm.mobileNumber,
      emailId: ordForm.emailId,
      address: ordForm.address,
    };

    //this.svcCust.saveOrder(ord);

    //this.getAllOrders();
  }
}
