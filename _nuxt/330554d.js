(window.webpackJsonp=window.webpackJsonp||[]).push([[43,19],{531:function(e,t,r){"use strict";(function(e){r(18),r(53),r(30),r(42),r(20),r(284),r(59),r(16),r(24),r(532),r(67),r(74),r(203),r(44),r(533),r(535),r(536),r(537),r(538),r(539),r(540),r(541),r(542),r(543),r(544),r(545),r(546),r(547),r(548),r(549),r(71);var n=r(35),o=(r(50),r(9)),l=r(21),c=r(27),f=r(31),h=r(26),v=r(22),d=r(7),y=r(154),m=r(602),k=r(563);function x(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return _(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return l=e.done,e},e:function(e){c=!0,o=e},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw o}}}}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(v.a)(e);if(t){var o=Object(v.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(h.a)(this,r)}}var O=function(e,t,r,desc){var n,o=arguments.length,l=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(l=(o<3?n(l):o>3?n(t,r,l):n(t,r))||l);return o>3&&l&&Object.defineProperty(t,r,l),l},j=function(t){Object(f.a)(y,t);var h,v,d=w(y);function y(){var t;return Object(l.a)(this,y),(t=d.apply(this,arguments)).loading=!1,t.searchAgg="",t.isHelp=!0,t.tabs=null,t.aggs=e.env.aggs,t.q="",t.mdiMagnify=m.b,t.mdiClose=m.a,t.results={},t.data={},t.type="freq",t.selected=[],t.loading=!0,t.headers=[{text:"キーワード",value:"label"},{text:"キーワードの総出現頻度（Term Frequency）",value:"freq"},{text:"アイテムの総出現頻度（Document Frequency）",value:"df"},{text:"",value:"link"}],t.items=[],t.index=[],t.indexDf=[],t.headersAggs=[{text:t.$t("name"),value:"label"},{text:t.$t("results"),value:"value"}],t.tabValue=null,t.title="Ngram Viewer",t}return Object(c.a)(y,[{key:"option",get:function(){var e={beginAtZero:!0};return"freq"===this.type&&(e={beginAtZero:!0,callback:function(e){if(e%1==0)return e}}),{maintainAspectRatio:!1,elements:{line:{tension:0}},scales:{Axes:[{type:"time",time:{unit:"year"}}],yAxes:[{id:"y-axis-1",position:"left",scaleLabel:{display:!0,labelString:"freq"===this.type?"キーワードの出現頻度":"キーワードの出現比率"},ticks:e},{id:"y-axis-2",position:"right",scaleLabel:{display:!0,labelString:"総ngram数"},ticks:{beginAtZero:!0,callback:function(e){if(e%1==0)return e}}}]}}}},{key:"trigger",value:function(e){13===e.keyCode&&this.search()}},{key:"asyncData",value:(v=Object(o.a)(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(6258).then(r.t.bind(null,683,3));case 2:return t=e.sent,n=t.default,e.abrupt("return",{ngramAll:n});case 5:case"end":return e.stop()}}),e)}))),function(){return v.apply(this,arguments)})},{key:"mounted",value:(h=Object(o.a)(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.e(6261).then(r.t.bind(null,684,3));case 2:t=e.sent,n=t.default,this.loading=!1,this.index=n.tf,this.indexDf=n.df,this.$route.query.keyword&&(this.q=String(this.$route.query.keyword),this.exec());case 8:case"end":return e.stop()}}),e,this)}))),function(){return h.apply(this,arguments)})},{key:"watchRoute",value:function(e,t){var r=e.query.keyword;r!==t.query.keyword&&(this.q=String(r),this.exec())}},{key:"watchType",value:function(){var e=JSON.parse(JSON.stringify(this.$route.query));e.type=this.type,this.$router.push(this.localePath({name:"ngram",query:e})),this.watchSelected()}},{key:"search",value:function(){this.$router.push(this.localePath({name:"ngram",query:{keyword:this.q}}),(function(){}),(function(){}))}},{key:"exec",value:function(){this.$route.query.sort="count:desc";var data=this.ngram();this.results=data;var e,t=[],r=[],n=x(data.hits.hits);try{for(n.s();!(e=n.n()).done;){var o=e.value,l={label:o._source.label,freq:o._source.count,df:o._source.countDf};t.push(l),t.length<5&&r.push(l)}}catch(e){n.e(e)}finally{n.f()}this.items=t,this.selected=r}},{key:"watchSelected",value:function(){var e=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#000000","#800000","#008000","#000080","#808000","#800080","#008080","#808080","#C00000","#00C000","#0000C0","#C0C000","#C000C0","#00C0C0","#C0C0C0","#400000","#004000","#000040","#404000","#400040","#004040","#404040","#200000","#002000","#000020","#202000","#200020","#002020","#202020","#600000","#006000","#000060","#606000","#600060","#006060","#606060","#A00000","#00A000","#0000A0","#A0A000","#A000A0","#00A0A0","#A0A0A0","#E00000","#00E000","#0000E0","#E0E000","#E000E0","#00E0E0","#E0E0E0"],data=this.results,t=2022,r=1,n=this.ngramAll,o=[];if(data.hits){var l,c=[],f=x(this.selected);try{for(f.s();!(l=f.n()).done;){var h=l.value;c.push(h.label)}}catch(e){f.e(e)}finally{f.f()}var v,d=this.results.hits.hits,y=[],m=x(d);try{for(m.s();!(v=m.n()).done;){var k=v.value;c.includes(k._source.label)&&y.push(k)}}catch(e){m.e(e)}finally{m.f()}d=y;for(var i=0;i<d.length;i++){var _=d[i],w=_._source.freq;w.sort((function(a,b){return a.year>b.year?1:-1}));var O,j={},C=x(w);try{for(C.s();!(O=C.n()).done;){var A=O.value,R=A.year;if(9999!==Number(R)){R<t&&(t=R),R>r&&(r=R);var S=A.count;j[R]=S}}}catch(e){C.e(e)}finally{C.f()}var F={label:_._source.label,fill:!1,borderColor:e[i],data:j};o.push(F)}for(var E=[],$=t;$<=r;$++)E.push($);for(var P=0;P<d.length;P++){for(var V=o[P].data,D=[],T=t;T<=r;T++){var L=T,H=0;V[L]&&(H=V[L],"ratio"===this.type&&(H/=n[L])),D.push({x:String(L),y:H})}o[P].data=D}for(var N=[],B=[],I=t;I<=r;I++){var J=String(I);N.push(J),null!=n[J]?B.push(n[J]):B.push(0)}var W={label:"総ngram",data:B,pointBackgroundColor:"transparent",borderColor:"transparent",backgroundColor:"rgba(255, 165, 0, 0.5)",yAxisID:"y-axis-2"};o.push(W),this.data={labels:N,datasets:o}}}},{key:"containsSymbol",value:function(e){return!!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(e)}},{key:"ngram",value:function(){var e,t=this,r=this.index,o=this.indexDf,l=this.$route.query.keyword.split("/"),c=[],f=x(l);try{var h=function(){var o=e.value,l=[];l=t.containsSymbol(o)?Object.keys(r).filter((function(e){return e.match(o)})):Object.keys(r).filter((function(e){return e===o})),c=Object(n.a)(new Set([].concat(Object(n.a)(c),Object(n.a)(l))))};for(f.s();!(e=f.n()).done;)h()}catch(e){f.e(e)}finally{f.f()}for(var v=[],d={},y=0,m=c;y<m.length;y++){var k=m[y];d[k]=r[k]._source.count}var _=Object.keys(d).map((function(e){return{key:e,value:d[e]}}));_.sort((function(a,b){return a.value<b.value?1:a.value>b.value?-1:0}));var w,O=x(_);try{for(O.s();!(w=O.n()).done;){var j=w.value,C=r[j.key];C._source.countDf=o[C._source.label]._source.count,v.push(C)}}catch(e){O.e(e)}finally{O.f()}return{hits:{total:{value:v.length},hits:v}}}},{key:"label",get:function(){return"abc"}},{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.title}]}},{key:"getQuery",value:function(e){var t={};return t["fc-"+this.$route.params.slug]=e,t}},{key:"head",value:function(){return{title:this.title}}}]),y}(y.Vue);O([Object(y.Watch)("$route")],j.prototype,"watchRoute",null),O([Object(y.Watch)("type")],j.prototype,"watchType",null),O([Object(y.Watch)("selected")],j.prototype,"watchSelected",null),j=O([Object(y.Component)({components:{LineChart:k.default}})],j),t.a=j}).call(this,r(205))},563:function(e,t,r){"use strict";r.r(t);r(284);var n=r(21),o=r(27),l=r(31),c=r(26),f=r(22),h=r(7),v=r(154);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(f.a)(e);if(t){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(c.a)(this,r)}}var y=function(e,t,r,desc){var n,o=arguments.length,l=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(l=(o<3?n(l):o>3?n(t,r,l):n(t,r))||l);return o>3&&l&&Object.defineProperty(t,r,l),l},m=r(593).a.Line,k=function(e){Object(l.a)(r,e);var t=d(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(o.a)(r,[{key:"watchTmp",value:function(){this.main()}},{key:"mounted",value:function(){this.main()}},{key:"main",value:function(){var e=this.data,t=this.option;t||(t={maintainAspectRatio:!1,elements:{line:{tension:0}},scales:{xAxes:[{type:"time",time:{unit:"year"}}],yAxes:[{ticks:{beginAtZero:!0,callback:function(e){if(e%1==0)return e}}}]}}),this.renderChart(e,t)}}]),r}(Object(v.mixins)(m));y([Object(v.Prop)()],k.prototype,"data",void 0),y([Object(v.Prop)()],k.prototype,"option",void 0),y([Object(v.Watch)("data",{deep:!0})],k.prototype,"watchTmp",null);var x=k=y([v.Component],k),_=r(86),component=Object(_.a)(x,undefined,undefined,!1,null,null,null);t.default=component.exports},6919:function(e,t,r){"use strict";r.r(t);var n=r(531).a,o=r(86),l=r(119),c=r.n(l),f=r(484),h=r(463),v=r(6896),d=r(180),y=r(6880),m=r(6881),k=r(485),x=r(47),_=r(502),w=r(6882),O=r(6874),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-container",{staticClass:"my-5 mb-10"},[r("h1",{staticClass:"mb-5"},[e._v(e._s(e.title))]),e._v(" "),e.loading?[r("div",{staticClass:"text-center"},[r("v-progress-circular",{staticClass:"my-10",attrs:{indeterminate:"",color:"primary"}}),e._v(" "),r("p",[e._v("\n          初回はインデックスファイルのダウンロードに時間を要します。2回目以降はキャッシュにより待ち時間が改善します。\n        ")])],1)]:[r("v-row",{staticClass:"mb-5"},[r("v-col",{attrs:{cols:"12",md:"10"}},[r("v-text-field",{attrs:{autocomplete:"off",light:"","single-line":"",filled:"",rounded:"",dense:"","hide-details":"",clearable2:!0,"clear-icon":e.mdiClose,"background-color":"#E0E0E0",placeholder:e.$t("inputSearchKeyword"),"append-icon":e.mdiMagnify},on:{"click:append":e.search,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.trigger(t)}},model:{value:e.q,callback:function(t){e.q=t},expression:"q"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",md:"2"}},[r("v-switch",{staticClass:"mt-1",attrs:{dense:"","hide-details":"",inset:"",label:"ヘルプ"},model:{value:e.isHelp,callback:function(t){e.isHelp=t},expression:"isHelp"}})],1)],1),e._v(" "),r("v-sheet",{directives:[{name:"show",rawName:"v-show",value:e.isHelp,expression:"isHelp"}],staticClass:"pa-5 mb-5",attrs:{color:"grey lighten-3"}},[r("p",[e._v("\n          年代ごとの出現頻度を可視化します。"),e._v(" "),r("br"),e._v("可視化グラフの縦軸は、年代ごとに何回出現したかを表す出現頻度と、出現頻度を出版年代ごとの総ngram数で割った値を表す出現比率の2種類を切り替えることができます。\n          "),r("br")]),e._v(" "),r("ul",[r("li",{staticClass:"mb-2"},[e._v("\n            複数のキーワードをスラッシュ(/)区切りでクエリに指定することで、出現頻度を重ねて表示することができます。\n            "),r("div",[e._v("\n              例：「"),r("nuxt-link",{attrs:{to:e.localePath({name:"ngram",query:{keyword:"第一銀行/日本銀行"}})}},[e._v("第一銀行/日本銀行")]),e._v("」\n            ")],1)]),e._v(" "),r("li",{staticClass:"mb-2"},[e._v("\n            正規表現を利用したクエリが可能です。\n            "),r("div",[e._v("\n              例：「"),r("nuxt-link",{attrs:{to:e.localePath({name:"ngram",query:{keyword:"浅野..郎"}})}},[e._v("浅野..郎")]),e._v("」\n            ")],1)])]),e._v(" "),e._e(),e._v(" "),r("div",[e._v("\n          【注意】処理の特性により、総出現頻度が5程度以下のものについては集計漏れが発生することがあります。\n        ")])]),e._v(" "),e.results.hits?r("div",[r("p",[e._v("\n          "+e._s(e.results.hits.total.value.toLocaleString())+" 件ヒットしました。\n        ")])]):e._e(),e._v(" "),e.results.hits&&e.results.hits.hits.length>0?r("div",{attrs:{id:"result"}},[r("v-radio-group",{attrs:{row:""},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},[r("v-radio",{attrs:{label:"出現頻度",value:"freq"}}),e._v(" "),r("v-radio",{attrs:{label:"出現比率（年ごとの出現頻度/年ごとの総対象Ngram数）",value:"ratio"}})],1),e._v(" "),r("LineChart",{staticClass:"mb-10",attrs:{data:e.data,option:e.option}}),e._v(" "),r("v-data-table",{attrs:{"sort-by":["freq"],"sort-desc":[!0],headers:e.headers,items:e.items,"item-key":"label","items-per-page":20,"show-select":""},scopedSlots:e._u([{key:"item.link",fn:function(t){var n=t.item;return[r("nuxt-link",{attrs:{to:e.localePath({name:"search",query:{"main[query]":n.label}})}},[e._v("検索")])]}}],null,!1,1259013552),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),e._v(" "),e._e()],1):e._e()]],2)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{LineChart:r(563).default}),c()(component,{VCol:f.a,VContainer:h.a,VDataTable:v.a,VProgressCircular:d.a,VRadio:y.a,VRadioGroup:m.a,VRow:k.a,VSheet:x.a,VSimpleTable:_.a,VSwitch:w.a,VTextField:O.a})}}]);