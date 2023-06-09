interface ReportsPullResultModel {
  id: string,
  jhOrderId: string,
  jhOrderCode: string,
  serialNumber: string,
  pullerId: string,
  pullerName: string,
  pullTime: string
}

interface ReportsPullSearchModel {
  jhOrderCode: string;
  serialNumber: string;
  pullerName: string;
  pullTime: string;
}

type ReportsPullModel = ReportsPullResultModel & ReportsPullSearchModel
