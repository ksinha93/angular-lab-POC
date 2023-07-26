export class OrderItem {
  menuName: string;
  menuPrice: string;
  quantity: number;
  totAmount: number;
  itemChecked: boolean;

  constructor(
    private mName: string,
    private mPrice: string,
    private mQty: number,
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
