(window.webpackJsonp=window.webpackJsonp||[]).push([[43,19],{532:function(e,t,n){"use strict";(function(e){n(18),n(54),n(27),n(44),n(20),n(285),n(60),n(16),n(24),n(533),n(68),n(74),n(203),n(45),n(534),n(536),n(537),n(538),n(539),n(540),n(541),n(542),n(543),n(544),n(545),n(546),n(547),n(548),n(549),n(550),n(71);var r=n(36),l=(n(52),n(9)),o=n(21),c=n(28),f=n(32),h=n(26),v=n(22),d=n(7),y=n(154),m=n(603),k=n(564);function _(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return x(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,o=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return o=e.done,e},e:function(e){c=!0,l=e},f:function(){try{o||null==n.return||n.return()}finally{if(c)throw l}}}}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function w(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(v.a)(e);if(t){var l=Object(v.a)(this).constructor;n=Reflect.construct(r,arguments,l)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var O=function(e,t,n,desc){var r,l=arguments.length,o=l<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(o=(l<3?r(o):l>3?r(t,n,o):r(t,n))||o);return l>3&&o&&Object.defineProperty(t,n,o),o},j=function(t){Object(f.a)(d,t);var h,v=w(d);function d(){var t;return Object(o.a)(this,d),(t=v.apply(this,arguments)).loading=!1,t.searchAgg="",t.isHelp=!0,t.tabs=null,t.aggs=e.env.aggs,t.q="",t.mdiMagnify=m.b,t.mdiClose=m.a,t.results={},t.data={},t.type="freq",t.selected=[],t.headers=[{text:"キーワード",value:"label"},{text:"キーワードの総出現頻度（Term Frequency）",value:"freq"},{text:"アイテムの総出現頻度（Document Frequency）",value:"df"},{text:"",value:"link"}],t.items=[],t.headersAggs=[{text:t.$t("name"),value:"label"},{text:t.$t("results"),value:"value"}],t.tabValue=null,t.title="Ngram Viewer",t}return Object(c.a)(d,[{key:"option",get:function(){var e={beginAtZero:!0};return"freq"===this.type&&(e={beginAtZero:!0,callback:function(e){if(e%1==0)return e}}),{maintainAspectRatio:!1,elements:{line:{tension:0}},scales:{Axes:[{type:"time",time:{unit:"year"}}],yAxes:[{id:"y-axis-1",position:"left",scaleLabel:{display:!0,labelString:"freq"===this.type?"キーワードの出現頻度":"キーワードの出現比率"},ticks:e},{id:"y-axis-2",position:"right",scaleLabel:{display:!0,labelString:"総ngram数"},ticks:{beginAtZero:!0,callback:function(e){if(e%1==0)return e}}}]}}}},{key:"trigger",value:function(e){13===e.keyCode&&this.search()}},{key:"asyncData",value:(h=Object(l.a)(regeneratorRuntime.mark((function e(){var t,r,l,o,c,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(6261).then(n.t.bind(null,681,3));case 2:return t=e.sent,r=t.default,e.next=6,n.e(6262).then(n.t.bind(null,682,3));case 6:return l=e.sent,o=l.default,e.next=10,n.e(6258).then(n.t.bind(null,683,3));case 10:return c=e.sent,f=c.default,e.abrupt("return",{index:r,indexDf:o,ngramAll:f});case 13:case"end":return e.stop()}}),e)}))),function(){return h.apply(this,arguments)})},{key:"mounted",value:function(){this.$route.query.keyword&&(this.q=String(this.$route.query.keyword),this.exec())}},{key:"watchRoute",value:function(e,t){var n=e.query.keyword;n!==t.query.keyword&&(this.q=String(n),this.exec())}},{key:"watchType",value:function(){var e=JSON.parse(JSON.stringify(this.$route.query));e.type=this.type,this.$router.push(this.localePath({name:"ngram",query:e})),this.watchSelected()}},{key:"search",value:function(){this.$router.push(this.localePath({name:"ngram",query:{keyword:this.q}}),(function(){}),(function(){}))}},{key:"exec",value:function(){this.$route.query.sort="count:desc";var data=this.ngram();this.results=data;var e,t=[],n=[],r=_(data.hits.hits);try{for(r.s();!(e=r.n()).done;){var l=e.value,o={label:l._source.label,freq:l._source.count,df:l._source.countDf};t.push(o),t.length<5&&n.push(o)}}catch(e){r.e(e)}finally{r.f()}this.items=t,this.selected=n}},{key:"watchSelected",value:function(){var e=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#000000","#800000","#008000","#000080","#808000","#800080","#008080","#808080","#C00000","#00C000","#0000C0","#C0C000","#C000C0","#00C0C0","#C0C0C0","#400000","#004000","#000040","#404000","#400040","#004040","#404040","#200000","#002000","#000020","#202000","#200020","#002020","#202020","#600000","#006000","#000060","#606000","#600060","#006060","#606060","#A00000","#00A000","#0000A0","#A0A000","#A000A0","#00A0A0","#A0A0A0","#E00000","#00E000","#0000E0","#E0E000","#E000E0","#00E0E0","#E0E0E0"],data=this.results,t=2022,n=1,r=this.ngramAll,l=[];if(data.hits){var o,c=[],f=_(this.selected);try{for(f.s();!(o=f.n()).done;){var h=o.value;c.push(h.label)}}catch(e){f.e(e)}finally{f.f()}var v,d=this.results.hits.hits,y=[],m=_(d);try{for(m.s();!(v=m.n()).done;){var k=v.value;c.includes(k._source.label)&&y.push(k)}}catch(e){m.e(e)}finally{m.f()}d=y;for(var i=0;i<d.length;i++){var x=d[i],w=x._source.freq;w.sort((function(a,b){return a.year>b.year?1:-1}));var O,j={},C=_(w);try{for(C.s();!(O=C.n()).done;){var A=O.value,R=A.year;if(9999!==Number(R)){R<t&&(t=R),R>n&&(n=R);var S=A.count;j[R]=S}}}catch(e){C.e(e)}finally{C.f()}var F={label:x._source.label,fill:!1,borderColor:e[i],data:j};l.push(F)}for(var E=[],$=t;$<=n;$++)E.push($);for(var P=0;P<d.length;P++){for(var V=l[P].data,D=[],T=t;T<=n;T++){var L=T,H=0;V[L]&&(H=V[L],"ratio"===this.type&&(H/=r[L])),D.push({x:String(L),y:H})}l[P].data=D}for(var N=[],B=[],I=t;I<=n;I++){var J=String(I);N.push(J),null!=r[J]?B.push(r[J]):B.push(0)}var W={label:"総ngram",data:B,pointBackgroundColor:"transparent",borderColor:"transparent",backgroundColor:"rgba(255, 165, 0, 0.5)",yAxisID:"y-axis-2"};l.push(W),this.data={labels:N,datasets:l}}}},{key:"containsSymbol",value:function(e){return!!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(e)}},{key:"ngram",value:function(){var e,t=this,n=this.index,l=this.indexDf,o=this.$route.query.keyword.split("/"),c=[],f=_(o);try{var h=function(){var l=e.value,o=[];o=t.containsSymbol(l)?Object.keys(n).filter((function(e){return e.match(l)})):Object.keys(n).filter((function(e){return e===l})),c=Object(r.a)(new Set([].concat(Object(r.a)(c),Object(r.a)(o))))};for(f.s();!(e=f.n()).done;)h()}catch(e){f.e(e)}finally{f.f()}for(var v=[],d={},y=0,m=c;y<m.length;y++){var k=m[y];d[k]=n[k]._source.count}var x=Object.keys(d).map((function(e){return{key:e,value:d[e]}}));x.sort((function(a,b){return a.value<b.value?1:a.value>b.value?-1:0}));var w,O=_(x);try{for(O.s();!(w=O.n()).done;){var j=w.value,C=n[j.key];C._source.countDf=l[C._source.label]._source.count,v.push(C)}}catch(e){O.e(e)}finally{O.f()}return{hits:{total:{value:v.length},hits:v}}}},{key:"label",get:function(){return"abc"}},{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.title}]}},{key:"getQuery",value:function(e){var t={};return t["fc-"+this.$route.params.slug]=e,t}},{key:"head",value:function(){return{title:this.title}}}]),d}(y.Vue);O([Object(y.Watch)("$route")],j.prototype,"watchRoute",null),O([Object(y.Watch)("type")],j.prototype,"watchType",null),O([Object(y.Watch)("selected")],j.prototype,"watchSelected",null),j=O([Object(y.Component)({components:{LineChart:k.default}})],j),t.a=j}).call(this,n(205))},564:function(e,t,n){"use strict";n.r(t);n(285);var r=n(21),l=n(28),o=n(32),c=n(26),f=n(22),h=n(7),v=n(154);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var l=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,l)}else n=r.apply(this,arguments);return Object(c.a)(this,n)}}var y=function(e,t,n,desc){var r,l=arguments.length,o=l<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(o=(l<3?r(o):l>3?r(t,n,o):r(t,n))||o);return l>3&&o&&Object.defineProperty(t,n,o),o},m=n(594).a.Line,k=function(e){Object(o.a)(n,e);var t=d(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"watchTmp",value:function(){this.main()}},{key:"mounted",value:function(){this.main()}},{key:"main",value:function(){var e=this.data,t=this.option;t||(t={maintainAspectRatio:!1,elements:{line:{tension:0}},scales:{xAxes:[{type:"time",time:{unit:"year"}}],yAxes:[{ticks:{beginAtZero:!0,callback:function(e){if(e%1==0)return e}}}]}}),this.renderChart(e,t)}}]),n}(Object(v.mixins)(m));y([Object(v.Prop)()],k.prototype,"data",void 0),y([Object(v.Prop)()],k.prototype,"option",void 0),y([Object(v.Watch)("data",{deep:!0})],k.prototype,"watchTmp",null);var _=k=y([v.Component],k),x=n(86),component=Object(x.a)(_,undefined,undefined,!1,null,null,null);t.default=component.exports},6918:function(e,t,n){"use strict";n.r(t);var r=n(532).a,l=n(86),o=n(119),c=n.n(o),f=n(485),h=n(464),v=n(6895),d=n(6879),y=n(6880),m=n(486),k=n(49),_=n(503),x=n(6881),w=n(6873),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-container",{staticClass:"my-5 mb-10"},[n("h1",{staticClass:"mb-5"},[e._v(e._s(e.title))]),e._v(" "),n("v-row",{staticClass:"mb-5"},[n("v-col",{attrs:{cols:"12",md:"10"}},[n("v-text-field",{attrs:{autocomplete:"off",light:"","single-line":"",filled:"",rounded:"",dense:"","hide-details":"",clearable2:!0,"clear-icon":e.mdiClose,"background-color":"#E0E0E0",placeholder:e.$t("inputSearchKeyword"),"append-icon":e.mdiMagnify},on:{"click:append":e.search,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.trigger(t)}},model:{value:e.q,callback:function(t){e.q=t},expression:"q"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",md:"2"}},[n("v-switch",{staticClass:"mt-1",attrs:{dense:"","hide-details":"",inset:"",label:"ヘルプ"},model:{value:e.isHelp,callback:function(t){e.isHelp=t},expression:"isHelp"}})],1)],1),e._v(" "),n("v-sheet",{directives:[{name:"show",rawName:"v-show",value:e.isHelp,expression:"isHelp"}],staticClass:"pa-5 mb-5",attrs:{color:"grey lighten-3"}},[n("p",[e._v("\n        年代ごとの出現頻度を可視化します。"),e._v(" "),n("br"),e._v("可視化グラフの縦軸は、年代ごとに何回出現したかを表す出現頻度と、出現頻度を出版年代ごとの総ngram数で割った値を表す出現比率の2種類を切り替えることができます。\n        "),n("br")]),e._v(" "),n("ul",[n("li",{staticClass:"mb-2"},[e._v("\n          複数のキーワードをスラッシュ(/)区切りでクエリに指定することで、出現頻度を重ねて表示することができます。\n          "),n("div",[e._v("\n            例：「"),n("nuxt-link",{attrs:{to:e.localePath({name:"ngram",query:{keyword:"第一銀行/日本銀行"}})}},[e._v("第一銀行/日本銀行")]),e._v("」\n          ")],1)]),e._v(" "),n("li",{staticClass:"mb-2"},[e._v("\n          正規表現を利用したクエリが可能です。\n          "),n("div",[e._v("\n            例：「"),n("nuxt-link",{attrs:{to:e.localePath({name:"ngram",query:{keyword:"浅野..郎"}})}},[e._v("浅野..郎")]),e._v("」\n          ")],1)])]),e._v(" "),e._e(),e._v(" "),n("div",[e._v("\n        【注意】処理の特性により、総出現頻度が5程度以下のものについては集計漏れが発生することがあります。\n      ")])]),e._v(" "),e.results.hits?n("div",[n("p",[e._v("\n        "+e._s(e.results.hits.total.value.toLocaleString())+" 件ヒットしました。\n      ")])]):e._e(),e._v(" "),e.results.hits&&e.results.hits.hits.length>0?n("div",{attrs:{id:"result"}},[n("v-radio-group",{attrs:{row:""},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},[n("v-radio",{attrs:{label:"出現頻度",value:"freq"}}),e._v(" "),n("v-radio",{attrs:{label:"出現比率（年ごとの出現頻度/年ごとの総対象Ngram数）",value:"ratio"}})],1),e._v(" "),n("LineChart",{staticClass:"mb-10",attrs:{data:e.data,option:e.option}}),e._v(" "),n("v-data-table",{attrs:{"sort-by":["freq"],"sort-desc":[!0],headers:e.headers,items:e.items,"item-key":"label","items-per-page":20,"show-select":""},scopedSlots:e._u([{key:"item.link",fn:function(t){var r=t.item;return[n("nuxt-link",{attrs:{to:e.localePath({name:"search",query:{"main[query]":r.label}})}},[e._v("検索")])]}}],null,!1,1793110576),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),e._v(" "),e._e()],1):e._e()],1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{LineChart:n(564).default}),c()(component,{VCol:f.a,VContainer:h.a,VDataTable:v.a,VRadio:d.a,VRadioGroup:y.a,VRow:m.a,VSheet:k.a,VSimpleTable:_.a,VSwitch:x.a,VTextField:w.a})}}]);