(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-activity-event-registration-index~pages-activity-index~pages-buyland-index~pages-index-index~p~a99e4723"],{"0f6a":function(t,i,n){"use strict";n.r(i);var e=n("5efb"),o=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(i,t,(function(){return e[t]}))}(a);i["default"]=o.a},"1d8d":function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return o})),n.d(i,"c",(function(){return a})),n.d(i,"a",(function(){return e}));var o=function(){var t=this,i=t.$createElement,n=t._self._c||i;return t.isShow?n("v-uni-view",{ref:"ani",class:t.customClass,style:t.transformStyles,attrs:{animation:t.animationData},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onClick.apply(void 0,arguments)}}},[t._t("default")],2):t._e()},a=[]},2354:function(t,i,n){var e=n("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/* 主色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 文字尺寸 */\r\n/* Border Radius */.placeholder[data-v-79177165]{color:#ccc!important}.shadow[data-v-79177165]{box-shadow:0 %?2?% %?8?% 0 rgba(0,0,0,.1)}.shadow-box[data-v-79177165]{background-color:#fff;border-radius:%?12?%;box-shadow:0 %?2?% %?8?% 0 rgba(0,0,0,.1)}.noselect[data-v-79177165]{-webkit-user-select:none;user-select:none}\r\n/**\r\n * flex mixins\r\n */.uni-popup-z96 .uni-popup[data-v-79177165]{z-index:96}[data-v-79177165]:export{imageBg:#fafafa;themeColor:#1747b2}.uni-popup[data-v-79177165]{position:fixed;z-index:99}.uni-popup.top[data-v-79177165], .uni-popup.left[data-v-79177165], .uni-popup.right[data-v-79177165]{top:var(--window-top)}.uni-popup .uni-popup__wrapper[data-v-79177165]{display:block;position:relative\r\n  /* iphonex 等安全区设置，底部安全区适配 */}.uni-popup .uni-popup__wrapper.left[data-v-79177165], .uni-popup .uni-popup__wrapper.right[data-v-79177165]{padding-top:var(--window-top);flex:1}.fixforpc-z-index[data-v-79177165]{z-index:999}.fixforpc-top[data-v-79177165]{top:0}',""]),t.exports=i},"38f8":function(t,i,n){"use strict";var e=n("3a9c"),o=n.n(e);o.a},"3a9c":function(t,i,n){var e=n("2354");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var o=n("4f06").default;o("030ec478",e,!0,{sourceMap:!1,shadowMode:!1})},"5efb":function(t,i,n){"use strict";(function(t){var e=n("4ea4");n("c975"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=e(n("9739")),a={name:"uniPopup",components:{keypress:o.default},emits:["change","maskClick"],props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},isMaskClick:{type:Boolean,default:null},maskClick:{type:Boolean,default:null},backgroundColor:{type:String,default:"none"},safeArea:{type:Boolean,default:!0},maskBackgroundColor:{type:String,default:"rgba(0, 0, 0, 0.4)"}},watch:{type:{handler:function(t){this.config[t]&&this[this.config[t]](!0)},immediate:!0},isDesktop:{handler:function(t){this.config[t]&&this[this.config[this.type]](!0)},immediate:!0},maskClick:{handler:function(t){this.mkclick=t},immediate:!0},isMaskClick:{handler:function(t){this.mkclick=t},immediate:!0},showPopup:function(t){document.getElementsByTagName("body")[0].style.overflow=t?"hidden":"visible"}},data:function(){return{duration:300,ani:[],showPopup:!1,showTrans:!1,popupWidth:0,popupHeight:0,config:{top:"top",bottom:"bottom",center:"center",left:"left",right:"right",message:"top",dialog:"center",share:"bottom"},maskClass:{position:"fixed",bottom:0,top:0,left:0,right:0,backgroundColor:"rgba(0, 0, 0, 0.4)"},transClass:{position:"fixed",left:0,right:0},maskShow:!0,mkclick:!0,popupstyle:this.isDesktop?"fixforpc-top":"top"}},computed:{isDesktop:function(){return this.popupWidth>=500&&this.popupHeight>=500},bg:function(){return""===this.backgroundColor||"none"===this.backgroundColor?"transparent":this.backgroundColor}},mounted:function(){var t=this,i=function(){var i=uni.getSystemInfoSync(),n=i.windowWidth,e=i.windowHeight,o=i.windowTop,a=i.safeArea,s=(i.screenHeight,i.safeAreaInsets);t.popupWidth=n,t.popupHeight=e+(o||0),a&&t.safeArea?t.safeAreaInsets=s.bottom:t.safeAreaInsets=0};i()},destroyed:function(){this.setH5Visible()},created:function(){null===this.isMaskClick&&null===this.maskClick?this.mkclick=!0:this.mkclick=null!==this.isMaskClick?this.isMaskClick:this.maskClick,this.animation?this.duration=300:this.duration=0,this.messageChild=null,this.clearPropagation=!1,this.maskClass.backgroundColor=this.maskBackgroundColor},methods:{setH5Visible:function(){document.getElementsByTagName("body")[0].style.overflow="visible"},closeMask:function(){this.maskShow=!1},disableMask:function(){this.mkclick=!1},clear:function(t){t.stopPropagation(),this.clearPropagation=!0},open:function(i){this.showPopup&&(clearTimeout(this.timer),this.showPopup=!1);var n=["top","center","bottom","left","right","message","dialog","share"];i&&-1!==n.indexOf(i)||(i=this.type),this.config[i]?(this[this.config[i]](),this.$emit("change",{show:!0,type:i})):t.error("缺少类型：",i)},close:function(t){var i=this;this.showTrans=!1,this.$emit("change",{show:!1,type:this.type}),clearTimeout(this.timer),this.timer=setTimeout((function(){i.showPopup=!1}),300)},touchstart:function(){this.clearPropagation=!1},onTap:function(){this.clearPropagation?this.clearPropagation=!1:(this.$emit("maskClick"),this.mkclick&&this.close())},top:function(t){var i=this;this.popupstyle=this.isDesktop?"fixforpc-top":"top",this.ani=["slide-top"],this.transClass={position:"fixed",left:0,right:0,backgroundColor:this.bg},t||(this.showPopup=!0,this.showTrans=!0,this.$nextTick((function(){i.messageChild&&"message"===i.type&&i.messageChild.timerClose()})))},bottom:function(t){this.popupstyle="bottom",this.ani=["slide-bottom"],this.transClass={position:"fixed",left:0,right:0,bottom:0,paddingBottom:this.safeAreaInsets+"px",backgroundColor:this.bg},t||(this.showPopup=!0,this.showTrans=!0)},center:function(t){this.popupstyle="center",this.ani=["zoom-out","fade"],this.transClass={position:"fixed",display:"flex",flexDirection:"column",bottom:0,left:0,right:0,top:0,justifyContent:"center",alignItems:"center"},t||(this.showPopup=!0,this.showTrans=!0)},left:function(t){this.popupstyle="left",this.ani=["slide-left"],this.transClass={position:"fixed",left:0,bottom:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)},right:function(t){this.popupstyle="right",this.ani=["slide-right"],this.transClass={position:"fixed",bottom:0,right:0,top:0,backgroundColor:this.bg,display:"flex",flexDirection:"column"},t||(this.showPopup=!0,this.showTrans=!0)}}};i.default=a}).call(this,n("5a52")["default"])},"8cf7":function(t,i,n){"use strict";n.r(i);var e=n("b119"),o=n("0f6a");for(var a in o)"default"!==a&&function(t){n.d(i,t,(function(){return o[t]}))}(a);n("38f8");var s,r=n("f0c5"),c=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,"79177165",null,!1,e["a"],s);i["default"]=c.exports},"906d":function(t,i,n){"use strict";n.r(i);var e=n("921f"),o=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(i,t,(function(){return e[t]}))}(a);i["default"]=o.a},"921f":function(t,i,n){"use strict";(function(t){var e=n("4ea4");n("99af"),n("4160"),n("a9e3"),n("ac1f"),n("5319"),n("159b"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=e(n("2909")),a=e(n("5530")),s=n("d5ee"),r={name:"uniTransition",emits:["click","change"],props:{show:{type:Boolean,default:!1},modeClass:{type:[Array,String],default:function(){return"fade"}},duration:{type:Number,default:300},styles:{type:Object,default:function(){return{}}},customClass:{type:String,default:""}},data:function(){return{isShow:!1,transform:"",opacity:1,animationData:{},durationTime:300,config:{}}},watch:{show:{handler:function(t){t?this.open():this.isShow&&this.close()},immediate:!0}},computed:{stylesObject:function(){var t=(0,a.default)((0,a.default)({},this.styles),{},{"transition-duration":this.duration/1e3+"s"}),i="";for(var n in t){var e=this.toLine(n);i+=e+":"+t[n]+";"}return i},transformStyles:function(){return"transform:"+this.transform+";opacity:"+this.opacity+";"+this.stylesObject}},created:function(){this.config={duration:this.duration,timingFunction:"ease",transformOrigin:"50% 50%",delay:0},this.durationTime=this.duration},methods:{init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.duration&&(this.durationTime=t.duration),this.animation=(0,s.createAnimation)(Object.assign(this.config,t),this)},onClick:function(){this.$emit("click",{detail:this.isShow})},step:function(i){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(this.animation){for(var e in i)try{var a;if("object"===typeof i[e])(a=this.animation)[e].apply(a,(0,o.default)(i[e]));else this.animation[e](i[e])}catch(s){t.error("方法 ".concat(e," 不存在"))}return this.animation.step(n),this}},run:function(t){this.animation&&this.animation.run(t)},open:function(){var t=this;clearTimeout(this.timer),this.transform="",this.isShow=!0;var i=this.styleInit(!1),n=i.opacity,e=i.transform;"undefined"!==typeof n&&(this.opacity=n),this.transform=e,this.$nextTick((function(){t.timer=setTimeout((function(){t.animation=(0,s.createAnimation)(t.config,t),t.tranfromInit(!1).step(),t.animation.run(),t.$emit("change",{detail:t.isShow})}),20)}))},close:function(t){var i=this;this.animation&&this.tranfromInit(!0).step().run((function(){i.isShow=!1,i.animationData=null,i.animation=null;var t=i.styleInit(!1),n=t.opacity,e=t.transform;i.opacity=n||1,i.transform=e,i.$emit("change",{detail:i.isShow})}))},styleInit:function(t){var i=this,n={transform:""},e=function(t,e){"fade"===e?n.opacity=i.animationType(t)[e]:n.transform+=i.animationType(t)[e]+" "};return"string"===typeof this.modeClass?e(t,this.modeClass):this.modeClass.forEach((function(i){e(t,i)})),n},tranfromInit:function(t){var i=this,n=function(t,n){var e=null;"fade"===n?e=t?0:1:(e=t?"-100%":"0","zoom-in"===n&&(e=t?.8:1),"zoom-out"===n&&(e=t?1.2:1),"slide-right"===n&&(e=t?"100%":"0"),"slide-bottom"===n&&(e=t?"100%":"0")),i.animation[i.animationMode()[n]](e)};return"string"===typeof this.modeClass?n(t,this.modeClass):this.modeClass.forEach((function(i){n(t,i)})),this.animation},animationType:function(t){return{fade:t?1:0,"slide-top":"translateY(".concat(t?"0":"-100%",")"),"slide-right":"translateX(".concat(t?"0":"100%",")"),"slide-bottom":"translateY(".concat(t?"0":"100%",")"),"slide-left":"translateX(".concat(t?"0":"-100%",")"),"zoom-in":"scaleX(".concat(t?1:.8,") scaleY(").concat(t?1:.8,")"),"zoom-out":"scaleX(".concat(t?1:1.2,") scaleY(").concat(t?1:1.2,")")}},animationMode:function(){return{fade:"opacity","slide-top":"translateY","slide-right":"translateX","slide-bottom":"translateY","slide-left":"translateX","zoom-in":"scale","zoom-out":"scale"}},toLine:function(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}}};i.default=r}).call(this,n("5a52")["default"])},9739:function(t,i,n){"use strict";n("7db0"),n("caad"),n("b64b"),n("2532"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e={name:"Keypress",props:{disable:{type:Boolean,default:!1}},mounted:function(){var t=this,i={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},n=function(n){if(!t.disable){var e=Object.keys(i).find((function(t){var e=n.key,o=i[t];return o===e||Array.isArray(o)&&o.includes(e)}));e&&setTimeout((function(){t.$emit(e,{})}),0)}};document.addEventListener("keyup",n)},render:function(){}};i.default=e},b01f:function(t,i,n){"use strict";n.r(i);var e=n("1d8d"),o=n("906d");for(var a in o)"default"!==a&&function(t){n.d(i,t,(function(){return o[t]}))}(a);var s,r=n("f0c5"),c=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,"acf5fb64",null,!1,e["a"],s);i["default"]=c.exports},b119:function(t,i,n){"use strict";n.d(i,"b",(function(){return o})),n.d(i,"c",(function(){return a})),n.d(i,"a",(function(){return e}));var e={uniTransition:n("b01f").default},o=function(){var t=this,i=t.$createElement,n=t._self._c||i;return t.showPopup?n("v-uni-view",{staticClass:"uni-popup",class:[t.popupstyle,t.isDesktop?"fixforpc-z-index":""]},[n("v-uni-view",{on:{touchstart:function(i){arguments[0]=i=t.$handleEvent(i),t.touchstart.apply(void 0,arguments)}}},[t.maskShow?n("uni-transition",{key:"1",attrs:{name:"mask","mode-class":"fade",styles:t.maskClass,duration:t.duration,show:t.showTrans},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onTap.apply(void 0,arguments)}}}):t._e(),n("uni-transition",{key:"2",attrs:{"mode-class":t.ani,name:"content",styles:t.transClass,duration:t.duration,show:t.showTrans},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.onTap.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"uni-popup__wrapper",class:[t.popupstyle],style:{backgroundColor:t.bg},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.clear.apply(void 0,arguments)}}},[t._t("default")],2)],1)],1),t.maskShow?n("keypress",{on:{esc:function(i){arguments[0]=i=t.$handleEvent(i),t.onTap.apply(void 0,arguments)}}}):t._e()],1):t._e()},a=[]},d5ee:function(t,i,n){"use strict";var e=n("4ea4");n("99af"),n("4160"),n("caad"),n("d3b7"),n("2532"),n("159b"),Object.defineProperty(i,"__esModule",{value:!0}),i.createAnimation=f;var o=e(n("5530")),a=e(n("d4ec")),s=e(n("bee2")),r=function(){function t(i,n){(0,a.default)(this,t),this.options=i,this.animation=uni.createAnimation(i),this.currentStepAnimates={},this.next=0,this.$=n}return(0,s.default)(t,[{key:"_nvuePushAnimates",value:function(t,i){var n=this.currentStepAnimates[this.next],e={};if(e=n||{styles:{},config:{}},c.includes(t)){e.styles.transform||(e.styles.transform="");var o="";"rotate"===t&&(o="deg"),e.styles.transform+="".concat(t,"(").concat(i+o,") ")}else e.styles[t]="".concat(i);this.currentStepAnimates[this.next]=e}},{key:"_animateRun",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.$.$refs["ani"].ref;if(n)return new Promise((function(e,a){nvueAnimation.transition(n,(0,o.default)({styles:t},i),(function(t){e()}))}))}},{key:"_nvueNextAnimate",value:function(t){var i=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2?arguments[2]:void 0,o=t[n];if(o){var a=o.styles,s=o.config;this._animateRun(a,s).then((function(){n+=1,i._nvueNextAnimate(t,n,e)}))}else this.currentStepAnimates={},"function"===typeof e&&e(),this.isEnd=!0}},{key:"step",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.animation.step(t),this}},{key:"run",value:function(t){this.$.animationData=this.animation.export(),this.$.timer=setTimeout((function(){"function"===typeof t&&t()}),this.$.durationTime)}}]),t}(),c=["matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"],u=["opacity","backgroundColor"],l=["width","height","left","right","top","bottom"];function f(t,i){if(i)return clearTimeout(i.timer),new r(t,i)}c.concat(u,l).forEach((function(t){r.prototype[t]=function(){var i;return(i=this.animation)[t].apply(i,arguments),this}}))}}]);