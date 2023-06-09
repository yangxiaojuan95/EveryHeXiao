import { LOGIN, GET_USERINFO } from './../constant';

import { processdRequest } from "@/utils/request"

// 登录接口
interface LoginModel {
  account: string;
  password: string;
}

declare global {
  interface LoginResultModel {
    access_token: string;
    expires_in: number;
    scope: string;
    Result: string;
  }
}

export const doLoginAsync = async (req: LoginModel) => {
  const data = {
    name: req.account,
    password: req.password
  }

  const formData = Object.keys(data).reduce((memo, key) => {
    memo.append(key, data[key as keyof typeof data])
    return memo
  }, new FormData())
  return await processdRequest.post<LoginResultModel>(LOGIN, data)
}

// token获取用户信息接口
export const getUserInfoAsync = async () => {
  return await processdRequest.get<UserModel>(GET_USERINFO, {})
}
