interface ConsultOrderItemModel {
  ProcedureID: string;
  id: string,
  orderId: string,
  goodsId: string,
  goodsName: string,
  goodsCode: string,
  goodsUnit: string,
  goodsSpec: string,
  goodsNumber: number,
  warehouseId: string,
  warehouseName: string,
  warehouseLocaltionId: string,
  warehouseLocaltionName: string,
  goodsPrice: number,
  taxRate: number,
  taxPrice: number,
  taxAmount: number,
  totalTaxAmount: string;
  creationTime: string
  goodsBatchNumber: string;
}
