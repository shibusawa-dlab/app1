/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[34,8,11,13],{326:function(t,e,n){"use strict";n.r(e);n(217);var r=n(60),o=n(61),c=n(147),l=n(148),f=n(109),d=n(15),h=(n(36),n(110)),v=n(327);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},_=function(t){Object(c.a)(n,t);var e=m(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"title",get:function(){return this.item.label}},{key:"url",get:function(){return this.item.url}}]),n}(h.Vue);y([Object(h.Prop)()],_.prototype,"item",void 0);var k=_=y([Object(h.Component)({components:{ShareButtons:v.default}})],_),w=n(59),component=Object(w.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("v-menu",{attrs:{top:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({attrs:{depressed:"",icon:""}},r),[n("v-icon",[t._v("mdi-share-variant")])],1)]}}])},[t._v(" "),n("ShareButtons",{attrs:{url:t.url,title:t.title}})],1)],1)}),[],!1,null,null,null);e.default=component.exports},327:function(t,e,n){"use strict";n.r(e);n(217);var r=n(60),o=n(61),c=n(147),l=n(148),f=n(109),d=n(15),h=(n(36),n(110));function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var m=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},y=function(t){Object(c.a)(n,t);var e=v(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t}return Object(o.a)(n,[{key:"twitterUrl",get:function(){return"https://twitter.com/intent/tweet?url="+this.url+"&text="+this.title}},{key:"facebookUrl",get:function(){return"https://www.facebook.com/sharer/sharer.php?u="+this.url}},{key:"pocketUrl",get:function(){return"http://getpocket.com/edit?url="+this.url}}]),n}(h.Vue);m([Object(h.Prop)({required:!0})],y.prototype,"url",void 0),m([Object(h.Prop)({required:!0})],y.prototype,"title",void 0);var _=y=m([h.Component],y),k=n(59),component=Object(k.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{flat:""}},[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.twitterUrl}},r),[n("v-icon",[t._v("mdi-twitter")])],1)]}}])},[t._v(" "),n("span",[t._v(t._s("Twitter"))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.facebookUrl}},r),[n("v-icon",[t._v("mdi-facebook")])],1)]}}])},[t._v(" "),n("span",[t._v(t._s("Facebook"))])]),t._v(" "),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.pocketUrl}},r),[n("img",{staticStyle:{"font-size":"24px"},attrs:{src:t.baseUrl+"/img/icons/pocket.svg"}})])]}}])},[t._v(" "),n("span",[t._v(t._s("Pocket"))])])],1)}),[],!1,null,null,null);e.default=component.exports},336:function(t,e,n){"use strict";n.r(e);n(217);var r=n(3),o=n(60),c=n(61),l=n(147),f=n(148),d=n(109),h=n(15),v=(n(24),n(36),n(42),n(150),n(30),n(21),n(55),n(325),n(110)),m=n(73),y=n.n(m);function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var k=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},w=n(340).Network;function O(){for(var t="#",i=0;i<6;i++)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t}function j(p){return"http://schema.org/agential"===p?"":"http://schema.org/spatial"===p?"":"http://schema.org/temporal"===p?"":""}var x=function(t){Object(l.a)(f,t);var e,n=_(f);function f(){var t;return Object(o.a)(this,f),(t=n.apply(this,arguments)).nodes=[],t.edges=[],t.options={nodes:{},edges:{color:"lightgray"}},t}return Object(c.a)(f,[{key:"watchU",value:function(){this.init()}},{key:"created",value:function(){this.init()}},{key:"init",value:function(){this.search()}},{key:"search",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){var u,e,n,r,o,c,l,f,i,d,s,label,h,p,v,m,_,k,w;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=this.u,e="\n        SELECT DISTINCT ?p ?s ?label ?keyword ?label_k count(?cho) as ?count \n        ?s2 ?label2 count(?cho2) as ?count2 WHERE { \n          BIND(<".concat(u,"> as ?s)\n          ?cho ?p2 ?s . \n          ?s rdfs:label ?label . \n          ?cho ?p ?keyword . \n          filter (?p != rdf:type && ?p != schema:inLanguage \n          && ?p != schema:temporal && ?p != jps:relationType \n          && ?p != jps:region && ?p != schema:license)\n          filter(?s != ?keyword)\n          ?keyword rdfs:label ?label_k . \n          filter(?label_k != '不明' && ?label_k != 'unknown / not defined')\n        } order by desc(?count) limit 20\n      "),t.next=4,y.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(e)+"&output=json");case 4:n=t.sent,r=n.data.results.bindings,o=[],c=[],l={},f={"http://schema.org/agential":"#9E9E9E","http://schema.org/about":"#4CAF50","http://schema.org/spatial":"#FF9800","http://schema.org/temporal":"#795548","http://schema.org/category":"#E91E63","http://schema.org/isPartOf":"#9C27B0"},i=0;case 11:if(!(i<r.length)){t.next=30;break}if(d=r[i],s=d.s.value,l[s]||(l[s]={label:d.label.value,index:Object.keys(l).length,icon:j("http://schema.org/agential"),uri:s,p:"http://schema.org/agential"}),label=d.label.value,label=d.name?d.name.value:label,"不明"!==(h=d.label_k.value)){t.next=20;break}return t.abrupt("continue",27);case 20:for(p=d.p.value,v=["creator","publisher","contributor","provider"],m=0;m<v.length;m++)p=p.replace("http://schema.org/"+v[m],"http://schema.org/agential");f[p]||(f[p]=O()),_=d.keyword.value,l[_]||(l[_]={label:h,index:Object.keys(l).length,icon:j(p),uri:_,p:p}),c.push({from:l[s].index,to:l[_].index,value:Math.min(Number(d.count.value),1e3),title:d.p.value+"（"+Number(d.count.value).toLocaleString()+"）",arrows:"to",color:f[p]});case 27:i++,t.next=11;break;case 30:for(k in l)w=l[k],o.push({id:w.index,label:w.label,shape:"icon",icon:{code:w.icon},uri:w.uri,p:w.p});this.nodes=o,this.edges=c;case 33:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"onNodeSelected",value:function(t){var e=t.nodes;if(e.length>0){var n=this.nodes[e[0]],r="item",o={};"http://schema.org/spatial"===n.p?(r="entity",o={entity:"spatial"}):"http://schema.org/about"===n.p&&(r="keyword"),this.$router.push(this.localePath({name:r,params:o,query:{id:n.uri}}),(function(){}),(function(){}))}}}]),f}(v.Vue);k([Object(v.Prop)()],x.prototype,"u",void 0),k([Object(v.Watch)("u")],x.prototype,"watchU",null);var C=x=k([Object(v.Component)({components:{network:w}})],x),R=n(59),component=Object(R.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.nodes.length>0?n("v-container",[n("h2",{staticClass:"mt-5 mb-3 text-center"},[t._v(t._s(t.$t("network")))]),t._v(" "),n("v-card",{attrs:{"no-body":"",outlined:"",flat:""}},[n("network",{ref:"network",staticStyle:{height:"600px"},attrs:{nodes:t.nodes,edges:t.edges,options:t.options},on:{click:t.onNodeSelected}})],1)],1):t._e()}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Network:n(336).default})},356:function(t,e,n){t.exports=function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(){return(e=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var e in source)Object.prototype.hasOwnProperty.call(source,e)&&(t[e]=source[e])}return t}).apply(this,arguments)}var n=4,r=.001,o=1e-7,c=10,l=11,f=1/(l-1),d="function"==typeof Float32Array;function h(t,e){return 1-3*e+3*t}function v(t,e){return 3*e-6*t}function m(t){return 3*t}function y(t,e,n){return((h(e,n)*t+v(e,n))*t+m(e))*t}function _(t,e,n){return 3*h(e,n)*t*t+2*v(e,n)*t+m(e)}function k(t,e,n,r,l){var f,d,i=0;do{(f=y(d=e+(n-e)/2,r,l)-t)>0?n=d:e=d}while(Math.abs(f)>o&&++i<c);return d}function w(t,e,r,o){for(var i=0;i<n;++i){var c=_(e,r,o);if(0===c)return e;e-=(y(e,r,o)-t)/c}return e}function O(t){return t}var j=function(t,e,n,o){if(!(0<=t&&t<=1&&0<=n&&n<=1))throw new Error("bezier x values must be in [0, 1] range");if(t===e&&n===o)return O;for(var c=d?new Float32Array(l):new Array(l),i=0;i<l;++i)c[i]=y(i*f,t,n);function h(e){for(var o=0,d=1,h=l-1;d!==h&&c[d]<=e;++d)o+=f;--d;var v=o+(e-c[d])/(c[d+1]-c[d])*f,m=_(v,t,n);return m>=r?w(e,v,t,n):0===m?v:k(e,o,o+f,t,n)}return function(t){return 0===t?0:1===t?1:y(h(t),e,o)}},x={ease:[.25,.1,.25,1],linear:[0,0,1,1],"ease-in":[.42,0,1,1],"ease-out":[0,0,.58,1],"ease-in-out":[.42,0,.58,1]},C=!1;try{var R=Object.defineProperty({},"passive",{get:function(){C=!0}});window.addEventListener("test",null,R)}catch(t){}var $={$:function(t){return"string"!=typeof t?t:document.querySelector(t)},on:function(element,t,e){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{passive:!1};t instanceof Array||(t=[t]);for(var i=0;i<t.length;i++)element.addEventListener(t[i],e,!!C&&n)},off:function(element,t,e){t instanceof Array||(t=[t]);for(var i=0;i<t.length;i++)element.removeEventListener(t[i],e)},cumulativeOffset:function(element){var t=0,e=0;do{t+=element.offsetTop||0,e+=element.offsetLeft||0,element=element.offsetParent}while(element);return{top:t,left:e}}},P=["mousedown","wheel","DOMMouseScroll","mousewheel","keyup","touchmove"],S={container:"body",duration:500,lazy:!0,easing:"ease",offset:0,force:!0,cancelable:!0,onStart:!1,onDone:!1,onCancel:!1,x:!1,y:!0};function M(t){S=e({},S,t)}var I=function(){var element,e,n,r,o,c,l,f,d,h,v,m,y,_,k,w,O,C,R,M,I,E,T,A,F,L,progress,D=function(t){f&&(T=t,M=!0)};function N(t){var e=t.scrollTop;return"body"===t.tagName.toLowerCase()&&(e=e||document.documentElement.scrollTop),e}function U(t){var e=t.scrollLeft;return"body"===t.tagName.toLowerCase()&&(e=e||document.documentElement.scrollLeft),e}function B(){I=$.cumulativeOffset(e),E=$.cumulativeOffset(element),m&&(k=E.left-I.left+c,C=k-_),y&&(O=E.top-I.top+c,R=O-w)}function z(t){if(M)return V();F||(F=t),o||B(),L=t-F,progress=Math.min(L/n,1),progress=A(progress),H(e,w+R*progress,_+C*progress),L<n?window.requestAnimationFrame(z):V()}function V(){M||H(e,O,k),F=!1,$.off(e,P,D),M&&v&&v(T,element),!M&&h&&h(element)}function H(element,t,e){y&&(element.scrollTop=t),m&&(element.scrollLeft=e),"body"===element.tagName.toLowerCase()&&(y&&(document.documentElement.scrollTop=t),m&&(document.documentElement.scrollLeft=e))}function W(k,I){var E=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("object"===t(I)?E=I:"number"==typeof I&&(E.duration=I),!(element=$.$(k)))return console.warn("[vue-scrollto warn]: Trying to scroll to an element that is not on the page: "+k);if(e=$.$(E.container||S.container),n=E.hasOwnProperty("duration")?E.duration:S.duration,o=E.hasOwnProperty("lazy")?E.lazy:S.lazy,r=E.easing||S.easing,c=E.hasOwnProperty("offset")?E.offset:S.offset,l=E.hasOwnProperty("force")?!1!==E.force:S.force,f=E.hasOwnProperty("cancelable")?!1!==E.cancelable:S.cancelable,d=E.onStart||S.onStart,h=E.onDone||S.onDone,v=E.onCancel||S.onCancel,m=void 0===E.x?S.x:E.x,y=void 0===E.y?S.y:E.y,"function"==typeof c&&(c=c(element,e)),_=U(e),w=N(e),B(),M=!1,!l){var F="body"===e.tagName.toLowerCase()?document.documentElement.clientHeight||window.innerHeight:e.offsetHeight,L=w,V=L+F,H=O-c,W=H+element.offsetHeight;if(H>=L&&W<=V)return void(h&&h(element))}if(d&&d(element),R||C)return"string"==typeof r&&(r=x[r]||x.ease),A=j.apply(j,r),$.on(e,P,D,{passive:!0}),window.requestAnimationFrame(z),function(){T=null,M=!0};h&&h(element)}return W},E=I(),T=[];function A(t){for(var i=0;i<T.length;++i)if(T[i].el===t)return T.splice(i,1),!0;return!1}function F(t){for(var i=0;i<T.length;++i)if(T[i].el===t)return T[i]}function L(t){var e=F(t);return e||(T.push(e={el:t,binding:{}}),e)}function D(t){var e=L(this).binding;if(e.value){if(t.preventDefault(),"string"==typeof e.value)return E(e.value);E(e.value.el||e.value.element,e.value)}}var N={bind:function(t,e){L(t).binding=e,$.on(t,"click",D)},unbind:function(t){A(t),$.off(t,"click",D)},update:function(t,e){L(t).binding=e}},U={bind:N.bind,unbind:N.unbind,update:N.update,beforeMount:N.bind,unmounted:N.unbind,updated:N.update,scrollTo:E,bindings:T},B=function(t,e){e&&M(e),t.directive("scroll-to",U),(t.config.globalProperties||t.prototype).$scrollTo=U.scrollTo};return"undefined"!=typeof window&&window.Vue&&(window.VueScrollTo=U,window.VueScrollTo.setDefaults=M,window.VueScrollTo.scroller=I,window.Vue.use&&window.Vue.use(B)),U.install=B,U}()},442:function(t,e,n){"use strict";n.r(e);n(217),n(31),n(12),n(21),n(37),n(16),n(19),n(38),n(39),n(17);var r=n(3),o=n(60),c=n(61),l=n(147),f=n(148),d=n(109),h=n(15),v=(n(24),n(36),n(43),n(30),n(51),n(56),n(42),n(55),n(74),n(64),n(110)),m=n(73),y=n.n(m),_=n(356),k=n.n(_),w=n(326);function O(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return j(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function j(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function x(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(f.a)(this,n)}}var C=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},R=n(340).Network,$=function(t){Object(l.a)(d,t);var e,n,f=x(d);function d(){var t;return Object(o.a)(this,d),(t=f.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t.index="main",t.tab=0,t.nodesMap={},t.edgesMap={},t.otherId="",t.items=[],t.documents={},t.counts={},t.network={nodes:[],edges:[],options:{nodes:{color:{background:"lightgray",highlight:{background:"lightgray",border:"#FF6E00"}},borderWidth:4,borderWidthSelected:4,shapeProperties:{useBorderWithImage:!0}},edges:{},physics:{enabled:!0,stabilization:{enabled:!0,iterations:20}},layout:{randomSeed:2}}},t.item2={_source:{_thumbnail:["http://commons.wikimedia.org/wiki/Special:FilePath/Asano_souichiro.jpg?width=300"],_label:["浅野総一郎"],description:["浅野 総一郎（淺野總一郎 あさの そういちろう、1848年4月13日（嘉永元年3月10日） - 1930年（昭和5年）11月9日）は、日本の実業家。一代で浅野財閥を築いた。"]}},t}return Object(c.a)(d,[{key:"item",get:function(){return{_id:this.$route.params.id,_source:{_thumbnail:["mdi-account"],_label:[this.$route.params.id],_url:[this.baseUrl+this.localePath({name:"entity-entity-id",params:{entity:"agential",id:this.$route.params.id}})]}}}},{key:"title",get:function(){return this.$route.params.id+"のネットワーク"}},{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("network"),disabled:!1,to:this.localePath({name:"network"}),exact:!0},{text:this.title}]}},{key:"created",value:(n=Object(r.a)(regeneratorRuntime.mark((function t(){var e,n,r,o,i,c,map,l,f,d,h,v,m,_;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.$route.params.id,"list"===this.$route.query.mode&&(this.tab=1),t.next=5,y.a.get(this.baseUrl+"/data/agentials/"+e+".json");case 5:for(n=t.sent,r=n.data.nodes,this.network.edges=n.data.edges,o={},i=0;i<r.length;i++)c=r[i],o[c.id]=c;for(this.network.nodes=r,map={},l={},f=0;f<n.data.edges.length;f++)(d=n.data.edges[f]).id=f,d.from!==e&&d.to!==e||(d.from===e?map[d.to]=d.value:map[d.from]=d.value),l[d.id]=d;for((h=Object.keys(map).map((function(t){return{key:t,value:map[t]}}))).sort((function(a,b){return a.value<b.value?1:a.value>b.value?-1:0})),this.items=h,this.nodesMap=o,this.edgesMap=l,this.$refs.network,v={},m=0;m<r.length;m++)_=r[m],v[_.label]=_.count;return(h=Object.keys(v).map((function(t){return{key:t,value:v[t]}}))).sort((function(a,b){return a.value<b.value?1:a.value>b.value?-1:0})),this.counts=h,t.next=27,this.getRelatedItems();case 27:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"getRelatedItems",value:(e=Object(r.a)(regeneratorRuntime.mark((function t(){var e,n,r,o,c,l,f,i,d,h,v,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.$route.params.id,n="agential",t.next=4,y.a.get("https://shibusawa-dlab.github.io/app1/data/docs.json");case 4:for(c in r=t.sent,o={hits:[]},r=r.data)(l=r[c])[n]&&l[n].includes(e)&&o.hits.push(l);for(f={},i=0;i<o.hits.length;i++)for(d=o.hits[i],h=d.agential,v=0;v<h.length;v++)m=h[v],f[m]||(f[m]=[]),f[m].push(d);this.documents=f;case 12:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"onNodeSelected",value:function(t){var e=t.nodes;if(e.length>0){var n=this.nodesMap[e[0]].id;n!==this.$route.params.id?this.otherId=n:this.otherId=""}else this.otherId="";this.highlight(t)}},{key:"aaa",value:function(t){var e=t.nodes;if(e.length>0){var n=this.nodesMap[e[0]].id;n!==this.$route.params.id?this.$router.push(this.localePath({name:"network-id",params:{id:n}})):this.otherId=""}else this.otherId=""}},{key:"bbb",value:function(t){this.$router.push(this.localePath({name:"network-id",params:{id:t}}))}},{key:"select",value:function(t){this.otherId="",t!==this.$route.params.id&&(this.otherId=t);var e=this.$refs.network;e.selectNodes([t]),e.focus(t)}},{key:"stabilized",value:function(){this.network.options.physics.enabled=!1}},{key:"head",value:function(){return{title:this.title}}},{key:"highlightRelation",value:function(t,e){t=(t=String(t).replace(/<[^>]*>?/gm,"")).split(e).join('<span style="font-size : large; font-weight: bold; background-color: #FFF59D;">'+e+"</span>");var n=this.$route.params.id;return t=t.split(n).join('<span style="font-size : large; font-weight: bold; background-color: #FFF59D;">'+n+"</span>")}},{key:"highlight",value:function(t){var e,n=this.edgesMap,r=[],o=t.edges,c=O(o);try{for(c.s();!(e=c.n()).done;){var l=n[e.value],f=l.to;r.includes(f)||r.push(f);var d=l.from;r.includes(d)||r.push(d)}}catch(t){c.e(t)}finally{c.f()}var h,v=O(this.network.nodes);try{for(v.s();!(h=v.n()).done;){var m=h.value,y=m.id;r.includes(y)||0===r.length?m.color={border:"lightgreen"}:m.color={border:"lightgray"}}}catch(t){v.e(t)}finally{v.f()}var _,k=O(this.network.edges);try{for(k.s();!(_=k.n()).done;){var w=_.value,j=w.id;o.includes(j)?w.color="orange":w.color="lightgray"}}catch(t){k.e(t)}finally{k.f()}}},{key:"getQuery",value:function(){var t={};return t["".concat(this.index,"[refinementList][agential][0]")]=this.$route.params.id,t}},{key:"scroll",value:function(t){k.a.scrollTo("#"+t,500,{container:"#container"})}}]),d}(v.Vue),P=$=C([Object(v.Component)({components:{network:R,ResultOption:w.default}})],$),S=n(59),component=Object(S.a)(P,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-4",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[n("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),n("v-container",{staticClass:"py-5",attrs:{fluid:""}},[n("h2",{staticClass:"mb-5"},[t._v(t._s(t.title))]),t._v(" "),n("p",{staticClass:"mt-2"},[t._v("\n      "+t._s(t.$t("network_lead"))+"\n    ")]),t._v(" "),n("v-row",{staticClass:"mt-5",attrs:{dense:""}},[n("v-col",{attrs:{cols:"12",sm:3}},[n("v-sheet",{staticClass:"grey lighten-3 pa-2"},[n("h3",[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-account")]),t._v(t._s(t.$t("person_information")))],1)]),t._v(" "),n("v-card",{staticClass:"mt-5 mb-5",attrs:{flat:"",outlined:""}},[t.nodesMap[t.$route.params.id]&&t.nodesMap[t.$route.params.id].image?n("v-img",{staticClass:"grey lighten-2",staticStyle:{height:"150px"},attrs:{src:t.nodesMap[t.$route.params.id].image,contain:"",width:"100%"}}):t._e(),t._v(" "),n("div",{staticClass:"pa-4",style:"max-height: 200px; overflow-y: auto;"},[n("nuxt-link",{attrs:{to:t.item.to||t.localePath({name:"entity-entity-id",params:{entity:"agential",id:t.item._id}})}},[n("h4",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.item._source._label))}})]),t._v(" "),t.nodesMap[t.$route.params.id]&&t.nodesMap[t.$route.params.id].description?[n("div",{staticClass:"mt-2"},[t._v("\n                "+t._s(t.nodesMap[t.$route.params.id].description)+"（Wikiepdiaより）\n              ")])]:t._e()],2),t._v(" "),t.item.share_hide?t._e():[n("v-divider"),t._v(" "),n("v-card-actions",[0===t.tab?n("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.select(t.$route.params.id)}}},[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-image-filter-center-focus")]),t._v(t._s(t.$t("focus")))],1):t._e(),t._v(" "),n("v-spacer"),t._v(" "),n("ResultOption",{attrs:{item:{label:t.$utils.formatArrayValue(t.item._source._label),url:t.$utils.formatArrayValue(t.item._source._url)}}})],1)]],2),t._v(" "),t.otherId?n("v-card",{staticClass:"mb-5",attrs:{flat:"",outlined:""}},[t.nodesMap[t.otherId]&&t.nodesMap[t.otherId].image?n("v-img",{staticClass:"grey lighten-2",staticStyle:{height:"150px"},attrs:{src:t.nodesMap[t.otherId].image,contain:"",width:"100%"}}):t._e(),t._v(" "),n("div",{staticClass:"pa-4",style:"max-height: 200px; overflow-y: auto;"},[n("nuxt-link",{attrs:{to:t.localePath({name:"entity-entity-id",params:{entity:"agential",id:t.otherId}})}},[n("h4",[t._v(t._s(t.otherId))])]),t._v(" "),t.nodesMap[t.otherId]&&t.nodesMap[t.otherId].description?[n("div",{staticClass:"mt-2"},[t._v("\n                "+t._s(t.nodesMap[t.otherId].description)+"（Wikiepdiaより）\n              ")])]:t._e()],2),t._v(" "),t.item.share_hide?t._e():[n("v-divider"),t._v(" "),n("v-card-actions",[[n("v-btn",{attrs:{color:"primary",to:t.localePath({name:"network-id",params:{id:t.otherId}})}},[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-account-network")]),t._v(t._s(t.$t("view_network")))],1)],t._v(" "),n("v-spacer"),t._v(" "),n("ResultOption",{attrs:{item:{label:t.otherId,url:t.baseUrl+t.localePath({name:"entity-entity-id",params:{entity:"agential",id:t.otherId}})}}})],2)]],2):t._e(),t._v(" "),t._e(),t._v(" "),t._e()],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:6}},[n("v-tabs",{attrs:{"fixed-tabs":""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("v-tab",[t._v("\n          "+t._s(t.$t("network"))+"\n        ")]),t._v(" "),n("v-tab",[t._v("\n          "+t._s(t.$t("つながりを表すアイテム"))+"\n        ")])],1),t._v(" "),n("v-tabs-items",{staticClass:"mt-5",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("v-tab-item",[n("network",{ref:"network",staticStyle:{height:"800px","background-color":"#f0f4c3"},attrs:{nodes:t.network.nodes,edges:t.network.edges,options:t.network.options},on:{click:t.onNodeSelected,"double-click":t.aaa,stabilized:t.stabilized}})],1),t._v(" "),n("v-tab-item",[n("div",{staticClass:"grey lighten-2 mb-5",staticStyle:{height:"850px","overflow-y":"auto"},attrs:{id:"container"}},[t._v("\n               \n              "),t._l(t.items,(function(e,r){return n("v-card",{key:r,staticClass:"mb-5 mx-5",attrs:{id:e.key,flat:"",outlined:""}},[n("v-list-item",{attrs:{"three-line":""}},[n("v-list-item-content",[n("nuxt-link",{attrs:{to:e.to||t.localePath({name:"entity-entity-id",params:{entity:"agential",id:e.key}})}},[n("h3",[t._v(t._s(e.key))])]),t._v(" "),t.nodesMap[e.key].description?n("div",{staticClass:"mt-2"},[t._v("\n                      "+t._s(t.nodesMap[e.key].description)+"（Wikiepdiaより）\n                    ")]):t._e()],1),t._v(" "),n("v-list-item-avatar",{attrs:{tile:"",size:"80"}},[n("v-img",{attrs:{src:t.nodesMap[e.key].image,contain:""}})],1)],1),t._v(" "),n("div",{staticClass:"pa-4 grey lighten-3"},[n("h4",{staticClass:"mb-4"},[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-file")]),t._v(" つながりを表すアイテム\n                  ")],1),t._v(" "),t.documents[e.key]?t._e():n("div",{staticClass:"text-center py-10"},[n("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1),t._v(" "),t._l(t.documents[e.key],(function(r,o){return n("div",{key:o,staticClass:"px-2"},[n("h4",{staticClass:"my-2"},[n("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:r.objectID}})}},[t._v(t._s(r.label)+"\n                        "),n("small",[t._v("（"+t._s(r.objectID)+"）")])]),t._v(" "),n("small",[n("b",[t._v(t._s(r.temporal))])])],1),t._v(" "),n("div",{staticClass:"mb-2",staticStyle:{"max-height":"200px","overflow-y":"auto"},domProps:{innerHTML:t._s(t.highlightRelation(t.$utils.removeHead(t.$utils.xml2html(r.xml)),e.key))}}),t._v(" "),n("v-divider")],1)})),t._v(" "),t.nodesMap[r]&&t.nodesMap[r].description?[n("div",{staticClass:"mt-2"},[t._v("\n                      "+t._s(t.nodesMap[r].description)+"\n                    ")])]:t._e()],2)],1)}))],2)])],1)],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:3}},[n("v-sheet",{staticClass:"grey lighten-3 pa-2"},[n("h3",[n("v-icon",{staticClass:"mr-2"},[t._v("mdi-view-list")]),t._v(t._s(t.$t("relation"))+"\n              "),t.items.length>0?[t._v("("+t._s(t.items.length)+")")]:t._e()],2)]),t._v(" "),n("v-list",{staticClass:"mt-4",staticStyle:{"max-height":"800px","overflow-y":"auto"},attrs:{dense:""}},t._l(t.items,(function(e){return n("v-list-item",{key:e.key,on:{click:function(n){t.otherId=e.key,t.scroll(e.key),t.select(e.key)},dblclick:function(n){return t.bbb(e.key)}}},[n("v-list-item-avatar",[n("v-img",{attrs:{src:t.nodesMap[e.key].image}})],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.key)}})],1),t._v(" "),n("v-list-item-action",[t._v("\n                  "+t._s(e.value)+"\n                ")])],1)})),1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Network:n(336).default})}}]);