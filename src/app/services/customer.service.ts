import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: any[] = [];
  customersOrder: any[] = [];
  constructor() {
    this.customers.push(
      {
        id: '1',
        firstname: 'john',
        lastname: 'durand',
        phone: '9876543323',
      },
      {
        id: '2',
        firstname: 'peter',
        lastname: 'vaughan',
        phone: '9876575365',
      }
    );

    this.customersOrder.push(
      {
        orderid: '1',
        orderItems: 'soap,pulses,yogurt',
        custid: '1',
        orderDate: '23/01/2023',
        firstname: 'john',
        lastname: 'durand',
      },
      {
        orderid: '2',
        orderItems: 'soap',
        custid: '1',
        orderDate: '09/01/2023',
        firstname: 'john',
        lastname: 'durand',
      },
      {
        orderid: '3',
        orderItems: 'yogurt',
        custid: '1',
        orderDate: '03/02/2023',
        firstname: 'john',
        lastname: 'durand',
      }
    );
  }

  getAllCustomers(): Observable<any[]> {
    return of(this.customers);
  }

  getCustomerById(custId): Observable<any> {
    return this.customers.find((c) => c.id == custId);
  }

  getAllOrders(): Observable<any[]> {
    return of(this.customersOrder);
  }

  getOrdersByCustomer(custid): Observable<any> {
    return this.customersOrder.find((c) => c.custid == custid);
  }

  isExistingCustomer(fname, lname): boolean {
    return (
      this.customers.findIndex(
        (c) => c.firstname == fname && c.lastname == lname
      ) > -1
    );
  }

  saveOrder(ord) {
    const ordid = this.customersOrder.reduce((a, b) => {
      return (
        (a =
          parseInt(a) > parseInt(b.orderid)
            ? parseInt(a)
            : parseInt(b.orderid)) + 1
      );
    }, 0);
    var custid;
    var fname = '';
    var lname = '';
    if (!this.isExistingCustomer(ord.firstname, ord.lastname)) {
      const maxcust = this.customers.reduce((a, b) => {
        return (
          (a =
            parseInt(a) > parseInt(b.custid)
              ? parseInt(a)
              : parseInt(b.custid)) + 1
        );
      }, 0);
      console.log('customer new');
      custid = maxcust;
      fname = ord.firstname;
      lname = ord.lastname;
    } else {
      custid = this.customers.find(
        (c) => c.firstname == ord.firstname && c.lastname == ord.lastname
      ).id;
      //console.log(custid.id);
      console.log('customer exists');
      fname = ord.firstname;
      lname = ord.lastname;
    }
    const ordDet = {
      orderid: ordid,
      orderItems: ord.ordItems,
      custid: custid,
      orderDate: ord.ordDate,
      firstname: fname,
      lastname: lname,
    };
    //console.log(ordDet);
    this.customersOrder.push(ordDet);
  }
}
