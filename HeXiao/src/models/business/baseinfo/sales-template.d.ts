import { SalesTemplateTypeEnum } from '../common/enum';

declare global {
  interface SalesTemplateResultModel {
    id: string;
    code: string,
    name: string,
    businessBjType: SalesTemplateTypeEnum;
    remark: string,
    enabled: boolean,
    founderId: string;
    founderName: string,
    creationTime: string,
    updateTime: string,
    isDeleted: boolean
    keywords: string;
  }

  interface SalesTemplateStoreFeeResultModel {
    id: string,
    code: string,
    businessBjTemplateId: string,
    businessBjTemplateCode: string,
    goodsId: string,
    goodsName: string,
    goodsSpec: string,
    goodsCode: string,
    storageExpenses: string,
    closeStatus: string,
    showCloseStatus: string,
    founderId: string,
    founderName: string,
    creationTime: string,
    updateTime: string,
    isDeleted: boolean
    goodsUnit: string;
    
    keywords: string;
  }

  interface SalesTemplateDeliveryFeeResultModel {
    id: string,
    code: string,
    businessBjTemplateId: string,
    businessBjTemplateCode: string,
    goodsId: string,
    goodsCode: string,
    goodsName: string,
    goodsSpec: string,
    departProvince: string,
    departProvinceCode: string,
    departCity: string,
    departCityCode: string,
    departRegion: string,
    departRegionCode: string,
    destinationProvince: string,
    destinationProvinceCode: string,
    destinationCity: string,
    destinationCityCode: string,
    destinationRegion: string,
    destinationRegionCode: string,
    orderAmount: number,
    deliveryFee: number,
    closeStatus: number,
    showCloseStatus: string,
    founderId: string,
    founderName: string,
    creationTime: string,
    updateTime: string,
    isDeleted: boolean

    departCodes: string[]
    destinationCodes: string[]
    keywords: string;
  }

}
