## 插件简绍
### 实现原理

> 一维码识别功能使用的是Quagga这个库。调用摄像头使用的 navigator.mediaDevices.getUserMedia 这个H5的api。通过 video 和  canvas 把摄像头获取到的数据展现到页面上，同时调用监听Quagga解析。


### 使用环境
需要https环境才能使用，本地测试可以在 manifest.json  中点击源码展示，找到h5 ，添加："devServer" : { "https" : true}

**请勿使用 UC浏览器 与 夸克等阿里旗下的浏览器，发现他们使用的内核都较低，无法正常获取视频流。在微信中可以正常使用，推荐在微信内打开演示案例 **

需要https环境才能使用！！！

需要https环境才能使用！！！

需要https环境才能使用！！！

**打开闪光灯只有在安装chrome内核中可以使用。苹果设备上的浏览器全都是Webkit。**

### 插件使用
**插件已支持 uni_modules 支持组件easycom，以下代码演示的是普通使用**

``` html
<!-- HTML -->
		<mumu-one-code @success='handlerSuccess' definition :readers='["code_128_reader"]'></mumu-one-code>
```

``` javascript
// js
	import MumuOneCode from '@/uni_modules/mumu-oneCode/components/mumu-oneCode/mumu-oneCode.vue'

	export default {
		components: { MumuOneCode },
		methods: {
			handlerSuccess(code) {
				uni.showModal({
					content: code
				}).then(res => {
					uni.navigateBack()
				})
			}
		}
	}
```
readers是一维码类型，需要更具实际需求填入。数组中可填多个，但是不推荐，因为不同类型中的一维码可能会被其他类型给解码出来，这样会导致解码不正确。具体类型规则可以百度。

- code_128_reader：企业内部常用，可带字母。一些电子产品类别的一维码就是这个编码
- ean_reader ：商品常用



### 相关API

##### 可传属性（Props）

| 参数       | 说明                                                         | 类型    | 默认值              |
| ---------- | ------------------------------------------------------------ | ------- | ------------------- |
| continue   | 是否连续获取。false 监听一次   true 持续监听                 | Boolean | false               |
| exact      | 选调用摄像头。environment 后摄像头  user 前摄像头            | String  | environment         |
| readers    | 一维码类型。可选： code_128_reader ean_reader ean_8_reader code_39_reader code_39_vin_reader codabar_reader upc_reader upc_e_reader i2of5_reader 2of5_reader code_93_reade | Array   | ["code_128_reader"] |
| definition | 调用摄像头清晰度。fasle 正常  true 高清                      | Boolean | false               |



##### 事件（Events）

| 事件名  | 说明                           | 回调参数   |    
| ------- | ------------------------------ | ---------- | --- |
| success | 检查到二维码并读取到数据是回调 | 二维码数据 |    

### 案例演示
![enter description here](https://h5plugin.mumudev.top/public/getOneCode/qrcode.png)





![enter description here](https://h5plugin.mumudev.top/public/getOneCode/aaa.jpg)

## 支持作者

![支持作者](https://student.mumudev.top/wxMP.jpg)
