// 编码规则枚举
export enum SequenceTypeEnum {
  后台账号,
  店铺,
  商品,
  优惠券
}
/**
 * 工序类型
 */
export enum ProcessNameTypeEnum {
  内部,
  外部
}
/**
 * 销售订单状态
 */
export enum SaleOrderTypeEnum {
  待分配,
  部分分配,
  全分配,
  已完成
}
/**
 * 销售订单审核状态
 */
export enum SaleOrderAuditStatusTypeEnum{
  待审核,
  不通过,
  已通过
}
/**
 * 派工单状态
 */
export enum DispatchTicketsTypeEnum {
  未下达,
  已下达未开工,
  生产中,
  已完成
}
/**
 * 生产任务单/销售订单状态
 */
export enum ProduceTaskStatusTypeEnum {
  未开工,
  未生产,
  生产中,
  已完成
}
/**
 * 设备级别
 */
export enum EquipmentLvTypeEnum {
  一般,
  关键,
  重要
}
/**
 * 设备状态
 */
export enum EquipmentStatusTypeEnum {
  正常,
  维护,
  故障
}
/**
 * 
 */
export enum OutsourcedOrdersStatusTypeEnum {
  待提交,
  待审核,
  审核不通过,
  审核通过待入库,
  已入库
}




/**
 * 收发件人类型
 */
export enum SenderReceiverTypeEnum {
  收件人,
  发件人,
}

/**
 * 关闭状态
 */
export enum CloseStatusEnum {
  启用,
  禁用,
}

/**
 * 运单费用报销审核状态枚举
 */
export enum OnwayOrderAuditStatusEnum {
  未提交,
  审批中,
  付款中,
  完结,
}

/**
 * app版本类型
 */
 export enum AppVersionTypeEnum {
  公司端,
  司机端,
}
