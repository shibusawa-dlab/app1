(window.webpackJsonp=window.webpackJsonp||[]).push([[25,7,8,9,10],{325:function(t,e,r){"use strict";var n=r(17),o=r(7),c=r(88),l=r(25),f=r(20),d=r(65),h=r(149),v=r(86),m=r(8),y=r(66),_=r(87).f,w=r(53).f,O=r(22).f,j=r(218).trim,x="Number",C=o.Number,R=C.prototype,k=d(y(R))==x,P=function(t){var e,r,n,o,c,l,f,code,d=v(t,!1);if("string"==typeof d&&d.length>2)if(43===(e=(d=j(d)).charCodeAt(0))||45===e){if(88===(r=d.charCodeAt(2))||120===r)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+d}for(l=(c=d.slice(2)).length,f=0;f<l;f++)if((code=c.charCodeAt(f))<48||code>o)return NaN;return parseInt(c,n)}return+d};if(c(x,!C(" 0o1")||!C("0b1")||C("+0x1"))){for(var S,I=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof I&&(k?m((function(){R.valueOf.call(r)})):d(r)!=x)?h(new C(P(e)),r,I):P(e)},A=n?_(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),E=0;A.length>E;E++)f(C,S=A[E])&&!f(I,S)&&O(I,S,w(C,S));I.prototype=R,R.constructor=I,l(o,x,I)}},326:function(t,e,r){"use strict";r.r(e);r(217);var n=r(60),o=r(61),c=r(147),l=r(148),f=r(109),d=r(15),h=(r(36),r(110)),v=r(327);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var y=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},_=function(t){Object(c.a)(r,t);var e=m(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(o.a)(r,[{key:"title",get:function(){return this.item.label}},{key:"url",get:function(){return this.item.url}}]),r}(h.Vue);y([Object(h.Prop)()],_.prototype,"item",void 0);var w=_=y([Object(h.Component)({components:{ShareButtons:v.default}})],_),O=r(59),component=Object(O.a)(w,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",[r("v-menu",{attrs:{top:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({attrs:{depressed:"",icon:""}},n),[r("v-icon",[t._v("mdi-share-variant")])],1)]}}])},[t._v(" "),r("ShareButtons",{attrs:{url:t.url,title:t.title}})],1)],1)}),[],!1,null,null,null);e.default=component.exports},327:function(t,e,r){"use strict";r.r(e);r(217);var n=r(60),o=r(61),c=r(147),l=r(148),f=r(109),d=r(15),h=(r(36),r(110));function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},y=function(t){Object(c.a)(r,t);var e=v(r);function r(){var t;return Object(n.a)(this,r),(t=e.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t}return Object(o.a)(r,[{key:"twitterUrl",get:function(){return"https://twitter.com/intent/tweet?url="+this.url+"&text="+this.title}},{key:"facebookUrl",get:function(){return"https://www.facebook.com/sharer/sharer.php?u="+this.url}},{key:"pocketUrl",get:function(){return"http://getpocket.com/edit?url="+this.url}}]),r}(h.Vue);m([Object(h.Prop)({required:!0})],y.prototype,"url",void 0),m([Object(h.Prop)({required:!0})],y.prototype,"title",void 0);var _=y=m([h.Component],y),w=r(59),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{attrs:{flat:""}},[r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.twitterUrl}},n),[r("v-icon",[t._v("mdi-twitter")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Twitter"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.facebookUrl}},n),[r("v-icon",[t._v("mdi-facebook")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Facebook"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.pocketUrl}},n),[r("img",{staticStyle:{"font-size":"24px"},attrs:{src:t.baseUrl+"/img/icons/pocket.svg"}})])]}}])},[t._v(" "),r("span",[t._v(t._s("Pocket"))])])],1)}),[],!1,null,null,null);e.default=component.exports},328:function(t,e,r){var content=r(334);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(63).default)("e6022664",content,!1,{sourceMap:!1})},329:function(t,e,r){(function(e){t.exports=function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(object,t){return Object.prototype.hasOwnProperty.call(object,t)},e.p="",e(e.s=3)}([function(t,e,r){"use strict";function n(){return window.google&&window.google.charts?Promise.resolve(window.google.charts):(l||(l=new Promise((function(t){var script=document.createElement("script");script.type="text/javascript",script.onload=function(){return t(window.google.charts)},script.src=c,document.body.appendChild(script)}))),l)}e.a=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n().then((function(r){if("object"!==(void 0===e?"undefined":o(e)))throw new Error("Google Charts loader: settings must be an object");var n=t+"_"+JSON.stringify(e,Object.keys(e).sort());if(f.has(n))return f.get(n);var c=new Promise((function(n){r.load(t,e),r.setOnLoadCallback((function(){return n(window.google)}))}));return f.set(n,c),c}))};var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c="https://www.gstatic.com/charts/loader.js",l=null,f=new Map},function(t,e,r){var n=r(5)(r(4),r(6),null,null);t.exports=n.exports},function(t,e){t.exports=function(t,e,r){function n(){var h=Date.now()-f;h<e&&h>=0?o=setTimeout(n,e-h):(o=null,r||(d=t.apply(l,c),l=c=null))}var o,c,l,f,d;null==e&&(e=100);var h=function(){l=this,c=arguments,f=Date.now();var h=r&&!o;return o||(o=setTimeout(n,e)),h&&(d=t.apply(l,c),l=c=null),d};return h.clear=function(){o&&(clearTimeout(o),o=null)},h.flush=function(){o&&(d=t.apply(l,c),l=c=null,clearTimeout(o),o=null)},h}},function(t,r,n){"use strict";function o(t){t.component("GChart",f.a)}Object.defineProperty(r,"__esModule",{value:!0}),r.install=o;var c=n(0),l=n(1),f=n.n(l);n.d(r,"loadGoogleCharts",(function(){return c.a})),n.d(r,"GChart",(function(){return f.a}));var d={version:"0.3.3",install:o};r.default=d;var h=null;"undefined"!=typeof window?h=window.Vue:void 0!==e&&(h=e.Vue),h&&h.use(d)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),o=r(2),c=r.n(o),l=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],r=!0,n=!1,o=void 0;try{for(var c,l=t[Symbol.iterator]();!(r=(c=l.next()).done)&&(e.push(c.value),!i||e.length!==i);r=!0);}catch(t){n=!0,o=t}finally{try{!r&&l.return&&l.return()}finally{if(n)throw o}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d=null;e.default={name:"GChart",props:{type:{type:String},data:{type:[Array,Object],default:function(){return[]}},options:{type:Object,default:function(){return{}}},version:{type:String,default:"current"},settings:{type:Object,default:function(){return{packages:["corechart","table"]}}},events:{type:Object},createChart:{type:Function},resizeDebounce:{type:Number,default:200}},data:function(){return{chartObject:null}},watch:{data:{deep:!0,handler:function(){this.drawChart()}},options:{deep:!0,handler:function(){this.drawChart()}},type:function(t){this.createChartObject(),this.drawChart()}},mounted:function(){var t=this;r.i(n.a)(this.version,this.settings).then((function(e){d=e;var r=t.createChartObject();t.$emit("ready",r,e),t.drawChart()})),this.resizeDebounce>0&&window.addEventListener("resize",c()(this.drawChart,this.resizeDebounce))},beforeDestroy:function(){this.chartObject&&"function"==typeof this.chartObject.clearChart&&this.chartObject.clearChart()},methods:{drawChart:function(){if(d&&this.chartObject){var data=this.getValidChartData();data&&this.chartObject.draw(data,this.options)}},getValidChartData:function(){return this.data instanceof d.visualization.DataTable||this.data instanceof d.visualization.DataView?this.data:Array.isArray(this.data)?d.visualization.arrayToDataTable(this.data):null!==this.data&&"object"===f(this.data)?new d.visualization.DataTable(this.data):null},createChartObject:function(){var t=this.createChart||function(t,e,r){if(!r)throw new Error("please, provide chart type property");return new e.visualization[r](t)};return this.chartObject=t(this.$refs.chart,d,this.type),this.attachListeners(),this.chartObject},attachListeners:function(){var t=this;this.events&&Object.entries(this.events).forEach((function(e){var r=l(e,2),n=r[0],o=r[1];d.visualization.events.addListener(t.chartObject,n,o)}))}}}},function(t,e){t.exports=function(t,e,r,n){var o,c=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(o=t,c=t.default);var f="function"==typeof c?c.options:c;if(e&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns),r&&(f._scopeId=r),n){var d=f.computed||(f.computed={});Object.keys(n).forEach((function(t){var e=n[t];d[t]=function(){return e}}))}return{esModule:o,exports:c,options:f}}},function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"chart"})},staticRenderFns:[]}}])}).call(this,r(52))},330:function(t,e,r){var content=r(342);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(63).default)("cdc2c944",content,!1,{sourceMap:!1})},333:function(t,e,r){"use strict";r(328)},334:function(t,e,r){var n=r(62)(!1);n.push([t.i,"a{text-decoration:none}",""]),t.exports=n},338:function(t,e,r){"use strict";r.r(e);r(217);var n=r(60),o=r(147),c=r(148),l=r(109),f=r(15),d=(r(36),r(110)),h=r(326);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(c.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},y=function(t){Object(o.a)(r,t);var e=v(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return r}(d.Vue);m([Object(d.Prop)({required:!0})],y.prototype,"item",void 0),m([Object(d.Prop)({default:300})],y.prototype,"width",void 0),m([Object(d.Prop)({default:300})],y.prototype,"height",void 0),m([Object(d.Prop)({default:!1})],y.prototype,"horizontal",void 0);var _=y=m([Object(d.Component)({components:{ResultOption:h.default}})],y),w=(r(333),r(59)),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{class:t.horizontal?"":"mb-4",style:t.horizontal?"width: "+t.width+"px;":"",attrs:{"no-body":"",flat:"",outlined:""}},[t.item._source._thumbnail&&t.item._source._thumbnail.length>0?r("nuxt-link",{attrs:{to:t.item.to}},[t.item._source._thumbnail[0].includes("mdi-")?[r("div",{staticClass:"text-center grey lighten-2 pa-10",staticStyle:{height:"150px"}},[r("v-icon",{attrs:{size:"75"}},[t._v(t._s(t.item._source._thumbnail[0]))])],1)]:[r("v-img",{staticClass:"grey lighten-2",staticStyle:{height:"150px"},attrs:{src:t.item._source._thumbnail[0],contain:"",width:"100%"}})]],2):t._e(),t._v(" "),r("div",{staticClass:"pa-4",style:t.horizontal?"width: "+t.width+"px; height: "+t.height+"px; overflow-y: auto;":""},[r("nuxt-link",{attrs:{to:t.item.to||t.localePath({name:"item-id",params:{id:t.item._id}})}},[r("h4",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.item._source._label))}})]),t._v(" "),t.item._source.description?[r("div",{staticClass:"mt-2",domProps:{innerHTML:t._s(t.$utils.removeHead(t.$utils.xml2html(t.$utils.formatArrayValue(t.item._source.description),!0)))}})]:t._e()],2),t._v(" "),t.item.share_hide?t._e():[r("v-divider"),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("ResultOption",{attrs:{item:{label:t.$utils.formatArrayValue(t.item._source._label),url:t.$utils.formatArrayValue(t.item._source._url)}}})],1)]],2)}),[],!1,null,null,null);e.default=component.exports},341:function(t,e,r){"use strict";r(330)},342:function(t,e,r){var n=r(62)(!1);n.push([t.i,".horizontal-list{overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch;padding-left:0!important;padding-right:0}.item{display:inline-block;margin-right:16px}",""]),t.exports=n},351:function(t,e,r){"use strict";r.r(e);r(217);var n=r(60),o=r(147),c=r(148),l=r(109),f=r(15),d=(r(36),r(110)),h=r(338);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(c.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},y=function(t){Object(o.a)(r,t);var e=v(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return r}(d.Vue);m([Object(d.Prop)()],y.prototype,"width",void 0),m([Object(d.Prop)()],y.prototype,"height",void 0),m([Object(d.Prop)({default:[]})],y.prototype,"data",void 0),m([Object(d.Prop)({default:"items"})],y.prototype,"title",void 0),m([Object(d.Prop)({default:""})],y.prototype,"description",void 0);var _=y=m([Object(d.Component)({components:{CardItem:h.default}})],y),w=(r(341),r(59)),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.data.length>0?r("div",[r("div",{staticClass:"text-center mt-10 pt-10 mb-4"},[r("h3",[t._v(t._s(t.title))]),t._v(" "),t.description?r("div",{staticClass:"mt-2"},[r("small",[t._v(t._s(t.description))])]):t._e()]),t._v(" "),r("ul",{staticClass:"horizontal-list"},t._l(t.data,(function(e,n){return r("li",{key:n,staticClass:"item"},[r("CardItem",{key:"value_"+n,staticClass:"mt-2 mb-4",attrs:{horizontal:!0,item:e,width:t.width,height:t.height}})],1)})),0)]):t._e()}),[],!1,null,null,null);e.default=component.exports},353:function(t,e,r){"use strict";var n=r(329);r.o(n,"GChart")&&r.d(e,"GChart",(function(){return n.GChart}))},439:function(t,e,r){"use strict";r.r(e);r(12),r(21),r(37),r(16),r(19),r(38),r(39),r(18);var n=r(3),o=(r(24),r(51),r(56),r(325),r(43),r(30),r(31),r(57),r(353)),c=r(73),l=r.n(c),f=r(326),d=r(351);function h(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==r.return||r.return()}finally{if(l)throw o}}}}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var m={components:{GChart:o.GChart,ResultOption:f.default,HorizontalItems:d.default},asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o,c,l,f,d,h,v,m,y,_;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.payload,n=t.app,o=t.$axios,!r){e.next=5;break}return e.abrupt("return",{item:r});case 5:return c=n.context.params.id,l=n.context.params.entity,e.next=9,o.$get("https://shibusawa-dlab.github.io/app1/data/docs.json");case 9:for(h in f=e.sent,{hits:[]},d={},f)(v=f[h])[l]&&v[l].includes(c)&&(m=v.year,d[m]||(d[m]=0),d[m]+=1);for(_ in y=[],d)y.push({value:_,count:d[_]});return e.abrupt("return",{field:l,facets:y});case 16:case"end":return e.stop()}}),e)})))()},data:function(){return{configIndex:"main",baseUrl:"https://shibusawa-dlab.github.io/app1",github:"https://shibusawa-dlab.github.io/lab1",host:"https://shibusawa-dlab.github.io/app1",chartOptions:{chart:{title:"Company Performance",subtitle:"Sales, Expenses, and Profit: 2014-2017"}},entities:[],uri:"",fields:{agential:[],spatial:[]},map:{},index:{},rdf:!1}},head:function(){var title=this.title;return{title:title,meta:[{hid:"og:title",property:"og:title",content:title},{hid:"og:type",property:"og:type",content:"article"},{hid:"og:url",property:"og:url",content:this.url},{hid:"twitter:card",name:"twitter:card",content:"summary_large_image"}]}},computed:{total:function(){for(var t=0,e=this.facets,i=0;i<e.length;i++){t+=e[i].count}return t},chartData:function(){for(var t=2e3,e=0,r=this.facets,n={},i=0;i<r.length;i++){var o=r[i],c=Number(o.value);n[c]=o.count,t>c&&(t=c),e<c&&(e=c)}for(var l=[["Year","Appearances"]],f=t;f<e+1;f++){var d=0;n[f]&&(d=n[f]),l.push([f+"",d])}return l},title:function(){return this.id},id:function(){return this.$route.params.id},url:function(){return this.baseUrl+this.$route.path},entity:function(){var t=this.entities;return t.length>0?t[0]:{}},bh:function(){var t=this.field;return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("person_place"),disabled:!1,to:this.localePath({name:"entity"}),exact:!0},{text:this.$t(t),disabled:!1,to:this.localePath({name:"entity-id",params:{id:"spatial"===t?"place":t}}),exact:!0},{text:this.title}]}},created:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get(t.baseUrl+"/data/entity.json");case 2:r=(r=e.sent).data,t.map=r,n=t.field,o="agential"===n?n:"spatial",t.index=r[o],t.getInformation(),t.getRelatedItems(),t.getRelatedItems("agential");case 11:case"end":return e.stop()}}),e)})))()},methods:{getInformation:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var map,r,n,o,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:map={spatial:"place",temporal:"time",agential:"chname"},"兜町"===(r=t.id)&&(r="日本橋兜町"),n="https://www.kanzaki.com/works/2014/pub/ld-browser?u="+encodeURIComponent(t.baseUrl+"/api/"+map[t.field]+"/"+r)+".json&t=jsonld",t.uri=n,o=t.index,c=[],o[r]&&(t.rdf=!0,c.push(o[r])),t.entities=c;case 9:case"end":return e.stop()}}),e)})))()},getRelatedItems:function(){var t=arguments,e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n,o,c,f,d,v,m,y,_,w,O,j,x,C,R,k,P,S,I,i,A,image,E,$;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:"spatial",o=e.id,c=e.map[n],console.log({index:c}),r.next=6,l.a.get("https://shibusawa-dlab.github.io/app1/data/docs.json");case 6:for(v in f=(f=r.sent).data,d={},f)if((m=f[v])[e.field]&&m[e.field].includes(o)){y=m[n],_=h(y);try{for(_.s();!(w=_.n()).done;)O=w.value,d[O]||(d[O]=0),d[O]+=1}catch(t){_.e(t)}finally{_.f()}}(j=Object.keys(d).map((function(t){return{key:t,value:d[t]}}))).sort((function(a,b){return a.value<b.value?1:a.value>b.value?-1:0})),j=j.slice(0,10),x={facetHits:[]},C=h(j);try{for(C.s();!(R=C.n()).done;)k=R.value,x.facetHits.push({value:k.key,count:k.value})}catch(t){C.e(t)}finally{C.f()}if(0!==(P=x.facetHits).length){r.next=19;break}return r.abrupt("return");case 19:S=[],I={},i=0;case 22:if(!(i<P.length)){r.next=35;break}if(A=P[i],image=["spatial"===n?"mdi-map":"mdi-account"],(E=A.value)!==o){r.next=28;break}return r.abrupt("continue",32);case 28:$=e.localePath({name:"entity-entity-id",params:{entity:n,id:E}}),c[E]&&c[E].image&&(image=[c[E].image]),S.push({_id:"abc",_source:{_label:[E+"（"+A.count+"）"],_thumbnail:image,_url:[e.baseUrl+$]},to:$,facet:A}),I[E]=A.count;case 32:i++,r.next=22;break;case 35:e.fields[n]=S;case 36:case"end":return r.stop()}}),r)})))()},getQuery:function(label,t){var e={};return e["".concat(this.configIndex,"[refinementList][").concat(label,"][0]")]=t,e},getValues:function(data){return data?Array.isArray(data)?data:[data]:[]},dwnJson:function(){var t=this.item.objectID+".xml",data=this.item.xml,link=document.createElement("a");link.href="data:text/xml;charset=utf-8,"+encodeURIComponent(data),link.download=t,link.click()}}},y=r(59),component=Object(y.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-sheet",{attrs:{color:"grey lighten-2"}},[r("v-container",{staticClass:"py-4",attrs:{fluid:""}},[r("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[r("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),t.entity.image?r("v-sheet",{attrs:{color:"grey lighten-4"}},[r("v-img",{staticStyle:{height:"300px"},attrs:{src:t.entity.image,contain:""}})],1):t._e(),t._v(" "),r("v-container",{staticClass:"my-5"},[r("h1",[t._v(t._s(t.id))]),t._v(" "),t.entity.description?r("p",{staticClass:"my-5"},[t._v("\n      "+t._s(t.entity.description.value||t.entity.description)+"（Wikiepdiaより）\n    ")]):t._e(),t._v(" "),r("div",{staticClass:"text-center my-5"},[t.rdf?r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"mr-5",attrs:{href:t.uri,icon:""}},n),[r("v-img",{attrs:{contain:"",width:"30px",src:t.baseUrl+"/img/icons/rdf-logo.svg"}})],1)]}}],null,!1,3940686510)},[t._v(" "),r("span",[t._v("RDF")])]):t._e(),t._v(" "),r("ResultOption",{attrs:{item:{url:t.url,label:t.id}}})],1)]),t._v(" "),r("v-container",{staticClass:"my-5"},[t._e(),t._v(" "),r("v-card",{staticClass:"my-5",attrs:{flat:""}},[r("small",[r("h3",{staticClass:"mt-5 text-center"},[t._v("\n          "+t._s(t.total.toLocaleString()+" "+t.$t("items"))+"\n        ")])]),t._v(" "),r("GChart",{staticClass:"pb-10",attrs:{type:"ColumnChart",data:t.chartData,options:t.chartOptions}})],1),t._v(" "),r("v-btn",{staticClass:"mt-10",attrs:{block:"",color:"primary",rounded:"",dark:"","x-large":"",to:t.localePath({name:"search",query:t.getQuery(t.field,t.id)})}},[r("v-icon",{staticClass:"mr-2"},[t._v("mdi-magnify")]),t._v("\n      "+t._s(t.$t("fulltext_search"))+"\n    ")],1),t._v(" "),t._e(),t._v(" "),t._l(t.fields,(function(e,n){return r("HorizontalItems",{key:n,attrs:{description:"カッコ内の値は共起するアイテム数",data:t.fields[n],title:t.$t("related")+" "+t.$t(n),height:"100",width:"200"}})}))],2)],1)}),[],!1,null,null,null);e.default=component.exports}}]);