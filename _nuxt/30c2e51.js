(window.webpackJsonp=window.webpackJsonp||[]).push([[43,13],{465:function(e,t,r){"use strict";r.r(t);r(283);var n=r(21),c=r(31),o=r(26),l=r(22),f=r(7),d=r(154);function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(l.a)(e);if(t){var c=Object(l.a)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return Object(o.a)(this,r)}}var h=function(e,t,r,desc){var n,c=arguments.length,o=c<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(o=(c<3?n(o):c>3?n(t,r,o):n(t,r))||o);return c>3&&o&&Object.defineProperty(t,r,o),o},m=function(e){Object(c.a)(r,e);var t=v(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return r}(d.Vue);h([Object(d.Prop)({required:!0})],m.prototype,"items",void 0);var y=m=h([d.Component],m),O=r(86),j=r(119),x=r.n(j),_=r(477),w=r(462),P=r(184),R=r(47),component=Object(O.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-sheet",{attrs:{color:"grey lighten-2"}},[r("v-container",{staticClass:"py-2 px-0 mx-0",attrs:{fluid:""}},[r("v-breadcrumbs",{staticClass:"py-0",attrs:{items:e.items},scopedSlots:e._u([{key:"divider",fn:function(){return[r("v-icon",[e._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1)}),[],!1,null,null,null);t.default=component.exports;x()(component,{VBreadcrumbs:_.a,VContainer:w.a,VIcon:P.a,VSheet:R.a})},466:function(e,t,r){var content=r(467);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(12).default)("b1bed018",content,!0,{sourceMap:!1})},467:function(e,t,r){var n=r(11)(!1);n.push([e.i,".theme--light.v-breadcrumbs .v-breadcrumbs__divider,.theme--light.v-breadcrumbs .v-breadcrumbs__item--disabled{color:rgba(0,0,0,.38)}.theme--dark.v-breadcrumbs .v-breadcrumbs__divider,.theme--dark.v-breadcrumbs .v-breadcrumbs__item--disabled{color:hsla(0,0%,100%,.5)}.v-breadcrumbs{align-items:center;display:flex;flex-wrap:wrap;flex:0 1 auto;list-style-type:none;margin:0;padding:18px 12px}.v-breadcrumbs li{align-items:center;display:inline-flex;font-size:14px}.v-breadcrumbs li .v-icon{font-size:16px}.v-breadcrumbs li:nth-child(2n){padding:0 12px}.v-breadcrumbs__item{align-items:center;display:inline-flex;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1)}.v-breadcrumbs__item--disabled{pointer-events:none}.v-breadcrumbs--large li,.v-breadcrumbs--large li .v-icon{font-size:16px}",""]),e.exports=n},477:function(e,t,r){"use strict";r(61);var n=r(2),c=(r(466),r(82)),o=r(5);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var d=Object(o.a)(c.a).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(n.a)({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(e){var t=this.generateRouteLink(),r=t.tag,data=t.data;return e("li",[e(r,f(f({},data),{},{attrs:f(f({},data.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),v=r(1),h=Object(v.j)("v-breadcrumbs__divider","li"),m=r(25);function y(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}t.a=Object(o.a)(m.a).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(h,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var e=[],t=!!this.$scopedSlots.item,r=[],i=0;i<this.items.length;i++){var n=this.items[i];r.push(n.text),t?e.push(this.$scopedSlots.item({item:n})):e.push(this.$createElement(d,{key:r.join("."),props:n},[n.text])),i<this.items.length-1&&e.push(this.genDivider())}return e}},render:function(e){var t=this.$slots.default||this.genItems();return e("ul",{staticClass:"v-breadcrumbs",class:this.classes},t)}})},6914:function(e,t,r){"use strict";r.r(t);r(283),r(50);var n=r(9),c=r(21),o=r(27),l=r(31),f=r(26),d=r(22),v=r(7),h=r(154),m=r(465);function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=Object(d.a)(e);if(t){var c=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,c)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var O=function(e,t,r,desc){var n,c=arguments.length,o=c<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(v.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,desc);else for(var i=e.length-1;i>=0;i--)(n=e[i])&&(o=(c<3?n(o):c>3?n(t,r,o):n(t,r))||o);return c>3&&o&&Object.defineProperty(t,r,o),o},j=function(e){Object(l.a)(f,e);var t,r=y(f);function f(){var e;return Object(c.a)(this,f),(e=r.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",e}return Object(o.a)(f,[{key:"asyncData",value:(t=Object(n.a)(regeneratorRuntime.mark((function e(t){var r,n,c,o,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.app,n=t.$content,c=t.params,"ja"===(o=r.i18n.locale)?o="":o+="/",e.next=5,n(o+"news/"+c.slug).fetch();case 5:return l=e.sent,e.abrupt("return",{page:l});case 7:case"end":return e.stop()}}),e)}))),function(e){return t.apply(this,arguments)})},{key:"title",get:function(){return this.page.title}},{key:"head",value:function(){return{title:this.title}}},{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("news"),disabled:!1,to:this.localePath({name:"news"}),exact:!0},{text:this.title}]}}]),f}(h.Vue),x=j=O([Object(h.Component)({components:{Breadcrumbs:m.default}})],j),_=r(86),w=r(119),P=r.n(w),R=r(462),component=Object(_.a)(x,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Breadcrumbs",{attrs:{items:e.bh}}),e._v(" "),r("v-container",{staticClass:"my-5"},[r("h2",{staticClass:"mb-5"},[e._v(e._s(e.page.date.split("T")[0])),r("br"),e._v(e._s(e.page.title))]),e._v(" "),r("nuxt-content",{attrs:{document:e.page}})],1)],1)}),[],!1,null,null,null);t.default=component.exports;P()(component,{VContainer:R.a})}}]);