(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{144:function(t,e,n){"use strict";var o=n(60),r=n(61),l=(n(74),n(42),n(64),n(55),function(){function t(){Object(o.a)(this,t)}return Object(r.a)(t,[{key:"xml2html",value:function(data,t){return data?data=data.split("&lt;").join("<").split("&gt;").join(">").replace("<head",'<p class="teiHead"><b').replace("</head>","</b></p>").split("<lb/>").join("<br/>").split("<date").join('<span class="'.concat(t?"teiDate":"",'"')).split("</date>").join("</span>").split("<persName").join('<span class="'.concat(t?"teiPersName":"",'"')).split("</persName>").join("</span>").split("<place").join('<span class="'.concat(t?"teiPlaceName":"",'"')).split("</placeName>").join("</span>").split("<time").join('<span class="'.concat(t?"teiTime":"",'"')).split("</time>").join("</span>"):null}},{key:"removeHead",value:function(data){return data=data.replace('<p class="teiHead">','<p class="teiHead" style="display: none;">')}},{key:"formatArrayValue",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:", ";if(null==t)return"";if(1===t.length)return t[0];var n=t.join(e);return n}}]),t}());e.a=function(t,e){e("utils",new l)}},145:function(t,e,n){"use strict";var o=n(0),r=n(213);o.default.use(r.a,{config:{id:"G-TPQRZ7Y0RK"}})},146:function(t,e,n){"use strict";var o=n(0),r=n(224),l=n(225),c=n(226),v=n(227),f=n(228),m=(n(315),n(5));o.default.component("LMap",r.a),o.default.component("LTileLayer",l.a),o.default.component("LMarker",c.a),o.default.component("LControlLayers",v.a),o.default.component("LPopup",f.a),delete m.Icon.Default.prototype._getIconUrl,m.Icon.Default.mergeOptions({iconRetinaUrl:n(320),iconUrl:n(206),shadowUrl:n(321)})},182:function(t,e,n){var content=n(258);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(63).default)("50f9c72e",content,!1,{sourceMap:!1})},185:function(t,e,n){var content=n(268);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(63).default)("56b15182",content,!1,{sourceMap:!1})},215:function(t,e,n){"use strict";n(217);var o=n(60),r=n(61),l=n(147),c=n(148),v=n(109),f=n(15),m=(n(36),n(110));function d(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=Object(v.a)(t);if(e){var r=Object(v.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(c.a)(this,n)}}var _=function(t,e,n,desc){var o,r=arguments.length,l=r<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(l=(r<3?o(l):r>3?o(e,n,l):o(e,n))||l);return r>3&&l&&Object.defineProperty(e,n,l),l},h=function(t){Object(l.a)(n,t);var e=d(n);function n(){var t;return Object(o.a)(this,n),(t=e.apply(this,arguments)).fab=!1,t.drawer=!1,t.baseUrl="https://shibusawa-dlab.github.io/app1",t.siteName="渋沢栄一ダイアリー",t.github="https://github.com/shibusawa-dlab/lab1",t.pages="https://shibusawa-dlab.github.io/lab1",t}return Object(r.a)(n,[{key:"onScroll",value:function(t){if("undefined"!=typeof window){var e=window.pageYOffset||t.target.scrollTop||0;this.fab=e>20}}},{key:"toTop",value:function(){this.$vuetify.goTo(0)}}]),n}(m.Vue),y=h=_([Object(m.Component)({components:{}})],h),k=(n(267),n(59)),component=Object(k.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("div",[n("v-navigation-drawer",{attrs:{app:"",temporary:!0},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",[n("v-list-item",{attrs:{link:"",to:t.localePath({name:"index"}),exact:""}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-home")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("Home")])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"about"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-information")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("about")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"fulltext"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-text")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("fulltext")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"search"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-magnify")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("fulltext_search")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"ad"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-book-open")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("ad")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"calendar"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-calendar")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("calendar")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"entity"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-tag")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("person_place")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"network"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-account-network")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("network")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",to:t.localePath({name:"map"})}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-map")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("map")))])],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",target:"_blank",href:t.github+"/tree/master/docs/tei"}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-file")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("TEI/XML "),n("v-icon",[t._v("mdi-open-in-new")])],1)],1)],1),t._v(" "),n("v-list-item",{attrs:{link:"",href:t.pages+"/snorql",target:"_blank"}},[n("v-list-item-action",[n("v-icon",[t._v("mdi-database")])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(t.$t("snorql"))+"\n              "),n("v-icon",[t._v("mdi-open-in-new")])],1)],1)],1),t._v(" "),t._e()],1)],1),t._v(" "),n("v-app-bar",{attrs:{dark:""}},[n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),n("v-toolbar-title",[n("nuxt-link",{staticStyle:{color:"inherit","text-decoration":"inherit"},attrs:{to:t.localePath({name:"index"})}},[t._v("\n          "+t._s(t.$t(t.siteName))+"\n        ")])],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("v-btn",t._g({attrs:{depressed:"",btn:""}},o),[n("v-icon",[t._v("mdi-translate")]),t._v(" "),"xs"!=t.$vuetify.breakpoint.name?[n("span",{staticClass:"ml-2"},[t._v(t._s("ja"==t.$i18n.locale?"日本語":"English"))]),t._v(" "),n("v-icon",{staticClass:"ml-2"},[t._v("mdi-menu-down")])]:t._e()],2)]}}])},[t._v(" "),n("v-list",[n("v-list-item",{attrs:{to:t.switchLocalePath("ja")}},[n("v-list-item-title",[t._v("日本語")])],1),t._v(" "),n("v-list-item",{attrs:{to:t.switchLocalePath("en")}},[n("v-list-item-title",[t._v("English")])],1)],1)],1)],1)],1),t._v(" "),n("v-main",[n("nuxt")],1),t._v(" "),n("v-footer",{staticClass:"mt-5",attrs:{dark:!0}},[n("v-container",[t._e(),t._v(" "),n("div",{staticClass:"text-center my-5"},[n("p",[n("nuxt-link",{staticStyle:{color:"white"},attrs:{to:t.localePath({name:"index"})}},[t._v(t._s(t.$t(t.siteName)))])],1)])],1)],1),t._v(" "),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.fab,expression:"fab"},{name:"scroll",rawName:"v-scroll",value:t.onScroll,expression:"onScroll"}],attrs:{fab:"",dark:"",fixed:"",bottom:"",right:"",large:"",color:"error"},on:{click:t.toTop}},[n("v-icon",[t._v("mdi-arrow-up")])],1)],1)}),[],!1,null,null,null);e.a=component.exports},229:function(t,e,n){n(230),t.exports=n(231)},257:function(t,e,n){"use strict";n(182)},258:function(t,e,n){var o=n(62)(!1);o.push([t.i,"h1[data-v-63e85905]{font-size:20px}",""]),t.exports=o},267:function(t,e,n){"use strict";n(185)},268:function(t,e,n){var o=n(62)(!1);o.push([t.i,".teiDate{background-color:#bbdefb}.teiTime{background-color:#fff9c4}.teiPersName{background-color:#ffccbc}.teiPlaceName{background-color:#c8e6c9}a{text-decoration:none}tbody tr:nth-of-type(odd){background-color:rgba(0,0,0,.05)}*{text-transform:none}",""]),t.exports=o},269:function(t,e,n){"use strict";n.r(e),n.d(e,"state",(function(){return o})),n.d(e,"mutations",(function(){return r})),n.d(e,"getters",(function(){return l}));var o=function(){return{style:{},xml:null,result:null,canvas:null,facs:null,id:null}},r={setStyle:function(t,e){t.style=e},setXml:function(t,e){t.xml=e},setResult:function(t,e){t.result=e},setCanvas:function(t,e){t.canvas=e},setFacs:function(t,e){t.facs=e},setId:function(t,e){t.id=e}},l={getStyle:function(t){return t.style},getXml:function(t){return t.xml},getResult:function(t){return t.result},getCanvas:function(t){return t.canvas},getFacs:function(t){return t.facs},getId:function(t){return t.id}}},314:function(t,e,n){var map={"./ja":137,"./ja.js":137};function o(t){var e=r(t);return n(e)}function r(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}o.keys=function(){return Object.keys(map)},o.resolve=r,t.exports=o,o.id=314},54:function(t,e,n){"use strict";var o={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(n(257),n(59)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[n("v-container",{staticClass:"my-10"},[404===t.error.statusCode?n("h1",[t._v("\n      "+t._s(t.pageNotFound)+"\n    ")]):n("h1",[t._v("\n      "+t._s(t.otherError)+"\n    ")]),t._v(" "),n("NuxtLink",{attrs:{to:"/"}},[t._v(" Home page ")])],1)],1)}),[],!1,null,"63e85905",null);e.a=component.exports}},[[229,39,5,40]]]);