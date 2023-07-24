export class OrderItem {
  menuName: string;
  menuPrice: string;
  quantity: string;
  totAmount: number;
  itemChecked: boolean;

  constructor(
    private mName: string,
    private mPrice: string,
    private mQty: string,
    private mAmt: number,
    private itmChecked: boolean
  ) {
    this.menuName = mName;
    this.menuPrice = mPrice;
    this.quantity = mQty;
    this.totAmount = mAmt;
    this.itemChecked = itmChecked;
  }
}
