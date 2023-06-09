<script lang="tsx">
export default {
  name: 'CreateOrderForm'
}
</script>

<script setup lang="tsx">
import { PageModelForm, FormDialog, defineForm } from '@juzhenfe/page-model'
import StaffForm from './components/form-parts/staff-form.vue'
import ReceiverForm from './components/form-parts/receiver-form.vue'
import SenderForm from './components/form-parts/sender-form.vue'
import MiddleCompany from './components/form-parts/middle-company.vue'
import IncomeForm from './components/form-parts/income-form.vue'
import FeeForm from './components/form-parts/fee-form.vue'
import ShouldReceiveAmount from './components/form-parts/should-receive-amount.vue'
import ShouldPayAmount from './components/form-parts/should-pay-amount.vue'
import RemarksForm from './components/form-parts/remarks-form.vue'
import FormList from './components/form-parts/form-list.vue'
import { nextTick, ref } from 'vue'
import { genCode } from '@/utils/gen-code'
import { useReflectionData } from './use-reflection-data'
import { ElMessage, ElMessageBox } from 'element-plus'
import { processdRequest } from '@/utils/request'
import APIS from '@/constants/apis'
import { FormTypeEnum } from '@/models/business/common/enum'

// 弹窗是否显示
const visible = ref(false)

const emit = defineEmits<{
  (e: 'confirm'): void;
}>()

const formType = ref(FormTypeEnum.新增)

// 表单实例
const pageModelFormRef = ref<any>()

const form = defineForm<OnWayOrderResultModel>({
  props: {
    labelWidth: '80px'
  },
  els: [
    {
      eType: 'el-input',
      label: '运单单号',
      prop: 'waybillNum',
      props: {
        disabled: true
      },
      col: {
        span: 6
      }
    },
    {
      eType: 'el-input',
      label: '创亨单号',
      prop: 'chNum',
      props: {
        placeholder: ''
      },
      col: {
        span: 6
      }
    },
    {
      eType: 'el-date-picker',
      label: '计划时间',
      prop: 'planTime',
      props: {
        placeholder: '',
        valueFormat: 'YYYY/MM/DD HH:mm:ss'
      },
      col: {
        span: 6
      },
      style: {
        width: '100%'
      }
    },
    {
      label: '合作公司',
      prop: 'businessCompanyId',
      col: {
        span: 6
      },
      style: {
        width: '100%'
      },
      renderFn(row) {
        const sets = [
          {
            from: 'id',
            to: 'businessCompanyId'
          },
          {
            from: 'name',
            to: 'businessCompanyName'
          }
        ]
        return (
          <business-store-select
            formData={row}
            value-key='businessCompanyName'
            sets={sets}
          />
        )
      }
    },
    {
      label: '部门',
      prop: 'businessDepartmentId',
      col: {
        span: 6
      },
      style: {
        width: '100%'
      },
      renderFn(row) {
        const sets = [
          {
            from: 'id',
            to: 'businessDepartmentId'
          },
          {
            from: 'name',
            to: 'businessDepartmentName'
          }
        ]

        const companyParams = {
          businessId: row.businessCompanyId
        }

        return (
          <business-department-select
            formData={row}
            params={companyParams}
            value-key='businessDepartmentName'
            sets={sets}
          />
        )
      }
    },
    {
      label: '客户名称',
      prop: 'customerId',
      props: {
        placeholder: ''
      },
      col: {
        span: 6
      },
      renderFn(row) {
        const sets = [
          {
            from: 'id',
            to: 'customerId'
          },
          {
            from: 'name',
            to: 'customerName'
          }
        ]
        return (
          <customer-select
            formData={row}
            value-key='customerName'
            sets={sets}
          />
        )
      }
    },
    {
      eType: 'el-input',
      label: '经办人',
      prop: 'operatorName',
      props: {
        placeholder: ''
      },
      col: {
        span: 6
      }
    },
    {
      eType: 'el-input',
      label: '司机',
      prop: 'driverId',
      props: {
        placeholder: ''
      },
      col: {
        span: 6
      },
      renderFn(row) {
        const sets = [
          {
            from: 'id',
            to: 'driverId'
          },
          {
            from: 'name',
            to: 'driverName'
          },
          {
            from: 'mobile',
            to: 'driverMobile'
          },
          {
            from: 'carId',
            to: 'carId'
          }
        ]
        return (
          <driver-select
            formData={row}
            value-key='driverName'
            sets={sets}
          />
        )
      }
    },
    {
      eType: 'el-input',
      label: '司机电话',
      prop: 'driverMobile',
      props: {
        placeholder: ''
      },
      col: {
        span: 6
      }
    },
    {
      eType: 'el-select',
      label: '发货类型',
      prop: 'deliveryMethodCode',
      props: {
        placeholder: '',
        automaticDropdown: true
      },
      col: {
        span: 18
      },
      optionsData: {
        list: [],
        _reflect: 'deliveryMethodList',
        label: 'name',
        value: 'code'
      },
      style: {
        width: '100%'
      }
    },
    {
      eType: 'el-input',
      label: '起始地',
      prop: 'senderTotalAddress',
      props: {
        placeholder: ''
      },
      col: {
        span: 12
      }
    },
    {
      eType: 'el-input',
      label: '目的地',
      prop: 'receiverTotalAddress',
      props: {
        placeholder: ''
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <StaffForm formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <ReceiverForm formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      eType: 'el-input',
      label: '重量',
      prop: 'goodsWeight',
      props: {
        placeholder: ''
      },
      col: {
        span: 8
      }
    },
    {
      eType: 'el-input',
      label: '体积',
      prop: 'goodsVolume',
      props: {
        placeholder: ''
      },
      col: {
        span: 8
      }
    },
    {
      eType: 'el-input',
      label: '复核重量',
      prop: 'recheckWeight',
      props: {
        placeholder: ''
      },
      col: {
        span: 8
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <SenderForm formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <MiddleCompany formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <IncomeForm formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <FeeForm formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <ShouldReceiveAmount formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <ShouldPayAmount formData={row} />
        )
      },
      col: {
        span: 12
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        return (
          <RemarksForm formData={row} />
        )
      },
      col: {
        span: 24
      }
    },
    {
      label: '',
      formItemProps: {
        labelWidth: '0px'
      },
      renderFn(row) {
        const onGoodsChange = (list: OnWayOrderPickupItem[]) => {
          row.items = list
        }
        return (
          <FormList formData={row} onGoodsChange={onGoodsChange} />
        )
      },
      col: {
        span: 24
      }
    }
  ]
})

const show = async (order: OnWayOrderResultModel, mode: FormTypeEnum) => {
  formType.value = mode
  if (formType.value === FormTypeEnum.查看) {
    // 设置表单不可编辑
    form.els.forEach(item => {
      let props = item.props || {}
      props.disabled = true
      item.props = props
    })
    visible.value = true
    const orderInfo = await processdRequest.get(APIS.ON_WAY_ORDER_DETAIL_URL, {
      id: order.id
    })
    pageModelFormRef.value.setFormData(orderInfo)
  } else {
    // 新增或者编辑
    visible.value = true
    nextTick(async () => {
      if (!order.waybillNum) {
        order.waybillNum = await genCode({
          type: '运单'
        })
      }
      pageModelFormRef.value.setFormData(order)
    })
  }

}

const {
  reflections
} = useReflectionData()

const onConfirm = async () => {
  const formData = await pageModelFormRef.value.getFormData()
  if (!formData) {
    return false
  }

  await ElMessageBox.confirm('是否确认提交表单?', '提示', {
    type: 'success'
  })

  // 设置运单仓库
  formData.warehouseId = formData.items[0].warehouseId

  await processdRequest.post(APIS.ON_WAY_ORDER_URL, {
    ...formData
  }, undefined, {
    loading: '运单创建中'
  })
  ElMessage.success('创建运单成功!')
  visible.value = false
  emit('confirm')
}

defineExpose({
  show
})

</script>

<template>
  <form-dialog
    v-model="visible"
    title="生成运单"
    width="90%"
    :dialog-props="{
      top: '30px'
    }"
    custom-class="create-onway-order-dialog"
  >
    <page-model-form
      ref="pageModelFormRef"
      class="page-model-form"
      :form="form"
      :reflections="reflections"
    />

    <template
      v-if="formType !== FormTypeEnum.查看"
      #bottom
    >
      <el-button
        type="primary"
        @click="onConfirm"
      >确认提交</el-button>
    </template>

  </form-dialog>
</template>

<style lang="scss" scoped>
::v-deep .create-onway-order-dialog {
  .el-dialog__body {
    max-height: 80vh;
  }
}

.page-model-form {
  border-top: 1px solid var(--theme);
  border-left: 1px solid var(--theme);
  box-sizing: border-box;
  overflow: hidden;

  &::v-deep {
    .el-form-item {
      margin-bottom: 0;
      border-right: 1px solid var(--theme);
      border-bottom: 1px solid var(--theme);
      height: 100%;
      box-sizing: border-box;
    }

    .el-form-item__label {
      position: relative;
      color: #333;
      display: inline-block;
      text-align: justify;
      padding: 7px 10px;

      &::after {
        content: '：';
        display: inline-block;
        width: 100%;
        opacity: 0;
      }
    }

    .el-form-item__content {
      padding: 7px 10px 7px 0;
    }
  }
}
</style>