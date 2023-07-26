import { Output } from '@angular/core';
import { AfterViewInit, OnChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../menuItem';
import { OrderItem } from '../../orderItem';
import { SharedData } from './shareddata.service';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
})
export class HelloComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() name: string;
  @Output() TotMenuCount: EventEmitter<string> = new EventEmitter<string>();
  LoginStatus: boolean = false;
  changeMenu: boolean = false;
  elementColor: string = '';
  MenuItems: MenuItem[];
  orderItems: OrderItem[] = [];
  filteredItems: MenuItem[] = [];
  itemQty: number = 0;
  private GrossAmount: any = 0;
  private GrossItems: any = 0;

  constructor(private svcData: SharedData) {
    try {
      this.svcData.getLoginStatus().subscribe((l) => {
        this.LoginStatus = l;
      });

      //this.getFilteredAndMenuItems();
      this.svcData.getMenuItems().subscribe((m) => {
        this.MenuItems = m;
      });

      this.svcData.getFilteredList().subscribe((f) => {
        if (f && f.length > 0) {
          this.MenuItems = f;
        }
      });

      this.svcData.getorderItems().subscribe((o) => {
        this.orderItems = o;
      });
    } catch (err) {
      console.log(err);
    }
  }
  ngAfterViewInit(): void {}

  ngOnInit() {}

  ngOnChanges() {
    if (!this.LoginStatus) {
      this.GrossAmount = 0;
      this.GrossItems = 0;
      this.orderItems = null;
      this.svcData.sendMenuCount(this.GrossItems);
      this.svcData.sendTotalAmount(this.GrossAmount.toString());
      this.svcData.sendOrderItems(this.orderItems);
    }
  }

  getDataMessage(): void {}

  onCheckBoxSelect(e, item) {
    if (e.target.checked) {
      this.orderItems.push(
        new OrderItem(
          item.menuName,
          item.menuPrice,
          item.itemQty,
          item.itemAmount,
          true
        )
      );
      this.svcData.sendMenuCount(this.GrossItems);
      this.svcData.sendTotalAmount(this.GrossAmount.toString());
      this.svcData.sendOrderItems(this.orderItems);
    } else {
      let index = this.orderItems.findIndex((i) => {
        i.menuName == item.menuName;
      });

      if (index > -1) {
        this.orderItems.splice(index, 1);
      }

      this.GrossItems = this.GrossItems - item.itemQty;
      this.GrossAmount = this.GrossAmount - item.itemAmount;
      this.svcData.sendOrderItems(this.orderItems);
    }
  }

  addItem(item): void {
    item.itemQty = item.itemQty + 1;
    this.svcData.getTotalAmount().subscribe((t) => {
      this.GrossAmount = t;
    });
    this.svcData.getMenuCount().subscribe((c) => {
      this.GrossItems = parseInt(c);
    });
    this.GrossItems = this.GrossItems + 1;
    const totamt = item.itemQty * item.menuPrice;
    item.itemAmount = totamt;
    this.GrossAmount = parseInt(this.GrossAmount) + parseInt(item.menuPrice);
    this.svcData.sendMenuCount(this.GrossItems);
    this.svcData.sendTotalAmount(this.GrossAmount.toString());
    let index = this.orderItems.findIndex((o) => o.menuName === item.menuName);
    if (index > -1) {
      let o = this.orderItems[index];
      o.quantity = o.quantity + 1;
      o.totAmount = o.totAmount + parseInt(item.menuPrice);
      this.svcData.sendOrderItems(this.orderItems);
    }
  }

  removeItem(item): void {
    if (item.itemQty <= 0) {
      item.itemQty = 0;
    } else {
      item.itemQty = item.itemQty - 1;
      this.GrossItems = this.GrossItems - 1;
      this.GrossAmount = parseInt(this.GrossAmount) - parseInt(item.menuPrice);
    }
    const totamt = item.itemQty * item.menuPrice;
    item.itemAmount = totamt;
    this.svcData.sendMenuCount(this.GrossItems);
    this.svcData.sendTotalAmount(this.GrossAmount.toString());
  }

  isChecked(item): boolean {
    let index = this.orderItems.findIndex((i) => i.menuName == item.menuName);

    if (index > -1) {
      return this.orderItems[index].itemChecked;
    }
    return false;
  }
}
