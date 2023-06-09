import { MENU_URL, USER_ROLE_MENU, Func_URL } from './../constant';

import { processdRequest } from "@/utils/request"

// 获取用户菜单数据
export const getUserMenuAsync = async (roleId: string) => {
  return await processdRequest.get<MenuModel[]>(USER_ROLE_MENU, {roleId:roleId})
}

// 获取菜单数据
export const getMenuAsync = async () => {
  return await processdRequest.get<MenuModel[]>(MENU_URL, {})
}

// 新增菜单数据
export const addMenuAsync = async (data: MenuModel) => {
  return await processdRequest.post(MENU_URL, data)
}

// 更新菜单数据
export const updMenuAsync = async (data: MenuModel) => {
  return await processdRequest.put(MENU_URL, data)
}

// 删除菜单数据
export const delMenuAsync = async (data: AnyObject) => {
  return await processdRequest.delete(MENU_URL, data)
}

// 新增菜单数据
export const addFuncAsync = async (data: FuncModel) => {
  return await processdRequest.post(Func_URL, data)
}

// 新增菜单数据
export const delFuncAsync = async (data: FuncModel) => {
  return await processdRequest.delete(Func_URL, data)
}
