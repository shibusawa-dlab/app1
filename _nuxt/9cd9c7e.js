(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{500:function(e,t,n){"use strict";n.r(t);n(34),n(20),n(284),n(59),n(24),n(49),n(203),n(50);var r=n(9),o=n(21),c=n(27),l=n(31),h=n(26),d=n(22),f=n(7),v=n(154),y=n(103),m=n.n(y);function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var w=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},_=n(214).Network;function j(){for(var e="#",i=0;i<6;i++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}function O(p){return"http://schema.org/agential"===p?"":"http://schema.org/spatial"===p?"":"http://schema.org/temporal"===p?"":""}var x=function(e){Object(l.a)(h,e);var t,n=k(h);function h(){var e;return Object(o.a)(this,h),(e=n.apply(this,arguments)).nodes=[],e.edges=[],e.options={nodes:{},edges:{color:"lightgray"}},e}return Object(c.a)(h,[{key:"watchU",value:function(){this.init()}},{key:"created",value:function(){this.init()}},{key:"init",value:function(){this.search()}},{key:"search",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(){var u,t,n,r,o,c,l,h,i,d,s,label,f,p,v,y,k,w,_;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u=this.u,t="\n        SELECT DISTINCT ?p ?s ?label ?keyword ?label_k count(?cho) as ?count \n        ?s2 ?label2 count(?cho2) as ?count2 WHERE { \n          BIND(<".concat(u,"> as ?s)\n          ?cho ?p2 ?s . \n          ?s rdfs:label ?label . \n          ?cho ?p ?keyword . \n          filter (?p != rdf:type && ?p != schema:inLanguage \n          && ?p != schema:temporal && ?p != jps:relationType \n          && ?p != jps:region && ?p != schema:license)\n          filter(?s != ?keyword)\n          ?keyword rdfs:label ?label_k . \n          filter(?label_k != '不明' && ?label_k != 'unknown / not defined')\n        } order by desc(?count) limit 20\n      "),e.next=4,m.a.get("https://jpsearch.go.jp/rdf/sparql?query="+encodeURIComponent(t)+"&output=json");case 4:n=e.sent,r=n.data.results.bindings,o=[],c=[],l={},h={"http://schema.org/agential":"#9E9E9E","http://schema.org/about":"#4CAF50","http://schema.org/spatial":"#FF9800","http://schema.org/temporal":"#795548","http://schema.org/category":"#E91E63","http://schema.org/isPartOf":"#9C27B0"},i=0;case 11:if(!(i<r.length)){e.next=30;break}if(d=r[i],s=d.s.value,l[s]||(l[s]={label:d.label.value,index:Object.keys(l).length,icon:O("http://schema.org/agential"),uri:s,p:"http://schema.org/agential"}),label=d.label.value,label=d.name?d.name.value:label,"不明"!==(f=d.label_k.value)){e.next=20;break}return e.abrupt("continue",27);case 20:for(p=d.p.value,v=["creator","publisher","contributor","provider"],y=0;y<v.length;y++)p=p.replace("http://schema.org/"+v[y],"http://schema.org/agential");h[p]||(h[p]=j()),k=d.keyword.value,l[k]||(l[k]={label:f,index:Object.keys(l).length,icon:O(p),uri:k,p:p}),c.push({from:l[s].index,to:l[k].index,value:Math.min(Number(d.count.value),1e3),title:d.p.value+"（"+Number(d.count.value).toLocaleString()+"）",arrows:"to",color:h[p]});case 27:i++,e.next=11;break;case 30:for(w in l)_=l[w],o.push({id:_.index,label:_.label,shape:"icon",icon:{code:_.icon},uri:_.uri,p:_.p});this.nodes=o,this.edges=c;case 33:case"end":return e.stop()}}),e,this)}))),function(){return t.apply(this,arguments)})},{key:"onNodeSelected",value:function(e){var t=e.nodes;if(t.length>0){var n=this.nodes[t[0]],r="item",o={};"http://schema.org/spatial"===n.p?(r="entity",o={entity:"spatial"}):"http://schema.org/about"===n.p&&(r="keyword"),this.$router.push(this.localePath({name:r,params:o,query:{id:n.uri}}),(function(){}),(function(){}))}}}]),h}(v.Vue);w([Object(v.Prop)()],x.prototype,"u",void 0),w([Object(v.Watch)("u")],x.prototype,"watchU",null);var R=x=w([Object(v.Component)({components:{network:_}})],x),C=n(86),S=n(119),I=n.n(S),V=n(468),$=n(463),component=Object(C.a)(R,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.nodes.length>0?n("v-container",[n("h2",{staticClass:"mt-5 mb-3 text-center"},[e._v(e._s(e.$t("network")))]),e._v(" "),n("v-card",{attrs:{"no-body":"",outlined:"",flat:""}},[n("network",{ref:"network",staticStyle:{height:"600px"},attrs:{nodes:e.nodes,edges:e.edges,options:e.options},on:{click:e.onNodeSelected}})],1)],1):e._e()}),[],!1,null,null,null);t.default=component.exports;I()(component,{Network:n(500).default}),I()(component,{VCard:V.a,VContainer:$.a})},6904:function(e,t,n){"use strict";n.r(t);n(30),n(42),n(284),n(59),n(16),n(43),n(50);var r=n(9),o=n(21),c=n(27),l=n(31),h=n(26),d=n(22),f=n(7),v=n(154);function y(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,o=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw o}}}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Object(d.a)(e);if(t){var o=Object(d.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(h.a)(this,n)}}var w=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},_=function(e){Object(l.a)(d,e);var t,h=k(d);function d(){var e;return Object(o.a)(this,d),(e=h.apply(this,arguments)).loading=!0,e.baseUrl="https://shibusawa-dlab.github.io/app1",e.nodesOrg=[],e.nodes=[],e.nodesMap={},e.edgesOrg=[],e.edges=[],e.edgesMap={},e.counts=[],e.options={nodes:{color:{background:"lightgray",highlight:{background:"lightgray",border:"#FF6E00"}},borderWidthSelected:8,borderWidth:4,shapeProperties:{useBorderWithImage:!0}},edges:{},physics:{enabled:!0},layout:{randomSeed:2}},e.otherId="",e}return Object(c.a)(d,[{key:"bh",get:function(){return[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("network")}]}},{key:"asyncData",value:(t=Object(r.a)(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(68).then(n.t.bind(null,6892,3));case 2:return t=e.sent,r=t.default,e.abrupt("return",{results:r});case 5:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})},{key:"created",value:function(){for(var data=this.results,e={},t=data.nodes,i=0;i<t.length;i++){var n=t[i];e[n.id]=n}for(var r={},o=data.edges,c=0;c<o.length;c++){var l=o[c];l.id=c,l.color="lightgrey",r[c]=l}this.nodes=t,this.nodesMap=e,this.edgesMap=r,this.edges=data.edges;for(var h={},d=0;d<t.length;d++){var f=t[d];h[f.label]=f.count}var v=Object.keys(h).map((function(e){return{key:e,value:h[e]}}));v.sort((function(a,b){return a.value<b.value?1:a.value>b.value?-1:0})),this.counts=v}},{key:"onNodeSelected",value:function(e){var t=e.nodes;if(t.length>0){var n=this.nodesMap[t[0]];this.otherId=n.label}}},{key:"aaa",value:function(e){var t=e.nodes;if(t.length>0){var n=this.nodesMap[t[0]];this.$router.push(this.localePath({name:"network-id",params:{id:n.label}}))}}},{key:"bbb",value:function(e){this.$router.push(this.localePath({name:"network-id",params:{id:e}}))}},{key:"select",value:function(e){this.otherId="",e!==this.$route.params.id&&(this.otherId=e);var t=this.$refs.network;t.selectNodes([e]),t.focus(e)}},{key:"stabilized",value:function(){this.options.physics.enabled=!1,this.loading=!1}},{key:"head",value:function(){return{title:this.$t("network")}}},{key:"highlight",value:function(e){var t,n=this.edgesMap,r=[],o=e.edges,c=y(o);try{for(c.s();!(t=c.n()).done;){var l=n[t.value],h=l.to;r.includes(h)||r.push(h);var d=l.from;r.includes(d)||r.push(d)}}catch(e){c.e(e)}finally{c.f()}var f,v=y(this.nodes);try{for(v.s();!(f=v.n()).done;){var m=f.value,k=m.id;r.includes(k)||0===r.length?m.color={border:"lightgreen"}:m.color={border:"lightgray"}}}catch(e){v.e(e)}finally{v.f()}var w,_=y(this.edges);try{for(_.s();!(w=_.n()).done;){var j=w.value,O=j.id;o.includes(O)?j.color="orange":j.color="lightgray"}}catch(e){_.e(e)}finally{_.f()}}}]),d}(v.Vue),j=_=w([Object(v.Component)({components:{}})],_),O=n(86),x=n(119),R=n.n(x),C=n(477),S=n(484),I=n(463),V=n(184),$=n(152),E=n(185),P=n(114),M=n(186),N=n(188),A=n(83),B=n(485),L=n(47),component=Object(O.a)(j,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-sheet",{attrs:{color:"grey lighten-2"}},[n("v-container",{staticClass:"py-4",attrs:{fluid:""}},[n("v-breadcrumbs",{staticClass:"py-0",attrs:{items:e.bh},scopedSlots:e._u([{key:"divider",fn:function(){return[n("v-icon",[e._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),e._v(" "),n("v-container",{staticClass:"py-5",attrs:{fluid:""}},[n("h2",{staticClass:"mb-5"},[e._v(e._s(e.$t("network_of_people")))]),e._v(" "),n("p",{staticClass:"mt-2"},[e._v("\n      "+e._s(e.$t("network_lead"))+"\n    ")]),e._v(" "),e.loading?n("p",{staticClass:"text-center"},[e._v("表示に時間がかかります。")]):e._e(),e._v(" "),n("v-row",[n("v-col",{attrs:{cols:"12",sm:9}},[n("no-ssr",[n("network",{ref:"network",staticStyle:{height:"800px","background-color":"#f0f4c3"},attrs:{nodes:e.nodes,edges:e.edges,options:e.options},on:{click:e.highlight,dblclick:e.onNodeSelected,"double-click":e.aaa,stabilized:e.stabilized}})],1)],1),e._v(" "),n("v-col",{attrs:{cols:"12",sm:3}},[n("v-sheet",{staticClass:"grey lighten-3 pa-2"},[n("h3",[n("v-icon",[e._v("mdi-view-list")]),e._v(" "+e._s(e.$t("people_list"))+"\n            "),e.counts.length>0?[e._v("("+e._s(e.counts.length)+")")]:e._e()],2)]),e._v(" "),n("v-list",{staticClass:"mt-4",staticStyle:{"max-height":"800px","overflow-y":"auto"},attrs:{dense:""}},e._l(e.counts,(function(t,r){return n("v-list-item",{key:r,on:{click:function(n){return e.select(t.key)},dblclick:function(n){return e.bbb(t.key)}}},[n("v-list-item-avatar",[n("v-img",{attrs:{src:e.nodesMap[t.key].image}})],1),e._v(" "),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.key)}})],1),e._v(" "),n("v-list-item-action",[e._v("\n              "+e._s(t.value)+"\n            ")])],1)})),1)],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;R()(component,{Network:n(500).default}),R()(component,{VBreadcrumbs:C.a,VCol:S.a,VContainer:I.a,VIcon:V.a,VImg:$.a,VList:E.a,VListItem:P.a,VListItemAction:M.a,VListItemAvatar:N.a,VListItemContent:A.a,VListItemTitle:A.b,VRow:B.a,VSheet:L.a})}}]);