// import QRCode from '../libs/qr/qrcode'
import jsqr from 'jsqr'
// 二维码 或 条形码 识别
export function showQrCode(file, params, callback) {
  const ready = new FileReader()
  /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file) // 调用reader.readAsDataURL()方法，把图片转成base64
  ready.onload = function() {
    const re = this.result
    canvasDataURL(re, params, callback)
  }
}
function canvasDataURL(path, obj, callback) {
  const img = new Image()
  img.src = path
  // 生成canvas
  const canvas = document.createElement('canvas')
  // const canvas = document.getElementById('qrcanvas')
  const ctx = canvas.getContext('2d')
  // const _this = this
  img.onload = function() {
    console.log('canvasDataURL()-img', img.height, img.width)
    // let w = img.width
    // let h = img.height
    const w = 100
    const h = 100
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h);
    const code = jsqr(imageData.data, w, h);
    const res = {
      data: null,
      message: '识别成功',
      code: 0,
    }
    if(code){
      res.data = code.data
      callback(res)
    }else{
      res.code = -1
      res.data = null
      res.message = '识别失败'
      callback(res)
    }
  }
}
