import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Route } from '@angular/router';
import { HelloComponent } from './hello.component';
import { SharedData } from './shareddata.service';
//import { UserNameValiditors } from './UserNameValditors';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnChanges {
  name = 'Angular';
  totMenuCount: string = '0';
  totAmount: string = '0';
  isUserValid: boolean = false;

  constructor(private svcData: SharedData) {
    this.svcData.getLoginStatus().subscribe((l) => {
      this.isUserValid = l;
    });

    this.svcData.getMenuCount().subscribe((mc) => {
      this.totMenuCount = mc;
    });

    this.svcData.getTotalAmount().subscribe((tot) => {
      this.totAmount = tot;
    });
  }

  ngOnChanges(): void {}
}
