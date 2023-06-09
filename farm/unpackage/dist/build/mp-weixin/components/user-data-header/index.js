(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/user-data-header/index"],{"0f56":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;a("b3c3");var n=a("d582"),r={props:{avatar:{type:String,default:""},userName:{type:String,default:""}},computed:{userData:function(){return this.$store.state.user.userData||{}},useAvatar:function(){return this.avatar.startsWith("http")?this.avatar:n.baseUrl+this.avatar}},data:function(){return{defaultAvatar:"/static/imgs/default-avatar.png"}},methods:{hadnleGetUserInfo:function(e){t.navigateTo({url:"/pages/login/index"})}}};e.default=r}).call(this,a("543d")["default"])},"1e2f":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},r=[]},"1f3b":function(t,e,a){"use strict";a.r(e);var n=a("1e2f"),r=a("4825");for(var u in r)["default"].indexOf(u)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(u);a("b183");var i=a("f0c5"),f=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,"37c3182e",null,!1,n["a"],void 0);e["default"]=f.exports},4825:function(t,e,a){"use strict";a.r(e);var n=a("0f56"),r=a.n(n);for(var u in n)["default"].indexOf(u)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(u);e["default"]=r.a},"9eb0":function(t,e,a){},b183:function(t,e,a){"use strict";var n=a("9eb0"),r=a.n(n);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/user-data-header/index-create-component',
    {
        'components/user-data-header/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1f3b"))
        })
    },
    [['components/user-data-header/index-create-component']]
]);
