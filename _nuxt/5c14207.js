(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{349:function(t,e,n){"use strict";var r=n(20),o=n(7),l=n(95),c=n(30),v=n(23),h=n(69),d=n(162),m=n(122),y=n(228),f=n(5),_=n(57),w=n(80).f,k=n(56).f,x=n(25).f,N=n(229).trim,E="Number",$=o.Number,I=$.prototype,D=h(_(I))==E,A=function(t){if(m(t))throw TypeError("Cannot convert a Symbol value to a number");var e,n,r,o,l,c,v,code,h=y(t,"number");if("string"==typeof h&&h.length>2)if(43===(e=(h=N(h)).charCodeAt(0))||45===e){if(88===(n=h.charCodeAt(2))||120===n)return NaN}else if(48===e){switch(h.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+h}for(c=(l=h.slice(2)).length,v=0;v<c;v++)if((code=l.charCodeAt(v))<48||code>o)return NaN;return parseInt(l,r)}return+h};if(l(E,!$(" 0o1")||!$("0b1")||$("+0x1"))){for(var F,O=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof O&&(D?f((function(){I.valueOf.call(n)})):h(n)!=E)?d(new $(A(e)),n,O):A(e)},T=r?w($):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),C=0;T.length>C;C++)v($,F=T[C])&&!v(O,F)&&x(O,F,k($,F));O.prototype=I,I.constructor=O,c(o,E,O)}},464:function(t,e,n){"use strict";n.r(e);var r=n(3);n(35),n(349),n(37),n(79),n(46),n(51),n(36),n(62),n(29),n(52),n(61),n(96);function o(t,e){return t=Number(t),(Array(e).join("0")+t).slice(-e)}function l(data){return data.includes("day")?"grey darken-1":"cyan"}function c(dt){return dt.getFullYear()+"-"+("00"+(dt.getMonth()+1)).slice(-2)+"-"+("00"+dt.getDate()).slice(-2)}var v={asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.payload,t.app,r=t.$axios,!n){e.next=5;break}return e.abrupt("return",{docs:n});case 5:return e.next=7,r.$get("https://shibusawa-dlab.github.io/app1/data/docs.json");case 7:return o=e.sent,e.abrupt("return",{docs:o});case 9:case"end":return e.stop()}}),e)})))()},data:function(){return{baseUrl:"https://shibusawa-dlab.github.io/app1",initFlag:!0,mainFlag:!0,typeToLabel:{month:"Month",week:"Week",day:"Day","4day":"4 Days","custom-daily":"Year"},selectedEvent:{},selectedElement:null,selectedOpen:!1,value:{},type:{},events:{},query:{}}},head:function(){var title=this.$t("calendar")+" "+this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}},created:function(){var t="1914-01-02",e="custom-daily",n=this.$route;if(n.params.year){var r=n.params;t=r.year+"-"+o(r.month,2)+"-"+o(r.day,2),"year"!==r.type&&(e=r.type)}var v=t.split("-"),h=v[0]+"-"+v[1],d=this.docs,m={hits:[]};for(var y in d){var f=d[y];f.yearAndMonth===h&&m.hits.push(f)}for(var _=[],i=0;i<m.hits.length;i++){var w=m.hits[i];if("month"!==e&&Object.keys(w.time).length>0)for(var time in w.time){var k=w.time[time],x="".concat(w.temporal," ").concat(time),N=Number(time.split(":")[0]);if(N>=0&&N<4){var E=new Date(x);x=c($=new Date(E.getTime()+864e5))+" "+time}else if(N>=24){E=new Date("".concat(w.temporal," 00:00:00"));var $=new Date(E.getTime()+864e5),I=time.split(":"),D=("00"+(N-24)).slice(-2)+":"+I[1]+":"+I[2];x=c($)+" "+D}var A={name:k.replace(/<[^>]*>?/gm,""),start:x,end:x,color:l(w.type),id:w.objectID,xml:k};_.push(A)}else{var F=new Date("".concat(w.temporal,"T00:00:00")),O={name:w.label,start:F,end:F,color:l(w.type),id:w.objectID,xml:w.xml};_.push(O)}}this.value=t,this.type=e,this.events=_,this.query=h},computed:{url:function(){return this.baseUrl+this.$route.path},lang:function(){return this.$i18n.locale},title:function(){var t="1914-01-02",e=this.$route;if(e.params.year){var n=e.params;t=n.year+"-"+o(n.month,2)+"-"+o(n.day,2),"year"!==n.type&&n.type}var r=t.split("-"),l=r[0],c=Number(r[1]);return"ja"===this.lang?l+"年"+c+"月":["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."][c-1]+" "+l},bh:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("calendar"),disabled:!1,to:this.localePath({name:"calendar"}),exact:!0},{text:this.title}]}},methods:{viewDay:function(t){var e=t.date;this.value=e,this.type="day"},prev:function(){this.$refs.calendar.prev()},next:function(){this.$refs.calendar.next()},showEvent:function(t){var e=this,n=t.nativeEvent,r=t.event,o=function(){e.selectedEvent=r,e.selectedElement=n.target,setTimeout((function(){return e.selectedOpen=!0}),10)};this.selectedOpen?(this.selectedOpen=!1,setTimeout(o,10)):o(),n.stopPropagation()},updateRange:function(){var t=this.type;if("custom-daily"===this.type&&(t="year"),!this.initFlag)if(this.mainFlag=!1,"year"===t)this.$router.push(this.localePath({name:"calendar"}));else{var e=this.value.split("-");this.$router.replace(this.localePath({name:"calendar-type-year-month-day",params:{type:t,year:e[0],month:Number(e[1]),day:Number(e[2])}}))}this.initFlag=!1}}},h=n(64),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-4",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),n("v-container",{staticClass:"my-5"},[t._e(),t._v(" "),n("p",[t._v("\n      『渋沢栄一伝記資料』別巻第1, 第2の日付と時間情報を活用し,\n      カレンダー形式で可視化しています。日記は水色、集会日時通知表は灰色で表示されます。\n    ")]),t._v(" "),n("v-row",{directives:[{name:"show",rawName:"v-show",value:t.mainFlag,expression:"mainFlag"}],staticClass:"fill-height"},[n("v-col",[n("v-sheet",{attrs:{height:"64"}},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.prev}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-left")])],1),t._v(" "),n("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.next}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-right")])],1),t._v(" "),n("v-toolbar-title",{staticClass:"ml-4"},[t._v("\n              "+t._s(t.title)+"\n            ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-menu",{attrs:{bottom:"",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("v-btn",t._g(t._b({attrs:{outlined:"",color:"grey darken-2"}},"v-btn",o,!1),r),[n("span",[t._v(t._s(t.$t(t.typeToLabel[t.type])))]),t._v(" "),n("v-icon",{attrs:{right:""}},[t._v("mdi-menu-down")])],1)]}}])},[t._v(" "),n("v-list",[n("v-list-item",{on:{click:function(e){t.type="day"}}},[n("v-list-item-title",[t._v(t._s(t.$t("Day")))])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="week"}}},[n("v-list-item-title",[t._v(t._s(t.$t("Week")))])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="month"}}},[n("v-list-item-title",[t._v(t._s(t.$t("Month")))])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="custom-daily"}}},[n("v-list-item-title",[t._v(t._s(t.$t("Year")))])],1),t._v(" "),n("v-list-item",{on:{click:function(e){t.type="4day"}}},[n("v-list-item-title",[t._v(t._s(t.$t("4 Days")))])],1)],1)],1)],1)],1),t._v(" "),n("v-sheet",{attrs:{height:"600"}},[n("v-calendar",{ref:"calendar",attrs:{color:"primary",events:t.events,type:t.type,locale:t.lang},on:{"click:more":t.viewDay,"click:date":t.viewDay,"click:event":t.showEvent,change:t.updateRange},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),n("v-menu",{attrs:{"close-on-content-click":!1,activator:t.selectedElement,"offset-x":""},model:{value:t.selectedOpen,callback:function(e){t.selectedOpen=e},expression:"selectedOpen"}},[n("v-card",{attrs:{color:"grey lighten-4","min-width":"350px",flat:""}},[n("v-toolbar",{attrs:{color:t.selectedEvent.color,dark:""}},[n("v-toolbar-title",[t._v(t._s(t.selectedEvent.name))])],1),t._v(" "),n("v-card-text",[n("span",{domProps:{innerHTML:t._s(t.$utils.xml2html(t.selectedEvent.xml,!0))}})]),t._v(" "),n("v-card-actions",[n("v-btn",{attrs:{text:"",color:"primary",to:t.localePath({name:"item-id",params:{id:t.selectedEvent.id}})}},[t._v("\n                  "+t._s(t.$t("本文表示"))+"\n                ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(e){t.selectedOpen=!1}}},[t._v("\n                  "+t._s(t.$t("Cancel"))+"\n                ")])],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);