(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{120:function(e,a,t){"use strict";var n=t(0),l=t.n(n),i=t(121),r=t.n(i);a.a=function(e){var a=null;switch(e.elemType){case"input":a=l.a.createElement("input",Object.assign({className:r.a.InputElem},e.elemConfig,{value:e.value,onChange:e.changed}));break;case"textarea":a=l.a.createElement("textarea",Object.assign({className:r.a.InputElem},e.elemConfig,{value:e.value,onChange:e.changed}));break;case"select":a=l.a.createElement("select",{className:r.a.InputElem,value:e.value,onChange:e.changed},e.elemConfig.options.map(function(e){return l.a.createElement("option",{key:e.value,value:e.value},e.name)}));break;default:a=l.a.createElement("input",Object.assign({className:r.a.InputElem},e.elemConfig,{value:e.value}))}return l.a.createElement("div",{className:r.a.Input},l.a.createElement("label",{className:r.a.Label},e.label),a,l.a.createElement("span",{className:r.a.Span,style:{visibility:e.valid?"hidden":"visible"}},"Please insert a valid value"))}},121:function(e,a,t){e.exports={Input:"Input_Input__1Au9r",Label:"Input_Label__3xUx6",InputElem:"Input_InputElem__QTjQ5",Span:"Input_Span__2BogD"}},123:function(e,a,t){e.exports={CheckoutSummary:"CheckoutSummary_CheckoutSummary__21gth"}},125:function(e,a,t){e.exports={ContactData:"ContactData_ContactData__1u62s"}},133:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),i=t(134),r=t(17),u=t(19),c=t(123),o=t.n(c),m=t(52),s=t(33),d=function(e){return l.a.createElement("div",{className:o.a.CheckoutSummary},l.a.createElement("h1",null,"We hope it tastes well!"),l.a.createElement("div",{style:{width:"100%",height:"330px",margin:"auto"}},l.a.createElement(m.a,{ingredients:e.ingredients})),l.a.createElement(s.a,{btnType:"Danger",clicked:e.checkoutCancelled},"CANCEL"),l.a.createElement(s.a,{btnType:"Success",clicked:e.checkoutContinued},"CONTINUE"))},p=t(43),v=t(15),g=t(125),h=t.n(g),f=t(42),b=t(120),E=t(14),C=t(44),y=t(7),k=t(10),I=Object(u.b)(function(e){return{ings:e.burgerBuilder.ingredients,price:e.burgerBuilder.totalPrice,loading:e.orders.loading,token:e.auth.token,userId:e.auth.userId}},function(e){return{onOrderBurger:function(a,t){return e(y.p(a,t))}}})(Object(C.a)(function(e){var a=Object(n.useState)({name:{elemType:"input",elemConfig:{type:"text",placeholder:"Your name"},validation:{required:!0,minLength:3},valid:!1,value:""},street:{elemType:"input",elemConfig:{type:"text",placeholder:"Street"},validation:{required:!0},valid:!1,value:""},zipCode:{elemType:"input",elemConfig:{type:"text",placeholder:"Zip code"},validation:{required:!0,minLength:5,maxLength:5},valid:!1,value:""},country:{elemType:"input",elemConfig:{type:"text",placeholder:"Country"},validation:{required:!0},valid:!1,value:""},email:{elemType:"input",elemConfig:{type:"email",placeholder:"Your e-mail"},validation:{required:!0,isEmail:!0},valid:!1,value:""},deliveryMethod:{elemType:"select",elemConfig:{options:[{value:"F",name:"Fastest"},{value:"C",name:"Cheapest"}]},validation:{},valid:!0,value:"F"}}),t=Object(v.a)(a,2),i=t[0],r=t[1],u=Object(n.useState)(!1),c=Object(v.a)(u,2),o=c[0],m=c[1],d=[];for(var g in i)d.push({id:g,config:i[g]});var E=l.a.createElement("form",{onSubmit:function(a){a.preventDefault();var t={};for(var n in i)t[n]=i[n].value;var l={ingredients:e.ings,price:e.price,orderData:t,userId:e.userId};e.onOrderBurger(l,e.token)}},d.map(function(e){return l.a.createElement(b.a,{key:e.id,elemType:e.config.elemType,elemConfig:e.config.elemConfig,value:e.config.value,valid:e.config.valid,changed:function(a){return function(e,a){var t=Object(k.b)(i[a],{value:e.target.value,valid:Object(k.a)(e.target.value,i[a].validation)}),n=Object(k.b)(i,Object(p.a)({},a,t)),l=!0;for(var u in i)l=i[u].valid&&l;r(n),m(l)}(a,e.id)}})}),l.a.createElement(s.a,{btnType:"Success",disable:!o},"ORDER"));return e.loading&&(E=l.a.createElement(f.a,null)),l.a.createElement("div",{className:h.a.ContactData},l.a.createElement("h4",null,"Enter your contact data"),E)},E.a));a.default=Object(u.b)(function(e){return{ings:e.burgerBuilder.ingredients,purchased:e.orders.purchased}})(function(e){var a=l.a.createElement(i.a,{to:"/"});return e.ings&&(a=l.a.createElement(d,{ingredients:e.ings,checkoutCancelled:function(){e.history.goBack()},checkoutContinued:function(){e.history.replace("/checkout/contact-data")}})),l.a.createElement("div",null,a,e.purchased?l.a.createElement(i.a,{to:"/"}):null,l.a.createElement(r.a,{path:e.match.path+"/contact-data",component:I}))})}}]);
//# sourceMappingURL=1.fc0ffead.chunk.js.map