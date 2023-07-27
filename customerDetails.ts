export class CustomerDetails {
  firstName: string = '';
  lastName: string = '';
  mobileNumber: string = '';
  emailId: string = '';
  address: string = '';

  constructor(
    fname: string,
    lname: string,
    mnumber: string,
    email: string,
    addr: string
  ) {
    this.firstName = fname;
    this.lastName = lname;
    this.mobileNumber = mnumber;
    this.emailId = email;
    this.address = addr;
  }
}
