(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{496:function(e,t,n){var content=n(515);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("e1f73028",content,!0,{sourceMap:!1})},514:function(e,t,n){"use strict";n(496)},515:function(e,t,n){var r=n(11)(!1);r.push([e.i,"tei-persName[data-v-0990af3e]{background-color:#ffccbc}tei-placeName[data-v-0990af3e]{background-color:#c8e6c9}tei-date[data-v-0990af3e]{background-color:#bbdefb}tei-time[data-v-0990af3e]{background-color:#fff9c4}tei-head[data-v-0990af3e]{margin:20px;font-size:large!important;font-weight:700}",""]),e.exports=r},517:function(e,t,n){var content=n(563);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("46d20b4a",content,!0,{sourceMap:!1})},526:function(e,t,n){"use strict";n.r(t);n(285),n(57);var r=n(21),c=n(28),o=n(32),l=n(26),f=n(22),m=n(7),v=n(154);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var h=function(e,t,n,desc){var r,c=arguments.length,o=c<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(o=(c<3?r(o):c>3?r(t,n,o):r(t,n))||o);return c>3&&o&&Object.defineProperty(t,n,o),o},y=function(e){Object(o.a)(n,e);var t=d(n);function n(){var e;return Object(r.a)(this,n),(e=t.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",e}return Object(c.a)(n,[{key:"canvas",get:function(){return this.$store.getters.canvas},set:function(e){this.$store.commit("setCanvas",e)}},{key:"facs",get:function(){return this.$store.getters.getFacs},set:function(e){this.$store.commit("setFacs",e)}},{key:"getTextContent",value:function(element){var text="";if(element.text&&(text+=element.text.trim()),element.elements)for(var i=0;i<element.elements.length;i++)text+=this.getTextContent(element.elements[i]);return text.trim()}}]),n}(v.Vue);h([Object(v.Prop)({})],y.prototype,"element",void 0);var O=y=h([Object(v.Component)({components:{TeiElement:w},name:"TeiElement"})],y),j=(n(514),n(86)),_=n(119),x=n.n(_),k=n(184),R=n(520),component=Object(j.a)(O,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.element.name||"span",{tag:"component"},[("tei-date"==e.element.name||"tei-time"==e.element.name)&&e.element.attributes&&e.element.attributes.when?[n("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,c=t.attrs;return[n("span",e._g(e._b({},"span",c,!1),r),[e._v(e._s(e.element.elements[0].text))])]}}],null,!1,1766447786)},[e._v(" "),n("span",[e._v(e._s(e.element.attributes.when))])])]:"text"==e.element.type?[e._v("\n    "+e._s(e.element.text)+"\n  ")]:["tei-pb"==e.element.name&&e.element.attributes&&e.element.attributes.corresp?[n("div",{staticClass:"ma-2"},[n("v-icon",{staticClass:"ma-1",attrs:{color:"purple"},on:{click:function(t){e.canvas=e.facs[e.element.attributes.corresp.replace("#","")]}}},[e._v("mdi-image")]),e._v(" "),n("span",{staticClass:"ma-1",staticStyle:{color:"grey"}},[e._v("[Page @"+e._s(e.element.attributes.corresp)+"]")])],1)]:e._e(),e._v(" "),e._l(e.element.elements,(function(e,t){return n("TeiElement",{key:t,attrs:{element:e}})}))]],2)}),[],!1,null,"0990af3e",null),w=t.default=component.exports;x()(component,{VIcon:k.a,VTooltip:R.a})},562:function(e,t,n){"use strict";n(517)},563:function(e,t,n){var r=n(11)(!1);r.push([e.i,"tei-encodingdesc,tei-publicationstmt,tei-publicationstmt>*,tei-sourcedesc{display:block!important}",""]),e.exports=r},583:function(e,t){},584:function(e,t){},592:function(e,t,n){"use strict";n.r(t);n(56),n(285);var r=n(21),c=n(28),o=n(32),l=n(26),f=n(22),m=n(7),v=n(154),d=n(526);function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(f.a)(e);if(t){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(e,t,n,desc){var r,c=arguments.length,o=c<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(o=(c<3?r(o):c>3?r(t,n,o):r(t,n))||o);return c>3&&o&&Object.defineProperty(t,n,o),o},O=n(578),j=n(513),_=function(e){Object(o.a)(n,e);var t=h(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"xml",get:function(){return this.$store.getters.getXml},set:function(e){this.$store.commit("setXml",e)}},{key:"metadata",get:function(){var e=this.xml;if(!e)return"";var header=e.querySelector("tei-teiheader");return header?(new XMLSerializer).serializeToString(header):""}},{key:"arr",get:function(){return j(j(this.xml).find("tei-teiheader")).children()}},{key:"bbb",value:function(data){if(!data)return{};var e=O.xml2json(data.outerHTML,{compact:!1,spaces:4});return JSON.parse(e).elements[0]}}]),n}(v.Vue),x=_=y([Object(v.Component)({components:{TeiElement:d.default}})],_),k=(n(562),n(86)),component=Object(k.a)(x,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"px-5"},e._l(e.arr,(function(t,r){return n("TeiElement",{key:r,attrs:{element:e.bbb(t)}})})),1)}),[],!1,null,null,null);t.default=component.exports}}]);