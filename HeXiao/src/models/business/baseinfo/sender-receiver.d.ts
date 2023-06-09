import { CloseStatusEnum, SenderReceiverTypeEnum } from "../common/enum";

declare global {
  interface SenderReceiverResultModel {
    id: string,
    code: string,
    customerId: string,
    customerName: string,
    personName: string,
    personMobile: string,
    provinceName: string,
    provinceCode: string,
    cityName: string,
    cityCode: string,
    areaName: string,
    areaCode: string,
    detailAddress: string,
    totalAddress: string,
    closeStatus: CloseStatusEnum,
    founderId: string,
    creationTime: string,
    updateTime: string,
    isDeleted: boolean,
    founderName: string
  
    cityCodes: string[]
  
    type: SenderReceiverTypeEnum;
  
  }
  
  interface SenderReceiverSearchModel {
    keywords: string;
  }

  type SenderReceiverModel = SenderReceiverResultModel & SenderReceiverSearchModel
  
}