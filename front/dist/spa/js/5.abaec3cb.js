(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{1310:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{attrs:{padding:""}},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{icon:"home",to:"/sistema"}}),a("q-breadcrumbs-el",{attrs:{label:"Lançamentos",icon:"widgets",to:"/sistema/lanc"}})],1),!0===e.pagarStatus?a("div",{attrs:{id:"pagar"}},[!0===e.pagarStatus?a("div",{staticClass:"q-mt-sm",attrs:{id:"tituloForm"}},[a("b",[e._v("Pagar")])]):e._e(),a("q-form",{staticClass:"q-gutter-md q-mt-sm",on:{submit:function(t){return t.preventDefault(),e.pagar()}}},[a("q-input",{attrs:{dense:"",filled:"",label:"Número lançamento"},model:{value:e.toSave.nlanc,callback:function(t){e.$set(e.toSave,"nlanc",t)},expression:"toSave.nlanc"}}),a("q-input",{attrs:{dense:"",filled:"",prefix:"R$",label:"Valor",hint:"Valor do lançamento"},model:{value:e.toSave.vlrlanc,callback:function(t){e.$set(e.toSave,"vlrlanc",t)},expression:"toSave.vlrlanc"}}),a("q-input",{attrs:{filled:"",dense:"",label:"Observação",hint:"Observação do registro","hide-underline":"true",type:"textarea",rows:"2"},model:{value:e.toSave.obspagar,callback:function(t){e.$set(e.toSave,"obspagar",t)},expression:"toSave.obspagar"}}),a("q-select",{attrs:{dense:"",filled:"",label:"Forma de pagamento",hint:"Forma de Pagamento",options:e.optionsFormaP},model:{value:e.toSave.formaP,callback:function(t){e.$set(e.toSave,"formaP",t)},expression:"toSave.formaP"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Parcelas",hint:"Número de Parcelas","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Por favor digite um número de parcelas!"},function(e){return"0"!==e||"O número de parcelas não pode ser 0!"}]},model:{value:e.toSave.nparcelas,callback:function(t){e.$set(e.toSave,"nparcelas",t)},expression:"toSave.nparcelas"}}),!0===e.previaView?a("div",{staticClass:"previa"},[e._l(parseInt(e.toSave.nparcelas),(function(t){return a("li",{key:t,staticClass:"listReg"},[e._v("\n          "+e._s(t+"x: "+e.toSave.vlrlanc/e.toSave.nparcelas+" | "+e.dataHoje(e.toSave.formaP.vencimento,t))+"\n        ")])})),a("q-toggle",{attrs:{"checked-icon":"check","unchecked-icon":"clear",color:"green",label:"Você conferiu os dados?","keep-color":""},model:{value:e.previewConfere,callback:function(t){e.previewConfere=t},expression:"previewConfere"}}),a("br"),!1===e.previewConfere?a("q-btn",{staticClass:"q-mt-sm float-left",attrs:{type:"submit",color:"green",icon:"send",unelevated:"",dense:"",disabled:""}}):e._e(),!0===e.previewConfere?a("q-btn",{staticClass:"q-mt-sm float-left",attrs:{type:"submit",color:"green",icon:"send",unelevated:"",dense:""}}):e._e()],2):e._e(),!1===e.previaView?a("q-btn",{staticClass:"q-mt-sm float-left",attrs:{type:"submit",color:"green",icon:"visibility",unelevated:"",dense:""},on:{click:function(t){e.previaView=!0}}}):e._e()],1)],1):e._e(),!0===e.contabStatus?a("div",{attrs:{id:"contab"}},[!0===e.contabStatus?a("div",{staticClass:"q-mt-sm",attrs:{id:"tituloForm"}},[a("b",[e._v("Contab")])]):e._e(),a("q-form",{staticClass:"q-gutter-md q-mt-sm",on:{submit:function(t){return t.preventDefault(),e.contab()}}},[a("q-input",{attrs:{dense:"",filled:"",label:"Número lançamento",disable:""},model:{value:e.toSave.nlanc,callback:function(t){e.$set(e.toSave,"nlanc",t)},expression:"toSave.nlanc"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Valor lançamento"},model:{value:e.toSave.vlrlanc,callback:function(t){e.$set(e.toSave,"vlrlanc",t)},expression:"toSave.vlrlanc"}}),a("q-input",{attrs:{type:"number",dense:"",filled:"",label:"Número lançamento"},model:{value:e.quantidadeForm,callback:function(t){e.quantidadeForm=t},expression:"quantidadeForm"}}),e._l(parseInt(e.quantidadeForm),(function(t){return a("div",{key:t,staticClass:"q-gutter-xm row"},[a("q-select",{staticClass:"selectContab q-mr-sm",attrs:{dense:"",filled:"",label:"Número Plano de Conta",hint:"Número do Plano de Conta",options:e.planoConta,"option-disable":"inactive","option-value":"nconta","option-label":"descricaoconta","emit-value":"","map-options":""},model:{value:e.toSave["planoConta"+t],callback:function(a){e.$set(e.toSave,"planoConta"+t,a)},expression:"toSave['planoConta' + quantidade]"}}),a("q-select",{staticClass:"selectContab2",attrs:{dense:"",filled:"",label:"Tipo Contab",hint:"Tipo de Contabilização",options:e.optionTipoContab},model:{value:e.toSave["tipoContab"+t],callback:function(a){e.$set(e.toSave,"tipoContab"+t,a)},expression:"toSave['tipoContab' + quantidade]"}}),a("q-input",{staticClass:"selectContab q-ml-sm",attrs:{dense:"",filled:"",prefix:"R$",label:"Valor",hint:"Valor do lançamento"},model:{value:e.toSave["vlrlanc"+t],callback:function(a){e.$set(e.toSave,"vlrlanc"+t,a)},expression:"toSave['vlrlanc' + quantidade]"}})],1)})),a("q-input",{attrs:{filled:"",dense:"",label:"Observação",hint:"Observação do registro","hide-underline":"true",type:"textarea",rows:"2"},model:{value:e.toSave.obsContab,callback:function(t){e.$set(e.toSave,"obsContab",t)},expression:"toSave.obsContab"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Verificação Contab"},model:{value:e.verificacaoContab,callback:function(t){e.verificacaoContab=t},expression:"verificacaoContab"}}),a("q-btn",{staticClass:"q-mt-sm q-mb-sm float-left",attrs:{color:"green",icon:"send",unelevated:"",dense:""},on:{click:function(t){return e.testando(e.quantidadeForm,e.toSave.vlrlanc)}}})],2)],1):e._e(),!0===e.inserirForm||!0===e.editarForm&&e.checkReg.length<2&&0!=e.checkReg.length?a("div",{attrs:{id:"formLanc"}},[!0===e.inserirForm?a("div",{attrs:{id:"tituloForm"}},[a("b",[e._v("Inserir registro")])]):e._e(),!0===e.editarForm&&e.checkReg.length<2&&0!=e.checkReg.length?a("div",{attrs:{id:"tituloForm"}},[a("b",[e._v("Editar registro")])]):e._e(),a("q-toggle",{attrs:{"checked-icon":"check","unchecked-icon":"clear",color:"green",label:"Existe registro?","keep-color":""},model:{value:e.toggleFormReg,callback:function(t){e.toggleFormReg=t},expression:"toggleFormReg"}}),!0===e.toggleFormReg?a("div",{attrs:{id:"registroLanc"}},[a("q-form",{staticClass:"q-gutter-md",on:{submit:function(t){return t.preventDefault(),e.save()}}},[a("div",{staticClass:"paginacao q-mb-sm"},[a("q-btn",{attrs:{disabled:0===e.pageNumber,icon:"navigate_before",color:"primary",unelevated:"",dense:""},on:{click:function(t){e.pageNumber-=1}}}),a("q-btn",{staticClass:"q-ml-sm",attrs:{disabled:e.pageNumber>=e.pageCount-1,icon:"navigate_next",color:"primary",unelevated:"",dense:""},on:{click:function(t){e.pageNumber+=1}}})],1),e._l(e.paginatedData,(function(t,o){return a("li",{key:o,staticClass:"listReg",on:{click:function(a){return a.preventDefault(),e.registron(t.nreg)}}},[a("q-btn",{attrs:{round:"",size:"8px",color:"positive",icon:"check",outline:"",unelevated:""}}),a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"light-blue-4"}},[e._v("\n           Número: "+e._s(t.nreg)+"\n          ")]),a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"pink-4"}},[e._v("\n            Data: "+e._s(e._f("formatDate")(t.dtreg))+"\n          ")]),a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"orange-5"}},[e._v("\n            Valor: "+e._s(t.valorreg)+"\n          ")])],1)})),a("q-input",{attrs:{dense:"",filled:"",label:"Número Registro",hint:"Número do registro",disable:""},model:{value:e.toSave.nreg,callback:function(t){e.$set(e.toSave,"nreg",t)},expression:"toSave.nreg"}}),a("q-input",{attrs:{dense:"",filled:"",prefix:"R$",label:"Valor",hint:"Valor do lançamento"},model:{value:e.toSave.valorreg,callback:function(t){e.$set(e.toSave,"valorreg",t)},expression:"toSave.valorreg"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Data",hint:"Data do lançamento"},model:{value:e.toSave.dtreg,callback:function(t){e.$set(e.toSave,"dtreg",t)},expression:"toSave.dtreg"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Objeto",hint:"Objeto do lançamento"},model:{value:e.toSave.objlanc,callback:function(t){e.$set(e.toSave,"objlanc",t)},expression:"toSave.objlanc"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Parte",hint:"Parte do lançamento"},model:{value:e.toSave.partelanc,callback:function(t){e.$set(e.toSave,"partelanc",t)},expression:"toSave.partelanc"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Centro Contábil",hint:"Centro Contábil lançamento"},model:{value:e.toSave.centrocontalanc,callback:function(t){e.$set(e.toSave,"centrocontalanc",t)},expression:"toSave.centrocontalanc"}}),a("div",[a("q-btn",{staticClass:"q-mb-sm float-left",attrs:{type:"submit",color:"green",icon:"send",unelevated:""}})],1)],2)],1):a("div",{attrs:{id:"semRegistroLanc"}},[a("q-form",{staticClass:"q-gutter-md",on:{submit:function(t){return t.preventDefault(),e.save()}}},[!0===e.editarForm?a("q-input",{attrs:{dense:"",filled:"",label:"Número Registro",hint:"Número do Registro"},model:{value:e.toSave.regn,callback:function(t){e.$set(e.toSave,"regn",t)},expression:"toSave.regn"}}):e._e(),a("q-input",{attrs:{dense:"",filled:"",prefix:"R$","reverse-fill-mask":"",label:"Valor",hint:"Valor do lançamento"},model:{value:e.toSave.vlrlanc,callback:function(t){e.$set(e.toSave,"vlrlanc",t)},expression:"toSave.vlrlanc"}}),a("q-date",{attrs:{minimal:""},model:{value:e.toSave.dtlanc,callback:function(t){e.$set(e.toSave,"dtlanc",t)},expression:"toSave.dtlanc"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Objeto",hint:"Objeto do lançamento"},model:{value:e.toSave.objlanc,callback:function(t){e.$set(e.toSave,"objlanc",t)},expression:"toSave.objlanc"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Parte",hint:"Parte do lançamento"},model:{value:e.toSave.partelanc,callback:function(t){e.$set(e.toSave,"partelanc",t)},expression:"toSave.partelanc"}}),a("q-input",{attrs:{dense:"",filled:"",label:"Centro Contábil",hint:"Centro Contábil lançamento"},model:{value:e.toSave.centrocontalanc,callback:function(t){e.$set(e.toSave,"centrocontalanc",t)},expression:"toSave.centrocontalanc"}}),a("div",[a("q-btn",{staticClass:"q-mb-sm float-left",attrs:{type:"submit",color:"green",icon:"send",unelevated:""}})],1)],1)],1)],1):e._e(),!1===e.inserirForm&&!1===e.pagarStatus?a("q-btn",{staticClass:"q-mb-sm float-right",attrs:{color:"green",icon:"add_circle",unelevated:"",dense:""},on:{click:function(t){return e.inserirShow(!0)}}}):e._e(),!0===e.inserirForm||!0===e.editarForm&&0!=e.checkReg.length?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"red",icon:"remove_circle",unelevated:"",dense:""},on:{click:function(t){e.inserirShow(!1),e.editarShow(!1),e.pagarShow(!1)}}}):e._e(),!1===e.inserirForm&&e.checkReg.length>0&&!1===e.pagarStatus?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"red",icon:"delete_forever",dense:"",unelevated:""},on:{click:function(t){return e.remove(e.checkReg)}}}):e._e(),!1===e.inserirForm&&e.checkReg.length>0&&e.checkReg.length<2&&!1===e.pagarStatus?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"primary",icon:"edit",unelevated:"",dense:""},on:{click:[function(t){return t.preventDefault(),e.toUpdate(e.checkReg[0])},function(t){return e.editarShow(!0)}]}}):e._e(),!1===e.pagarStatus&&!1===e.inserirForm&&e.checkReg.length>0&&e.checkReg.length<2?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"teal-4",icon:"assignment",label:"Contab",unelevated:"",dense:""},on:{click:[function(t){return t.preventDefault(),e.toUpdate(e.checkReg[0])},function(t){return e.contabShow(!0)}]}}):e._e(),!1===e.pagarStatus&&!1===e.inserirForm&&e.checkReg.length>0&&e.checkReg.length<2?a("q-btn",{staticClass:"q-mr-sm float-right",attrs:{color:"light-green",icon:"attach_money",label:"pagar",unelevated:"",dense:""},on:{click:[function(t){return t.preventDefault(),e.toUpdate(e.checkReg[0])},function(t){return e.pagarShow(!0)}]}}):e._e(),!0===e.pagarStatus?a("q-btn",{staticClass:"q-mb-sm q-mt-sm float-right",attrs:{color:"red",icon:"remove_circle",unelevated:"",dense:""},on:{click:function(t){return e.pagarShow(!1)}}}):e._e(),a("table",[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[e._v("Ação")]),a("th",{attrs:{scope:"col"}},[e._v("Número Reg")]),a("th",{attrs:{scope:"col"}},[e._v("Número Lanc")]),a("th",{attrs:{scope:"col"}},[e._v("Valor Lanc")]),a("th",{attrs:{scope:"col"}},[e._v("Data Lanc")]),a("th",{attrs:{scope:"col"}},[e._v("Objeto Lanc")]),a("th",{attrs:{scope:"col"}},[e._v("Descrição Lanc")]),a("th",{attrs:{scope:"col"}},[e._v("Centro Lanc")])])]),a("tbody",e._l(e.lancs,(function(t,o){return a("tr",{key:o},[a("td",{attrs:{"data-label":"Ação"}},[a("q-checkbox",{attrs:{val:t.nlanc},model:{value:e.checkReg,callback:function(t){e.checkReg=t},expression:"checkReg"}})],1),null===t.regn?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Número Reg"}},[e._v(e._s(t.regn))]),null===t.nlanc?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Número Lanc"}},[e._v(e._s(t.nlanc))]),null===t.vlrlanc?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Valor Lanc"}},[e._v(" "+e._s("R$ "+t.vlrlanc)+" ")]),null===t.dtlanc?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Data Lanc"}},[e._v(e._s(e._f("formatDate")(t.dtlanc)))]),null===t.objlanc?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Objeto Lanc"}},[e._v(e._s(t.objlanc))]),null===t.partelanc?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Descrição Lanc"}},[e._v(e._s(t.partelanc))]),null===t.centrocontalanc?a("td",{attrs:{"data-label":"Número Reg"}},[a("q-badge",{staticClass:"q-ml-sm",attrs:{color:"red"}},[e._v("NULL")])],1):a("td",{attrs:{"data-label":"Centro Lanc"}},[e._v(e._s(t.centrocontalanc))])])})),0)])],1)},n=[],s=(a("f751"),a("7514"),a("c5f6"),a("c1df")),r=a.n(s),i=localStorage.getItem("token"),l={data:function(){return{toggleFormReg:!1,checkReg:[],checknRegLanc:[],registros:{data:[]},lancs:{data:[]},toSave:{},inserirForm:!1,editarForm:!1,updateStatus:!1,pagarStatus:!1,previaView:!1,previewConfere:!1,contabStatus:!1,pageNumber:0,quantidadeForm:2,planoConta:{data:[]},verificacaoContab:0,optionTipoContab:[{value:"cred",label:"Crédito"},{value:"deb",label:"Débito"}],optionsFormaP:[{label:"Dinheiro",value:1,nomeForma:"Dinheiro"},{label:"Cheque",value:2,nomeForma:"Cheque"},{label:"Cartão Master - BB - Vencimento: 03",value:3,nomeForma:"Cartão de Crédito",bandeira:"Master",emissor:"Banco do Brasil",final:"03",vencimento:"03",melhorVencimento:"21"},{label:"Cartão Visa - BB - Vencimento: 22",value:4,nomeForma:"Cartão de Crédito",bandeira:"Visa",emissor:"Banco do Brasil",final:"22",vencimento:"22",melhorVencimento:"10"},{label:"Cartão Elo - BB - 0992 - Vencimento: 10",value:5,nomeForma:"Cartão de Crédito",bandeira:"Mastercard",emissor:"Nubank",final:"4419",vencimento:"10",melhorVencimento:"30"}],token:{tokenUser:i}}},props:{size:{type:Number,required:!1,default:3}},methods:{save:function(){this.updateStatus?this.update():this.create()},pagar:function(){this.criarPagar()},contab:function(){this.criarContab()},inserirShow:function(e){this.inserirForm=e,this.toSave={},this.checkReg=[]},editarShow:function(e){this.editarForm=e},pagarShow:function(e){this.pagarStatus=e,!1===e&&(this.toSave={},this.checkReg=[])},contabShow:function(e){this.contabStatus=e,!1===e&&(this.toSave={},this.checkReg=[])},planoCont:function(e){var t=0,a=0,o=0,n=0,s=[];for(t=0;t<e;t++){var r=t+1;a=this.toSave["planoConta"+r],o=this.toSave["tipoContab"+r].value,n=this.toSave["vlrlanc"+r];var i={};i=[{planoCon:a},{tipoCon:o},{val:n}],s.push(i)}return s},buscarTipoPlano:function(e){var t=this,a=0,o=[],n=this.planoCont(e),s=function(){var e=n[a][0];r=t.planoConta;var s=r.filter((function(t){return t.nconta===e.planoCon})).map((function(e){return e.tipoconta})),i=[{tipoPlano:s}];o.push(i)};for(a=0;a<e;a++){var r;s()}return o},testando:function(e,t){var a=this,o=this.planoCont(e),n=this.buscarTipoPlano(e),s=0,r=0,i=0,l=0,c=0,d=[];for(s=0;s<e;s++){var u=n[s][0].tipoPlano[0],m=o[s][1].tipoCon;if("d"===u){if("cred"===m){var b=s+1;r+=parseFloat(this.toSave["vlrlanc"+b])}if("deb"===m){var v=s+1;i+=parseFloat(this.toSave["vlrlanc"+v])}}if("c"===u){if("cred"===m){var f=s+1;l+=parseFloat(this.toSave["vlrlanc"+f])}if("deb"===m){var p=s+1;c+=parseFloat(this.toSave["vlrlanc"+p])}}}var g=r-i,h=l-c,j=t===g,k=g+h,S=[];for(s=0;s<e;s++){var q,C=n[s][0].tipoPlano[0],_=o[s][1].tipoCon;if("d"===C&&"cred"===_)(function(){var e=o[s][0];q=a.planoConta;var t=q.filter((function(t){return t.nconta===e.planoCon})).map((function(e){return e.saldoconta})),n=q.filter((function(t){return t.nconta===e.planoCon})).map((function(e){return e.descricaoconta})),r=[{saldoconta:t},{descricaoconta:n}];d.push(r)})()}var w=d.length,x=!1,F=!1,R=!1,y=0,N="",L=0;for(s=0;s<w;s++){var $=s+1;y=d[s][0].saldoconta[0],N=d[s][1].descricaoconta[0],L=parseFloat(this.toSave["vlrlanc"+$]),L<=y?(x=!0,F=!0):(x=!0,F=!1),!0===x&&!0===F?R=!0:(R=!1,S=[{color:"warning"},{textColor:"black"},{icon:"warning"},{msg:"Você não tem saldo suficiente em "+N+"!"}],this.$q.notify({color:S[0].color,timeout:5e3,textColor:S[1].textColor,icon:S[2].icon,message:S[3].msg,position:"top"}))}!0===R&&(!0===j?0===k?(this.toSave.qtd=this.quantidadeForm,window.axios.post("".concat("http://api.absolutier.com.br/api/sistema/v1","/contab"),this.toSave).then((function(){a.$q.notify({color:"green",timeout:5e3,textColor:"white",icon:"mood",message:"Operação realizada com sucesso!",position:"top"})}))):this.$q.notify({color:"warning",timeout:5e3,textColor:"black",icon:"warning",message:"Verique os valores da conta devedor e credor!",position:"top"}):this.$q.notify({color:"warning",timeout:5e3,textColor:"black",icon:"warning",message:"O valor está diferente do que o lançamento!",position:"top"}))},dataHoje:function(e,t){var a=new Date,o=new Date(a.setDate(e));if(e){var n=new Date(o.setMonth(a.getMonth()+t));return r()(n).format("DD/MM/YYYY")}var s=new Date,i=new Date(s.setMonth(s.getMonth()+t));return r()(i).format("DD/MM/YYYY")},registron:function(e){var t=this.registros,a=t.find((function(t){return t.nreg===e}));this.toSave=a},getRegistro:function(){var e=this;window.axios.get("".concat("http://api.absolutier.com.br/api/sistema/v1","/registro"),{headers:{"x-access-token":this.token.tokenUser}}).then((function(t){e.registros=t.data}))},nextReg:function(){this.pageNumber++},prevPage:function(){this.pageNumber--},getContab:function(){var e=this;window.axios.get("".concat("http://api.absolutier.com.br/api/sistema/v1","/planocontas"),{headers:{"x-access-token":this.token.tokenUser}}).then((function(t){e.planoConta=t.data}))},getList:function(){var e=this;window.axios.get("".concat("http://api.absolutier.com.br/api/sistema/v1","/lanc"),{headers:{"x-access-token":this.token.tokenUser}}).then((function(t){e.lancs=t.data}))},remove:function(e){var t=this;confirm("Você tem certeza que deseja apagar?")&&window.axios.delete("".concat("http://api.absolutier.com.br/api/sistema/v1","/lanc/")+e,{headers:{"x-access-token":this.token.tokenUser}}).then((function(e){t.getList(),t.checkReg=[],t.$q.notify({color:e.data.color,timeout:1e4,textColor:"white",icon:e.data.icon,message:e.data.msg,position:"top"})}))},create:function(){var e=this;window.axios.post("".concat("http://api.absolutier.com.br/api/sistema/v1","/lanc"),this.toSave,{headers:{"x-access-token":this.token.tokenUser}}).then((function(){e.toSave={},e.inserirForm=!1,e.editarForm=!1,e.getList(),e.$q.notify({color:"green",timeout:1e3,textColor:"white",icon:"tag_faces",message:"Registro inserido com sucesso!",position:"top"})}))},update:function(){var e=this;window.axios.put("".concat("http://api.absolutier.com.br/api/sistema/v1","/lanc/")+this.toSave.nlanc,this.toSave,{headers:{"x-access-token":this.token.tokenUser}}).then((function(){e.updateStatus=!1,e.toSave={},e.inserirForm=!1,e.editarForm=!1,e.checkReg=[],e.getList(),e.$q.notify({color:"green",timeout:1e3,textColor:"white",icon:"tag_faces",message:"Registro editado com sucesso!",position:"top"})}))},toUpdate:function(e){this.updateStatus=e;var t=this.lancs,a=t.find((function(t){return t.nlanc===e}));this.toSave=a},criarPagar:function(){var e=this;window.axios.post("".concat("http://api.absolutier.com.br/api/sistema/v1","/pagar"),this.toSave).then((function(){e.toSave={},e.inserirForm=!1,e.editarForm=!1,e.pagarStatus=!1,e.previaView=!1,e.previewConfere=!1,e.getList(),e.$q.notify({color:"green",timeout:1e3,textColor:"white",icon:"tag_faces",message:"Pagamentos enviados com sucesso",position:"top"})}))},criarContab:function(){var e=this,t=this.toSave,a={qtd:this.quantidadeForm},o=Object.assign({},t,a);window.axios.post("".concat("http://api.absolutier.com.br/api/sistema/v1","/contab"),o).then((function(){e.toSave={},e.inserirForm=!1,e.editarForm=!1,e.pagarStatus=!1,e.previaView=!1,e.previewConfere=!1,e.getList(),e.$q.notify({color:"green",timeout:1e3,textColor:"white",icon:"tag_faces",message:"Comtab enviados com sucesso",position:"top"})}))}},computed:{pageCount:function(){var e=this.registros.length,t=this.size;return Math.ceil(e/t)},paginatedData:function(){var e=this.pageNumber*this.size,t=e+this.size;return this.registros.slice(e,t)}},mounted:function(){this.getRegistro(),this.getList(),this.getContab()}},c=l,d=a("2877"),u=a("eebe"),m=a.n(u),b=a("9989"),v=a("ead5"),f=a("079e"),p=a("0378"),g=a("27f9"),h=a("ddd8"),j=a("9564"),k=a("9c40"),S=a("58a8"),q=a("52ee"),C=a("8f8e"),_=Object(d["a"])(c,o,n,!1,null,null,null);t["default"]=_.exports;m()(_,"components",{QPage:b["a"],QBreadcrumbs:v["a"],QBreadcrumbsEl:f["a"],QForm:p["a"],QInput:g["a"],QSelect:h["a"],QToggle:j["a"],QBtn:k["a"],QBadge:S["a"],QDate:q["a"],QCheckbox:C["a"]})},4678:function(e,t,a){var o={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"73332","./en-il.js":"73332","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df48","./fa.js":"8df48","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b46","./gd.js":"f6b46","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e4","./ja.js":"079e4","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=s(e);return a(t)}function s(e){if(!a.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}n.keys=function(){return Object.keys(o)},n.resolve=s,e.exports=n,n.id="4678"}}]);