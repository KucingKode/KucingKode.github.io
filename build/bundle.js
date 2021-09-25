var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c;function a(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function l(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}const d="undefined"!=typeof window;let u=d?()=>window.performance.now():()=>Date.now(),f=d?t=>requestAnimationFrame(t):t;const p=new Set;function m(t){p.forEach((e=>{e.c(t)||(p.delete(e),e.f())})),0!==p.size&&f(m)}function h(t,e){t.appendChild(e)}function g(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function $(t){const e=y("style");return function(t,e){h(t.head||t,e)}(g(t),e),e}function w(t,e,n){t.insertBefore(e,n||null)}function x(t){t.parentNode.removeChild(t)}function v(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function b(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function C(t){return document.createTextNode(t)}function _(){return C(" ")}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function F(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}const M=new Set;let j,z=0;function E(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),z-=r,z||f((()=>{z||(M.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),M.clear())})))}function P(t){j=t}function B(t){(function(){if(!j)throw new Error("Function called outside component initialization");return j})().$$.on_mount.push(t)}const L=[],K=[],S=[],D=[],T=Promise.resolve();let A=!1;function q(t){S.push(t)}let I=!1;const O=new Set;function N(){if(!I){I=!0;do{for(let t=0;t<L.length;t+=1){const e=L[t];P(e),R(e.$$)}for(P(null),L.length=0;K.length;)K.pop()();for(let t=0;t<S.length;t+=1){const e=S[t];O.has(e)||(O.add(e),e())}S.length=0}while(L.length);for(;D.length;)D.pop()();A=!1,I=!1,O.clear()}}function R(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}let V;function H(t,e,n){t.dispatchEvent(function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(`${e?"intro":"outro"}${n}`))}const W=new Set;function J(t,e){t&&t.i&&(W.delete(t),t.i(e))}function X(t,e,n,o){if(t&&t.o){if(W.has(t))return;W.add(t),undefined.c.push((()=>{W.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const G={duration:0};function Y(n,o,r){let i,c,a=o(n,r),l=!1,d=0;function h(){i&&E(n,i)}function w(){const{delay:o=0,duration:r=300,easing:s=e,tick:w=t,css:x}=a||G;x&&(i=function(t,e,n,o,r,s,i,c=0){const a=16.666/o;let l="{\n";for(let t=0;t<=1;t+=a){const o=e+(n-e)*s(t);l+=100*t+`%{${i(o,1-o)}}\n`}const d=l+`100% {${i(n,1-n)}}\n}`,u=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(d)}_${c}`,f=g(t);M.add(f);const p=f.__svelte_stylesheet||(f.__svelte_stylesheet=$(t).sheet),m=f.__svelte_rules||(f.__svelte_rules={});m[u]||(m[u]=!0,p.insertRule(`@keyframes ${u} ${d}`,p.cssRules.length));const h=t.style.animation||"";return t.style.animation=`${h?`${h}, `:""}${u} ${o}ms linear ${r}ms 1 both`,z+=1,u}(n,0,1,r,o,s,x,d++)),w(0,1);const v=u()+o,y=v+r;c&&c.abort(),l=!0,q((()=>H(n,!0,"start"))),c=function(t){let e;return 0===p.size&&f(m),{promise:new Promise((n=>{p.add(e={c:t,f:n})})),abort(){p.delete(e)}}}((t=>{if(l){if(t>=y)return w(1,0),H(n,!0,"end"),h(),l=!1;if(t>=v){const e=s((t-v)/r);w(e,1-e)}}return l}))}let x=!1;return{start(){x||(x=!0,E(n),s(a)?(a=a(),(V||(V=Promise.resolve(),V.then((()=>{V=null}))),V).then(w)):w())},invalidate(){x=!1},end(){l&&(h(),l=!1)}}}function Q(t){t&&t.c()}function U(t,e,o,i){const{fragment:c,on_mount:a,on_destroy:l,after_update:d}=t.$$;c&&c.m(e,o),i||q((()=>{const e=a.map(n).filter(s);l?l.push(...e):r(e),t.$$.on_mount=[]})),d.forEach(q)}function Z(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function tt(t,e){-1===t.$$.dirty[0]&&(L.push(t),A||(A=!0,T.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function et(e,n,s,i,c,a,l,d=[-1]){const u=j;P(e);const f=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:n.context||[]),callbacks:o(),dirty:d,skip_bound:!1,root:n.target||u.$$.root};l&&l(f.root);let p=!1;if(f.ctx=s?s(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&c(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),p&&tt(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(x)}else f.fragment&&f.fragment.c();n.intro&&J(e.$$.fragment),U(e,n.target,n.anchor,n.customElement),N()}P(u)}class nt{$destroy(){Z(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function ot(t,{delay:n=0,duration:o=400,easing:r=e}={}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:o,easing:r,css:t=>"opacity: "+t*s}}const rt=t=>({intersecting:1&t}),st=t=>({intersecting:t[0]});function it(t){let e,n;const o=t[8].default,r=function(t,e,n,o){if(t){const r=l(t,e,n,o);return t[0](r)}}(o,t,t[7],st);return{c(){e=y("div"),r&&r.c(),k(e,"class","mb-5")},m(o,s){w(o,e,s),r&&r.m(e,null),t[9](e),n=!0},p(t,[e]){r&&r.p&&(!n||129&e)&&function(t,e,n,o,r,s){if(r){const i=l(e,n,o,s);t.p(i,r)}}(r,o,t,t[7],n?function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(o,t[7],e,rt):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[7]),st)},i(t){n||(J(r,t),n=!0)},o(t){X(r,t),n=!1},d(n){n&&x(e),r&&r.d(n),t[9](null)}}}function ct(t,e,n){let o,{$$slots:r={},$$scope:s}=e,{once:i=!1}=e,{top:c=0}=e,{bottom:a=0}=e,{left:l=0}=e,{right:d=0}=e,u=!1;return B((()=>{if(!IntersectionObserver)return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e);const t=new IntersectionObserver((e=>{n(0,u=e[0].isIntersecting),u&&i&&t.unobserve(o)}),{rootMargin:`${a}px ${l}px ${c}px ${d}px`,threshold:.5});return t.observe(o),()=>t.unobserve(o);function e(){const t=o.getBoundingClientRect();n(0,u=t.bottom+a>0&&t.right+d>0&&t.top-c<window.innerHeight&&t.left-l<window.innerWidth),u&&i&&window.removeEventListener("scroll",e)}})),t.$$set=t=>{"once"in t&&n(2,i=t.once),"top"in t&&n(3,c=t.top),"bottom"in t&&n(4,a=t.bottom),"left"in t&&n(5,l=t.left),"right"in t&&n(6,d=t.right),"$$scope"in t&&n(7,s=t.$$scope)},[u,o,i,c,a,l,d,s,r,function(t){K[t?"unshift":"push"]((()=>{o=t,n(1,o)}))}]}class at extends nt{constructor(t){super(),et(this,t,ct,it,i,{once:2,top:3,bottom:4,left:5,right:6})}}function lt(t,e,n){const o=t.slice();return o[15]=e[n],o}function dt(t,e,n){const o=t.slice();return o[18]=e[n],o}function ut(t,e,n){const o=t.slice();return o[18]=e[n],o}function ft(t,e,n){const o=t.slice();return o[23]=e[n],o}function pt(t){let e,n,o,r,s=t[23]+"";return{c(){e=y("a"),n=C(s),o=_(),k(e,"class","text-base font-bold text-sm md:text-md mx-1 md:mx-2 py-1 hover:border-b-4 border-base transition "),k(e,"href",r="#"+zt(t[23]))},m(t,r){w(t,e,r),h(e,n),h(e,o)},p(t,o){4&o&&s!==(s=t[23]+"")&&F(n,s),4&o&&r!==(r="#"+zt(t[23]))&&k(e,"href",r)},d(t){t&&x(e)}}}function mt(e){let n,o,r,s,i,c,l;return{c(){n=y("h1"),n.textContent="Build Application That Useful For Anyone",r=_(),s=y("div"),i=y("img"),k(n,"class","text-[10vw] md:text-[5em] text-center md:w-[55vw] font-extrabold leading-[1.1em] drop-shadow-sm text-heading moving "),k(i,"class","w-screen h-[35vh]"),a(i.src,c="/assets/wave.png")||k(i,"src","/assets/wave.png"),k(i,"alt",""),k(s,"class","w-screen h-screen flex flex-col-reverse absolute top-0 z-[-1]")},m(t,e){w(t,n,e),w(t,r,e),w(t,s,e),h(s,i)},i(t){o||q((()=>{o=Y(n,e[9],{duration:1e3,delay:300}),o.start()})),l||q((()=>{l=Y(i,e[9],{duration:500}),l.start()}))},o:t,d(t){t&&x(n),t&&x(r),t&&x(s)}}}function ht(e){let n,o=e[14]&&mt(e);return{c(){n=y("div"),o&&o.c(),k(n,"class","w-screen h-screen flex flex-col justify-center items-center px-5")},m(t,e){w(t,n,e),o&&o.m(n,null)},p(t,e){t[14]?o?16384&e&&J(o,1):(o=mt(t),o.c(),J(o,1),o.m(n,null)):o&&(o.d(1),o=null)},i(t){J(o)},o:t,d(t){t&&x(n),o&&o.d()}}}function gt(e){let n,o,r,s,i,c,a,l,d,u,f;return{c(){n=y("div"),o=b("svg"),r=b("path"),s=b("path"),c=_(),a=y("h2"),a.innerHTML='Who Am I<span class="text-muted">?</span>',d=_(),u=y("p"),u.innerHTML="My name is Fazle and I am a developer also a student from Indonesia,\n            I love building application especially a web application,\n            I love to build application that useful for anyone and has simple\n            user interface that create amazing user experience.\n            I build my applications with some languages\n            like <strong>Javascript, Typescript, CSS, HTML</strong>, and\n            sometimes using frameworks like <strong>React, Svelte, and Tailwind</strong>.",k(r,"d","M480 31.4235C432.974 12.8053 302.77 -8.07378 158.164 57.3561C13.5586 122.786 -2.60664 47.7145 7.38643 2"),k(r,"stroke","#FF505A"),k(r,"stroke-width","10"),k(s,"d","M500 51.4235C454.162 32.8053 327.247 11.9262 186.295 77.3561C45.3424 142.786 29.5855 67.7145 39.3261 22"),k(s,"stroke","#C62368"),k(s,"stroke-width","10"),k(o,"class","hidden lg:block absolute z-[-1] right-0 moving "),k(o,"width","459"),k(o,"height","109"),k(o,"viewBox","0 0 459 109"),k(o,"fill","none"),k(o,"xmlns","http://www.w3.org/2000/svg"),k(a,"class","text-[8vw] md:text-[3em] lg:text-[4em] mb-9 text-accent font-bold "),k(u,"class","text-md md:text-[1.5em] text-base lg:w-[70%] leading-[1.7em] "),k(n,"class","md:w-[80%] border-l-8 border-muted px-14 mx-auto")},m(t,e){w(t,n,e),h(n,o),h(o,r),h(o,s),h(n,c),h(n,a),h(n,d),h(n,u)},i(t){i||q((()=>{i=Y(o,e[9],{duration:500,delay:500}),i.start()})),l||q((()=>{l=Y(a,e[9],{duration:1e3,delay:500}),l.start()})),f||q((()=>{f=Y(u,e[9],{duration:1200,delay:800}),f.start()}))},o:t,d(t){t&&x(n)}}}function $t(e){let n,o,r,s=e[14]&&gt(e);return{c(){n=y("h3"),n.textContent="About Me",o=_(),r=y("div"),s&&s.c(),k(n,"id","about"),k(n,"class","opacity-0"),k(r,"class","w-screen py-14")},m(t,e){w(t,n,e),w(t,o,e),w(t,r,e),s&&s.m(r,null)},p(t,e){t[14]?s?16384&e&&J(s,1):(s=gt(t),s.c(),J(s,1),s.m(r,null)):s&&(s.d(1),s=null)},i(t){J(s)},o:t,d(t){t&&x(n),t&&x(o),t&&x(r),s&&s.d()}}}function wt(e){let n,o,r,s,i,c,a,l,d,u,f,p=e[0][0][0]+"",m=e[0][0][1]+"";return{c(){n=y("a"),o=y("div"),r=y("h2"),r.textContent="Certificates",s=_(),i=y("p"),c=C(p),a=_(),l=y("p"),d=C(m),k(r,"class","mb-2 text-primary"),k(i,"class","text-primary font-bold text-center"),k(l,"class","text-primary text-center"),k(o,"class","bg-gradient-to-br from-accent to-secondary rounded-3xl flex flex-col items-center justify-center p-5 "),k(n,"class","w-[80%]"),k(n,"href",f=e[0][0][2]),k(n,"target","_blank"),k(n,"rel","noopener")},m(t,u){w(t,n,u),h(n,o),h(o,r),h(o,s),h(o,i),h(i,c),e[10](i),h(o,a),h(o,l),h(l,d),e[11](l),e[12](n)},p(t,e){1&e&&p!==(p=t[0][0][0]+"")&&F(c,p),1&e&&m!==(m=t[0][0][1]+"")&&F(d,m),1&e&&f!==(f=t[0][0][2])&&k(n,"href",f)},i(t){u||q((()=>{u=Y(o,e[9],{duration:1e3}),u.start()}))},o:t,d(t){t&&x(n),e[10](null),e[11](null),e[12](null)}}}function xt(e){let n,o=e[14]&&wt(e);return{c(){n=y("div"),o&&o.c(),k(n,"class","w-screen h-36 flex flex-col justify-center items-center")},m(t,e){w(t,n,e),o&&o.m(n,null)},p(t,e){t[14]?o?(o.p(t,e),16384&e&&J(o,1)):(o=wt(t),o.c(),J(o,1),o.m(n,null)):o&&(o.d(1),o=null)},i(t){J(o)},o:t,d(t){t&&x(n),o&&o.d()}}}function vt(e){let n,o,r,s,i,c,a,l=e[4],d=[];for(let t=0;t<l.length;t+=1)d[t]=yt(ut(e,l,t));let u=e[8]&&bt(e);return{c(){n=y("h2"),n.innerHTML='My <span class="text-muted">&lt;</span>Projects<span class="text-muted">/&gt;</span>',r=_(),s=y("div");for(let t=0;t<d.length;t+=1)d[t].c();c=_(),a=y("div"),u&&u.c(),k(n,"class","text-center md:text-left text-[8vw] md:text-[3em] lg:text-[4em] text-accent font-bold md:ml-20 "),k(s,"class","md:ml-20 w-full md:w-[80%] flex justify-center md:block "),k(a,"class","py-5 flex flex-wrap justify-center md:justify-start mt-9")},m(t,e){w(t,n,e),w(t,r,e),w(t,s,e);for(let t=0;t<d.length;t+=1)d[t].m(s,null);w(t,c,e),w(t,a,e),u&&u.m(a,null)},p(t,e){if(16&e){let n;for(l=t[4],n=0;n<l.length;n+=1){const o=ut(t,l,n);d[n]?d[n].p(o,e):(d[n]=yt(o),d[n].c(),d[n].m(s,null))}for(;n<d.length;n+=1)d[n].d(1);d.length=l.length}t[8]?u?u.p(t,e):(u=bt(t),u.c(),u.m(a,null)):u&&(u.d(1),u=null)},i(t){o||q((()=>{o=Y(n,e[9],{duration:1e3}),o.start()})),i||q((()=>{i=Y(s,e[9],{duration:1e3,delay:500}),i.start()}))},o:t,d(t){t&&x(n),t&&x(r),t&&x(s),v(d,t),t&&x(c),t&&x(a),u&&u.d()}}}function yt(t){let e,n,o,r,s,i,c;return{c(){e=y("a"),n=y("img"),i=_(),k(n,"class","w-14 filter grayscale hover:grayscale-0 transition "),a(n.src,o=t[18][1])||k(n,"src",o),k(n,"title",r=t[18][0]),k(n,"alt",s=t[18][0]),k(e,"href",c=t[18][2])},m(t,o){w(t,e,o),h(e,n),h(e,i)},p(t,i){16&i&&!a(n.src,o=t[18][1])&&k(n,"src",o),16&i&&r!==(r=t[18][0])&&k(n,"title",r),16&i&&s!==(s=t[18][0])&&k(n,"alt",s),16&i&&c!==(c=t[18][2])&&k(e,"href",c)},d(t){t&&x(e)}}}function bt(t){let e,n=t[1],o=[];for(let e=0;e<n.length;e+=1)o[e]=Ct(dt(t,n,e));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=C("")},m(t,n){for(let e=0;e<o.length;e+=1)o[e].m(t,n);w(t,e,n)},p(t,r){if(2&r){let s;for(n=t[1],s=0;s<n.length;s+=1){const i=dt(t,n,s);o[s]?o[s].p(i,r):(o[s]=Ct(i),o[s].c(),o[s].m(e.parentNode,e))}for(;s<o.length;s+=1)o[s].d(1);o.length=n.length}},d(t){v(o,t),t&&x(e)}}}function Ct(t){let e,n,o,r,s,i,c,l,d=t[18][0]+"";return{c(){e=y("a"),n=y("img"),s=_(),i=C(d),c=_(),k(n,"loading","lazy"),k(n,"class","w-80 h-52 m-1 object-cover border-4 rounded-md border-muted shadow-lg hover:border-accent transition "),a(n.src,o=t[18][2])||k(n,"src",o),k(n,"title",r=t[18][0]),k(n,"alt",""),k(e,"class","text-muted m-2"),k(e,"href",l=t[18][1]),k(e,"target","_blank"),k(e,"rel","noopener")},m(t,o){w(t,e,o),h(e,n),h(e,s),h(e,i),h(e,c)},p(t,s){2&s&&!a(n.src,o=t[18][2])&&k(n,"src",o),2&s&&r!==(r=t[18][0])&&k(n,"title",r),2&s&&d!==(d=t[18][0]+"")&&F(i,d),2&s&&l!==(l=t[18][1])&&k(e,"href",l)},d(t){t&&x(e)}}}function _t(e){let n,o,r,s=e[14]&&vt(e);return{c(){n=y("div"),o=y("h3"),o.textContent="My Projects",r=_(),s&&s.c(),k(o,"id","projects"),k(o,"class","opacity-0"),k(n,"class","w-screen px-10 py-20 border-b-2 border-secondary")},m(t,e){w(t,n,e),h(n,o),h(n,r),s&&s.m(n,null)},p(t,e){t[14]?s?(s.p(t,e),16384&e&&J(s,1)):(s=vt(t),s.c(),J(s,1),s.m(n,null)):s&&(s.d(1),s=null)},i(t){J(s)},o:t,d(t){t&&x(n),s&&s.d()}}}function kt(e){let n,o,r,s,i=e[3],c=[];for(let t=0;t<i.length;t+=1)c[t]=Ft(lt(e,i,t));return{c(){n=y("h1"),n.textContent="Find Me On",r=_(),s=y("div");for(let t=0;t<c.length;t+=1)c[t].c();k(n,"class","text-[10vw] md:text-[5em] text-center font-extrabold leading-[1.1em] drop-shadow-sm text-heading mb-5 "),k(s,"class","flex flex-wrap justify-center")},m(t,e){w(t,n,e),w(t,r,e),w(t,s,e);for(let t=0;t<c.length;t+=1)c[t].m(s,null)},p(t,e){if(8&e){let n;for(i=t[3],n=0;n<i.length;n+=1){const o=lt(t,i,n);c[n]?(c[n].p(o,e),J(c[n],1)):(c[n]=Ft(o),c[n].c(),J(c[n],1),c[n].m(s,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=i.length}},i(t){o||q((()=>{o=Y(n,e[9],{duration:1e3}),o.start()}));for(let t=0;t<i.length;t+=1)J(c[t])},o:t,d(t){t&&x(n),t&&x(r),t&&x(s),v(c,t)}}}function Ft(e){let n,o,r,s,i,c=e[15][0]+"";return{c(){n=y("a"),o=C(c),r=_(),k(n,"class","text-heading font-bold text-lg mx-2 md:mx-5 py-1 hover:border-b-4 border-heading transition "),k(n,"href",s=e[15][1]),k(n,"target","_blank"),k(n,"rel","noopener")},m(t,e){w(t,n,e),h(n,o),h(n,r)},p(t,e){8&e&&c!==(c=t[15][0]+"")&&F(o,c),8&e&&s!==(s=t[15][1])&&k(n,"href",s)},i(t){i||q((()=>{i=Y(n,ot,{}),i.start()}))},o:t,d(t){t&&x(n)}}}function Mt(e){let n,o,r,s,i,c,a=e[14]&&kt(e);return{c(){n=y("div"),o=b("svg"),r=b("path"),s=_(),i=y("h3"),i.textContent="Let's Find Me",c=_(),a&&a.c(),k(r,"d","M520.75 46.2501C576.312 90.0001 607.812 163.5 605.187 230.438C602.562 297.375 565.812 357.75 532.125 405.875C498.437 454.438 467.812 490.313 430.625 517.875C393.437 545.438 349.25 564.25 305.062 564.688C260.875 565.125 216.687 547.188 178.625 520.063C140.562 492.5 109.062 456.188 70.9998 405.875C32.9373 355.563 -11.2502 291.688 2.74985 246.625C16.7498 201.563 89.8123 175.313 150.187 133.313C210.562 90.8751 257.812 33.1251 321.687 10.8126C385.125 -11.0624 464.75 2.50011 520.75 46.2501Z"),k(r,"fill","#FF505A"),k(o,"class","absolute md:left-28 z-[-1] moving"),k(o,"width","606"),k(o,"height","565"),k(o,"viewBox","0 0 606 565"),k(o,"fill","none"),k(o,"xmlns","http://www.w3.org/2000/svg"),k(i,"class","opacity-0"),k(i,"id","find-me"),k(n,"class","w-screen h-screen flex flex-col justify-center items-center px-5")},m(t,e){w(t,n,e),h(n,o),h(o,r),h(n,s),h(n,i),h(n,c),a&&a.m(n,null)},p(t,e){t[14]?a?(a.p(t,e),16384&e&&J(a,1)):(a=kt(t),a.c(),J(a,1),a.m(n,null)):a&&(a.d(1),a=null)},i(t){J(a)},o:t,d(t){t&&x(n),a&&a.d()}}}function jt(t){let e,n,o,r,s,i,c,a,l,d,u,f,p,m,g,$,b=t[2],C=[];for(let e=0;e<b.length;e+=1)C[e]=pt(ft(t,b,e));return c=new at({props:{once:!0,$$slots:{default:[ht,({intersecting:t})=>({14:t}),({intersecting:t})=>t?16384:0]},$$scope:{ctx:t}}}),l=new at({props:{once:!0,$$slots:{default:[$t,({intersecting:t})=>({14:t}),({intersecting:t})=>t?16384:0]},$$scope:{ctx:t}}}),u=new at({props:{once:!0,$$slots:{default:[xt,({intersecting:t})=>({14:t}),({intersecting:t})=>t?16384:0]},$$scope:{ctx:t}}}),p=new at({props:{once:!0,$$slots:{default:[_t,({intersecting:t})=>({14:t}),({intersecting:t})=>t?16384:0]},$$scope:{ctx:t}}}),g=new at({props:{once:!0,$$slots:{default:[Mt,({intersecting:t})=>({14:t}),({intersecting:t})=>t?16384:0]},$$scope:{ctx:t}}}),{c(){e=y("main"),n=y("nav"),o=y("a"),o.innerHTML='fazle<span class="text-heading">au</span>',r=_(),s=y("div");for(let t=0;t<C.length;t+=1)C[t].c();i=_(),Q(c.$$.fragment),a=_(),Q(l.$$.fragment),d=_(),Q(u.$$.fragment),f=_(),Q(p.$$.fragment),m=_(),Q(g.$$.fragment),k(o,"class","text-accent font-bold text-md md:text-xl"),k(o,"href","/"),k(s,"class","ml-auto"),k(n,"class","bg-white w-screen fixed h-[4em] shadow-md flex items-center px-5 md:px-16 z-50 "),k(e,"class","overflow-x-hidden")},m(t,x){w(t,e,x),h(e,n),h(n,o),h(n,r),h(n,s);for(let t=0;t<C.length;t+=1)C[t].m(s,null);h(e,i),U(c,e,null),h(e,a),U(l,e,null),h(e,d),U(u,e,null),h(e,f),U(p,e,null),h(e,m),U(g,e,null),$=!0},p(t,[e]){if(4&e){let n;for(b=t[2],n=0;n<b.length;n+=1){const o=ft(t,b,n);C[n]?C[n].p(o,e):(C[n]=pt(o),C[n].c(),C[n].m(s,null))}for(;n<C.length;n+=1)C[n].d(1);C.length=b.length}const n={};67125248&e&&(n.$$scope={dirty:e,ctx:t}),c.$set(n);const o={};67125248&e&&(o.$$scope={dirty:e,ctx:t}),l.$set(o);const r={};67125473&e&&(r.$$scope={dirty:e,ctx:t}),u.$set(r);const i={};67125522&e&&(i.$$scope={dirty:e,ctx:t}),p.$set(i);const a={};67125256&e&&(a.$$scope={dirty:e,ctx:t}),g.$set(a)},i(t){$||(J(c.$$.fragment,t),J(l.$$.fragment,t),J(u.$$.fragment,t),J(p.$$.fragment,t),J(g.$$.fragment,t),$=!0)},o(t){X(c.$$.fragment,t),X(l.$$.fragment,t),X(u.$$.fragment,t),X(p.$$.fragment,t),X(g.$$.fragment,t),$=!1},d(t){t&&x(e),v(C,t),Z(c),Z(l),Z(u),Z(p),Z(g)}}}function zt(t){return t.toLowerCase().replace(/[ _/]/g,"-")}function Et(t,e,n){let o,r,s,{certificates:i}=e,{projects:c}=e,{pageSections:a}=e,{mediaLinks:l}=e,{builtByMe:d}=e,u=!1,f=1;return B((()=>{window.scrollTo({top:0}),setInterval((()=>{o&&s&&r&&(n(5,o.innerText=i[f][0],o),n(6,r.innerText=i[f][1],r),n(7,s.href=i[f][2],s),Y(o,ot,{duration:1e3}).start(),Y(r,ot,{duration:1e3}).start(),f=f===i.length-1?0:f+1)}),2500),n(8,u=!0)})),t.$$set=t=>{"certificates"in t&&n(0,i=t.certificates),"projects"in t&&n(1,c=t.projects),"pageSections"in t&&n(2,a=t.pageSections),"mediaLinks"in t&&n(3,l=t.mediaLinks),"builtByMe"in t&&n(4,d=t.builtByMe)},[i,c,a,l,d,o,r,s,u,function(t,{duration:e,delay:n=0}){return{duration:e,delay:n,css:t=>{const e=function(t){return-.5*(Math.cos(Math.PI*t)-1)}(t);return`\n\t\t\t\t\ttransform: translateY(${1-e}em);\n\t\t\t\t\topacity: ${e}\n        `}}},function(t){K[t?"unshift":"push"]((()=>{o=t,n(5,o)}))},function(t){K[t?"unshift":"push"]((()=>{r=t,n(6,r)}))},function(t){K[t?"unshift":"push"]((()=>{s=t,n(7,s)}))}]}return new class extends nt{constructor(t){super(),et(this,t,Et,jt,i,{certificates:0,projects:1,pageSections:2,mediaLinks:3,builtByMe:4})}}({target:document.body,props:{certificates:[["Freecodecamp Responsive Web Design Certification","2021","https://www.freecodecamp.org/certification/fazle/responsive-web-design"],["Freecodecamp JavaScript Algorithms and Data Structures Certification","2021","https://www.freecodecamp.org/certification/fazle/javascript-algorithms-and-data-structures"],["Freecodecamp Front End Development Libraries Certification","2021","https://www.freecodecamp.org/certification/fazle/front-end-development-libraries"],["Freecodecamp Data Visualization Certification","2021","https://www.freecodecamp.org/certification/fazle/data-visualization"],["Freecodecamp Back End Development and APIs Certification","2021","https://www.freecodecamp.org/certification/fazle/back-end-development-and-apis"]],projects:[["Freecodecamp: Choropleth Map","https://kucingkode.github.io/FCC-Data-Visualization/end/choropleth-map.html","/assets/choropleth.png"],["Freecodecamp: Heat Map","https://kucingkode.github.io/FCC-Data-Visualization/end/heat-map.html","/assets/heat.png"],["Freecodecamp: Treemap Diagram","https://kucingkode.github.io/FCC-Data-Visualization/end/treemap-diagram.html","/assets/treemap.png"],["Freecodecamp: Scatterplot Graph","https://kucingkode.github.io/FCC-Data-Visualization/end/scatterplot-graph.html","/assets/scatter.png"],["Freecodecamp: Bar Chart","https://kucingkode.github.io/FCC-Data-Visualization/end/bar-chart.html","/assets/bar.png"],["Freecodecamp Project: 25 + 5 Clock","https://codepen.io/CatKode/full/LYygvaN","https://assets.codepen.io/6644886/internal/screenshots/pens/LYygvaN.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1628392202&width=960"],["Freecodecamp Project: Calculator","https://codepen.io/CatKode/full/MWmPvjq","https://assets.codepen.io/6644886/internal/screenshots/pens/MWmPvjq.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628300574&width=960"],["Freecodecamp: Drum Machine","https://codepen.io/CatKode/full/OJmBWaX","https://assets.codepen.io/6644886/internal/screenshots/pens/OJmBWaX.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628223430&width=960"],["Freecodecamp: Markdown Previewer","https://codepen.io/CatKode/full/xxdawwy","https://assets.codepen.io/6644886/internal/screenshots/pens/xxdawwy.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1628146276&width=960"],["Freecodecamp: Survey Form","https://codepen.io/CatKode/full/poPaoXE","https://assets.codepen.io/6644886/internal/screenshots/pens/poPaoXE.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627361756&width=960"],["Freecodecamp: Quote Generator","https://codepen.io/CatKode/full/KKmxPvV","https://assets.codepen.io/6644886/internal/screenshots/pens/KKmxPvV.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1628062841&width=960"],["Freecodecamp: Tribute Page","https://codepen.io/CatKode/full/Exmobmm","https://assets.codepen.io/6644886/internal/screenshots/pens/Exmobmm.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627285991&width=960"],["Freecodecamp: Product Landing Page","https://codepen.io/CatKode/full/wvdyMBB","https://assets.codepen.io/6644886/internal/screenshots/pens/wvdyMBB.default.png?fit=cover&format=auto&ha=false&height=540&quality=75&v=2&version=1627447215&width=960"],["Freecodecamp: Technical Documentation Page","https://codepen.io/CatKode/details/mdmxBOe","https://assets.codepen.io/6644886/internal/screenshots/pens/mdmxBOe.default.png?fit=cover&format=auto&ha=true&height=540&quality=75&v=2&version=1627557943&width=960"]],mediaLinks:[["Email","mailto:fazlecode@gmail.com"],["Github","https://github.com/KucingKode"],["Codepen","https://codepen.io/CatKode"],["Codewars","https://www.codewars.com/users/fazle"],["Freecodecamp","https://www.freecodecamp.org/fazle"]],builtByMe:[["Cithak","/assets/cithak.svg","https://github.com/KucingKode/Cithak"]],pageSections:["About","Projects","Find Me"]}})}();
//# sourceMappingURL=bundle.js.map
