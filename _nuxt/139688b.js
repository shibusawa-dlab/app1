(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{6902:function(t,e,n){"use strict";n.r(e);n(284);var r=n(21),c=n(27),l=n(31),o=n(26),v=n(22),_=n(7),d=n(154);function f(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(v.a)(t);if(e){var c=Object(v.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(o.a)(this,n)}}var h=function(t,e,n,desc){var r,c=arguments.length,l=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(_.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(l=(c<3?r(l):c>3?r(e,n,l):r(e,n))||l);return c>3&&l&&Object.defineProperty(e,n,l),l},m=function(t){Object(l.a)(n,t);var e=f(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t.github_pages="https://shibusawa-dlab.github.io/lab1",t.result={members:[{id:"DKB10001m-1",viewer_id:"DKB01",label:"渋沢栄一伝記資料. 別巻第1 日記 (慶応4年-大正3年)"},{id:"DKB20001m-1",viewer_id:"DKB02",label:"渋沢栄一伝記資料. 別巻第2 日記 (大正4年-昭和5年), 集会日時通知表"}]},t}return Object(c.a)(n,[{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("fulltext")}]}},{key:"head",value:function(){return{titleTemplate:null,title:this.$t("fulltext")}}}]),n}(d.Vue),x=m=h([Object(d.Component)({})],m),y=n(86),w=n(119),C=n.n(w),V=n(477),O=n(206),j=n(468),B=n(465),R=n(484),P=n(463),k=n(488),D=n(184),T=n(485),E=n(47),$=n(502),component=Object(y.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-4",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),n("v-container",{staticClass:"py-5"},[n("h2",{staticClass:"my-5"},[t._v(t._s(t.$t("fulltext")))]),t._v(" "),[t._e(),t._v(" "),n("p",[t._v("全文テキストデータを閲覧できます。研究の一環として様々な利用環境を想定し、実験的に作成したものを含みます。今後、予告なく変更する場合があることをご理解のうえご利用ください。")]),t._v(" "),n("v-sheet",{attrs:{color:"grey lighten-3 pa-4 mt-10"}},[n("p",[t._v("提供形式")]),t._v(" "),n("ul",[n("li",[t._v("TEI Viewer（画像との並列表示機能や人名・地名等へのハイライト表示機能を提供します。動作が重い点にご注意ください。）")]),t._v(" "),n("li",[t._v("HTML")]),t._v(" "),n("li",[t._v("PDF")]),t._v(" "),n("li",[t._v("EPUB（リーダーをご用意の上お使いください。）")])])]),t._v(" "),n("v-simple-table",{staticClass:"my-10",scopedSlots:t._u([{key:"default",fn:function(){return[n("thead",[n("tr",[n("th",{staticClass:"text-center"}),t._v(" "),n("th",{staticClass:"text-center"},[t._v("\n                TEI Viewer\n              ")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("\n                HTML\n              ")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("\n                PDF\n              ")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("\n                EPUB\n              ")]),t._v(" "),n("th",{staticClass:"text-center"},[t._v("\n                TEI/XML\n              ")])])]),t._v(" "),n("tbody",t._l(t.result.members,(function(e,r){return n("tr",{key:r},[n("td",[t._v(t._s(e.label))]),t._v(" "),n("td",{staticClass:"text-center pa-5"},[n("nuxt-link",{attrs:{to:t.localePath({name:"viewer-id",params:{id:e.viewer_id}})}},[n("v-icon",[t._v("mdi-exit-to-app")])],1)],1),t._v(" "),n("td",{staticClass:"text-center pa-5"},[n("a",{attrs:{href:t.github_pages+"/tei/"+e.viewer_id+".html"}},[n("v-icon",[t._v("mdi-exit-to-app")])],1)]),t._v(" "),n("td",{staticClass:"text-center pa-5"},[n("a",{attrs:{href:t.github_pages+"/tei/"+e.viewer_id+".pdf"}},[n("v-icon",[t._v("mdi-exit-to-app")])],1)]),t._v(" "),n("td",{staticClass:"text-center pa-5"},[n("a",{attrs:{href:t.github_pages+"/tei/"+e.viewer_id+".epub"}},[n("v-icon",[t._v("mdi-file-download")])],1)]),t._v(" "),n("td",{staticClass:"text-center pa-5"},[n("a",{attrs:{href:t.github_pages+"/tei/"+e.viewer_id+".xml"}},[n("v-icon",[t._v("mdi-file-download")])],1)])])})),0)]},proxy:!0}],null,!1,1485374540)}),t._v(" "),t._e()],t._v(" "),t._e()],2)],1)}),[],!1,null,null,null);e.default=component.exports;C()(component,{VBreadcrumbs:V.a,VBtn:O.a,VCard:j.a,VCardActions:B.a,VCol:R.a,VContainer:P.a,VDivider:k.a,VIcon:D.a,VRow:T.a,VSheet:E.a,VSimpleTable:$.a})}}]);