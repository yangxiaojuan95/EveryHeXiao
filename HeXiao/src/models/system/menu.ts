/**
 * API菜单模型
 */

export enum MenuType {
  系统菜单 = 1,
  业务菜单 = 0
}

declare global {
  interface MenuModel {
    id: string;
    name: string;
    url: string;
    icon: string;
    pId: string;
    order: number;
    childs: MenuModel[];
    functions: MenuModel[];
    type: MenuType;
    menuSort: string;
    menuLevel: number;
    menuId: string;
    endpointId: string;
    claimType: string;
    menuType: string;
    claimValue: string;
    roleId: string;

    snippet: MenuModel[]
  }
  
}