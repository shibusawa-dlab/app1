(window.webpackJsonp=window.webpackJsonp||[]).push([[48,22],{496:function(t,e,n){"use strict";(function(t){n(284),n(24),n(44);var r=n(21),c=n(27),o=n(31),l=n(26),f=n(22),d=n(7),v=n(154);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},O=function(e){Object(o.a)(l,e);var n=h(l);function l(){var e;return Object(r.a)(this,l),(e=n.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",e.viewerUrl=t.env.VIEWER_URL,e}return Object(c.a)(l,[{key:"result",get:function(){return this.$store.getters.getResult},set:function(t){this.$store.commit("setResult",t)}},{key:"getId",value:function(t){var e=t.split("/");return e[e.length-1].split(".")[0]}}]),l}(v.Vue);O=y([Object(v.Component)({})],O),e.a=O}).call(this,n(205))},592:function(t,e,n){"use strict";n.r(e);var r=n(496).a,c=n(86),o=n(119),l=n.n(o),f=n(468),d=n(484),v=n(463),h=n(184),y=n(485),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",{staticClass:"pa-10"},[n("v-row",t._l(t.result.members,(function(e,r){return n("v-col",{key:r,attrs:{cols:"12",sm:3}},[n("v-card",{staticClass:"mb-4",attrs:{flat:"","no-body":""}},[n("nuxt-link",{attrs:{to:t.localePath({name:"viewer-id",params:{id:t.getId(e["@id"])}})}},[n("div",{staticClass:"text-center grey lighten-2 pa-10",staticStyle:{height:"150px","text-decoration":"none"}},[n("v-icon",{attrs:{size:"75"}},[t._v("mdi-file")])],1)]),t._v(" "),n("div",{staticClass:"pa-4"},[n("nuxt-link",{attrs:{to:t.localePath({name:"viewer-id",params:{id:t.getId(e["@id"])}})}},[n("h4",[t._v(t._s(e.label))])]),t._v(" "),e.description?n("p",{staticClass:"mt-2 mb-0"},[t._v("\n              "+t._s(e.description)+"\n            ")]):t._e()],1)],1)],1)})),1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VCard:f.a,VCol:d.a,VContainer:v.a,VIcon:h.a,VRow:y.a})},6908:function(t,e,n){"use strict";n.r(e);n(284),n(50);var r=n(9),c=n(21),o=n(27),l=n(31),f=n(26),d=n(22),v=n(7),h=n(154),y=n(103),O=n.n(y),R=n(592);function j(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var c=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var m=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},w=function(t){Object(l.a)(f,t);var e,n=j(f);function f(){var t;return Object(c.a)(this,f),(t=n.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t.collectionFlag=!1,t}return Object(o.a)(f,[{key:"result",get:function(){return this.$store.getters.getResult},set:function(t){this.$store.commit("setResult",t)}},{key:"created",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){var u,e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=this.baseUrl+"/data/collection.json",t.next=3,O.a.get(u);case 3:e=t.sent,this.result=e.data,this.collectionFlag=!0;case 6:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})}]),f}(h.Vue),_=w=m([Object(h.Component)({components:{Collection:R.default}})],w),C=n(86),component=Object(C.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.collectionFlag?[n("Collection")]:t._e()],2)}),[],!1,null,null,null);e.default=component.exports}}]);