interface ReportsPickupResultModel {
  id: string,
  jhOrderId: string,
  jhOrderCode: string,
  serialNumber: string,
  pickerId: string,
  pcikerName: string,
  pickingTime: string
}

interface ReportsPickupSearchModel {
  jhOrderCode: string;
  serialNumber: string;
  pcikerName: string;
  pickingTime: string;
}

type ReportsPickupModel = ReportsPickupResultModel & ReportsPickupSearchModel
