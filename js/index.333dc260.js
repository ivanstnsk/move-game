!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);let o=0,i=0,s=!1,r={x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,size:20,speed:4},c=0,a=0,l=[],d=[];window.addEventListener("DOMContentLoaded",(function(){console.log("game started"),o=Date.now();const e=document.getElementById("score"),t=document.getElementById("best"),n=document.getElementById("time"),u=document.getElementById("canvas");u.width=window.innerWidth,u.height=window.innerHeight;const f=u.getContext("2d"),h=parseInt(localStorage.getItem("best-score"));function y(e,t,n,o){const i=Math.sqrt(Math.pow(e.x-t,2)+Math.pow(e.y-n,2));if(i>o)return!1;const s=Math.abs(e.x-t),r=Math.abs(e.y-n);let c=s*e.speed/i,a=r*e.speed/i;return t<e.x&&(c*=-1),n<e.y&&(a*=-1),e.x+=c,e.y+=a,!0}function p(e,t){const n=e.size/2+t.size/2;return Math.abs(e.x-t.x)<=n&&Math.abs(e.y-t.y)<=n}function g(){o=Date.now(),i=0,s=!0,function(e){const t=document.createElement("div");t.style.position="absolute",t.style.left=window.innerWidth/2-200+"px",t.style.top=window.innerHeight/2-50+"px",t.style.width="400px",t.style.height="100px",t.style.fontFamily="Quicksand",t.style.fontSize="20px",t.style.backgroundColor="black",t.style.color="yellow",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.textAlign="center",t.innerHTML=e,document.body.appendChild(t),document.addEventListener("click",()=>{document.body.removeChild(t),document.removeEventListener("click",this),window.location.reload(!1)})}("You dead! Click to continue")}t.innerHTML="Record: "+(h||0),u.addEventListener("mousemove",e=>{const t=u.getBoundingClientRect();c=e.pageX-t.left,a=e.pageY-t.top}),function e(){const t=Math.random()*u.width,n=Math.random()*u.height;l.push({x:t,y:n,size:30,speed:2,angry:!1}),setTimeout(e,4e3)}(),function e(){const t=Math.random()*u.width,n=Math.random()*u.height,o=8*Math.random()+2;d.push({x:t,y:n,size:o,speed:0}),setTimeout(e,1e3)}(),function h(){s||(f.clearRect(0,0,u.width,u.height),function(){const n=Date.now()-o,s=new Date(n),c=(s.getMinutes()+1)*(s.getSeconds()+1)*10;i=Math.floor(10*(r.size-5)+c),e.innerHTML="Score: "+i;const a=parseInt(localStorage.getItem("best-score"))||0;i>a&&(localStorage.setItem("best-score",""+i),t.innerHTML="Record: "+(a||0))}(),function(){const e=Date.now()-o,t=new Date(e);n.innerHTML=`Game time: ${t.getMinutes()}:${t.getSeconds()}`}(),function(){for(let e=0;e<l.length;e+=1){const t=y(l[e],r.x,r.y,300);if(l[e].angry=t,t)p(l[e],r)&&(l[e].size+5<90&&(l[e].size+=5,l[e].speed-=.1,l[e].speed<1&&(l[e].speed=1)),r.size-=5,r.size<5&&(r.size=5,g()));else{const t=Math.random()*u.width,n=Math.random()*u.height;y(l[e],t,n,1/0)}}}(),function(){y(r,c,a),r.speed-=.01,r.speed<1&&(r.speed=1);const e=[];d.forEach((t,n)=>{p(r,t)&&e.push(n)}),e.forEach(e=>{const t=d.splice(e,1);r.size+=t[0].size,r.speed=4})}(),function(){f.beginPath(),f.fillStyle="#29983B",f.fillRect(r.x-r.size/2,r.y-r.size/2,r.size,r.size);const e=(r.speed-1)/4;f.fillStyle=`rgba(0,255,255,${e})`,f.fillRect(r.x-r.size/4,r.y-r.size/4,r.size/2,r.size/2),f.closePath(),f.stroke()}(),f.beginPath(),l.forEach(({x:e,y:t,size:n,angry:o})=>{f.fillStyle=o?"#E14B4B":"#8B1313",f.fillRect(e-n/2,t-n/2,n,n)}),f.closePath(),f.stroke(),f.beginPath(),d.forEach(({x:e,y:t,size:n})=>{f.fillStyle="green",f.fillRect(e-n/2,t-n/2,n,n)}),f.closePath(),f.stroke()),requestAnimationFrame(h)}()}))},function(e,t,n){}]);
//# sourceMappingURL=index.333dc260.js.map