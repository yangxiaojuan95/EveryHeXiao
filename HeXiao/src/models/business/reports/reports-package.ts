interface ReportsPackageResultModel {
  id: string,
  code: string,
  packerId: string,
  packerName: string,
  packingTime: string
}

interface ReportsPackageSearchModel {
  code: string;
  packerName: string;
  packingTime: string;
}

type ReportsPackageModel = ReportsPackageResultModel & ReportsPackageSearchModel
