import { Component, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Route, Router } from '@angular/router';
import { MenuItem } from 'menuItem';
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
  menuItems: MenuItem[] = [];
  filteredMenus: MenuItem[] = [];

  constructor(private svcData: SharedData, private route: Router) {
    this.svcData.getLoginStatus().subscribe((l) => {
      this.isUserValid = l;
    });

    this.svcData.getMenuCount().subscribe((mc) => {
      this.totMenuCount = mc;
    });

    this.svcData.getTotalAmount().subscribe((tot) => {
      this.totAmount = tot;
    });

    this.svcData.getMenuItems().subscribe((m) => {
      this.menuItems = m;
    });
  }

  ngOnChanges(): void {}
  onLogOut(): void {
    this.isUserValid = false;
    this.svcData.sendLoginStatus(false);
    this.route.navigateByUrl('./login');
  }

  SearchMenu(item: string): void {
    //console.log(item);
    //console.log(this.menuItems);
    this.filteredMenus = this.menuItems.filter((menu) => {
      return menu?.menuName.toLowerCase().includes(item.toLowerCase());
    });

    this.svcData.sendFilteredList(this.filteredMenus);
    //console.log(this.filteredMenus);
    this.filteredMenus?.forEach((m) => {
      console.log(m.menuName);
    });
  }
}
