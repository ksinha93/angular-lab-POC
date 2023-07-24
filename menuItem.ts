export class MenuItem {
  menuId: string;
  menuName: string;
  menuPrice: string;
  itemQty: number;
  itemAmount: number;

  constructor(
    private mId: string,
    private mName: string,
    private mPrice: string,
    private mQty: number,
    private mAmount: number
  ) {
    this.menuId = mId;
    this.menuName = mName;
    this.menuPrice = mPrice;
    this.itemQty = mQty;
    this.itemAmount = mAmount;
  }
}
