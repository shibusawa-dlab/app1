(window.webpackJsonp=window.webpackJsonp||[]).push([[15,14,17],{465:function(t,e,r){"use strict";r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return f}));var n=r(468),o=r(1),c=Object(o.j)("v-card__actions"),l=Object(o.j)("v-card__subtitle"),f=Object(o.j)("v-card__text"),v=Object(o.j)("v-card__title");n.a},474:function(t,e,r){var content=r(475);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("7132a15d",content,!0,{sourceMap:!1})},475:function(t,e,r){var n=r(11)(!1);n.push([t.i,".theme--light.v-divider{border-color:rgba(0,0,0,.12)}.theme--dark.v-divider{border-color:hsla(0,0%,100%,.12)}.v-divider{display:block;flex:1 1 0px;max-width:100%;height:0;max-height:0;border:solid;border-width:thin 0 0;transition:inherit}.v-divider--inset:not(.v-divider--vertical){max-width:calc(100% - 72px)}.v-application--is-ltr .v-divider--inset:not(.v-divider--vertical){margin-left:72px}.v-application--is-rtl .v-divider--inset:not(.v-divider--vertical){margin-right:72px}.v-divider--vertical{align-self:stretch;border:solid;border-width:0 thin 0 0;display:inline-flex;height:inherit;min-height:100%;max-height:100%;max-width:0;width:0;vertical-align:text-bottom}.v-divider--vertical.v-divider--inset{margin-top:8px;min-height:0;max-height:calc(100% - 16px)}",""]),t.exports=n},482:function(t,e,r){"use strict";r.r(e);r(284);var n=r(21),o=r(27),c=r(31),l=r(26),f=r(22),v=r(7),d=r(154),h=r(483);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var y=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},_=function(t){Object(c.a)(r,t);var e=m(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(o.a)(r,[{key:"title",get:function(){return this.item.label}},{key:"url",get:function(){return this.item.url}}]),r}(d.Vue);y([Object(d.Prop)()],_.prototype,"item",void 0);var O=_=y([Object(d.Component)({components:{ShareButtons:h.default}})],_),j=r(86),x=r(119),w=r.n(x),k=r(206),R=r(184),P=r(448),component=Object(j.a)(O,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("span",[r("v-menu",{attrs:{top:"","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({attrs:{depressed:"",icon:""}},n),[r("v-icon",[t._v("mdi-share-variant")])],1)]}}])},[t._v(" "),r("ShareButtons",{attrs:{url:t.url,title:t.title}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;w()(component,{VBtn:k.a,VIcon:R.a,VMenu:P.a})},483:function(t,e,r){"use strict";r.r(e);r(284);var n=r(21),o=r(27),c=r(31),l=r(26),f=r(22),v=r(7),d=r(154);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},y=function(t){Object(c.a)(r,t);var e=h(r);function r(){var t;return Object(n.a)(this,r),(t=e.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",t}return Object(o.a)(r,[{key:"twitterUrl",get:function(){return"https://twitter.com/intent/tweet?url="+this.url+"&text="+this.title}},{key:"facebookUrl",get:function(){return"https://www.facebook.com/sharer/sharer.php?u="+this.url}},{key:"pocketUrl",get:function(){return"http://getpocket.com/edit?url="+this.url}}]),r}(d.Vue);m([Object(d.Prop)({required:!0})],y.prototype,"url",void 0),m([Object(d.Prop)({required:!0})],y.prototype,"title",void 0);var _=y=m([d.Component],y),O=r(86),j=r(119),x=r.n(j),w=r(206),k=r(468),R=r(184),P=r(519),component=Object(O.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{attrs:{flat:""}},[r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.twitterUrl}},n),[r("v-icon",[t._v("mdi-twitter")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Twitter"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.facebookUrl}},n),[r("v-icon",[t._v("mdi-facebook")])],1)]}}])},[t._v(" "),r("span",[t._v(t._s("Facebook"))])]),t._v(" "),r("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"ma-2",attrs:{icon:"",target:"_blank",href:t.pocketUrl}},n),[r("img",{staticStyle:{"font-size":"24px"},attrs:{src:t.baseUrl+"/img/icons/pocket.svg"}})])]}}])},[t._v(" "),r("span",[t._v(t._s("Pocket"))])])],1)}),[],!1,null,null,null);e.default=component.exports;x()(component,{VBtn:w.a,VCard:k.a,VIcon:R.a,VTooltip:P.a})},488:function(t,e,r){"use strict";var n=r(2),o=(r(474),r(25));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=o.a.extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:l({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:l({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},489:function(t,e,r){var content=r(498);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(12).default)("e6022664",content,!0,{sourceMap:!1})},497:function(t,e,r){"use strict";r(489)},498:function(t,e,r){var n=r(11)(!1);n.push([t.i,"a{text-decoration:none}",""]),t.exports=n},505:function(t,e,r){"use strict";r.r(e);r(284);var n=r(21),o=r(31),c=r(26),l=r(22),f=r(7),v=r(154),d=r(482);function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(l.a)(t);if(e){var o=Object(l.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(c.a)(this,r)}}var m=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},y=function(t){Object(o.a)(r,t);var e=h(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return r}(v.Vue);m([Object(v.Prop)({required:!0})],y.prototype,"item",void 0),m([Object(v.Prop)({default:300})],y.prototype,"width",void 0),m([Object(v.Prop)({default:300})],y.prototype,"height",void 0),m([Object(v.Prop)({default:!1})],y.prototype,"horizontal",void 0);var _=y=m([Object(v.Component)({components:{ResultOption:d.default}})],y),O=(r(497),r(86)),j=r(119),x=r.n(j),w=r(468),k=r(465),R=r(488),P=r(184),V=r(152),C=r(461),component=Object(O.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{class:t.horizontal?"":"mb-4",style:t.horizontal?"width: "+t.width+"px;":"",attrs:{"no-body":"",flat:"",outlined:""}},[t.item._source._thumbnail&&t.item._source._thumbnail.length>0?r("nuxt-link",{attrs:{to:t.item.to}},[t.item._source._thumbnail[0].includes("mdi-")?[r("div",{staticClass:"text-center grey lighten-2 pa-10",staticStyle:{height:"150px"}},[r("v-icon",{attrs:{size:"75"}},[t._v(t._s(t.item._source._thumbnail[0]))])],1)]:[r("v-img",{staticClass:"grey lighten-2",staticStyle:{height:"150px"},attrs:{src:t.item._source._thumbnail[0],contain:"",width:"100%"}})]],2):t._e(),t._v(" "),r("div",{staticClass:"pa-4",style:t.horizontal?"width: "+t.width+"px; height: "+t.height+"px; overflow-y: auto;":""},[r("nuxt-link",{attrs:{to:t.item.to||t.localePath({name:"item-id",params:{id:t.item._id}})}},[r("h4",{domProps:{innerHTML:t._s(t.$utils.formatArrayValue(t.item._source._label))}})]),t._v(" "),t.item._source.description?[r("div",{staticClass:"mt-2",domProps:{innerHTML:t._s(t.$utils.removeHead(t.$utils.xml2html(t.$utils.formatArrayValue(t.item._source.description),!0)))}})]:t._e()],2),t._v(" "),t.item.share_hide?t._e():[r("v-divider"),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("ResultOption",{attrs:{item:{label:t.$utils.formatArrayValue(t.item._source._label),url:t.$utils.formatArrayValue(t.item._source._url)}}})],1)]],2)}),[],!1,null,null,null);e.default=component.exports;x()(component,{VCard:w.a,VCardActions:k.a,VDivider:R.a,VIcon:P.a,VImg:V.a,VSpacer:C.a})}}]);