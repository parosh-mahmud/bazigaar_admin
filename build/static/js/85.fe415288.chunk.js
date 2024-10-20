"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[85],{2779:function(e,t,n){var a=n(2791),r=n(9707),s=n(184);t.Z=function(e){var t=e.title,n=e.modalOpen,o=e.setModalOpen,i=e.modalContent,l=(0,a.useRef)(null);return(0,a.useEffect)((function(){var e=function(e){var t=e.keyCode;n&&27===t&&o(!1)};return document.addEventListener("keydown",e),function(){return document.removeEventListener("keydown",e)}})),(0,s.jsxs)("div",{className:"".concat(!0===n?"block":"hidden"),children:[(0,s.jsx)(r.Z,{className:"fixed inset-0 z-50 bg-slate-900 bg-opacity-30 transition-opacity",show:n,enter:"transition ease-out duration-200",enterStart:"opacity-0",enterEnd:"opacity-100",leave:"transition ease-out duration-100",leaveStart:"opacity-100",leaveEnd:"opacity-0","aria-hidden":"true"}),(0,s.jsx)(r.Z,{className:"fixed inset-0 top-20 z-50 mb-4 flex transform items-start justify-center overflow-hidden px-4 sm:px-6",role:"dialog","aria-modal":"true",show:n,enter:"transition ease-in-out duration-200",enterStart:"opacity-0 translate-y-4",enterEnd:"opacity-100 translate-y-0",leave:"transition ease-in-out duration-200",leaveStart:"opacity-100 translate-y-0",leaveEnd:"opacity-0 translate-y-4",children:(0,s.jsxs)("div",{ref:l,className:"max-h-full w-full max-w-5xl overflow-auto rounded bg-white shadow-lg",style:{},children:[(0,s.jsxs)("div",{className:"flex items-center justify-between border-b p-3 lg:p-6",children:[(0,s.jsx)("h1",{className:"text-[18px] font-semibold font-poppins text-blackText",children:t}),(0,s.jsx)("button",{onClick:function(e){return function(e){e.preventDefault(),o(!1)}(e)},children:(0,s.jsxs)("svg",{style:{color:"#222222"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer",children:[(0,s.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,s.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),(0,s.jsx)("div",{className:"p-3 lg:p-6",children:i})]})})]})}},1754:function(e,t,n){var a=n(1243),r=n(2791),s=n(5218),o=n(9821),i=n(1183),l=n(184);t.Z=function(e){var t=e.isLoading,n=e.setIsLoading,c=e.setModalOpen,d=e.DltTitle,u=e.handleData,p=e.endpoint;return(0,l.jsxs)(r.Fragment,{children:[(0,l.jsxs)("h1",{className:"text-xl text-[#c14029]",children:["Are you sure you wanted to ",d,"?"]}),(0,l.jsxs)("div",{className:"mt-20 flex items-center justify-end gap-3 lg:gap-5",children:[(0,l.jsxs)("button",{onClick:function(){return c(!1)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,l.jsxs)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer",children:[(0,l.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,l.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})," ","Cancel"]}),t?(0,l.jsx)(i.Z,{}):(0,l.jsxs)("button",{type:"submit",onClick:function(e){return function(e){e.preventDefault(),n(!0);var t=JSON.parse(localStorage.getItem("authInfo"));a.Z.delete("".concat(p),{headers:{Authorization:"Token "+t.token}}).then((function(e){"error"===e.data.status?(s.Am.error(e.data.message),n(!1)):(s.Am.success(e.data.message),n(!1),u(),c(!1))})).catch((function(e){(0,o.D)(e),n(!1)}))}(e)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,l.jsx)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-check",children:(0,l.jsx)("polyline",{points:"20 6 9 17 4 12"})})," ","Confirm"]})]})]})}},7591:function(e,t,n){n.d(t,{Z:function(){return x}});var a=n(9439),r=n(2791),s="imageDropzone_dropzone__mMYnd",o="imageDropzone_dropzone-overlay__HKVu9",i="imageDropzone_preview__5AMk2",l="imageDropzone_instruction__T-MkP",c="imageDropzone_icon__Ip2nv",d="imageDropzone_text__pA-pB",u="imageDropzone_file-input__BwDbo",p=n(6053),f=n(184),x=function(e){var t=e.image,n=e.setState,x=(0,r.useState)(""),h=(0,a.Z)(x,2),m=h[0],g=h[1],v=(0,r.useState)(!0),j=(0,a.Z)(v,2),b=j[0],w=j[1],y=(0,r.useRef)(null);(0,r.useEffect)((function(){g(null===t||void 0===t?void 0:t.img)}),[t]);return(0,f.jsxs)("div",{className:s,children:[(0,f.jsx)("div",{className:o,onClick:function(e){e.stopPropagation(),y.current.click()},onDragOver:function(e){e.preventDefault(),e.stopPropagation(),e.currentTarget.classList.add("highlight")},onDragLeave:function(e){e.currentTarget.classList.remove("highlight")},onDrop:function(e){e.preventDefault();var a=e.dataTransfer.files[0];if(a){var r=new FileReader;r.onload=function(){g(r.result),t.image=r.result},r.readAsDataURL(a),w(!1),n(a)}else n({})}}),m?(0,f.jsx)("img",{src:m,alt:"Item Preview",className:i}):(0,f.jsx)(f.Fragment,{children:b?(0,f.jsxs)("div",{className:l,children:[(0,f.jsx)(p.IHF,{className:c}),(0,f.jsx)("p",{className:d,children:"Drop or Click to upload"})]}):""})," ",(0,f.jsx)("input",{type:"file",accept:"image/*",onChange:function(e){var a=e.target.files[0];if(a){var r=new FileReader;r.onload=function(){g(r.result),t.image=null===r||void 0===r?void 0:r.result},r.readAsDataURL(a),w(!1),n(a)}else n({})},ref:y,className:u})]})}},9085:function(e,t,n){n.r(t),n.d(t,{default:function(){return N}});var a=n(4165),r=n(5861),s=n(9439),o=n(2791),i=n(2545),l=n(9477),c=n(1605),d=n(1413),u=n(1243),p=n(7591),f=n(1402),x=n(5218),h=n(9821),m=n(184),g=function(e){var t=e.setModalOpen,n=e.getData,i=(0,o.useState)({}),l=(0,s.Z)(i,2),c=l[0],g=l[1],v=JSON.parse(localStorage.getItem("authInfo")),j=(0,o.useState)({sliderImage:"",image_url:"",title:"",active:""}),b=(0,s.Z)(j,2),w=b[0],y=b[1];function k(){return(k=(0,r.Z)((0,a.Z)().mark((function e(){var r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("formData",w),e.prev=1,e.next=4,u.Z.post("".concat("http://api.bazigaar.com").concat(f.f.slider.addSlider),w,{headers:{Authorization:"Token "+v.token,"content-type":"multipart/form-data"}});case 4:"error"===(r=e.sent).data.type?x.Am.error(r.data.msg):(x.Am.success(r.data.msg),t(!1),n()),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),(0,h.D)(e.t0),t(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}(0,o.useEffect)((function(){null!==c&&void 0!==c&&c.type&&y((0,d.Z)((0,d.Z)({},w),{},{sliderImage:c}))}),[c]);var N=function(e){e.preventDefault(),function(){k.apply(this,arguments)}()};return(0,m.jsx)(o.Fragment,{children:(0,m.jsxs)("form",{action:"",encType:"multipart/form-data",children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Slider Image"}),(0,m.jsx)(p.Z,{image:c,setState:g})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Slider Title"}),(0,m.jsx)("input",{type:"text",className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Enter Slider Title",onChange:function(e){y((0,d.Z)((0,d.Z)({},w),{},{title:e.target.value}))},required:!0})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Status"}),(0,m.jsxs)("select",{className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Status",onChange:function(e){y((0,d.Z)((0,d.Z)({},w),{},{active:e.target.value}))},required:!0,children:[(0,m.jsx)("option",{value:"",children:"Select"}),(0,m.jsx)("option",{value:"True",children:"Active"}),(0,m.jsx)("option",{value:"False",children:"Inactive"})]})]}),(0,m.jsxs)("div",{className:"mt-5 flex items-center justify-end gap-3 lg:gap-5",children:[(0,m.jsxs)("button",{onClick:function(){return t(!1)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,m.jsxs)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer",children:[(0,m.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,m.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})," ","Cancel"]}),(0,m.jsxs)("button",{onClick:function(e){return N(e)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,m.jsx)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-check",children:(0,m.jsx)("polyline",{points:"20 6 9 17 4 12"})})," ","Confirm"]})]})]})})},v=n(2779),j=n(1754),b=n(1183),w=function(e){var t=e.setModalOpen,n=e.isLoading,i=(e.setIsLoading,e.id),l=e.handleData,c=(0,o.useState)({}),g=(0,s.Z)(c,2),v=g[0],j=g[1],w=(0,o.useState)({}),y=(0,s.Z)(w,2),k=y[0],N=y[1],Z=JSON.parse(localStorage.getItem("authInfo")),C=(0,o.useState)({sliderImage:null===v||void 0===v?void 0:v.sliderImage,image_url:null===v||void 0===v?void 0:v.image_url,title:null===v||void 0===v?void 0:v.title,active:null===v||void 0===v?void 0:v.active}),S=(0,s.Z)(C,2),D=S[0],L=S[1];function T(){return(T=(0,r.Z)((0,a.Z)().mark((function e(){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.patch("".concat("http://api.bazigaar.com").concat(f.f.slider.updateSlider).concat(i,"/"),D,{headers:{Authorization:"Token "+Z.token,"content-type":"multipart/form-data"}});case 3:"error"===(n=e.sent).data.type?x.Am.error(n.data.msg):(x.Am.success(n.data.msg),t(!1),l()),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),(0,h.D)(e.t0),t(!1);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}(0,o.useEffect)((function(){null!==k&&void 0!==k&&k.type&&L((0,d.Z)((0,d.Z)({},D),{},{sliderImage:k}))}),[k]),(0,o.useEffect)((function(){u.Z.get("".concat("http://api.bazigaar.com").concat(f.f.slider.getSliderDetails).concat(i),{headers:{Authorization:"Token "+Z.token}}).then((function(e){console.log("res.data",e.data),"error"===e.data.status?x.Am.error(e.data.message):j(e.data)})).catch((function(e){(0,h.D)(e)}))}),[i]);var I=function(e){e.preventDefault(),function(){T.apply(this,arguments)}()};return(0,m.jsx)(o.Fragment,{children:(0,m.jsxs)("form",{action:"",encType:"multipart/form-data",children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Slider Image"}),(0,m.jsx)(p.Z,{image:k,setState:N})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Slider Title"}),(0,m.jsx)("input",{type:"text",className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Enter Slider Title",defaultValue:v.title,onChange:function(e){L((0,d.Z)((0,d.Z)({},D),{},{title:e.target.value}))},required:!0})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("p",{className:"pb-2 font-poppins text-base font-normal text-blackText",children:"Status"}),(0,m.jsxs)("select",{className:"mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500",placeholder:"Status",onChange:function(e){L((0,d.Z)((0,d.Z)({},D),{},{active:e.target.value}))},required:!0,children:[(0,m.jsx)("option",{value:"",children:!0===v.active||"True"===v.active?"Active":"Inactive"}),(0,m.jsx)("option",{value:"True",children:"Active"}),(0,m.jsx)("option",{value:"False",children:"Inactive"})]})]}),(0,m.jsxs)("div",{className:"mt-5 flex items-center justify-end gap-3 lg:gap-5",children:[(0,m.jsxs)("button",{onClick:function(){return t(!1)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,m.jsxs)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-x cursor-pointer",children:[(0,m.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,m.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})," ","Cancel"]}),n?(0,m.jsx)(b.Z,{}):(0,m.jsxs)("button",{type:"submit",onClick:function(e){return I(e)},className:"flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white",children:[(0,m.jsx)("svg",{style:{color:"#fff"},xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"feather feather-check",children:(0,m.jsx)("polyline",{points:"20 6 9 17 4 12"})})," ","Confirm"]})]})]})})},y=n(822),k=[{id:1,name:"SL",width:10},{id:2,name:"Image",width:40},{id:3,name:"Title",width:220},{id:4,name:"Created Date",width:120},{id:5,name:"Status",width:40},{id:6,name:"Action",width:40}],N=function(e){var t=e.isLoading,n=e.setIsLoading,d=(0,o.useState)(""),p=(0,s.Z)(d,2),b=p[0],N=p[1],Z=(0,o.useState)([]),C=(0,s.Z)(Z,2),S=C[0],D=C[1],L=(0,o.useState)([]),T=(0,s.Z)(L,2),I=T[0],A=T[1],_=(0,o.useState)(!1),E=(0,s.Z)(_,2),z=E[0],F=E[1],O=(0,o.useState)(!1),M=(0,s.Z)(O,2),B=M[0],W=M[1],P=(0,o.useState)((0,m.jsx)(g,{setModalOpen:F})),V=(0,s.Z)(P,2),R=V[0],q=V[1],H=(0,o.useState)(""),J=(0,s.Z)(H,2),U=J[0],K=J[1],Y=function(){var e=(0,r.Z)((0,a.Z)().mark((function e(){var t,n,r;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("authInfo")),e.prev=1,e.next=4,u.Z.get("".concat("http://api.bazigaar.com").concat(f.f.slider.getSlider),{headers:{Authorization:"Token "+t.token}});case 4:"error"===(n=e.sent).data.status?x.Am.error(n.data.msg):(r=n.data.reverse(),D(r),A(r)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),(0,h.D)(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){Y()}),[]),(0,o.useEffect)((function(){var e=[];""!==b?S.map((function(t){return-1!==t.title.toLowerCase().search(b.toLowerCase())&&e.push(t),!0})):S.map((function(t){return e.push(t),!0})),A(e)}),[b]),console.log("tableDatas",S);var G=(0,o.useState)(I),Q=(0,s.Z)(G,2),X=Q[0],$=Q[1],ee=(0,o.useState)(1),te=(0,s.Z)(ee,2),ne=te[0],ae=te[1],re=(0,o.useState)(10),se=(0,s.Z)(re,1)[0],oe=ne*se,ie=oe-se,le=X.slice(ie,oe);(0,o.useEffect)((function(){$(I),ae(1)}),[I]);return(0,m.jsxs)(l.Z,{pageTitle:"Manage Slider",children:[(0,m.jsxs)("div",{className:"flex flex-col items-center justify-between gap-4 py-10 md:flex-row",children:[(0,m.jsx)("div",{children:(0,m.jsx)("h3",{className:"font-poppins text-xl font-semibold text-black lg:text-2xl",children:"Onboarding Slider"})}),(0,m.jsxs)("div",{className:"flex w-full flex-col items-center gap-4 md:w-[unset] md:flex-row",children:[(0,m.jsxs)("div",{className:"flex w-full items-center",children:[(0,m.jsx)("input",{type:"text",className:"h-[38px] w-full rounded-l-lg border border-black px-4 py-2 focus:border-black focus:outline-none",placeholder:"Search slider here...",defaultValue:b,onChange:function(e){return N(e.target.value)},required:!0}),(0,m.jsx)("button",{className:"h-[38px] rounded-r-lg border border-black bg-black px-3 py-2 text-base font-semibold text-white",title:"",children:(0,m.jsx)(i.W1,{})})]}),(0,m.jsx)("div",{className:"w-full",children:(0,m.jsxs)("button",{onClick:function(e){return function(e){e.preventDefault(),F(!0),q((0,m.jsx)(g,{setModalOpen:F,getData:Y}))}(e)},className:"flex h-[38px] w-full items-center justify-center gap-3 rounded-lg border border-black bg-black px-6 py-2 text-base font-semibold text-white",children:[(0,m.jsx)(i.pO,{}),(0,m.jsx)("span",{children:"Create New Slider"})]})})]})]}),(0,m.jsxs)("div",{className:"rounded-lg bg-white pb-3 shadow-md",children:[(0,m.jsx)("div",{className:"overflow-x-scroll",children:(0,m.jsxs)("table",{className:"w-full",children:[(0,m.jsx)("thead",{className:"w-full bg-[#F1F3F7]",children:(0,m.jsx)("tr",{className:"h-16 w-full",children:k.map((function(e){return(0,m.jsx)("th",{style:{minWidth:e.width},className:"px-2 text-left font-inter text-base font-medium",children:e.name},e.id)}))})}),(0,m.jsx)("tbody",{className:"w-full",children:le.map((function(e,a){return(0,m.jsxs)("tr",{className:"h-20 bg-white text-sm leading-none text-gray-800 hover:bg-gray-100",children:[(0,m.jsx)("td",{className:"px-2",children:(0,m.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:10*(ne-1)+a+1<10?"0".concat(10*(ne-1)+a+1):10*(ne-1)+a+1})}),(0,m.jsx)("td",{className:"px-2",children:(0,m.jsx)("div",{className:"h-10 w-10",children:(0,m.jsx)("img",{className:"h-full w-full",src:"".concat("http://api.bazigaar.com").concat(null===e||void 0===e?void 0:e.sliderImage),alt:null===e||void 0===e?void 0:e.title})})}),(0,m.jsx)("td",{className:"px-2",children:(0,m.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:null===e||void 0===e?void 0:e.title})}),(0,m.jsx)("td",{className:"px-2",children:(0,m.jsx)("p",{className:"text-left font-poppins text-base font-normal",children:(null===e||void 0===e?void 0:e.created_at.split("T")[0])+" : "+(null===e||void 0===e?void 0:e.created_at.split("T")[1].split(".")[0])})}),(0,m.jsx)("td",{className:"cursor-pointer px-2",children:!0===(null===e||void 0===e?void 0:e.active)||"True"===(null===e||void 0===e?void 0:e.active)?(0,m.jsx)("p",{className:"low w-fit rounded-full bg-[#63ad6f24] px-3 py-2 font-inter text-[14px] font-medium capitalize text-[#63AD6F]",children:"Active"}):(0,m.jsx)("p",{className:"low w-fit rounded-full bg-[#ca755924] px-3 py-2 font-inter text-[14px] font-medium capitalize text-[#c14029]",children:"Inactive"})}),(0,m.jsx)("td",{className:"px-2",children:(0,m.jsxs)("div",{className:"flex items-center gap-3",children:[(0,m.jsx)("svg",{onClick:function(a){return function(e,a){e.preventDefault(),W(!0),K((0,m.jsx)(w,{setModalOpen:W,isLoading:t,setIsLoading:n,id:a,handleData:Y}))}(a,null===e||void 0===e?void 0:e.id,null===e||void 0===e||e.title)},className:"cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"17",viewBox:"0 0 18 17",fill:"none",children:(0,m.jsx)("path",{d:"M11.2815 3.19257L2.63473 11.8393L1.5 16L5.66069 14.8653L14.3074 6.21853M11.2815 3.19257L12.8473 1.6267C13.046 1.42801 13.2819 1.2704 13.5415 1.16287C13.8011 1.05534 14.0793 1 14.3603 1C14.6413 1 14.9195 1.05534 15.1791 1.16287C15.4387 1.2704 15.6746 1.42801 15.8733 1.6267C16.072 1.82538 16.2296 2.06126 16.3371 2.32086C16.4447 2.58045 16.5 2.85869 16.5 3.13968C16.5 3.42066 16.4447 3.6989 16.3371 3.95849C16.2296 4.21809 16.072 4.45397 15.8733 4.65266L14.3074 6.21853M11.2815 3.19257L14.3074 6.21853",stroke:"#0EAB8B",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,m.jsx)("svg",{onClick:function(a){return function(e,a,r){var s;e.preventDefault();var o="".concat("http://api.bazigaar.com").concat(null===f.f||void 0===f.f||null===(s=f.f.slider)||void 0===s?void 0:s.deleteSlider).concat(a);F(!0),q((0,m.jsx)(j.Z,{setModalOpen:F,isLoading:t,setIsLoading:n,id:a,handleData:Y,DltTitle:"delete ".concat(r),endpoint:o}))}(a,null===e||void 0===e?void 0:e.id,null===e||void 0===e?void 0:e.title)},className:"cursor-pointer",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"17",viewBox:"0 0 12 17",fill:"none",children:(0,m.jsx)("path",{d:"M2.49998 4.2V2.6C2.49998 2.17565 2.66855 1.76869 2.96861 1.46863C3.26866 1.16857 3.67563 1 4.09998 1H7.29998C7.72432 1 8.13129 1.16857 8.43135 1.46863C8.7314 1.76869 8.89998 2.17565 8.89998 2.6V4.2M10.3 4.2H1.09998V14.4C1.09998 14.8243 1.26855 15.2313 1.5686 15.5314C1.86866 15.8314 2.27563 16 2.69998 16H8.69998C9.12432 16 9.53129 15.8314 9.83135 15.5314C10.1314 15.2313 10.3 14.8243 10.3 14.4V9.8V4.2Z",stroke:"#FE7062",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]})})]},a)}))})]})}),(0,m.jsx)(c.Z,{data:X,currentPage:ne,setcurrentPage:ae,itemsPerPage:se})]}),(0,m.jsx)(y.Z,{title:"Delete Slider",modalOpen:z,setModalOpen:F,modalContent:R}),(0,m.jsx)(v.Z,{title:"Edit Slider",modalOpen:B,setModalOpen:W,modalContent:U})]})}}}]);
//# sourceMappingURL=85.fe415288.chunk.js.map