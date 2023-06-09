/**
 * 更新
 */

 import { GetAppConfigureAjax } from "@/apis/api/modules/app-config"

 export default async function applyUpdateManager() {
 
   // 检测小程序更新
   // #ifdef MP-WEIXIN
   if (uni.canIUse('getUpdateManager')) {
     const updateManager = uni.getUpdateManager()
     updateManager.onUpdateReady(function() {
       uni.showModal({
         title: '更新提示',
         content: '新版本已经准备好，是否重启应用？',
         success: function(res) {
           if (res.confirm) {
             // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
             updateManager.applyUpdate()
           }
         }
       })
     })
   }
   // #endif
   
 
   // 检测app更新
   // #ifdef APP-PLUS
   const appConfigList: PageData<AppConfigResultModel[]> = await GetAppConfigureAjax({
     pageIndex: 1,
     pageSize: 1
   })
   const appConfig = appConfigList.data[0]
   plus.runtime.getProperty(plus.runtime.appid as string, (info) => {
     if (Number(appConfig.versionNumber) > Number(info.versionCode)) {
       // 有新版本
       uni.showModal({
         title: '提示',
         content: '有新的版本发布，是否立即更新？新版本下载完成后将自动弹出安装程序。',
         success: res => {
           if (res.confirm) {
             uni.showLoading({
               title: '安装包获取中...'
             })
             const dtask = plus.downloader.createDownload(appConfig.linkUrl, {}, function(d, status) {
               // 下载完成  
               if (status == 200) {
                 plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename as string), {}, undefined, function(error) {
                   uni.showToast({
                     title: '安装失败',
                     mask: false,
					 icon: 'none',
                     duration: 1500
                   })
                 })
               } else {
                 uni.showToast({
                   title: '更新失败',
                   mask: false,
                   duration: 1500
                 })
               }
               uni.hideLoading()
             })
             dtask.start()
           }
         }
       })
     }
   })
   // #endif
 
 }
 