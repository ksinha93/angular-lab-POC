import { Component } from '@angular/core';
import { CustomerDetails } from 'customerDetails';
import { OrderItem } from '../../../orderItem';
import { SharedData } from '../services/shareddata.service';
@Component({
  selector: 'prev-ord',
  templateUrl: './preview.component.html',
})
export class PreviewComponent {
  OrderItems: OrderItem[] = [];
  CustomerDetails: CustomerDetails;
  IsUserLogged: boolean = false;

  constructor(private svcData: SharedData) {
    this.svcData.getorderItems().subscribe((l) => {
      this.OrderItems = l;
    });

    this.svcData.getLoginStatus().subscribe((l) => {
      this.IsUserLogged = l;
    });
  }
}
