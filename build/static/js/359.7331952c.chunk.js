"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[359],{7359:function(e,t,s){s.r(t);var a=s(9439),l=s(2791),n=s(9477),i=s(2545),r=s(5218),o=s(9821),d=s(1402),c=s(1243),u=s(1605),x=s(7689),f=s(184),p=[{id:1,name:"SL",width:10},{id:2,name:"User Id",width:40},{id:3,name:"User Input",width:120},{id:4,name:"Quantity",width:120},{id:5,name:"Purchase Time",width:140},{id:6,name:"User Lucky Number",width:180}];t.default=function(e){e.isLoading,e.setIsLoading;var t=(0,l.useState)(""),s=(0,a.Z)(t,2),h=s[0],m=s[1],v=(0,l.useState)([]),b=(0,a.Z)(v,2),j=b[0],g=b[1],w=(0,l.useState)([]),N=(0,a.Z)(w,2),y=N[0],k=N[1],S=JSON.parse(localStorage.getItem("authInfo")),L=(0,x.UO)();(0,l.useEffect)((function(){!function(){var e;c.Z.get("".concat("http://api.bazigaar.com").concat(null===d.f||void 0===d.f||null===(e=d.f.ticket)||void 0===e?void 0:e.soldLottery).concat(null===L||void 0===L?void 0:L.id),{headers:{Authorization:"Token "+S.token}}).then((function(e){"error"===e.data.type?r.Am.error(e.message):(console.log("res.data",e.data),g(e.data),k(e.data))})).catch((function(e){(0,o.D)(e)}))}()}),[]),(0,l.useEffect)((function(){var e=[];""!==h?j.map((function(t){return-1===t.userInput.toLowerCase().search(h.toLowerCase())&&-1===t.lotteryId.toLowerCase().search(h.toLowerCase())||e.push(t),!0})):j.map((function(t){return e.push(t),!0})),k(e)}),[h]);var I=(0,l.useState)(y),T=(0,a.Z)(I,2),Z=T[0],C=T[1],P=(0,l.useState)(1),F=(0,a.Z)(P,2),U=F[0],A=F[1],E=(0,l.useState)(10),q=(0,a.Z)(E,1)[0],z=U*q,O=z-q,W=Z.slice(O,z);return(0,l.useEffect)((function(){C(y),A(1)}),[y]),(0,f.jsx)(l.Fragment,{children:(0,f.jsxs)(n.Z,{pageTitle:"All Sold Ticket",children:[(0,f.jsxs)("div",{className:"flex flex-col items-center justify-between gap-4 py-10 md:flex-row",children:[(0,f.jsx)("div",{children:(0,f.jsx)("h3",{className:"font-poppins text-xl font-semibold text-black lg:text-2xl",children:"Sold Ticket History"})}),(0,f.jsx)("div",{className:"flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row",children:(0,f.jsxs)("div",{className:"flex w-full items-center",children:[(0,f.jsx)("input",{type:"text",className:"h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none",placeholder:"Search here...",defaultValue:h,onChange:function(e){return m(e.target.value)},required:!0}),(0,f.jsx)("button",{className:"h-[38px] rounded-r-lg border border-black bg-black px-3 py-2 text-base font-semibold text-white",title:"",children:(0,f.jsx)(i.W1,{})})]})})]}),(0,f.jsxs)("div",{className:"rounded-lg bg-white pb-3 shadow-md",children:[(0,f.jsx)("div",{className:"overflow-x-scroll",children:(0,f.jsxs)("table",{className:"w-full",children:[(0,f.jsx)("thead",{className:"w-full bg-[#F1F3F7]",children:(0,f.jsx)("tr",{className:"h-16 w-full",children:null===p||void 0===p?void 0:p.map((function(e){return(0,f.jsx)("th",{style:{minWidth:e.width},className:"px-2 text-left font-inter text-base font-medium",children:e.name},e.id)}))})}),(0,f.jsx)("tbody",{className:"relative w-full",children:null===W||void 0===W?void 0:W.map((function(e,t){return(0,f.jsxs)("tr",{className:"h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100",children:[(0,f.jsx)("td",{className:"px-2",children:(0,f.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:t+1<10?"0".concat(t+1):t+1})}),(0,f.jsx)("td",{className:"px-2",children:(0,f.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.userId})}),(0,f.jsx)("td",{className:"px-2",children:(0,f.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.userInput})}),(0,f.jsx)("td",{className:"px-2",children:(0,f.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.quantity})}),(0,f.jsx)("td",{className:"px-2",children:(0,f.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:(null===e||void 0===e?void 0:e.purchaseTime.split("T")[0])+" : "+(null===e||void 0===e?void 0:e.purchaseTime.split("T")[1].split(".")[0])})}),(0,f.jsx)("td",{className:"px-2",children:(0,f.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.userLuckyNumber})})]},t)}))})]})}),(0,f.jsx)(u.Z,{data:Z,currentPage:U,setcurrentPage:A,itemsPerPage:q})]})]})})}}}]);
//# sourceMappingURL=359.7331952c.chunk.js.map