(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{332:function(t,e,n){"use strict";(function(t){n(217);var r=n(60),c=n(61),o=n(147),l=n(148),f=n(109),d=n(15),v=(n(36),n(42),n(64),n(110));function h(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(f.a)(t);if(e){var c=Object(f.a)(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return Object(l.a)(this,n)}}var y=function(t,e,n,desc){var r,c=arguments.length,o=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(o=(c<3?r(o):c>3?r(e,n,o):r(e,n))||o);return c>3&&o&&Object.defineProperty(e,n,o),o},m=function(e){Object(o.a)(l,e);var n=h(l);function l(){var e;return Object(r.a)(this,l),(e=n.apply(this,arguments)).baseUrl="https://shibusawa-dlab.github.io/app1",e.viewerUrl=t.env.VIEWER_URL,e}return Object(c.a)(l,[{key:"result",get:function(){return this.$store.getters.getResult},set:function(t){this.$store.commit("setResult",t)}},{key:"getId",value:function(t){var e=t.split("/");return e[e.length-1].split(".")[0]}}]),l}(v.Vue);m=y([Object(v.Component)({})],m),e.a=m}).call(this,n(151))},385:function(t,e,n){"use strict";n.r(e);var r=n(332).a,c=n(59),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-container",{staticClass:"pa-10"},[n("v-row",t._l(t.result.members,(function(e,r){return n("v-col",{key:r,attrs:{cols:"12",sm:3}},[n("v-card",{staticClass:"mb-4",attrs:{flat:"","no-body":""}},[n("nuxt-link",{attrs:{to:t.localePath({name:"viewer-id",params:{id:t.getId(e["@id"])}})}},[n("div",{staticClass:"text-center grey lighten-2 pa-10",staticStyle:{height:"150px","text-decoration":"none"}},[n("v-icon",{attrs:{size:"75"}},[t._v("mdi-file")])],1)]),t._v(" "),n("div",{staticClass:"pa-4"},[n("nuxt-link",{attrs:{to:t.localePath({name:"viewer-id",params:{id:t.getId(e["@id"])}})}},[n("h4",[t._v(t._s(e.label))])]),t._v(" "),e.description?n("p",{staticClass:"mt-2 mb-0"},[t._v("\n              "+t._s(e.description)+"\n            ")]):t._e()],1)],1)],1)})),1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);