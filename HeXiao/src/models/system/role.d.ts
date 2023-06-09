import { RoleTypeEnum } from './../business/common/enum';
/**
 * API角色模型
 */

declare global {
  interface RoleModel {
ID: any;
    id: string;
    name: string;
    menus: MenuModel[];
    roleType: RoleTypeEnum
    isSystem: boolean
  }
  
}