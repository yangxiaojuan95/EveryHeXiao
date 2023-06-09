/**
 * 上传文件相关配置
 */


// 七牛上传配置
export const qiniuUploadConfig = {
  // open: true,
  open: false,
  region: 'juzhenshop',
  tokenUrl: 'api/Qiniu/CreateUploadToken',
  uploadUrl: 'https://upload.qiniup.com/',
  fileUrl: 'https://juzhenshopimg.juzhentech.com/'
}

// // 本地上传配置
// export const normalUploadConfig = {
//   fileUrl: '',
//   uploadUrl: '',
// }

// 本地上传配置
export const normalUploadConfig = {
  fileUrl: '',
  uploadUrl: '/api/magic/api/Upload/UploadImage',
  settleResult(result: any) {
    return result.status === 200 && result.data
  },
  getSrc(result: any) {
    return result.data
  }
}
