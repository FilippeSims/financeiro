(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{3127:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{attrs:{padding:""}},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{icon:"home",to:"/sistema"}}),a("q-breadcrumbs-el",{attrs:{label:"Registro",icon:"widgets",to:"/sistema/registro"}})],1),!0===t.inserirForm?a("div",{attrs:{id:"tituloForm"}},[a("b",[t._v("Inserir Plano Conta")])]):t._e(),!0===t.editarForm&&t.checkReg.length<2&&0!=t.checkReg.length?a("div",{attrs:{id:"tituloForm"}},[a("b",[t._v("Editar Plano Conta")])]):t._e(),t._v("\n  "+t._s(t.toSave)+"\n    "),!0===t.inserirForm||!0===t.editarForm&&t.checkReg.length<2&&0!=t.checkReg.length?a("q-form",{staticClass:"q-gutter-md q-mt-sm",on:{submit:function(e){return e.preventDefault(),t.save()}}},[a("q-input",{attrs:{filled:"",dense:"",label:"Código",hint:"Código Plano de Conta","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Por favor digite o código plano de conta"}]},model:{value:t.toSave.codconta,callback:function(e){t.$set(t.toSave,"codconta",e)},expression:"toSave.codconta"}}),a("q-input",{attrs:{filled:"",dense:"",label:"Descrição",hint:"Descrição do Plano de Contas","hide-underline":"true"},model:{value:t.toSave.descricaoconta,callback:function(e){t.$set(t.toSave,"descricaoconta",e)},expression:"toSave.descricaoconta"}}),a("q-input",{attrs:{filled:"",dense:"",label:"Analítico",hint:"Analíico do Plano de Conta","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Por favor digite o analítico do plano de conta"}]},model:{value:t.toSave.analitico,callback:function(e){t.$set(t.toSave,"analitico",e)},expression:"toSave.analitico"}}),a("q-input",{attrs:{filled:"",dense:"",label:"Tipo",hint:"Tipo do Plano de Conta","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Por favor digite o tipo do plano de conta"}]},model:{value:t.toSave.tipoconta,callback:function(e){t.$set(t.toSave,"tipoconta",e)},expression:"toSave.tipoconta"}}),a("q-input",{attrs:{filled:"",dense:"",prefix:"R$",label:"Saldo",hint:"Saldo do Plano de Conta","lazy-rules":"",rules:[function(t){return t&&t.length>0||"Por favor digite o saldo do plano de conta"}]},model:{value:t.toSave.saldoconta,callback:function(e){t.$set(t.toSave,"saldoconta",e)},expression:"toSave.saldoconta"}}),a("div",[a("q-btn",{staticClass:"q-mb-sm float-left",attrs:{type:"submit",color:"green",icon:"send",unelevated:""}})],1)],1):t._e(),!1===t.inserirForm?a("q-btn",{staticClass:"q-mb-sm float-right",attrs:{color:"green",icon:"add_circle",unelevated:"",dense:""},on:{click:function(e){return t.inserirShow(!0)}}}):t._e(),!0===t.inserirForm||!0===t.editarForm&&0!=t.checkReg.length?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"red",icon:"remove_circle",unelevated:"",dense:""},on:{click:function(e){t.inserirShow(!1),t.editarShow(!1)}}}):t._e(),!1===t.inserirForm&&t.checkReg.length>0?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"red",icon:"delete_forever",unelevated:"",dense:""},on:{click:function(e){return t.remove(t.checkReg)}}}):t._e(),!1===t.inserirForm&&t.checkReg.length>0&&t.checkReg.length<2?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"primary",icon:"edit",unelevated:"",dense:""},on:{click:[function(e){return e.preventDefault(),t.toUpdate(t.checkReg[0])},function(e){return t.editarShow(!0)}]}}):t._e(),a("table",[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Ação")]),a("th",{attrs:{scope:"col"}},[t._v("Número")]),a("th",{attrs:{scope:"col"}},[t._v("Código")]),a("th",{attrs:{scope:"col"}},[t._v("Descrição")]),a("th",{attrs:{scope:"col"}},[t._v("Analítico")]),a("th",{attrs:{scope:"col"}},[t._v("Tipo")]),a("th",{attrs:{scope:"col"}},[t._v("Saldo")])])]),a("tbody",t._l(t.planoContas,(function(e,o){return a("tr",{key:o},[a("td",{attrs:{"data-label":"Ação Reg"}},[a("q-checkbox",{attrs:{val:e.nconta},model:{value:t.checkReg,callback:function(e){t.checkReg=e},expression:"checkReg"}})],1),null===e.nconta?a("td",{attrs:{"data-label":"Número"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[t._v("NULL")])],1):a("td",{attrs:{"data-label":"Número"}},[t._v(" "+t._s(e.nconta)+" ")]),null===e.codconta?a("td",{attrs:{"data-label":"Código"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[t._v("NULL")])],1):a("td",{attrs:{"data-label":"Código"}},[t._v(" "+t._s(e.codconta)+" ")]),null===e.descricaoconta?a("td",{attrs:{"data-label":"Descrição"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[t._v("NULL")])],1):a("td",{attrs:{"data-label":"Descrição"}},[t._v(" "+t._s(e.descricaoconta)+" ")]),null===e.analitico?a("td",{attrs:{"data-label":"Observação Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[t._v("NULL")])],1):a("td",{attrs:{"data-label":"Observação Reg"}},[t._v(" "+t._s(e.analitico)+" ")]),null===e.tipoconta?a("td",{attrs:{"data-label":"Descrição Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[t._v("NULL")])],1):a("td",{attrs:{"data-label":"Descrição Reg"}},[t._v(" "+t._s(e.tipoconta)+" ")]),null===e.saldoconta?a("td",{attrs:{"data-label":"Descrição Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[t._v("NULL")])],1):a("td",{attrs:{"data-label":"Descrição Reg"}},[t._v(" "+t._s(e.saldoconta)+" ")])])})),0)])],1)},n=[],s=(a("7514"),a("6b54"),a("06db"),a("a481"),localStorage.getItem("token")),r={data:function(){return{planoContas:{data:[]},checkReg:[],toSave:{},inserirForm:!1,editarForm:!1,updateStatus:!1,token:{tokenUser:s}}},methods:{save:function(){this.updateStatus?this.update():this.create()},inserirShow:function(t){this.inserirForm=t,this.toSave={},this.checkReg=[]},editarShow:function(t){this.editarForm=t},formatPrice:function(t){var e=(t/1).toFixed(2).replace(".",",");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},getList:function(){var t=this;window.axios.get("".concat("http://api.absolutier.com.br/api/sistema/v1","/planocontas"),{headers:{"x-access-token":this.token.tokenUser}}).then((function(e){t.planoContas=e.data}))},remove:function(t){var e=this;confirm("Você tem certeza que deseja apagar?")&&window.axios.delete("".concat("http://api.absolutier.com.br/api/sistema/v1","/planocontas/")+t,{headers:{"x-access-token":this.token.tokenUser}}).then((function(t){e.getList(),e.checkReg=[],e.$q.notify({color:t.data.color,timeout:1e4,textColor:"white",icon:t.data.icon,message:t.data.msg,position:"top"})}))},create:function(){var t=this;window.axios.post("".concat("http://api.absolutier.com.br/api/sistema/v1","/planocontas"),this.toSave,{headers:{"x-access-token":this.token.tokenUser}}).then((function(){t.toSave={},t.inserirForm=!1,t.editarForm=!1,t.getList(),t.$q.notify({color:"green",timeout:1e3,textColor:"white",icon:"tag_faces",message:"Registro inserido com sucesso!",position:"top"})}))},update:function(){var t=this;window.axios.put("".concat("http://api.absolutier.com.br/api/sistema/v1","/planocontas/")+this.toSave.nconta,this.toSave,{headers:{"x-access-token":this.token.tokenUser}}).then((function(){t.updateStatus=!1,t.toSave={},t.inserirForm=!1,t.editarForm=!1,t.getList(),t.$q.notify({color:"green",timeout:1e3,textColor:"white",icon:"tag_faces",message:"Registro editado com sucesso!",position:"top"})}))},toUpdate:function(t){this.updateStatus=t;var e=this.planoContas,a=e.find((function(e){return e.nconta===t}));this.toSave=a}},mounted:function(){this.getList()}},i=r,c=a("2877"),l=a("eebe"),d=a.n(l),u=a("9989"),h=a("ead5"),m=a("079e"),v=a("0378"),g=a("27f9"),p=a("9c40"),b=a("8f8e"),f=a("58a8"),k=Object(c["a"])(i,o,n,!1,null,null,null);e["default"]=k.exports;d()(k,"components",{QPage:u["a"],QBreadcrumbs:h["a"],QBreadcrumbsEl:m["a"],QForm:v["a"],QInput:g["a"],QBtn:p["a"],QCheckbox:b["a"],QBadge:f["a"]})}}]);