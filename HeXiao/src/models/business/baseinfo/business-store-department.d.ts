import { OrderRuleEnum } from "../common/enum";

declare global {
  interface BusinessStoreDepartmentResultModel {
    id: string,
    code: string,
    businessId: string,
    businessCode: string,
    businessName: string;
    name: string,
    alias: string,
    orderRule: OrderRuleEnum,
    showOrderRule: string,
    files: string,
    isStorage: boolean,
    enabled: boolean,
    founderId: string,
    founderName: string,
    creationTime: string,
    updateTime: string,
    isDeleted: boolean
  
    keywords: string;
  }
}