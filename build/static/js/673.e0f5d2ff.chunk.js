"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[673],{3673:function(e,t,n){n.r(t);var r=n(1413),a=n(4165),s=n(5861),l=n(9439),c=n(2791),o=n(9477),d=n(2545),i=n(1087),u=n(1243),f=n(1402),m=n(9821),p=n(5218),x=n(184),g=function(e){var t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=e%60;return"".concat(t,"h:").concat(n.toString().padStart(2,"0"),"m:").concat(r.toString().padStart(2,"0"),"s")};t.default=function(){var e=(0,c.useState)([]),t=(0,l.Z)(e,2),n=t[0],h=t[1],w=function(){var e=(0,s.Z)((0,a.Z)().mark((function e(){var t,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("authInfo")),e.prev=1,e.next=4,u.Z.get("".concat("http://api.bazigaar.com").concat(f.f.ticket.getTicket),{headers:{Authorization:"Token "+t.token}});case 4:"error"===(n=e.sent).data.status?p.Am.error(n.data.msg):h(n.data),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error("error",e.t0),(0,m.D)(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){w();var e=setInterval((function(){h((function(e){return e.map((function(e){return(0,r.Z)((0,r.Z)({},e),{},{remaining_time_seconds:Math.max(0,e.remaining_time_seconds-1)})}))}))}),1e3);return function(){return clearInterval(e)}}),[]),(0,x.jsx)(c.Fragment,{children:(0,x.jsx)(o.Z,{pageTitle:"Manual Draw",children:(0,x.jsxs)("div",{className:"mt-6 w-full rounded-[6px] shadow-md lg:mt-10 lg:rounded-[8px]",children:[(0,x.jsx)("div",{className:"w-full rounded-t-[6px] bg-[#F1F3F7] p-3 text-xl font-medium lg:rounded-t-[8px] lg:p-4",children:"Select A Lottery To Draw"}),(0,x.jsx)("div",{className:"w-full rounded-b-[6px] bg-white p-3 lg:rounded-b-[8px] lg:p-5",children:n.map((function(e,t){return(0,x.jsxs)("div",{className:"mb-4 grid w-full grid-cols-1 gap-8 last:mb-0 lg:w-fit lg:grid-cols-2 lg:gap-24",children:[(0,x.jsxs)(i.rU,{to:"/manage-lottery/package/".concat(null===e||void 0===e?void 0:e.LotteryId),className:"flex w-full items-center justify-between  rounded-md border bg-black p-4 text-white shadow-md lg:w-[350px]",children:[(0,x.jsx)("span",{className:"text-xl font-bold",children:null===e||void 0===e?void 0:e.LotteryName}),(0,x.jsx)("div",{children:(0,x.jsx)("span",{className:"flex items-center justify-center rounded-full bg-[#D3AC46] p-3",children:(0,x.jsx)(d.w7,{})})})]}),(0,x.jsxs)("div",{className:"flex w-full items-center justify-between rounded-md border p-4 shadow-md lg:w-[350px]",children:[(0,x.jsx)("span",{className:"text-xl font-bold",children:g(e.remaining_time_seconds)}),(0,x.jsx)("span",{className:"",children:(0,x.jsx)(d.T3,{})})]})]},t)}))})]})})})}}}]);
//# sourceMappingURL=673.e0f5d2ff.chunk.js.map