(window.webpackJsonp=window.webpackJsonp||[]).push([[49,25,26],{494:function(t,e,n){var content=n(512);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("e1f73028",content,!0,{sourceMap:!1})},511:function(t,e,n){"use strict";n(494)},512:function(t,e,n){var r=n(11)(!1);r.push([t.i,"tei-persName[data-v-0990af3e]{background-color:#ffccbc}tei-placeName[data-v-0990af3e]{background-color:#c8e6c9}tei-date[data-v-0990af3e]{background-color:#bbdefb}tei-time[data-v-0990af3e]{background-color:#fff9c4}tei-head[data-v-0990af3e]{margin:20px;font-size:large!important;font-weight:700}",""]),t.exports=r},514:function(t,e,n){var content=n(561);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("46d20b4a",content,!0,{sourceMap:!1})},523:function(t,e,n){"use strict";n.r(e);n(283),n(56);var r=n(21),o=n(27),c=n(31),l=n(26),f=n(22),d=n(7),v=n(154);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var h=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},y=function(t){Object(c.a)(n,t);var e=m(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t}return Object(o.a)(n,[{key:"canvas",get:function(){return this.$store.getters.canvas},set:function(t){this.$store.commit("setCanvas",t)}},{key:"facs",get:function(){return this.$store.getters.getFacs},set:function(t){this.$store.commit("setFacs",t)}},{key:"getTextContent",value:function(element){var text="";if(element.text&&(text+=element.text.trim()),element.elements)for(var i=0;i<element.elements.length;i++)text+=this.getTextContent(element.elements[i]);return text.trim()}}]),n}(v.Vue);h([Object(v.Prop)({})],y.prototype,"element",void 0);var w=y=h([Object(v.Component)({components:{TeiElement:R},name:"TeiElement"})],y),_=(n(511),n(86)),x=n(119),k=n.n(x),O=n(184),j=n(517),component=Object(_.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.element.name||"span",{tag:"component"},[("tei-date"==t.element.name||"tei-time"==t.element.name)&&t.element.attributes&&t.element.attributes.when?[n("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,o=e.attrs;return[n("span",t._g(t._b({},"span",o,!1),r),[t._v(t._s(t.element.elements[0].text))])]}}],null,!1,1766447786)},[t._v(" "),n("span",[t._v(t._s(t.element.attributes.when))])])]:"text"==t.element.type?[t._v("\n    "+t._s(t.element.text)+"\n  ")]:["tei-pb"==t.element.name&&t.element.attributes&&t.element.attributes.corresp?[n("div",{staticClass:"ma-2"},[n("v-icon",{staticClass:"ma-1",attrs:{color:"purple"},on:{click:function(e){t.canvas=t.facs[t.element.attributes.corresp.replace("#","")]}}},[t._v("mdi-image")]),t._v(" "),n("span",{staticClass:"ma-1",staticStyle:{color:"grey"}},[t._v("[Page @"+t._s(t.element.attributes.corresp)+"]")])],1)]:t._e(),t._v(" "),t._l(t.element.elements,(function(t,e){return n("TeiElement",{key:e,attrs:{element:t}})}))]],2)}),[],!1,null,"0990af3e",null),R=e.default=component.exports;k()(component,{VIcon:O.a,VTooltip:j.a})},560:function(t,e,n){"use strict";n(514)},561:function(t,e,n){var r=n(11)(!1);r.push([t.i,"tei-encodingdesc,tei-publicationstmt,tei-publicationstmt>*,tei-sourcedesc{display:block!important}",""]),t.exports=r},581:function(t,e){},582:function(t,e){},586:function(t,e,n){var content=n(667);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(12).default)("36cd220e",content,!0,{sourceMap:!1})},590:function(t,e,n){"use strict";n.r(e);n(55),n(283);var r=n(21),o=n(27),c=n(31),l=n(26),f=n(22),d=n(7),v=n(154),m=n(510),h=n.n(m);function y(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return w(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0,r=function(){};return{s:r,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){l=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function _(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var x=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},k=function(t){Object(c.a)(n,t);var e=_(n);function n(){var t;return Object(r.a)(this,n),(t=e.apply(this,arguments)).items=[],t}return Object(o.a)(n,[{key:"id",get:function(){return this.$store.getters.getId},set:function(t){this.$store.commit("setId",t)}},{key:"xml",get:function(){return this.$store.getters.getXml}},{key:"created",value:function(){var text=h()(this.xml).find("tei-text")[0];"diary"===text.getAttribute("type")?this.items=this.aaa(text):"volume"===text.getAttribute("type")&&(this.items=this.bbb(text))}},{key:"aaa",value:function(element){var t,menu=[],e=y(h()(h()(element).find("tei-front")[0]).children());try{for(e.s();!(t=e.n()).done;){var n=t.value;n.hasAttribute("xml:id")&&h()(n).find("tei-head").length>0&&menu.push({label:h()(n).find("tei-head")[0].textContent,id:n.getAttribute("xml:id")})}}catch(t){e.e(t)}finally{e.f()}var r,o=y(h()(h()(element).find("tei-group")[0]).children());try{for(o.s();!(r=o.n()).done;){var c=r.value;if(c.hasAttribute("xml:id")){var head="No Title";h()(c).find("tei-head").length>0&&(head=h()(c).find("tei-head")[0].textContent),menu.push({label:head,id:c.getAttribute("xml:id")})}}}catch(t){o.e(t)}finally{o.f()}return menu}},{key:"bbb",value:function(element){var t,menu=[],e=y(h()(h()(element).find("tei-front")[0]).children());try{for(e.s();!(t=e.n()).done;){var n=t.value;n.hasAttribute("xml:id")&&h()(n).find("tei-head").length>0&&menu.push({label:h()(n).find("tei-head")[0].textContent,id:n.getAttribute("xml:id")})}}catch(t){e.e(t)}finally{e.f()}var r=h()(h()(element).find("tei-group")[0]).children(),o=h()(r)[0],c={label:"日記",disabled:!0,id:"diary",children:this.aaa(o)};menu.push(c);var l=h()(r)[2],f={label:"日時通知表",disabled:!0,id:"schedule",children:this.aaa(l)};return menu.push(f),menu}}]),n}(v.Vue),O=k=x([Object(v.Component)({})],k),j=n(86),R=n(119),C=n.n(R),$=n(185),V=n(187),T=n(114),E=n(83),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",[n("v-list-item",[n("v-list-item-title",[n("h3",[t._v(t._s(t.$t("コンテンツ")))])])],1),t._v(" "),t._l(t.items,(function(e,r){return[e.children?[n("v-list-group",{key:r,attrs:{"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(e.label))])],1)]},proxy:!0}],null,!0)},[t._v(" "),t._l(e.children,(function(e,r){return[e.children?[n("v-list-group",{key:r,attrs:{"no-action":"","sub-group":""},scopedSlots:t._u([{key:"activator",fn:function(){return[n("v-list-item-content",[n("v-list-item-title",[t._v(t._s(e.label))])],1)]},proxy:!0}],null,!0)},[t._v(" "),t._l(e.children,(function(e,r){return[e.label?n("v-list-item",{key:r,attrs:{disabled:e.disabled},on:{click:function(n){t.id=e.id}}},[n("v-list-item-title",[t._v(t._s(e.label))])],1):t._e()]}))],2)]:[e.label?n("v-list-item",{key:r,attrs:{disabled:e.disabled},on:{click:function(n){t.id=e.id}}},[n("v-list-item-title",[t._v(t._s(e.label))])],1):t._e()]]}))],2)]:[n("v-list-item",{key:r,attrs:{disabled:e.disabled},on:{click:function(n){t.id=e.id}}},[n("v-list-item-title",[t._v(t._s(e.label))])],1)]]}))],2)}),[],!1,null,null,null);e.default=component.exports;C()(component,{VList:$.a,VListGroup:V.a,VListItem:T.a,VListItemContent:E.a,VListItemTitle:E.b})},591:function(t,e,n){"use strict";n.r(e);n(55),n(283);var r=n(21),o=n(27),c=n(31),l=n(26),f=n(22),d=n(7),v=n(154),m=n(523);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},w=n(576),_=n(510),x=function(t){Object(c.a)(n,t);var e=h(n);function n(){return Object(r.a)(this,n),e.apply(this,arguments)}return Object(o.a)(n,[{key:"xml",get:function(){return this.$store.getters.getXml},set:function(t){this.$store.commit("setXml",t)}},{key:"metadata",get:function(){var t=this.xml;if(!t)return"";var header=t.querySelector("tei-teiheader");return header?(new XMLSerializer).serializeToString(header):""}},{key:"arr",get:function(){return _(_(this.xml).find("tei-teiheader")).children()}},{key:"bbb",value:function(data){if(!data)return{};var t=w.xml2json(data.outerHTML,{compact:!1,spaces:4});return JSON.parse(t).elements[0]}}]),n}(v.Vue),k=x=y([Object(v.Component)({components:{TeiElement:m.default}})],x),O=(n(560),n(86)),component=Object(O.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"px-5"},t._l(t.arr,(function(e,r){return n("TeiElement",{key:r,attrs:{element:t.bbb(e)}})})),1)}),[],!1,null,null,null);e.default=component.exports},666:function(t,e,n){"use strict";n(586)},667:function(t,e,n){var r=n(11)(!1);r.push([t.i,".scroll{overflow-y:auto}.vertical{-ms-writing-mode:tb-rl;writing-mode:vertical-rl}tei-persName{background-color:#ffccbc}tei-placeName{background-color:#c8e6c9}tei-date{background-color:#bbdefb}tei-time{background-color:#fff9c4}tei-head{margin:20px;font-size:large!important;font-weight:700}",""]),t.exports=r},7085:function(t,e,n){"use strict";n.r(e);n(18),n(55),n(24),n(49),n(51);var r=n(553),o=n.n(r),c=n(510),l=n.n(c),f=n(590),d=n(591),v={components:{Menu:f.default,Metadata:d.default},data:function(){return{baseUrl:"https://shibusawa-dlab.github.io/app1",pages:"https://shibusawa-dlab.github.io/lab1",loading:!1,width:-1,height:-1,drawer:!1,drawer2:!1,canvas:"",manifest:null,title:""}},computed:{xml:{get:function(){return this.$store.getters.getXml},set:function(t){this.$store.commit("setXml",t)}},id:{get:function(){return this.$store.getters.getId},set:function(t){this.$store.commit("setId",t)}}},watch:{id:function(t){this.$router.push(this.localePath({name:"viewer-id",params:{id:this.$route.params.id},query:{id:t}}),(function(){}),(function(){})),this.scroll()}},mounted:function(){this.loading=!0,document.getElementById("container").addEventListener("wheel",(function(t){t.preventDefault(),document.getElementById("container").scrollLeft-=t.deltaY})),window.addEventListener("resize",this.handleResize),this.width=window.innerWidth,this.height=window.innerHeight;var t=this.$route.params.id,e=this.$route.query,n=e.u||this.pages+"/tei/"+t+".xml",r=new CETEI;r.addBehaviors({tei:{graphic:function(){}}});var o=this;r.getHTML5(n,(function(data){console.log("downloaded."),o.xml=data,o.title=l()(data).find("tei-title")[0].textContent,l()("#tei").append(data);var t=l()("tei-facsimile").attr("source");o.manifest=t;for(var n=l()("tei-pb"),r=function(i){var t=n[i];if(!l()(t).attr("corresp"))return"continue";var e=l()(t).attr("corresp").replace("#",""),canvas=l()("#"+e).attr("source"),r=l()('<div class="mx-2" style="cursor: pointer;"><img width="30px" src="'.concat(o.baseUrl,'/img/icons/image-24px.svg"/><span class="ma-1" style="color : #9E9E9E">[Page @').concat(l()(t).attr("corresp"),"]</span></div>"));r.on("click",(function(){o.canvas=canvas})),l()(t).prepend(r)},i=0;i<n.length;i++)r(i);o.loading=!1,window.setTimeout((function(){var t=e.id;t&&(o.id=t)}),1)}))},methods:{handleResize:function(){this.width=window.innerWidth,this.height=window.innerHeight},scroll:function(){if(proccess.browser){var t=this.id,e={container:"#container",offset:-1*document.querySelector("#container").getBoundingClientRect().width,x:!0};o.a.scrollTo("#"+t,0,e)}}},head:function(){return{titleTemplate:null,title:this.title}}},m=(n(666),n(86)),h=n(119),y=n.n(h),w=n(463),_=n(457),x=n(206),k=n(468),O=n(483),j=n(462),R=n(184),C=n(461),$=n(484),V=n(460),T=n(213),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[[t.loading?[n("div",{staticClass:"pa-10 text-center"},[n("p",[t._v("Loading...")]),t._v(" "),n("p",[t._v(t._s(t.$t("読み込みに少し時間がかかります。")))])])]:t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}]},[n("v-navigation-drawer",{staticStyle:{"z-index":"100000"},attrs:{app:"",temporary:!1,width:384},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-btn",{staticClass:"ma-2",attrs:{icon:"",top:"",right:""},on:{click:function(e){t.drawer=!t.drawer}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),null!=t.xml?n("Menu"):t._e()],1),t._v(" "),n("v-navigation-drawer",{attrs:{app:"",temporary:!1,right:"",width:512},model:{value:t.drawer2,callback:function(e){t.drawer2=e},expression:"drawer2"}},[n("v-btn",{staticClass:"ma-2",attrs:{icon:"",top:"",right:""},on:{click:function(e){t.drawer2=!t.drawer2}}},[n("v-icon",[t._v("mdi-close")])],1),t._v(" "),n("no-ssr",[n("Metadata")],1)],1),t._v(" "),n("v-app-bar",{attrs:{flat:""}},[n("v-btn",{attrs:{icon:""},on:{click:function(e){t.drawer=!t.drawer}}},[n("v-icon",[t._v("mdi-view-list")])],1),t._v(" "),n("v-toolbar-title",[t._v("\n          "+t._s(t.title)+"\n        ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer2=!t.drawer2}}})],1),t._v(" "),n("v-container",{attrs:{fluid:""}},[n("v-row",{staticClass:"mt-2"},[n("v-col",{attrs:{cols:"12",sm:t.manifest?6:12}},[n("v-card",{staticClass:"scroll vertical",style:"height: "+.85*t.height+"px; width: "+(t.manifest&&"xs"!=t.$vuetify.breakpoint.name?t.width/2:t.width)+"px;",attrs:{id:"container",flat:"",outlined:""}},[n("div",{staticClass:"pa-4 px-5"},[n("div",{attrs:{id:"tei"}})])])],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:t.manifest?6:12}},[t.manifest?n("iframe",{style:"height: "+.85*t.height+"px;",attrs:{src:t.baseUrl+"/mirador/?manifest="+t.manifest+"&canvas="+t.canvas+"&bottomPanel=false",width:"100%",allowfullscreen:"allowfullscreen",frameborder:"0"}}):t._e()])],1)],1)],1)]],2)}),[],!1,null,null,null);e.default=component.exports;y()(component,{VAppBar:w.a,VAppBarNavIcon:_.a,VBtn:x.a,VCard:k.a,VCol:O.a,VContainer:j.a,VIcon:R.a,VNavigationDrawer:C.a,VRow:$.a,VSpacer:V.a,VToolbarTitle:T.a})}}]);