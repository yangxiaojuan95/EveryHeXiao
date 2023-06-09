/**
 * 登录相关的接口
 */

import { EXIST_ACCOUNT_URL, UPDATE_ESLF_PASSWORD, UPDATE_USER_PASSWORD, USER_URL } from './../constant';

import { processdRequest } from "@/utils/request"

// 获取用户数据
export const getUserAsync = async (data?: AnyObject) => {
  return await processdRequest.get<UserModel[]>(USER_URL, data)
}

// 新增用户数据
export const addUserAsync = async (data: UserModel) => {
  return await processdRequest.post(USER_URL, data)
}

// 更新用户数据
export const updUserAsync = async (data: UserModel) => {
  return await processdRequest.put(USER_URL, data)
}

// 删除用户数据
export const delUserAsync = async (data: AnyObject) => {
  return await processdRequest.delete(USER_URL, data)
}

// 账号是否存在
export const existUserAsync = async (data: { account: string }) => {
  return await processdRequest.get(EXIST_ACCOUNT_URL, data)
}

// 修改账号密码
export const updateUserPasswordAsync = async (data: { account: string }) => {
  return await processdRequest.put(UPDATE_USER_PASSWORD, data)
}

// 修改自己的密码
export const updateSelfPasswordAsync = async (data: { oldPassword: string, newPassword: string }) => {
  return await processdRequest.post(UPDATE_ESLF_PASSWORD, data)
}
