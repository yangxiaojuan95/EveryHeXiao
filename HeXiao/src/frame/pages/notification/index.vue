<template>
  <div style="height: 100%;">
    <page-model
      :config="config"
    >
    </page-model>

  </div>
</template>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model';

let config = defineConfig<NotificationResultModel>({
  size: 'small',
  getUrl: '/Notifications',
  searchForm: {
    els: [
      {
        label: '消息内容',
        eType: 'el-input',
        prop: 'KeyWord',
        props: {
          placeholder: '输入关键词',
          clearable: true
        }
      }
    ]
  },
  table: {
    props: {
      border: true,
      stripe: true
    },
    els: [
      {
        label: '消息内容',
        prop: 'message'
      },
      {
        label: '操作人',
        prop: 'triggerUserName',
        width: 100
      },
      {
        label: '是否已读',
        renderFn(row) {
          const type = row.readTime ? 'success' : 'info'
          return (
            <el-tag type={ type } size="small">{ row.readTime ? '已读' : '未读' }</el-tag>
          )
        },
        width: 100
      },
      {
        label: '时间',
        prop: 'createTime',
        width: 160
      }
    ]
  },
  hasForm: false
})

</script>
