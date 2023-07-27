import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MenuItem } from '../../../menuItem';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { OrderItem } from 'orderItem';

@Injectable({
  providedIn: 'root',
})
export class SharedData implements OnInit {
  MenuList: MenuItem[];
  OrderList: OrderItem[] = [];
  FilteredList: MenuItem[] = [];

  constructor() {
    this.MenuList = [
      new MenuItem('1', 'Chicken Masala', '240.0', 0, 0),
      new MenuItem('2', 'Chicken Butter Masala', '280.0', 0, 0),
      new MenuItem('3', 'Paneer Masala', '220.0', 0, 0),
      new MenuItem('4', 'Mix Veg', '200.0', 0, 0),
      new MenuItem('5', 'Paneer Butter Masala', '280.0', 0, 0),
      new MenuItem('6', 'Paneer Kadai', '230.0', 0, 0),
      new MenuItem('7', 'Paneer Tawa', '230.0', 0, 0),
      new MenuItem('8', 'Sahi Paneer', '250.0', 0, 0),
      new MenuItem('9', 'Paneer Kolhapuri', '260.0', 0, 0),
      new MenuItem('10', 'Mushroom Masala', '220.0', 0, 0),
    ];

    this.menuItems = new BehaviorSubject<MenuItem[]>(this.MenuList);
    this.orderItems = new BehaviorSubject<OrderItem[]>(this.OrderList);
  }

  ngOnInit(): void {}
  private loginMessage = new BehaviorSubject<any>(false);
  private menuCount = new BehaviorSubject<string>('0');
  private totalAmount = new BehaviorSubject<string>('0');
  private filteredList = new BehaviorSubject<MenuItem[]>(null);
  private menuItems;
  private orderItems;

  sendLoginStatus(mesg) {
    this.loginMessage.next(mesg);
  }

  getLoginStatus(): Observable<any> {
    return this.loginMessage;
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItems;
  }

  sendMenuItems(menuItems: MenuItem[]) {
    this.menuItems.next(menuItems);
  }

  getMenuCount(): Observable<string> {
    return this.menuCount;
  }

  sendMenuCount(menuCnt: string) {
    this.menuCount.next(menuCnt);
  }

  getTotalAmount(): Observable<string> {
    return this.totalAmount;
  }

  sendTotalAmount(totAmt: string) {
    this.totalAmount.next(totAmt);
  }

  getorderItems(): Observable<OrderItem[]> {
    return this.orderItems;
  }

  sendOrderItems(orderItems: OrderItem[]) {
    this.orderItems.next(orderItems);
  }

  getFilteredList(): Observable<MenuItem[]> {
    return this.filteredList;
  }

  sendFilteredList(menuItems: MenuItem[]) {
    this.filteredList.next(menuItems);
  }

  clearData() {
    this.loginMessage.next('');
  }
}
