(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{331:function(e,t,n){var content=n(345);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(63).default)("01f3f0d4",content,!1,{sourceMap:!1})},344:function(e,t,n){"use strict";n(331)},345:function(e,t,n){var r=n(62)(!1);r.push([e.i,"tei-persName[data-v-4426f210]{background-color:#ffccbc}tei-placeName[data-v-4426f210]{background-color:#c8e6c9}tei-date[data-v-4426f210]{background-color:#bbdefb}tei-time[data-v-4426f210]{background-color:#fff9c4}tei-head[data-v-4426f210]{margin:20px;font-size:large!important;font-weight:700}",""]),e.exports=r},352:function(e,t,n){"use strict";n.r(t);n(217);var r=n(60),c=n(61),o=n(147),l=n(148),f=n(109),m=n(15),v=(n(36),n(219),n(110));function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var h=function(e,t,n,desc){var r,c=arguments.length,o=c<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(o=(c<3?r(o):c>3?r(t,n,o):r(t,n))||o);return c>3&&o&&Object.defineProperty(t,n,o),o},y=function(e){Object(o.a)(n,e);var t=d(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",e}return Object(c.a)(n,[{key:"canvas",get:function(){return this.$store.getters.canvas},set:function(e){this.$store.commit("setCanvas",e)}},{key:"facs",get:function(){return this.$store.getters.getFacs},set:function(e){this.$store.commit("setFacs",e)}},{key:"getTextContent",value:function(element){var text="";if(element.text&&(text+=element.text.trim()),element.elements)for(var i=0;i<element.elements.length;i++)text+=this.getTextContent(element.elements[i]);return text.trim()}}]),n}(v.Vue);h([Object(v.Prop)({})],y.prototype,"element",void 0);var _=y=h([Object(v.Component)({components:{TeiElement:j},name:"TeiElement"})],y),O=(n(344),n(59)),component=Object(O.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.element.name||"span",{tag:"component"},[("tei-date"==e.element.name||"tei-time"==e.element.name)&&e.element.attributes&&e.element.attributes.when?[n("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n("span",e._g(e._b({},"span",c,!1),r),[e._v(e._s(e.element.elements[0].text))])]}}],null,!1,1766447786)},[e._v(" "),n("span",[e._v(e._s(e.element.attributes.when))])])]:"text"==e.element.type?[e._v("\n    "+e._s(e.element.text)+"\n  ")]:["tei-pb"==e.element.name&&e.element.attributes&&e.element.attributes.corresp?[n("div",{staticClass:"ma-2"},[n("v-icon",{staticClass:"ma-1",attrs:{color:"purple"},on:{click:function(t){e.canvas=e.facs[e.element.attributes.corresp.replace("#","")]}}},[e._v("mdi-image")]),e._v(" "),n("span",{staticClass:"ma-1",staticStyle:{color:"grey"}},[e._v("[Page @"+e._s(e.element.attributes.corresp)+"]")])],1)]:e._e(),e._v(" "),e._l(e.element.elements,(function(e,t){return n("TeiElement",{key:t,attrs:{element:e}})}))]],2)}),[],!1,null,"4426f210",null),j=t.default=component.exports}}]);