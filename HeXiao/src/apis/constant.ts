
// 登录
export const LOGIN = '/api/Admin/Login'

// token获取用户信息
export const GET_USERINFO = '/api/Admin/GetAdminByID'

// 获取用户角色菜单
export const USER_ROLE_MENU = '/api/Role/GetMenuJurisdiction'

// 获取用户角色权限
export const USER_ROLE_POWER = '/api/Role/GetMenuJurisdiction'

// 菜单
export const MENU_URL = '/api/Menu/GetMenus'

// 操作
export const Func_URL = '/api/Permissions/MenuFunctions'

// 角色
export const ROLE_URL = '/api/Role/GetRoles'

// 用户
export const USER_URL = '/api/Permissions/User'

// 账号是否合法
export const EXIST_ACCOUNT_URL = '/api/sys/users/existsAccount'

// 修改密码
export const UPDATE_USER_PASSWORD = '/api/sys/users/password'

// 修改自己密码
export const UPDATE_ESLF_PASSWORD = '/api/Admin/UpdatePwd'
