import { DailyTasksStatusEnum, TasksStatus, TaskTypeEnum, TemporaryTaskStatusEnum, EventStatusEnum } from './enum'

declare global {
  interface TaskResultModel {
    patrolTaskId: number;
    userId: number;
    userName: string;
    equipmentId: number;
    equipmentCode: string;
    equipmentName: string;
    equipmentTypeId: number;
    equipmentTypeName: string;
    equipmentProgramName: string;
    depatementId: number;
    departmentName: string;
    equipmentLocationId: number;
    equipmentLocationName: string;
    equipmentProgramId: number;
    taskType: number;
    taskTime: string;
    tasksStatus: TasksStatus;
    remarks: string;
    createTime: string;
  }

  interface TaskDetailResultModel {
    id: number;
    equipmentId: number;
    equipmentCode: string;
    equipmentName: string;
    equipmentTypeId: number;
    equipmentTypeName: string;
    depatementId: number;
    departmentName: string;
    equipmentLocationId: number;
    equipmentLocationName: string;
    equipmentProgramId: number;
    equipmentTaskContents: EquipmentTaskContents[];
    remarks: string;
  }
  
  interface EquipmentTaskContents {
    id: number;
    equipmentProgramId: number;
    taskContent: string;
    taskJson: string;
    createTime: string;

    _answers: { text: string; status: EventStatusEnum, active: boolean; }[];
  }
}
