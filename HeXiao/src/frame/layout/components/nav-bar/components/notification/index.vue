<template>
  <div class="notification">
    <el-popover
      placement="bottom"
      :width="300"
      trigger="hover"
      popper-class="message-popover"
    >
      <template #reference>
        <div>
          <el-badge :value="notReadCount" :hidden="notReadCount <= 0" class="item" type="danger">
            <el-icon :size="20" :class="lighting ? 'lighting' : ''"><ChatDotRound/></el-icon>
          </el-badge>
        </div>
      </template>
      <div class="notifications">
        <div class="notification-header">
          <span class="not-header-title">消息通知</span>
          <div class="not-header-right">
            <el-popconfirm
              confirmButtonText="确定"
              cancelButtonText="取消"
              icon="el-icon-info"
              iconColor="orange"
              title="是否确定全部已读？"
              @confirm="readAll"
            >
              <template #reference>
                <el-button :disabled="!notReadCount" size="small" type="text" class="button-all-read">全部已读</el-button>
              </template>
            </el-popconfirm>
            <span class="button-all" @click="toNotification">查看全部</span>
          </div>
        </div>
        <div v-if="notification.length" class="notification-list">
          <el-scrollbar style="height: 400px;">
            <div 
              v-for="(notifi, index) in notification"
              class="notification-item"
              :key="notifi.id"
              @click="clickNotify(index)"
              :title="`${notifi.message}\n${notifi.createTime}`"
            >
              <div v-if="!notifi.readTime" class="not-read"></div>
              <div class="message-content">{{ notifi.message }}</div>
              <div class="message-time">{{ notifi.createTime }}</div>
            </div>
          </el-scrollbar>
        </div>
        <div v-else class="empty-message">
          <span>暂无消息</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { processdRequest } from '@/utils/request'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ChatDotRound } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ChatDotRound
  },
  setup() {
    const notification = ref<NotificationResultModel[]>([])

    const lighting = ref(false)
    const notReadCount = ref(-1)

    let timer: NodeJS.Timeout | null = null

    const getNotification = async () => {
      const result = await processdRequest.get<PageData<NotificationResultModel[]>>('/Notifications', {
        pageIndex: 1,
        pageSize: 10
      })
      notification.value = result.data
    }

    const getNotificationNotReadCount = async () => {
      const result = await processdRequest.get<number>('/Notifications/Count')

      if (notReadCount.value !== -1 && result > notReadCount.value) {
        lighting.value = true
      }

      notReadCount.value = result

      timer = setTimeout(() => {
        getNotificationNotReadCount()
      }, 10000)
    }

    const getNotoficationInfo = () => {
      getNotification()
      getNotificationNotReadCount()
    }

    const readNotification = async (id: number) => {
      const result = await processdRequest.post('/Notifications/Read', {
        id
      })
      lighting.value = false
      getNotoficationInfo()
      return result
    }
    
    onMounted(() => {
      getNotoficationInfo()
    })

    onUnmounted(() => {
      timer && clearTimeout(timer)
    })

    const router = useRouter()

    const toNotification = () => {
      router.push('/notification')
    }

    const clickNotify = (index: number) => {
      const item = notification.value[index]
      updateNotify(item)
    }

    const updateNotify = async (item: NotificationResultModel) => {
      if (!item.readTime) {
        // 更新已读状态
        readNotification(item.id)
      }
    }

    const readAll = async () => {
      await processdRequest.post('/Notifications/ReadAll', {})
      ElMessage.success('操作成功!')
      getNotoficationInfo()
      lighting.value = false
    }

    return {
      notification,
      notReadCount,
      lighting,

      toNotification,
      readAll,
      clickNotify
    }

  }
})
</script>

<style lang="scss">
.message-popover {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>

.notification {
  padding: 0 8px;
  display: inline-flex;
  height: auto;
  line-height: 1;
  color: #333;
  cursor: pointer;
  margin-top: 4px;
  margin-right: 4px;

}
.icon-message {
  transform: translateY(1px);
}

.notification-header {
  display: flex;
  padding: 14px 20px;
  border-bottom: 1px solid #efefef;
  background-color: #f5f5f5;
}

.not-header-title {
  flex-grow: 1;
  width: 0;
  color: #000;
}

.not-header-right {
  flex-shrink: 0;
}

.button-all-read, .button-all {
  font-size: 12px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  min-height: auto;
}

.button-all-read {
  color: #0d56df;
}

.button-all {
  margin-left: 10px;
}

.empty-message {
  text-align: center;
  padding: 14px 0;
  color: #999;
}

.notification-item {
  position: relative;
  padding: 10px 20px;
  transition: all .3s;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }

  & + .notification-item {
    border-top: 1px solid #efefef;
  }
}

.not-read {
  position: absolute;
  left: 6px;
  top: 20px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: red;
}

.message-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.message-time {
  margin-top: 2px;
  font-size: 12px;
  color: #999;
}

.lighting {
  animation: lighting linear infinite;
  animation-duration: 1.2s;
}


@keyframes lighting {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

</style>