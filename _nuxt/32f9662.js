(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{465:function(t,e,r){"use strict";r.r(e);r(283);var n=r(21),o=r(31),c=r(26),l=r(22),f=r(7),d=r(154);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(c.a)(this,r)}}var y=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},v=function(t){Object(o.a)(r,t);var e=h(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return r}(d.Vue);y([Object(d.Prop)({required:!0})],v.prototype,"items",void 0);var m=v=y([d.Component],v),_=r(86),x=r(119),C=r.n(x),O=r(477),j=r(462),w=r(184),k=r(47),component=Object(_.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-sheet",{attrs:{color:"grey lighten-2"}},[r("v-container",{staticClass:"py-2 px-0 mx-0",attrs:{fluid:""}},[r("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.items},scopedSlots:t._u([{key:"divider",fn:function(){return[r("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);e.default=component.exports;C()(component,{VBreadcrumbs:O.a,VContainer:j.a,VIcon:w.a,VSheet:k.a})},6900:function(t,e,r){"use strict";r.r(e);r(61),r(87),r(20),r(16),r(24),r(49),r(44),r(50);var n=r(9),o=r(526),c=r(465),l={components:{GChart:o.GChart,Breadcrumbs:c.default},asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.payload)){e.next=5;break}return e.abrupt("return",{item:n});case 5:return e.next=7,r.e(6263).then(r.t.bind(null,6891,3));case 7:return o=e.sent,c=o.default,e.abrupt("return",{items:c});case 10:case"end":return e.stop()}}),e)})))()},data:function(){return{chartOptions:{chart:{title:"Company Performance",subtitle:"Sales, Expenses, and Profit: 2014-2017"}}}},computed:{title:function(){return this.$t("calendar")},years:function(){var t={},e=this.items,r=2e3,n=0;for(var o in e)o>n&&(n=o),o<r&&(r=o);for(var i=r;i<n;i++)t[i]={};return t},chartData:function(){var t=[["Year","Appearances"]],e=this.items;for(var r in this.years){var n=0;if(e[r])for(var o in e[r])n+=e[r][o];t.push([r+"",n])}return t},bh:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.title}]}},methods:{zfill:function(t,e){return t=Number(t),(Array(e).join("0")+t).slice(-e)},count:function(t,e){var r=this.items;return t=Number(t),e=Number(e),r[t]&&r[t][e]?r[t][e]:0},transMonth:function(t){return["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."][t-1]},getMonth:function(t){return"ja"===this.$i18n.locale?t+"月":this.transMonth(t)},display:function(text){if("ja"===this.$i18n.locale){var t=this.$utils.wareki(text).replace("）","（").split("（")[1];return"慶応4"===t?t="慶応4/明治元":"明治45"===t?t="明治45/大正元":"大正15"===t&&(t="大正15/昭和元"),text+"（"+t.split("/")[0]+"）年<br/>〔"+(text-1840)+"歳〕"}return text}},head:function(){var title=this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}}},f=r(86),d=r(119),h=r.n(d),y=r(468),v=r(462),m=r(500),component=Object(f.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Breadcrumbs",{attrs:{items:t.bh}}),t._v(" "),r("v-container",{staticClass:"my-5"},[r("h1",{staticClass:"mb-5"},[t._v(t._s(t.$t("calendar")))]),t._v(" "),r("ul",[r("li",[t._v("\n        『渋沢栄一伝記資料』別巻第1,\n        第2の日付と時間情報を活用し,カレンダー形式で可視化しています。\n      ")]),t._v(" "),r("li",[t._v("年齢は当該年の誕生日における渋沢栄一の満年齢を示します。")])]),t._v(" "),r("v-card",{staticClass:"my-10",attrs:{flat:"",outlined:""}},[r("GChart",{attrs:{type:"ColumnChart",data:t.chartData,options:t.chartOptions}})],1),t._v(" "),r("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[r("tbody",t._l(t.years,(function(e,n){return r("tr",{key:n},[r("th",{staticClass:"text-center",staticStyle:{border:"0.5px solid lightgrey"},attrs:{width:"16%"},domProps:{innerHTML:t._s(t.display(n))}}),t._v(" "),t._l(12,(function(e){return[r("td",{key:n+"-"+e,staticClass:"text-center",staticStyle:{border:"0.5px solid lightgrey"},style:t.count(n,e)>0?"background-color: #FFF59D;":"",attrs:{width:"7%"}},[t.count(n,e)>0?[r("nuxt-link",{attrs:{to:t.localePath({name:"calendar-type-year-month-day",params:{type:"month",year:n,month:e,day:1}})}},[t._v("\n                    "+t._s(t.getMonth(e))+"\n                  ")]),t._v(" "),r("br"),t._v("\n                  "+t._s(t.count(n,e))+"\n                ")]:[t._v(" "+t._s(t.getMonth(e))+" ")]],2)]}))],2)})),0)]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);e.default=component.exports;h()(component,{VCard:y.a,VContainer:v.a,VSimpleTable:m.a})}}]);