/**
 * API用户模型
 */

 interface UserResultModel {
  id: string;
  account: string;
  userName: string;
  passwordHash: string;
  phoneNumber: string;
  concurrencyStamp: string;
  creationTime: string;
  staffId: number;
  headImgUrl: string;
  isDeleted: boolean;
  password: string;
  enabled: boolean;
  rolesId: string[];
  Account: string
}

interface UserExtendsModel {
  roleId: string
}

type UserModel = UserResultModel & UserExtendsModel