(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{369:function(t,e,r){var content=r(390);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(63).default)("697f26b8",content,!1,{sourceMap:!1})},389:function(t,e,r){"use strict";r(369)},390:function(t,e,r){var n=r(62)(!1);n.push([t.i,"mark{background-color:#ffc168}",""]),t.exports=n},432:function(t,e,r){"use strict";r.r(e);r(21),r(37),r(16),r(19),r(38),r(39),r(18);var n=r(3),l=(r(24),r(32),r(51),r(56),r(42),r(64),r(325),r(30),r(74),r(57),r(152),r(31),r(219),r(55),r(12),r(90),r(73)),o=r.n(l);function c(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return v(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,o=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return o=t.done,t},e:function(t){c=!0,l=t},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw l}}}}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var h=r(388);function f(t){var strong=1e3;return t&&(strong=t),(new Date).getTime().toString(16)+Math.floor(strong*Math.random()).toString(16)}var d={data:function(){return{page:1,perPage:24,total:0,items:[],ids:[],q:"",limit:10,aggs:{},facets:{},loading:!0,bh:[{text:this.$t("top"),disabled:!1,to:this.localePath({name:"index"}),exact:!0},{text:this.$t("fulltext_search")}]}},head:function(){return{title:this.$t("fulltext_search")}},watch:{page:function(t){var e=JSON.parse(JSON.stringify(this.$route.query));1===t?delete e["main[page]"]:e["main[page]"]=t,this.$router.push(this.localePath({name:"search",query:e}))},$route:function(t,e){this.filter(),this.list()}},computed:{length:function(){return Math.ceil(this.total/this.perPage)},filters:function(){var t=this.$route.query,e=[];for(var r in t)r.includes("refinementList")&&e.push({label:r.split("[")[2].split("]")[0],value:t[r]});return e}},mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,l,c,v,q;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("https://shibusawa-dlab.github.io/app1/data/docs.json");case 2:return r=(r=e.sent).data,t.docs=r,e.next=7,o.a.get("https://shibusawa-dlab.github.io/app1/data/index.json");case 7:return n=(n=e.sent).data,t.index=n,e.next=12,o.a.get("https://shibusawa-dlab.github.io/app1/data/facets.json");case 12:l=(l=e.sent).data,t.facets=l,c=t.$route.query,v=Number(c["main[page]"])||1,t.page=v,q=c["main[query]"]||"",t.q=q,t.filter(),t.list(),t.loading=!1;case 23:case"end":return e.stop()}}),e)})))()},methods:{init:function(){var t=JSON.parse(JSON.stringify(this.$route.query));for(var e in t)e.includes("refinementList")&&delete t[e];delete t["main[page]"],this.$router.push(this.localePath({name:"search",query:t}))},filter:function(){var t=JSON.parse(JSON.stringify(this.$route.query)),q=t["main[query]"]||"",e=this.docs,r=this.index,n=[];if(""===q)n=Object.keys(e);else{var l=q.split("　").join(" ").split(" ");for(var o in r){var v,f=!0,d=c(l);try{for(d.s();!(v=d.n()).done;){var m=v.value;if(!o.includes(m)){f=!1;break}}}catch(t){d.e(t)}finally{d.f()}f&&(n=n.concat(r[o]))}}var y=this.facets;for(var _ in t)if(_.includes("refinementList")){var x=_.split("[")[2].split("]")[0],$=t[_];"string"==typeof $&&($=[$]);var k,w=c($);try{for(w.s();!(k=w.n()).done;){var C=k.value,S=y[x][C];n=h.intersection(n,S)}}catch(t){w.e(t)}finally{w.f()}}this.total=n.length,this.ids=n.sort(),this.getAggs()},getAggs:function(){var t,e={category_lvl0:{sort:"name:asc",label:this.$t("category_lvl0"),value:{},more:!1},category_lvl1:{sort:"name:asc",label:this.$t("category_lvl1"),value:{},more:!1},date_lvl0:{sort:"name:asc",label:this.$t("year"),value:{},more:!1},date_lvl1:{sort:"name:asc",label:this.$t("yearAndMonth"),value:{},more:!1},date_lvl2:{sort:"name:asc",label:this.$t("date"),value:{},more:!1},agential:{sort:"",label:this.$t("agential"),value:{},more:!1},spatial:{sort:"",label:this.$t("spatial"),value:{},more:!1},type:{sort:"",label:this.$t("type"),value:{},more:!1}},r=this.docs,n=c(this.ids);try{for(n.s();!(t=n.n()).done;){var l=r[t.value];for(var o in e){var v=e[o].value,h=l[o];if("string"==typeof h&&(h=[h]),h){var f,d=c(h);try{for(d.s();!(f=d.n()).done;){var m=f.value;v[m]||(v[m]=0),v[m]+=1}}catch(t){d.e(t)}finally{d.f()}}}}}catch(t){n.e(t)}finally{n.f()}for(var y in e){var _=e[y],x=Object.entries(_.value);"name:asc"!==_.sort&&x.sort((function(t,e){return-(t[1]-e[1])}));var $=x.slice(0,50);e[y].value=$}this.aggs=e},search:function(){var t=JSON.parse(JSON.stringify(this.$route.query)),q=this.q||"";""===(q=q.trim())?delete t["main[query]"]:t["main[query]"]=q,delete t["main[page]"],this.page=1,this.$router.push(this.localePath({name:"search",query:t}))},list:function(){var t,e=this.$route.query["main[page]"]||1,r=[],n=c(this.ids.slice((e-1)*this.perPage,e*this.perPage));try{for(n.s();!(t=n.n()).done;){var l=t.value;r.push(this.docs[l])}}catch(t){n.e(t)}finally{n.f()}this.items=r},faceted:function(t,e){var r=JSON.parse(JSON.stringify(this.$route.query)),n=[];for(var l in r)l.includes("["+t+"]")&&(n.push(r[l]),delete r[l]);n.includes(e)?n=n.filter((function(t){return t!=e})):n.push(e);for(var i=0;i<n.length;i++)r["main[refinementList]["+t+"]["+i+"]"]=n[i];this.$router.push(this.localePath({name:"search",query:r}))},checked:function(t,e){var r=this.$route.query,n=[];for(var l in r)l.includes("["+t+"]")&&n.push(r[l]);return!!n.includes(e)},highlightRelation:function(t,e){var r,n=[],l=c(e.split("　").join(" ").split(" "));try{for(l.s();!(r=l.n()).done;){var o=r.value;o&&!n.includes(o)&&n.push(o)}}catch(t){l.e(t)}finally{l.f()}var v,h=c(this.filters);try{for(h.s();!(v=h.n()).done;){var label=v.value.value;n.includes(label)||n.push(label)}}catch(t){h.e(t)}finally{h.f()}t=String(t).replace(/<[^>]*>?/gm,"");var d,map={},m=c(n.sort((function(a,b){return b.length-a.length})));try{for(m.s();!(d=m.n()).done;){var y=d.value,_=f();map[_]='<span style="font-size : large; font-weight: bold; background-color: #FFF59D;">'+y+"</span>",t=t.split(y).join(_)}}catch(t){m.e(t)}finally{m.f()}for(var x in map)t=t.split(x).join(map[x]);return t}}},m=(r(389),r(59)),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-sheet",{attrs:{color:"grey lighten-2"}},[r("v-container",{staticClass:"py-4",attrs:{fluid:""}},[r("v-breadcrumbs",{staticClass:"py-0",attrs:{items:t.bh},scopedSlots:t._u([{key:"divider",fn:function(){return[r("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})],1)],1),t._v(" "),r("v-container",{staticClass:"my-5"},[r("h2",[t._v(t._s(t.$t("fulltext_search")))]),t._v(" "),r("p",{staticClass:"my-2"},[t._v("\n      『渋沢栄一伝記資料』別巻第1, 第2の本文を対象に検索します。検索結果に表れるキーワードが色付けされますが、ファセット・ナビゲーションを利用した際には機能しない場合があります。\n    ")]),t._v(" "),t.loading?[r("div",{staticClass:"text-center"},[r("v-progress-circular",{staticClass:"my-10",attrs:{indeterminate:"",color:"primary"}}),t._v(" "),r("p",[t._v("初回はインデックスファイルのダウンロードに時間を要します。2回目以降はキャッシュにより待ち時間が改善します。")])],1)]:[r("v-row",{staticClass:"mt-2",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",md:"12"}},[r("v-text-field",{attrs:{"background-color":"grey lighten-3",filled:"",rounded:"",dense:"",placeholder:t.$t("add_a_search_term"),"append-icon":"mdi-magnify",clearable:"","clear-icon":"mdi-close-circle"},on:{"click:append":function(e){return t.search(t.q,e)},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(t.q,e)}},model:{value:t.q,callback:function(e){t.q=e},expression:"q"}})],1)],1),t._v(" "),t.filters.length>0?r("div",[t._l(t.filters,(function(filter,e){return r("v-chip",{key:e,staticClass:"mr-2 my-2",attrs:{close:"",label:""},on:{"click:close":function(e){return t.faceted(filter.label,filter.value)}}},[t._v("\n          "+t._s(t.aggs[filter.label].label)+": "+t._s(filter.value)+"\n        ")])})),t._v(" "),t.filters.length>0?r("v-chip",{staticClass:"mr-2 my-2",attrs:{label:""},on:{click:function(e){return t.init()}}},[t._v("\n          "+t._s(t.$t("Clear all"))+"\n        ")]):t._e()],2):t._e(),t._v(" "),r("v-row",{staticClass:"mt-5",attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("h3",{staticClass:"my-0"},[t._v("\n            "+t._s(t.$t("search_result"))+": "+t._s(t.total.toLocaleString())+"\n            "+t._s(t.$t("hits"))+"\n          ")])]),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4"}}),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"2"}}),t._v(" "),r("v-col",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{cols:"12",sm:"2"}})],1),t._v(" "),r("div",{staticClass:"text-center mt-5"},[r("v-pagination",{attrs:{length:t.length,"total-visible":7},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1),t._v(" "),r("v-row",{staticClass:"mt-5"},[r("v-col",{attrs:{cols:"12",sm:"8","order-sm":"12"}},[r("v-row",t._l(t.items,(function(e){return r("v-col",{key:e.objectID,attrs:{cols:"12"}},[r("v-card",{attrs:{flat:"",outlined:""}},[r("div",{staticClass:"pa-4"},[r("nuxt-link",{attrs:{to:t.localePath({name:"item-id",params:{id:e.objectID}})}},[r("h3",[t._v(t._s(e.label))])]),t._v(" "),r("div",{staticClass:"my-2"},[e.category?r("p",[r("small",[t._v("\n                        "+t._s(e.category.lvl1)+"\n                      ")])]):t._e(),t._v(" "),r("small",[r("span",{staticClass:"mr-4"},[r("b",[t._v("ID:")]),t._v("\n                        "+t._s(e.objectID)+"\n                      ")]),t._v(" "),r("span",{staticClass:"mr-4"},[r("b",[t._v(t._s(t.$t("date_year"))+":")]),t._v("\n                        "+t._s(e.temporal))]),t._v(" "),e.agential&&e.agential.length>0?r("span",{staticClass:"mr-4"},[r("b",[t._v(t._s(t.$t("agential"))+":")]),t._v("\n                        "+t._s(e.agential.join(", "))+"\n                      ")]):t._e(),t._v(" "),e.spatial&&e.spatial.length>0?r("span",[r("b",[t._v(t._s(t.$t("spatial"))+":")]),t._v("\n                        "+t._s(e.spatial.join(", "))+"\n                      ")]):t._e()])]),t._v(" "),e.xml?r("p",{staticClass:"mt-4",staticStyle:{"max-height":"200px","overflow-y":"auto"},domProps:{innerHTML:t._s(t.highlightRelation(t.$utils.removeHead(t.$utils.xml2html(e.xml)),t.q))}}):t._e()],1)])],1)})),1)],1),t._v(" "),r("v-col",{attrs:{cols:"12",sm:"4","order-sm":"1"}},t._l(t.aggs,(function(e,n){return r("v-expansion-panels",{key:n,staticClass:"mb-4",attrs:{value:0,flat:""}},[r("v-expansion-panel",[r("v-expansion-panel-header",{staticClass:"grey lighten-2"},[r("h3",[t._v(t._s(e.label))])]),t._v(" "),r("v-expansion-panel-content",{staticClass:"py-2",attrs:{outlined:""}},[t._l(e.value,(function(l,o){return[o<t.limit||e.more?r("div",{key:o,staticClass:"mt-1",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.faceted(n,l[0])}}},[t.checked(n,l[0])?[r("v-icon",{attrs:{color:"primary"}},[t._v(" mdi-checkbox-marked ")])]:[r("v-icon",[t._v(" mdi-checkbox-blank-outline ")])],t._v("\n                    "+t._s(l[0])+"\n                    "),r("v-chip",{attrs:{small:""}},[t._v("\n                      "+t._s(l[1])+"\n                    ")])],2):t._e()]})),t._v(" "),e.value.length>=t.limit?r("v-btn",{staticClass:"mt-4",attrs:{color:"primary",small:""},on:{click:function(t){e.more=!e.more}}},[t._v(t._s(t.$t(e.more?"Show less":"Show more")))]):t._e()],2)],1)],1)})),1)],1),t._v(" "),r("div",{staticClass:"text-center mt-10"},[r("v-pagination",{attrs:{length:t.length,"total-visible":7},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)]],2)],1)}),[],!1,null,null,null);e.default=component.exports}}]);