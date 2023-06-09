interface EquipmentTypeResultModel {
  id: number;
  typeName: string;
  createTime: string;
}

interface EquipmentResultModel {
  id: number;
  departmentId: number;
  equipmentCode: string;
  equipmentName: string;
  equipmentTypeId: number;
  equipmentLocationId: number;
  createTime: string;
}