(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode"],{"0884":function(e,t,n){},"331a":function(e,t,n){"use strict";var i=n("0884"),a=n.n(i);a.a},"64f9":function(e,t,n){"use strict";(function(e,i){var a=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("2eee")),s=a(n("9523")),c=a(n("c973")),r=a(n("0bec")),u=n("d1d6"),l=n("5a31");function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){(0,s.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=null,m={name:"uqrcode",props:{canvasId:{type:String,required:!0},value:{type:[String,Number]},options:{type:Object,default:function(){return{}}},size:{type:[String,Number],default:200},sizeUnit:{type:String,default:"px"},fileType:{type:String,default:"png"},start:{type:Boolean,default:!0},auto:{type:Boolean,default:!0},hide:{type:Boolean,default:!1},type:{type:String,default:function(){return"2d"}},queue:{type:Boolean,default:!1},isQueueLoadImage:{type:Boolean,default:!1},loading:{type:Boolean,default:void 0},h5SaveIsDownload:{type:Boolean,default:!1},h5DownloadName:{type:String,default:"uQRCode"}},data:function(){return{canvas:void 0,canvasType:void 0,canvasContext:void 0,makeDelegate:void 0,drawDelegate:void 0,toTempFilePathDelegate:void 0,makeExecuted:!1,makeing:!1,drawing:!1,isError:!1,error:void 0,isH5Save:!1,tempFilePath:"",templateOptions:{size:0,width:0,height:0,canvasWidth:0,canvasHeight:0,canvasTransform:"",canvasDisplay:!1},uqrcodeOptions:{data:""},plugins:[],makeingPattern:[[[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0]],[[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!0,!0,!0,!0,!0,!0,!1,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!1,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!1,!0,!0,!0]],[[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!1,!1,!1],[!0,!0,!0,!0,!0,!0,!0,!1,!1,!1],[!0,!0,!0,!0,!0,!0,!0,!1,!1,!1],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!0,!0,!0]],[[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!0,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!0,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!0,!0,!0,!1,!1,!1,!1,!1,!1,!1],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0],[!0,!0,!0,!0,!0,!0,!0,!0,!0,!0]]]}},watch:{type:{handler:function(e){["2d"].includes(e)?this.canvasType=e:this.canvasType=void 0},immediate:!0},value:{handler:function(){this.auto&&this.remake()}},size:{handler:function(){this.auto&&this.remake()}},options:{handler:function(){this.auto&&this.remake()},deep:!0},makeing:{handler:function(e){e||"function"===typeof this.toTempFilePathDelegate&&this.toTempFilePathDelegate()}}},mounted:function(){this.templateOptions.size="rpx"==this.sizeUnit?e.upx2px(this.size):this.size,this.templateOptions.width=this.templateOptions.size,this.templateOptions.height=this.templateOptions.size,this.templateOptions.canvasWidth=this.templateOptions.size,this.templateOptions.canvasHeight=this.templateOptions.size,"2d"==this.canvasType||(this.templateOptions.canvasTransform="scale(".concat(this.templateOptions.size/this.templateOptions.canvasWidth,", ").concat(this.templateOptions.size/this.templateOptions.canvasHeight,")")),this.start&&this.make()},methods:{getTemplateOptions:function(){var t="rpx"==this.sizeUnit?e.upx2px(this.size):this.size;return h(this.templateOptions,{size:t,width:t,height:t})},getUqrcodeOptions:function(){return h(this.options,{data:String(this.value),size:Number(this.templateOptions.size)})},resetCanvas:function(e){var t=this;this.templateOptions.canvasDisplay=!1,this.$nextTick((function(){t.templateOptions.canvasDisplay=!0,t.$nextTick((function(){e&&e()}))}))},draw:function(){var t=arguments,n=this;return(0,c.default)(o.default.mark((function i(){var a,s,c,l,f,p;return o.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(a=t.length>0&&void 0!==t[0]?t[0]:{},s=t.length>1&&void 0!==t[1]&&t[1],"function"!=typeof a.success&&(a.success=function(){}),"function"!=typeof a.fail&&(a.fail=function(){}),"function"!=typeof a.complete&&(a.complete=function(){}),!n.drawing){i.next=11;break}if(s){i.next=9;break}return n.drawDelegate=function(){n.draw(a,!0)},i.abrupt("return");case 9:i.next=12;break;case 11:n.drawing=!0;case 12:if(n.canvasId){i.next=19;break}return console.error("[uQRCode]: canvasId must be set!"),n.isError=!0,n.drawing=!1,a.fail({errMsg:"[uQRCode]: canvasId must be set!"}),a.complete({errMsg:"[uQRCode]: canvasId must be set!"}),i.abrupt("return");case 19:if(n.value){i.next=26;break}return console.error("[uQRCode]: value must be set!"),n.isError=!0,n.drawing=!1,a.fail({errMsg:"[uQRCode]: value must be set!"}),a.complete({errMsg:"[uQRCode]: value must be set!"}),i.abrupt("return");case 26:if(n.templateOptions=n.getTemplateOptions(),n.uqrcodeOptions=n.getUqrcodeOptions(),"string"===typeof n.uqrcodeOptions.errorCorrectLevel&&(n.uqrcodeOptions.errorCorrectLevel=r.default.errorCorrectLevel[n.uqrcodeOptions.errorCorrectLevel]),"undefined"===typeof n.options.useDynamicSize&&(n.uqrcodeOptions.useDynamicSize=!0),c=d=new r.default,n.plugins.forEach((function(e){return c.register(e.plugin)})),c.setOptions(n.uqrcodeOptions),c.make(),l=null,"2d"!==n.canvasType){i.next=50;break}return i.next=38,new Promise((function(t){e.createSelectorQuery().in(n).select("#".concat(n.canvasId)).fields({node:!0,size:!0}).exec((function(e){t(e[0].node)}))}));case 38:f=n.canvas=i.sent,l=n.canvasContext=f.getContext("2d"),n.templateOptions.canvasWidth=c.size,n.templateOptions.canvasHeight=c.size,n.templateOptions.canvasTransform="",p=e.getSystemInfoSync().pixelRatio,f.width=c.dynamicSize*p,f.height=c.dynamicSize*p,l.scale(p,p),c.loadImage=n.getLoadImage((function(e){return new Promise((function(t,n){var i=f.createImage();i.src=e,i.onload=function(){t(i)},i.onerror=function(e){n(e)}}))})),i.next=55;break;case 50:l=n.canvasContext=e.createCanvasContext(n.canvasId,n),n.templateOptions.canvasWidth=c.dynamicSize,n.templateOptions.canvasHeight=c.dynamicSize,n.templateOptions.canvasTransform="scale(".concat(n.templateOptions.size/n.templateOptions.canvasWidth,", ").concat(n.templateOptions.size/n.templateOptions.canvasHeight,")"),c.loadImage=n.getLoadImage((function(t){return new Promise((function(n,i){if(t.startsWith("http"))e.getImageInfo({src:t,success:function(e){n(e.path)},fail:function(e){i(e)}});else{if(t.startsWith("."))throw console.error("[uQRCode]: 本地图片路径仅支持绝对路径！"),new Error("[uQRCode]: local image path only supports absolute path!");n(t)}}))}));case 55:c.canvasContext=l,setTimeout((function(){var e,t=n.plugins.find((function(e){return e.name==c.style})),i=t?t.drawCanvas:"drawCanvas";e=n.queue?function(){return u.queueDraw.exec((function(){return c[i]()}))}:function(){return c[i]()},e().then((function(){if(n.drawDelegate){var e=n.drawDelegate;n.drawDelegate=void 0,e()}else n.drawing=!1,a.success()})).catch((function(e){if(console.log(e),n.drawDelegate){var t=n.drawDelegate;n.drawDelegate=void 0,t()}else n.drawing=!1,n.isError=!0,a.fail(e)})).finally((function(){a.complete()}))}),300);case 57:case"end":return i.stop()}}),i)})))()},make:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.makeExecuted=!0,this.makeing=!0,this.isError=!1,"function"!=typeof t.success&&(t.success=function(){}),"function"!=typeof t.fail&&(t.fail=function(){}),"function"!=typeof t.complete&&(t.complete=function(){}),this.resetCanvas((function(){clearTimeout(e.makeDelegate),e.makeDelegate=setTimeout((function(){e.draw({success:function(){setTimeout((function(){t.success(),e.complete(!0)}),300)},fail:function(n){t.fail(n),e.error=n,e.complete(!1,n.errMsg)},complete:function(){t.complete(),e.makeing=!1}})}),300)}))},remake:function(e){this.$emit("change"),this.make(e)},complete:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e?this.$emit("complete",{success:e}):this.$emit("complete",{success:e,errMsg:t})},toTempFilePath:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if("function"!=typeof n.success&&(n.success=function(){}),"function"!=typeof n.fail&&(n.fail=function(){}),"function"!=typeof n.complete&&(n.complete=function(){}),!this.makeExecuted){console.error("[uQRCode]: make() 方法从未调用！请先成功调用 make() 后再进行操作。");var i={errMsg:"[uQRCode]: make() method has never been executed! please execute make() successfully before operating."};return n.fail(i),void n.complete(i)}if(this.isError)return n.fail(this.error),void n.complete(this.error);if(this.makeing)this.toTempFilePathDelegate=function(){t.toTempFilePath(n)};else if(this.toTempFilePathDelegate=null,"2d"===this.canvasType)try{var a=null;a=this.canvas.toDataURL(),n.success({tempFilePath:a}),n.complete({tempFilePath:a})}catch(o){n.fail(o),n.complete(o)}else e.canvasToTempFilePath({canvasId:this.canvasId,fileType:this.fileType,width:Number(this.templateOptions.canvasWidth),height:Number(this.templateOptions.canvasHeight),destWidth:Number(this.templateOptions.size),destHeight:Number(this.templateOptions.size),success:function(e){n.success(e)},fail:function(e){n.fail(e)},complete:function(){n.complete()}},this)},save:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};"function"!=typeof n.success&&(n.success=function(){}),"function"!=typeof n.fail&&(n.fail=function(){}),"function"!=typeof n.complete&&(n.complete=function(){}),this.toTempFilePath({success:function(a){if("2d"===t.canvasType){var o=new RegExp("^data:image/png;base64,","g"),s=a.tempFilePath.replace(o,""),c=i.getFileSystemManager(),r="".concat(i.env.USER_DATA_PATH,"/").concat((new Date).getTime()).concat(Math.random().toString().split(".")[1],".png");c.writeFile({filePath:r,data:s,encoding:"base64",success:function(t){e.saveImageToPhotosAlbum({filePath:r,success:function(e){n.success(e)},fail:function(e){n.fail(e)},complete:function(){n.complete()}})},fail:function(e){n.fail(e)},complete:function(){n.complete()}})}else e.saveImageToPhotosAlbum({filePath:a.tempFilePath,success:function(e){n.success(e)},fail:function(e){n.fail(e)},complete:function(){n.complete()}})},fail:function(e){n.fail(e),n.complete(e)}})},onClick:function(e){this.$emit("click",e)},getInstance:function(){return d},registerStyle:function(e){if("style"!=e.Type)return console.warn("[uQRCode]: registerStyle 仅支持注册 style 类型的扩展！"),{errMsg:"registerStyle 仅支持注册 style 类型的扩展！"};"function"===typeof e&&this.plugins.push({plugin:e,name:e.Name,drawCanvas:e.DrawCanvas})},getLoadImage:function(e){var t=this;return"function"==typeof e?function(n){return t.isQueueLoadImage?u.queueLoadImage.exec((function(){return new Promise((function(t,i){setTimeout((function(){var a=l.cacheImageList.find((function(e){return e.src==n}));a?t(a.img):e(n).then((function(e){l.cacheImageList.push({src:n,img:e}),t(e)})).catch((function(e){i(e)}))}),10)}))})):e(n)}:function(e){return Promise.resolve(e)}}}};function h(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(var a in e=i?t:p({},t),n){var o=n[a];void 0!=o&&(o.constructor==Object?e[a]=this.deepReplace(e[a],o):o.constructor!=String||o?e[a]=o:e[a]=e[a])}return e}t.default=m}).call(this,n("543d")["default"],n("bc2e")["default"])},c5ef:function(e,t,n){"use strict";n.r(t);var i=n("e583"),a=n("dd81");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("331a");var s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"290d4444",null,!1,i["a"],void 0);t["default"]=c.exports},dd81:function(e,t,n){"use strict";n.r(t);var i=n("64f9"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},e583:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this.$createElement;this._self._c;this.$initSSP(),"augmented"===this.$scope.data.scopedSlotsCompiler&&this.$setSSP("error",{error:this.error}),this.$callSSP()},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode-create-component',
    {
        'uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c5ef"))
        })
    },
    [['uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode-create-component']]
]);
