interface ReportsStorageFeeResultModel {
  id: string,
  jhOrderId: string,
  jhOrderCode: string,
  inventoryId: string,
  isPicking: boolean,
  isPull: boolean,
  serialNumber: string,
  storageFee: number,
  isClose: boolean,
  creationTime: string
  warehouseName: string;
  goodsName: string;
}

interface ReportsStorageFeeSearchModel {
  creationTime: string;
  serialNumber: string;
  warehouseId: string;
}

type ReportsStorageFeeModel = ReportsStorageFeeResultModel & ReportsStorageFeeSearchModel
