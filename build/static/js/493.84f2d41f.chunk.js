"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[493],{6087:function(e,t,n){n.d(t,{a:function(){return r}});var r=function(){return JSON.parse(localStorage.getItem("WalletID"))}},1754:function(e,t,n){var r=n(1243),s=n(2791),a=n(5218),o=n(9821),l=n(1183),i=n(184);t.Z=function(e){var t=e.isLoading,n=e.setIsLoading,c=e.setModalOpen,d=e.DltTitle,u=e.handleData,p=e.endpoint;return(0,i.jsxs)(s.Fragment,{children:[(0,i.jsxs)("h1",{className:"text-xl text-[#c14029]",children:["Are you sure you wanted to ",d,"?"]}),(0,i.jsxs)("div",{className:"mt-20 flex items-center justify-end gap-3 lg:gap-5",children:[(0,i.jsxs)("button",{onClick:function(){return c(!1)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,i.jsxs)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})," ","Cancel"]}),t?(0,i.jsx)(l.Z,{}):(0,i.jsxs)("button",{type:"submit",onClick:function(e){return function(e){e.preventDefault(),n(!0);var t=JSON.parse(localStorage.getItem("authInfo"));r.Z.delete("".concat(p),{headers:{Authorization:"Token "+t.token}}).then((function(e){"error"===e.data.status?(a.Am.error(e.data.message),n(!1)):(a.Am.success(e.data.message),n(!1),u(),c(!1))})).catch((function(e){(0,o.D)(e),n(!1)}))}(e)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,i.jsx)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-check",children:(0,i.jsx)("polyline",{points:"20 6 9 17 4 12"})})," ","Confirm"]})]})]})}},2493:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var r=n(4165),s=n(5861),a=n(9439),o=n(2791),l=n(1243),i=n(2545),c=n(9477),d=n(1605),u=n(1754),p=n(822),x=n(1413),f=n(1402),h=n(5218),m=n(9821),g=n(6087),w=n(184),j=function(e){var t=e.setModalOpen,n=e.getData,i=JSON.parse(localStorage.getItem("authInfo")),c=(0,o.useState)({address:"",networkName:"",cryptoName:"",wallet:(0,g.a)().wallet_id}),d=(0,a.Z)(c,2),u=d[0],p=d[1];function j(){return(j=(0,s.Z)((0,r.Z)().mark((function e(){var s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.Z.post("".concat("http://api.bazigaar.com").concat(f.f.wallet.createCrypto),u,{headers:{Authorization:"Token "+i.token}});case 3:"error"===(s=e.sent).data.type?h.Am.error(s.data.msg):(h.Am.success(s.data.msg),t(!1),n()),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),(0,m.D)(e.t0),t(!1);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}var b=function(e){e.preventDefault(),function(){j.apply(this,arguments)}()};return(0,w.jsx)(o.Fragment,{children:(0,w.jsxs)("form",{action:"",children:[(0,w.jsxs)("div",{children:[(0,w.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Crypto Name"}),(0,w.jsxs)("select",{className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Status",onChange:function(e){p((0,x.Z)((0,x.Z)({},u),{},{cryptoName:e.target.value}))},required:!0,children:[(0,w.jsx)("option",{value:"",children:"Select"}),(0,w.jsx)("option",{value:"BITCOIN",children:"BITCOIN"}),(0,w.jsx)("option",{value:"LEETCOIN",children:"LEETCOIN"}),(0,w.jsx)("option",{value:"ETHERIUM",children:"ETHERIUM"})]})]}),(0,w.jsxs)("div",{children:[(0,w.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Network Name"}),(0,w.jsx)("input",{type:"text",className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Enter network name",onChange:function(e){p((0,x.Z)((0,x.Z)({},u),{},{networkName:e.target.value}))},required:!0})]}),(0,w.jsxs)("div",{children:[(0,w.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Crypto Wallet Number"}),(0,w.jsx)("input",{type:"text",className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Enter wallet number",onChange:function(e){p((0,x.Z)((0,x.Z)({},u),{},{address:e.target.value}))},required:!0})]}),(0,w.jsxs)("div",{className:"mt-5 flex items-center justify-end gap-3 lg:gap-5",children:[(0,w.jsxs)("button",{onClick:function(){return t(!1)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,w.jsxs)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer",children:[(0,w.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,w.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})," ","Cancel"]}),(0,w.jsxs)("button",{onClick:function(e){return b(e)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,w.jsx)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-check",children:(0,w.jsx)("polyline",{points:"20 6 9 17 4 12"})})," ","Confirm"]})]})]})})},b=[{id:1,name:"SL",width:10},{id:2,name:"Image",width:40},{id:7,name:"Network Name",width:150},{id:3,name:"Network Type",width:150},{id:4,name:"Crypto Address",width:300},{id:6,name:"Action",width:40}],v=function(e){var t=e.isLoading,n=e.setIsLoading,x=(0,o.useState)(""),v=(0,a.Z)(x,2),N=v[0],y=v[1],k=(0,o.useState)([]),C=(0,a.Z)(k,2),Z=C[0],L=C[1],I=(0,o.useState)([]),S=(0,a.Z)(I,2),E=S[0],D=S[1],O=(0,o.useState)(!1),T=(0,a.Z)(O,2),A=T[0],F=T[1],M=(0,o.useState)((0,w.jsx)(j,{setModalOpen:F})),W=(0,a.Z)(M,2),B=W[0],z=W[1],V=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var t,n,s,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("authInfo")),e.prev=1,e.next=4,l.Z.get("".concat("http://api.bazigaar.com").concat(f.f.wallet.getCrypto).concat((0,g.a)().wallet_id,"/"),{headers:{Authorization:"Token "+t.token}});case 4:"error"===(n=e.sent).status?h.Am.error(n.data.msg):(console.log("response.data",n.data),a=null===n||void 0===n||null===(s=n.data)||void 0===s?void 0:s.results,L(a),D(a)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),(0,m.D)(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){V()}),[]),(0,o.useEffect)((function(){var e=[];""!==N?Z.map((function(t){return-1===t.networkName.toLowerCase().search(N.toLowerCase())&&-1===t.address.toLowerCase().search(N.toLowerCase())||e.push(t),!0})):Z.map((function(t){return e.push(t),!0})),D(e)}),[N]);var H=(0,o.useState)(E),q=(0,a.Z)(H,2),J=q[0],P=q[1],R=(0,o.useState)(1),U=(0,a.Z)(R,2),_=U[0],G=U[1],K=(0,o.useState)(10),Q=(0,a.Z)(K,1)[0],X=_*Q,Y=X-Q,$=J.slice(Y,X);(0,o.useEffect)((function(){P(E),G(1)}),[E]);return(0,w.jsxs)(c.Z,{pageTitle:"Wallet",children:[(0,w.jsxs)("div",{className:"flex flex-col items-center justify-between gap-4 py-10 md:flex-row",children:[(0,w.jsx)("div",{children:(0,w.jsx)("h3",{className:"font-poppins text-xl font-semibold text-black lg:text-2xl",children:"Crypto Currency"})}),(0,w.jsxs)("div",{className:"flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row",children:[(0,w.jsxs)("div",{className:"flex w-full items-center",children:[(0,w.jsx)("input",{type:"text",className:"h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none",placeholder:"Search crypto here...",defaultValue:N,onChange:function(e){return y(e.target.value)},required:!0}),(0,w.jsx)("button",{className:"h-[38px] rounded-r-lg border border-black bg-black px-3 py-2 text-base font-semibold text-white",title:"",children:(0,w.jsx)(i.W1,{})})]}),(0,w.jsx)("div",{className:"w-full",children:(0,w.jsxs)("button",{onClick:function(e){return function(e){e.preventDefault(),F(!0),z((0,w.jsx)(j,{setModalOpen:F,getData:V}))}(e)},className:"flex h-[38px] w-full items-center justify-center gap-3 rounded-lg border border-black bg-black px-6 py-2 text-base font-semibold text-white",children:[(0,w.jsx)(i.pO,{}),(0,w.jsx)("span",{children:"Create New Crypto"})]})})]})]}),(0,w.jsxs)("div",{className:"rounded-lg bg-white pb-3 shadow-md",children:[(0,w.jsx)("div",{className:"overflow-x-scroll",children:(0,w.jsxs)("table",{className:"w-full",children:[(0,w.jsx)("thead",{className:"w-full bg-[#F1F3F7]",children:(0,w.jsx)("tr",{className:"h-16 w-full",children:b.map((function(e){return(0,w.jsx)("th",{style:{minWidth:e.width},className:"px-2 text-left font-inter text-base font-medium",children:e.name},e.id)}))})}),(0,w.jsx)("tbody",{className:"w-full",children:$.map((function(e,r){return(0,w.jsxs)("tr",{className:"h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100",children:[(0,w.jsx)("td",{className:"px-2",children:(0,w.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:10*(_-1)+r+1<10?"0".concat(10*(_-1)+r+1):10*(_-1)+r+1})}),(0,w.jsx)("td",{className:"px-2",children:(0,w.jsx)("div",{className:"h-10 w-10",children:(0,w.jsx)("img",{className:"h-full w-full",src:null===e||void 0===e?void 0:e.Image,alt:null===e||void 0===e?void 0:e.networkName})})}),(0,w.jsx)("td",{className:"px-2",children:(0,w.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.networkName})}),(0,w.jsx)("td",{className:"px-2",children:(0,w.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.cryptoName})}),(0,w.jsx)("td",{className:"px-2",children:(0,w.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.address})}),(0,w.jsxs)("td",{className:"px-2",children:[" ",(0,w.jsx)("svg",{onClick:function(r){return function(e,r,s){e.preventDefault();var a="".concat("http://api.bazigaar.com").concat(null===f.f||void 0===f.f?void 0:f.f.wallet.deleteCrypto).concat(r);F(!0),z((0,w.jsx)(u.Z,{setModalOpen:F,isLoading:t,setIsLoading:n,id:r,handleData:V,DltTitle:"delete ".concat(s),endpoint:a}))}(r,null===e||void 0===e?void 0:e.id,null===e||void 0===e?void 0:e.networkName)},className:"cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"17",viewBox:"0 0 12 17",fill:"none",children:(0,w.jsx)("path",{d:"M2.49998 4.2V2.6C2.49998 2.17565 2.66855 1.76869 2.96861 1.46863C3.26866 1.16857 3.67563 1 4.09998 1H7.29998C7.72432 1 8.13129 1.16857 8.43135 1.46863C8.7314 1.76869 8.89998 2.17565 8.89998 2.6V4.2M10.3 4.2H1.09998V14.4C1.09998 14.8243 1.26855 15.2313 1.5686 15.5314C1.86866 15.8314 2.27563 16 2.69998 16H8.69998C9.12432 16 9.53129 15.8314 9.83135 15.5314C10.1314 15.2313 10.3 14.8243 10.3 14.4V9.8V4.2Z",stroke:"#FE7062",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})]},r)}))})]})}),(0,w.jsx)(d.Z,{data:J,currentPage:_,setcurrentPage:G,itemsPerPage:Q})]}),(0,w.jsx)(p.Z,{title:"Crypto Currency",modalOpen:A,setModalOpen:F,modalContent:B})]})}}}]);
//# sourceMappingURL=493.84f2d41f.chunk.js.map