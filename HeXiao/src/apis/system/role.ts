/**
 * 登录相关的接口
 */

import { USER_ROLE_POWER, ROLE_URL, USER_ROLE_MENU } from './../constant';

import { processdRequest } from "@/utils/request"

// 获取登录用户菜单数据
export const getUserRoleMenuAsync = async (roleId: string) => {
  return await processdRequest.get<RoleModel[]>(USER_ROLE_MENU, {roleId: roleId})
}

// 获取用户菜单数据（根据角色id）
export const getRoleMenuAsync = async (data: { roleId: string }) => {
  return await processdRequest.get<RoleMenuModel[]>(USER_ROLE_POWER, data)
}

// 更新用户菜单数据（根据角色id）
export const updRoleMenuAsync = async (data:  {claims: { claimType: string;claimValue: string;roleId: string }[] }) => {
  return await processdRequest.post(USER_ROLE_POWER, data)
}

// 删除用户菜单数据（根据角色id）
export const removeRoleMenuAsync = async (data: { claimIds: string[] }) => {
  return await processdRequest.delete(USER_ROLE_POWER, data)
}

// 获取角色数据
export const getRoleAsync = async () => {
  return await processdRequest.get<RoleModel[]>(ROLE_URL, {})
}

// 新增角色数据
export const addRoleAsync = async (data: RoleModel) => {
  return await processdRequest.post(ROLE_URL, data)
}

// 更新角色数据
export const updRoleAsync = async (data: RoleModel) => {
  return await processdRequest.put(ROLE_URL, data)
}

// 删除角色数据
export const delRoleAsync = async (data: AnyObject) => {
  return await processdRequest.delete(ROLE_URL, data)
}
