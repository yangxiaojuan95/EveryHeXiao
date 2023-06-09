import { AppVersionTypeEnum } from "../common/enum";

declare global {
  interface AppConfigResultModel {
    id: number;
    linkUrl: string;
    versionNumber: string;
    createTime: string;
    appDesc: string;
    type: AppVersionTypeEnum
    showType: string;
  }
}
