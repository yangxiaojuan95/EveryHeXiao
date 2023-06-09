/**
 * 枚举
 */

export enum TaskOptionItemStatus {
  成功,
  警告,
  信息
}


 export enum EventStatusEnum {
  正常,
  异常
}

export enum TaskTypeEnum {
  日常任务 = 1,
  临时任务 = 2
}

export enum TasksStatus {
  未派发 = 0,
  已派发 = 1,
  已完成 = 2,
}

export enum AbnormalEventStatusEnum {
  置为正常=1,
  自处理=2,
  转为任务=3
}

export enum AppUserRoleEnum {
  巡查
}
