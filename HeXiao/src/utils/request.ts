import { STATUS_403 } from './../store/app/index';
import EventChain from '@/frame/utils/event-chain'
import tokenStorage from '@/frame/utils/token'
import { AxiosRequestConfig, AxiosResponse, createRequest } from '@juzhenfe/request'
import { ElLoading, ElLoadingService, ElMessage } from 'element-plus'
import router from '@/router'
import { useAppStore } from '@/store/app'
import nProgress from 'nprogress';
import { baseURL } from '@/config';
import { valueStringFn } from '@/frame/designd/utils/string-fn';
import { useUserStore } from "@/store/user";

nProgress.configure({
  easing: 'ease',
  speed: 500,
})

export const status = (res:any) => {
  // 开始获取用户权限数据
  const userStore = useUserStore()
  if(res.data.Status === 40001){
    ElMessage({
      message: '抱歉，您的授权已失效，请重新登录。',
      grouping: true,
      type: 'warning',
      duration: 3000
    })
    tokenStorage.remove()
    userStore.clear()//登录失效后，清空用户信息
    router.push('/login')
    return false
  }
}


// 请求成功处理链
const successChain = new EventChain()
const status200 = (res: AxiosResponse) => {
  if (res.status === 200) {
    status(res)
    return true
  }
  return false
}
const status204 = (res: AxiosResponse) => {
  if (res.status === 204) {
    return true
  }
  return false
}
const resultSuccessChain = (res: AxiosResponse) => {
  return true
}
successChain
  .setChain(status200)
  .setChain(status204)
  .setChain(resultSuccessChain)

  // 请求失败处理链
const errorChain = new EventChain()
const status401 = (res: AxiosResponse) => {
  if (res.status === 401) {
    ElMessage({
      message: '抱歉，您的授权已失效，请重新登录。',
      grouping: true,
      type: 'warning',
      duration: 3000
    })
    tokenStorage.remove()
    router.push('/login')
    return true
  }
  return false
}
const status403 = (res: AxiosResponse) => {
  if (res.status === 403) {
    ElMessage({
      message: '抱歉，您暂无权限访问。',
      grouping: true,
      type: 'warning',
      duration: 3000
    })
    if (router.currentRoute.value.name) {
      const store = useAppStore()
      store.updateStatus({
        status: STATUS_403,
        name: router.currentRoute.value.name as string
      })
    }

    return true
  }
  return false
}
const status404 = (res: AxiosResponse) => {
  if (res.status === 404) {
    ElMessage({
      message: '抱歉，数据请求失败，请联系管理员。',
      grouping: true,
      type: 'warning',
      duration: 10000
    })
    return true
  }
  return false
}

const status500 = (res: AxiosResponse) => {
  if (res.status === 500) {
    const message = res.data.errMsg
    ElMessage.warning(`${message}。`)
    return true
  }
  return false
}

const status400 = (res: AxiosResponse) => {
  if (res.status === 400) {
    if(res.data.Status === 60003){
      ElMessage({
        message: res.data.Result,
        grouping: true,
        type: 'warning',
        duration: 3000
      })
      return false
    }
    const message = res.data.error_description || res.data.errMsg 
    ElMessage.warning(`${message}。`)
    return true
  }
  return false
}

const resultErrorChain = (res: AxiosResponse) => {
  ElMessage.warning(`抱歉，系统出现了错误，请联系管理员。`)
  return true
}

errorChain
  .setChain(status401)
  .setChain(status403)
  .setChain(status404)
  .setChain(status400)
  .setChain(status500)
  .setChain(resultErrorChain)

export const processdRequest = createRequest({
  baseURL: baseURL,
  auth: 'NORMAL',
  arrayFormat: 'repeat',
  getToken() {
    return tokenStorage.get() ?? ''
  },
  resolveJudge(response) {
    return successChain.passRequest(response)
  }
}, {
  process: true
})

let loadingInstance: any = null

const startProgress = (config: AxiosRequestConfig) => {
  nProgress.start()
  if (config.loading) {
    let loadingText = typeof config.loading === 'string' ? config.loading : '处理中'
    loadingInstance = ElLoading.service({
      fullscreen: true,
      text: loadingText
    })
  }
}

const doneProgress = () => {
  nProgress.done()
  loadingInstance && loadingInstance.close()
}


processdRequest.axiosInstance.interceptors.request.use(config => {
  let headers = {
    ...config.headers
  }
  headers.Authorization = tokenStorage.get() ?? ''
  config.headers = headers
  startProgress(config)
  return config
})

processdRequest.axiosInstance.interceptors.response.use(function (res) {
  doneProgress()
  return res
}, function (error) {
  errorChain.passRequest(error.response)
  doneProgress()
  return Promise.reject(error);
})
