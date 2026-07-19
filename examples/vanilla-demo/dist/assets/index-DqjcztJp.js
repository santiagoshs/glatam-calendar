(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=globalThis,pt=et.ShadowRoot&&(et.ShadyCSS===void 0||et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ut=Symbol(),vt=new WeakMap;let Tt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==ut)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(pt&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&vt.set(e,t))}return t}toString(){return this.cssText}};const qt=a=>new Tt(typeof a=="string"?a:a+"",void 0,ut),L=(a,...t)=>{const e=a.length===1?a[0]:t.reduce((s,r,i)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[i+1],a[0]);return new Tt(e,a,ut)},Ft=(a,t)=>{if(pt)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=et.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,a.appendChild(s)}},xt=pt?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return qt(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Vt,defineProperty:Yt,getOwnPropertyDescriptor:Zt,getOwnPropertyNames:Jt,getOwnPropertySymbols:Gt,getPrototypeOf:Kt}=Object,I=globalThis,$t=I.trustedTypes,Xt=$t?$t.emptyScript:"",lt=I.reactiveElementPolyfillSupport,Y=(a,t)=>a,rt={toAttribute(a,t){switch(t){case Boolean:a=a?Xt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},mt=(a,t)=>!Vt(a,t),St={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);let H=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=St){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&Yt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:i}=Zt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){const l=r==null?void 0:r.call(this);i==null||i.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??St}static _$Ei(){if(this.hasOwnProperty(Y("elementProperties")))return;const t=Kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Y("properties"))){const e=this.properties,s=[...Jt(e),...Gt(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(xt(r))}else t!==void 0&&e.push(xt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var i;const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const o=(((i=s.converter)==null?void 0:i.toAttribute)!==void 0?s.converter:rt).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var i,o;const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const l=s.getPropertyOptions(r),n=typeof l.converter=="function"?{fromAttribute:l.converter}:((i=l.converter)==null?void 0:i.fromAttribute)!==void 0?l.converter:rt;this._$Em=r;const d=n.fromAttribute(e,l.type);this[r]=d??((o=this._$Ej)==null?void 0:o.get(r))??d,this._$Em=null}}requestUpdate(t,e,s,r=!1,i){var o;if(t!==void 0){const l=this.constructor;if(r===!1&&(i=this[t]),s??(s=l.getPropertyOptions(t)),!((s.hasChanged??mt)(i,e)||s.useDefault&&s.reflect&&i===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(l._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:i},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),i!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[i,o]of r){const{wrapped:l}=o,n=this[i];l!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,o,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(r=>{var i;return(i=r.hostUpdate)==null?void 0:i.call(r)}),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[Y("elementProperties")]=new Map,H[Y("finalized")]=new Map,lt==null||lt({ReactiveElement:H}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,wt=a=>a,it=Z.trustedTypes,kt=it?it.createPolicy("lit-html",{createHTML:a=>a}):void 0,Ct="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,zt="?"+z,Qt=`<${zt}>`,U=document,J=()=>U.createComment(""),G=a=>a===null||typeof a!="object"&&typeof a!="function",yt=Array.isArray,te=a=>yt(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",dt=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dt=/-->/g,Et=/>/g,N=RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_t=/'/g,At=/"/g,It=/^(?:script|style|textarea|title)$/i,ee=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),m=ee(1),j=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),Rt=new WeakMap,P=U.createTreeWalker(U,129);function Nt(a,t){if(!yt(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(t):t}const ae=(a,t)=>{const e=a.length-1,s=[];let r,i=t===2?"<svg>":t===3?"<math>":"",o=V;for(let l=0;l<e;l++){const n=a[l];let d,h,p=-1,u=0;for(;u<n.length&&(o.lastIndex=u,h=o.exec(n),h!==null);)u=o.lastIndex,o===V?h[1]==="!--"?o=Dt:h[1]!==void 0?o=Et:h[2]!==void 0?(It.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=N):h[3]!==void 0&&(o=N):o===N?h[0]===">"?(o=r??V,p=-1):h[1]===void 0?p=-2:(p=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?N:h[3]==='"'?At:_t):o===At||o===_t?o=N:o===Dt||o===Et?o=V:(o=N,r=void 0);const c=o===N&&a[l+1].startsWith("/>")?" ":"";i+=o===V?n+Qt:p>=0?(s.push(d),n.slice(0,p)+Ct+n.slice(p)+z+c):n+z+(p===-2?l:c)}return[Nt(a,i+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let i=0,o=0;const l=t.length-1,n=this.parts,[d,h]=ae(t,e);if(this.el=K.createElement(d,s),P.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=P.nextNode())!==null&&n.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Ct)){const u=h[o++],c=r.getAttribute(p).split(z),f=/([.?@])?(.*)/.exec(u);n.push({type:1,index:i,name:f[2],strings:c,ctor:f[1]==="."?re:f[1]==="?"?ie:f[1]==="@"?oe:ot}),r.removeAttribute(p)}else p.startsWith(z)&&(n.push({type:6,index:i}),r.removeAttribute(p));if(It.test(r.tagName)){const p=r.textContent.split(z),u=p.length-1;if(u>0){r.textContent=it?it.emptyScript:"";for(let c=0;c<u;c++)r.append(p[c],J()),P.nextNode(),n.push({type:2,index:++i});r.append(p[u],J())}}}else if(r.nodeType===8)if(r.data===zt)n.push({type:2,index:i});else{let p=-1;for(;(p=r.data.indexOf(z,p+1))!==-1;)n.push({type:7,index:i}),p+=z.length-1}i++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function W(a,t,e=a,s){var o,l;if(t===j)return t;let r=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const i=G(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==i&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),i===void 0?r=void 0:(r=new i(a),r._$AT(a,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=r:e._$Cl=r),r!==void 0&&(t=W(a,r._$AS(a,t.values),r,s)),t}let se=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=((t==null?void 0:t.creationScope)??U).importNode(e,!0);P.currentNode=r;let i=P.nextNode(),o=0,l=0,n=s[0];for(;n!==void 0;){if(o===n.index){let d;n.type===2?d=new bt(i,i.nextSibling,this,t):n.type===1?d=new n.ctor(i,n.name,n.strings,this,t):n.type===6&&(d=new ne(i,this,t)),this._$AV.push(d),n=s[++l]}o!==(n==null?void 0:n.index)&&(i=P.nextNode(),o++)}return P.currentNode=U,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},bt=class Pt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),G(t)?t===$||t==null||t===""?(this._$AH!==$&&this._$AR(),this._$AH=$):t!==this._$AH&&t!==j&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):te(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==$&&G(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){var i;const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=K.createElement(Nt(s.h,s.h[0]),this.options)),s);if(((i=this._$AH)==null?void 0:i._$AD)===r)this._$AH.p(e);else{const o=new se(r,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=Rt.get(t.strings);return e===void 0&&Rt.set(t.strings,e=new K(t)),e}k(t){yt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const i of t)r===e.length?e.push(s=new Pt(this.O(J()),this.O(J()),this,this.options)):s=e[r],s._$AI(i),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const r=wt(t).nextSibling;wt(t).remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,i){this.type=1,this._$AH=$,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$}_$AI(t,e=this,s,r){const i=this.strings;let o=!1;if(i===void 0)t=W(this,t,e,0),o=!G(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const l=t;let n,d;for(t=i[0],n=0;n<i.length-1;n++)d=W(this,l[s+n],e,n),d===j&&(d=this._$AH[n]),o||(o=!G(d)||d!==this._$AH[n]),d===$?t=$:t!==$&&(t+=(d??"")+i[n+1]),this._$AH[n]=d}o&&!r&&this.j(t)}j(t){t===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class re extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$?void 0:t}}let ie=class extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==$)}},oe=class extends ot{constructor(t,e,s,r,i){super(t,e,s,r,i),this.type=5}_$AI(t,e=this){if((t=W(this,t,e,0)??$)===j)return;const s=this._$AH,r=t===$&&s!==$||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,i=t!==$&&(s===$||r);r&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},ne=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}};const ct=Z.litHtmlPolyfillSupport;ct==null||ct(K,bt),(Z.litHtmlVersions??(Z.litHtmlVersions=[])).push("3.3.3");const le=(a,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let r=s._$litPart$;if(r===void 0){const i=(e==null?void 0:e.renderBefore)??null;s._$litPart$=r=new bt(t.insertBefore(J(),i),i,void 0,e??{})}return r._$AI(a),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis;let M=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=le(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return j}};var Ot;M._$litElement$=!0,M.finalized=!0,(Ot=B.litElementHydrateSupport)==null||Ot.call(B,{LitElement:M});const ht=B.litElementPolyfillSupport;ht==null||ht({LitElement:M});(B.litElementVersions??(B.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=a=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(a,t)}):customElements.define(a,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de={attribute:!0,type:String,converter:rt,reflect:!1,hasChanged:mt},ce=(a=de,t,e)=>{const{kind:s,metadata:r}=e;let i=globalThis.litPropertyMetadata.get(r);if(i===void 0&&globalThis.litPropertyMetadata.set(r,i=new Map),s==="setter"&&((a=Object.create(a)).wrapped=!0),i.set(e.name,a),s==="accessor"){const{name:o}=e;return{set(l){const n=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,n,a,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,a,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const n=this[o];t.call(this,l),this.requestUpdate(o,n,a,!0,l)}}throw Error("Unsupported decorator location: "+s)};function g(a){return(t,e)=>typeof e=="object"?ce(a,t,e):((s,r,i)=>{const o=r.hasOwnProperty(i);return r.constructor.createProperty(i,s),o?Object.getOwnPropertyDescriptor(r,i):void 0})(a,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v(a){return g({...a,state:!0,attribute:!1})}function q(a){const t=a.getFullYear(),e=String(a.getMonth()+1).padStart(2,"0"),s=String(a.getDate()).padStart(2,"0");return`${t}-${e}-${s}`}function tt(a){const[t,e]=a.split(":").map(Number);return(t||0)*60+(e||0)}function Bt(a,t){const e=tt(a.start),s=tt(a.end),r=tt(t.start),i=tt(t.end);return e<i&&r<s}function Ut(a,t=0){const e=new Date(a.getFullYear(),a.getMonth(),a.getDate()),s=e.getDay(),r=(s<t?7:0)+s-t;return e.setDate(e.getDate()-r),e}class he{isDateBlocked(t,e){return this.matchesDateAndDay(t,e)?!e.slots||e.slots.length===0:!1}isSlotBlocked(t,e,s){return this.matchesDateAndDay(t,s)?!s.slots||s.slots.length===0?!0:s.slots.some(r=>Bt(e,r)):!1}matchesDateAndDay(t,e){const s=t.getDay();if(!e.daysOfWeek||!e.daysOfWeek.includes(s))return!1;const r=q(t);return!(e.startDate&&r<e.startDate||e.endDate&&r>e.endDate)}}class ge{isDateBlocked(t,e){return this.matchesDateRange(t,e)?!e.slots||e.slots.length===0:!1}isSlotBlocked(t,e,s){return this.matchesDateRange(t,s)?!s.slots||s.slots.length===0?!0:s.slots.some(r=>Bt(e,r)):!1}matchesDateRange(t,e){const s=q(t);return!(e.startDate&&s<e.startDate||e.endDate&&s>e.endDate)}}const ft=class ft{static getStrategy(t){const e=this.strategies[t];if(!e)throw new Error(`Estrategia de bloqueo no soportada: ${t}`);return e}};ft.strategies={weekly:new he,"date-range":new ge};let gt=ft;function X(a,t,e){for(const s of e){const r=gt.getStrategy(s.type);if(t){if(r.isSlotBlocked(a,t,s))return s}else if(r.isDateBlocked(a,s))return s}}function at(a,t,e){return!!X(a,t,e)}function jt(a,t,e,s=[],r=0){const i=new Date(a,t,1),o=Ut(i,r),l=[],n=new Date(o);for(let d=0;d<42;d++){const h=new Date(n),p=q(h),u=s.map(w=>{const T=X(h,w,e);return{...w,isBlocked:!!T,rule:T}}),c=X(h,void 0,e),f=!!c||u.length>0&&u.every(w=>w.isBlocked);l.push({dateString:p,date:h,isBlocked:f,rule:c||(u.length>0&&u.every(w=>w.isBlocked)?u[0].rule:void 0),dayOfWeek:h.getDay(),dayNumber:h.getDate(),isCurrentMonth:h.getMonth()===t,slots:u}),n.setDate(n.getDate()+1)}return l}function Mt(a,t,e=[],s=0){const r=Ut(a,s),i=[],o=new Date(r);for(let l=0;l<7;l++){const n=new Date(o),d=q(n),h=e.map(c=>{const f=X(n,c,t);return{...c,isBlocked:!!f,rule:f}}),p=X(n,void 0,t),u=!!p||h.length>0&&h.every(c=>c.isBlocked);i.push({dateString:d,date:n,isBlocked:u,rule:p||(h.length>0&&h.every(c=>c.isBlocked)?h[0].rule:void 0),dayOfWeek:n.getDay(),dayNumber:n.getDate(),isCurrentMonth:!0,slots:h}),o.setDate(o.getDate()+1)}return i}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe={ATTRIBUTE:1},ue=a=>(...t)=>({_$litDirective$:a,values:t});class me{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=ue(class extends me{constructor(a){var t;if(super(a),a.type!==pe.ATTRIBUTE||a.name!=="class"||((t=a.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(t=>a[t]).join(" ")+" "}update(a,[t]){var s,r;if(this.st===void 0){this.st=new Set,a.strings!==void 0&&(this.nt=new Set(a.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in t)t[i]&&!((s=this.nt)!=null&&s.has(i))&&this.st.add(i);return this.render(t)}const e=a.element.classList;for(const i of this.st)i in t||(e.remove(i),this.st.delete(i));for(const i in t){const o=!!t[i];o===this.st.has(i)||(r=this.nt)!=null&&r.has(i)||(o?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return j}}),Lt=L`
  :host {
    /* Fonts */
    --glatam-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    
    /* Colors - Premium Apple Light Theme */
    --glatam-primary: #5856d6;
    --glatam-primary-hover: #4745b4;
    --glatam-primary-light: rgba(88, 86, 214, 0.1);
    --glatam-primary-light-hover: rgba(88, 86, 214, 0.25);
    
    --glatam-bg: #ffffff;
    --glatam-surface: #f5f5f7;
    --glatam-border: #e5e5ea;
    --glatam-text: #1d1d1f;
    --glatam-text-secondary: #86868b;
    --glatam-text-light: #ffffff;
    
    /* Blocked/Unavailable states */
    --glatam-blocked-bg: #fcfcfd;
    --glatam-blocked-stripe: #f2f2f7;
    --glatam-blocked-text: #aeaeae;
    --glatam-blocked-border: #e5e5ea;

    /* Selection Colors */
    --glatam-selection-bg: rgba(88, 86, 214, 0.15);
    --glatam-selection-border: #5856d6;
    
    /* Today highlighting */
    --glatam-today-text: #5856d6;
    --glatam-today-bg: rgba(88, 86, 214, 0.08);
    
    /* Dimensions & Layout */
    --glatam-border-radius: 12px;
    --glatam-padding: 16px;
    --glatam-grid-border-radius: 8px;
    --glatam-day-min-height: 72px;
    --glatam-time-col-width: 60px;
    --glatam-slot-height: 48px;
    
    /* Animation duration */
    --glatam-transition-fast: 0.15s ease;
    --glatam-transition-normal: 0.25s ease;
  }

  :host(.dark-mode) {
    /* Colors - Premium Apple Dark Theme */
    --glatam-primary: #5e5ce6;
    --glatam-primary-hover: #7d7aff;
    --glatam-primary-light: rgba(94, 92, 230, 0.15);
    --glatam-primary-light-hover: rgba(94, 92, 230, 0.3);
    
    --glatam-bg: #1c1c1e;
    --glatam-surface: #2c2c2e;
    --glatam-border: #38383a;
    --glatam-text: #f5f5f7;
    --glatam-text-secondary: #8e8e93;
    
    /* Blocked/Unavailable states */
    --glatam-blocked-bg: #242426;
    --glatam-blocked-stripe: #2c2c2e;
    --glatam-blocked-text: #707074;
    --glatam-blocked-border: #38383a;

    /* Selection Colors */
    --glatam-selection-bg: rgba(94, 92, 230, 0.25);
    --glatam-selection-border: #5e5ce6;
    
    /* Today highlighting */
    --glatam-today-text: #7d7aff;
    --glatam-today-bg: rgba(94, 92, 230, 0.12);
  }

  :host([size="small"]) {
    --glatam-day-min-height: 48px;
    --glatam-slot-height: 36px;
    --glatam-time-col-width: 48px;
    --glatam-padding: 10px;
    font-size: 0.8rem;
  }

  :host([size="large"]) {
    --glatam-day-min-height: 96px;
    --glatam-slot-height: 60px;
    --glatam-time-col-width: 72px;
    --glatam-padding: 24px;
    font-size: 1.1rem;
  }
`,Ht=L`
  :host {
    display: grid;
    min-width: 0;
    font-family: var(--glatam-font-family);
    color: var(--glatam-text);
    background-color: var(--glatam-bg);
    border-radius: var(--glatam-border-radius);
    padding: var(--glatam-padding);
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--glatam-border);
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    transition: background-color var(--glatam-transition-normal), border-color var(--glatam-transition-normal);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--glatam-padding);
    flex-wrap: wrap;
    gap: 12px;
  }

  .nav-group, .view-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-title {
    font-size: 1.25rem;
    font-weight: 600;
    min-width: 140px;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .btn {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--glatam-border);
    background-color: var(--glatam-bg);
    color: var(--glatam-text);
    cursor: pointer;
    transition: background-color var(--glatam-transition-fast), border-color var(--glatam-transition-fast), transform var(--glatam-transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
  }

  .btn:hover:not(:disabled) {
    background-color: var(--glatam-surface);
    border-color: var(--glatam-text-secondary);
  }

  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: var(--glatam-primary);
    color: var(--glatam-text-light);
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: var(--glatam-primary-hover);
  }

  .btn-group {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--glatam-border);
  }

  .btn-group .btn {
    border-radius: 0;
    border: none;
    border-right: 1px solid var(--glatam-border);
  }

  .btn-group .btn:last-child {
    border-right: none;
  }

  .btn-group .btn.active {
    background-color: var(--glatam-primary-light);
    color: var(--glatam-primary);
    font-weight: 600;
  }

  /* Timezone Selector Styles */
  .timezone-badge {
    font-size: 0.75rem;
    padding: 4px 8px;
    background: var(--glatam-surface);
    border: 1px solid var(--glatam-border);
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--glatam-text-secondary);
  }

  .timezone-select {
    background: transparent;
    border: none;
    color: var(--glatam-text);
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    padding-right: 4px;
  }

  /* Mini Popover Variant Styles */
  .dropdown-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .dropdown-toggle {
    width: 100%;
    justify-content: space-between;
    padding: 12px 16px;
    border-radius: 12px;
    font-weight: 600;
    height: 48px;
  }

  .dropdown-card {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 320px;
    background: var(--glatam-bg);
    border-radius: 16px;
    border: 1px solid var(--glatam-border);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    z-index: 100;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .slot-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .slot-btn {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid var(--glatam-border);
    background: var(--glatam-bg);
    color: var(--glatam-text);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
    transition: background-color var(--glatam-transition-fast);
  }

  .slot-btn:hover:not(.blocked) {
    background-color: var(--glatam-surface);
    border-color: var(--glatam-text-secondary);
  }

  .slot-btn.blocked {
    background-color: var(--glatam-surface);
    color: var(--glatam-blocked-text);
    text-decoration: line-through;
    cursor: not-allowed;
    border-color: var(--glatam-border);
    opacity: 0.6;
  }

  /* Smooth Apple Animation */
  .calendar-body {
    position: relative;
    width: 100%;
    overflow-x: auto;
    animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.995);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 600px) {
    :host {
      padding: 8px;
    }
    .calendar-header {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .nav-group, .view-group {
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px;
    }
    .nav-title {
      flex: 1;
      font-size: 1.1rem;
      min-width: unset;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .btn {
      font-size: 0.8rem;
      padding: 6px 10px;
      height: 32px;
      min-width: 32px;
    }
  }
`;function st(a,t,e){if(t===e)return 0;const s=(r,i)=>{const o={year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1};i!=="local"&&(o.timeZone=i);const l=new Intl.DateTimeFormat("en-US",o).formatToParts(r),n=new Map(l.map(p=>[p.type,p.value])),d=Number(n.get("hour")),h=d===24?0:d;return new Date(Number(n.get("year")),Number(n.get("month"))-1,Number(n.get("day")),h,Number(n.get("minute")),Number(n.get("second")))};try{const r=s(a,t);return(s(a,e).getTime()-r.getTime())/(60*1e3)}catch{return 0}}function Wt(a,t){if(t===0)return{start:a.start,end:a.end,dayShift:0};const e=d=>{const[h,p]=d.split(":").map(Number);return h*60+p},s=d=>{let h=d%1440;h<0&&(h+=1440);const p=String(Math.floor(h/60)).padStart(2,"0"),u=String(h%60).padStart(2,"0");return`${p}:${u}`},r=e(a.start),i=e(a.end),o=r+t,l=i+t;let n=0;return o<0?n=-1:o>=1440&&(n=1),{start:s(o),end:s(l),dayShift:n}}var ye=Object.defineProperty,be=Object.getOwnPropertyDescriptor,A=(a,t,e,s)=>{for(var r=s>1?void 0:s?be(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&ye(t,e,r),r};let k=class extends M{constructor(){super(...arguments),this.days=[],this.locale="es",this.startOfWeekDay=0,this.selectedDates=[],this.role="provider",this.size="medium",this.minDate="",this.maxDate="",this.showNeighboringMonth=!0,this.tileClassName=null}getWeekdayNames(){const a=[],t=new Date(2026,6,12+this.startOfWeekDay),e=new Intl.DateTimeFormat(this.locale,{weekday:"short"});for(let s=0;s<7;s++)a.push(e.format(t)),t.setDate(t.getDate()+1);return a}handleDayClick(a){this.role==="buyer"&&a.isBlocked||this.dispatchEvent(new CustomEvent("day-select",{detail:{dateString:a.dateString,isBlocked:a.isBlocked},bubbles:!0,composed:!0}))}render(){const a=this.getWeekdayNames();return m`
      ${a.map(t=>m`<div class="weekday">${t}</div>`)}
      
      ${this.days.map(t=>{var e;if(!t.isCurrentMonth&&!this.showNeighboringMonth)return m`<div class="day-cell empty"></div>`;const s=t.dateString===new Date().toISOString().split("T")[0],r=this.selectedDates.includes(t.dateString),i=t.slots.filter(n=>n.isBlocked),o=this.minDate&&t.dateString<this.minDate||this.maxDate&&t.dateString>this.maxDate,l=this.tileClassName?this.tileClassName({date:t.date,dateString:t.dateString}):"";return m`
          <div 
            class=${nt({"day-cell":!0,padding:!t.isCurrentMonth,blocked:t.isBlocked,today:s,selected:r,disabled:!!o,[l]:!!l})}
            part="day-cell ${l}"
            @click=${()=>this.handleDayClick(t)}
          >
            <div class="day-number">${t.dayNumber}</div>
            
            <div class="slot-indicator">
              ${t.isBlocked?m`<div class="badge blocked-day">${((e=t.rule)==null?void 0:e.description)||"Bloqueado"}</div>`:i.slice(0,2).map(n=>{var d,h;return m`
                    <div class="badge blocked-slot" title=${((d=n.rule)==null?void 0:d.description)||""}>
                      🚫 ${((h=n.rule)==null?void 0:h.description)||n.start}
                    </div>
                  `})}
              ${!t.isBlocked&&i.length>2?m`<div style="text-align: center; font-size: 0.65rem; color: var(--glatam-text-secondary);">+${i.length-2} tareas</div>`:""}
            </div>
          </div>
        `})}
    `}};k.styles=L`
    :host { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; width: 100%; }
    .weekday { font-size: 0.75rem; font-weight: 600; color: var(--glatam-text-secondary); text-transform: uppercase; text-align: center; padding: 8px 0; letter-spacing: 0.05em; }
    .day-cell {
      min-height: var(--glatam-day-min-height); border: 1px solid var(--glatam-border); border-radius: var(--glatam-grid-border-radius);
      padding: 8px; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer;
      transition: background-color var(--glatam-transition-fast), border-color var(--glatam-transition-fast); background-color: var(--glatam-bg); position: relative;
    }
    .day-cell:hover:not(.blocked):not(.disabled) { background-color: var(--glatam-surface); border-color: var(--glatam-text-secondary); }
    .day-cell.padding { opacity: 0.4; }
    .day-cell.blocked {
      background: repeating-linear-gradient(45deg, var(--glatam-blocked-bg), var(--glatam-blocked-bg) 10px, var(--glatam-blocked-stripe) 10px, var(--glatam-blocked-stripe) 20px);
      border-color: var(--glatam-blocked-border); color: var(--glatam-blocked-text); cursor: not-allowed;
    }
    .day-cell.today { background-color: var(--glatam-today-bg); border-color: var(--glatam-primary); }
    .day-cell.selected { background-color: var(--glatam-selection-bg); border-color: var(--glatam-selection-border); box-shadow: inset 0 0 0 1px var(--glatam-selection-border); }
    .day-cell.disabled { opacity: 0.2; cursor: not-allowed; background-color: var(--glatam-surface); border-color: var(--glatam-border); pointer-events: none; }
    .day-cell.empty { border: none; background: transparent; cursor: default; pointer-events: none; }
    .day-number { font-size: 0.875rem; font-weight: 500; margin-bottom: 4px; }
    .day-cell.today .day-number { color: var(--glatam-today-text); font-weight: 700; }
    .slot-indicator { display: flex; flex-direction: column; gap: 3px; font-size: 0.7rem; overflow: hidden; margin-top: 4px; }
    .badge { padding: 2px 6px; border-radius: 4px; font-weight: 500; text-align: center; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .badge.blocked-day { background-color: rgba(255, 69, 58, 0.12); color: #ff453a; font-weight: 600; }
    .badge.blocked-slot { background-color: var(--glatam-surface); border: 1px solid var(--glatam-border); color: var(--glatam-text-secondary); }
    :host([size="small"]) .day-cell { min-height: 38px; padding: 4px; justify-content: center; align-items: center; }
    :host([size="small"]) .slot-indicator { display: none; }
    :host([size="small"]) .day-number { margin-bottom: 0; font-size: 0.8rem; }
    @media (max-width: 600px) {
      .day-cell { min-height: 38px; padding: 4px; justify-content: center; align-items: center; }
      .slot-indicator { display: none; }
      .day-number { margin-bottom: 0; font-size: 0.8rem; }
    }
  `;A([g({type:Array})],k.prototype,"days",2);A([g({type:String})],k.prototype,"locale",2);A([g({type:Number})],k.prototype,"startOfWeekDay",2);A([g({type:Array})],k.prototype,"selectedDates",2);A([g({type:String})],k.prototype,"role",2);A([g({type:String,reflect:!0})],k.prototype,"size",2);A([g({type:String})],k.prototype,"minDate",2);A([g({type:String})],k.prototype,"maxDate",2);A([g({type:Boolean})],k.prototype,"showNeighboringMonth",2);A([g({attribute:!1})],k.prototype,"tileClassName",2);k=A([F("glatam-calendar-month-view")],k);var fe=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,O=(a,t,e,s)=>{for(var r=s>1?void 0:s?ve(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&fe(t,e,r),r};let E=class extends M{constructor(){super(...arguments),this.days=[],this.slots=[],this.locale="es",this.selectedRange=null,this.role="provider",this.isDragging=!1,this.dragDayIndex=null,this.dragStartSlotIndex=null,this.dragEndSlotIndex=null,this.handleMouseUp=()=>{if(!this.isDragging||this.dragDayIndex===null||this.dragStartSlotIndex===null||this.dragEndSlotIndex===null){this.isDragging=!1;return}this.isDragging=!1;const a=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),t=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex),e=this.days[this.dragDayIndex],s=e.slots.slice(a,t+1);s.some(r=>r.isBlocked)||this.dispatchEvent(new CustomEvent("range-select",{detail:{dateString:e.dateString,start:s[0].start,end:s[s.length-1].end},bubbles:!0,composed:!0})),this.dragDayIndex=null,this.dragStartSlotIndex=null,this.dragEndSlotIndex=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("mouseup",this.handleMouseUp)}disconnectedCallback(){window.removeEventListener("mouseup",this.handleMouseUp),super.disconnectedCallback()}handleMouseDown(a,t,e){if(e){if(this.role==="buyer")return;this.dispatchEvent(new CustomEvent("slot-click",{detail:{dateString:this.days[a].dateString,slot:this.days[a].slots[t],isBlocked:!0},bubbles:!0,composed:!0}));return}this.isDragging=!0,this.dragDayIndex=a,this.dragStartSlotIndex=t,this.dragEndSlotIndex=t}handleMouseEnter(a,t,e){this.isDragging&&a===this.dragDayIndex&&!e&&(this.dragEndSlotIndex=t)}isSlotSelected(a,t){return!this.selectedRange||this.selectedRange.dateString!==a?!1:t.start>=this.selectedRange.start&&t.end<=this.selectedRange.end}isSlotDragSelecting(a,t){if(!this.isDragging||a!==this.dragDayIndex)return!1;const e=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),s=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex);return t>=e&&t<=s}render(){const a=new Date().toISOString().split("T")[0];return m`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map(t=>m`<div class="slot-cell time-slot-label">${t.start}</div>`)}
      </div>

      ${this.days.map((t,e)=>{const s=t.dateString===a,r=new Intl.DateTimeFormat(this.locale,{weekday:"short"}).format(t.date);return m`
          <div class="day-col">
            <div class="header-cell ${s?"today":""}">
              <div>${r}</div>
              <div class="day-num">${t.dayNumber}</div>
            </div>
            
            ${t.slots.map((i,o)=>{var l,n;const d=i.isBlocked,h=this.isSlotSelected(t.dateString,i),p=this.isSlotDragSelecting(e,o);return m`
                <div
                  class=${nt({"slot-cell":!0,available:!d,blocked:d,selected:h,"drag-selecting":p})}
                  @mousedown=${()=>this.handleMouseDown(e,o,d)}
                  @mouseenter=${()=>this.handleMouseEnter(e,o,d)}
                  title=${d&&(l=i.rule)!=null&&l.description?i.rule.description:""}
                >
                  ${d?((n=i.rule)==null?void 0:n.description)||"Ocupado":h?"Reservado":""}
                </div>
              `})}
          </div>
        `})}
    `}};E.styles=L`
    :host {
      display: grid; grid-template-columns: var(--glatam-time-col-width) repeat(7, 1fr); gap: 2px;
      width: 100%; background-color: var(--glatam-border); border: 1px solid var(--glatam-border);
      border-radius: var(--glatam-grid-border-radius); overflow: hidden; user-select: none;
    }
    @media (max-width: 600px) {
      :host {
        grid-template-columns: 40px repeat(7, 1fr);
        overflow-x: hidden;
      }
      .slot-cell {
        font-size: 0.65rem;
      }
      .slot-cell.blocked, .slot-cell.selected {
        font-size: 0;
        padding: 0;
      }
      .time-slot-label {
        font-size: 0.65rem;
      }
      .header-cell {
        font-size: 0.7rem;
      }
      .header-cell .day-num {
        font-size: 0.8rem;
      }
    }
    .time-col { background-color: var(--glatam-surface); display: flex; flex-direction: column; }
    .day-col { background-color: var(--glatam-bg); display: flex; flex-direction: column; }
    .header-cell {
      height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background-color: var(--glatam-surface); border-bottom: 2px solid var(--glatam-border);
      font-size: 0.8rem; font-weight: 500; text-transform: capitalize;
    }
    .header-cell.today { color: var(--glatam-primary); font-weight: 700; }
    .header-cell .day-num { font-size: 0.95rem; font-weight: 600; margin-top: 2px; }
    .slot-cell {
      height: var(--glatam-slot-height); border-bottom: 1px solid var(--glatam-border);
      display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
      cursor: pointer; transition: background-color var(--glatam-transition-fast); position: relative;
    }
    .time-slot-label { font-size: 0.7rem; color: var(--glatam-text-secondary); }
    .slot-cell.available:hover { background-color: var(--glatam-surface); }
    .slot-cell.blocked {
      background-color: var(--glatam-blocked-bg);
      background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, var(--glatam-blocked-stripe) 5px, var(--glatam-blocked-stripe) 10px);
      color: var(--glatam-blocked-text); cursor: not-allowed; font-weight: 600; padding: 0 4px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;
    }
    .slot-cell.selected { background-color: var(--glatam-selection-bg); border-left: 3px solid var(--glatam-selection-border); }
    .slot-cell.drag-selecting { background-color: var(--glatam-primary-light); }
  `;O([g({type:Array})],E.prototype,"days",2);O([g({type:Array})],E.prototype,"slots",2);O([g({type:String})],E.prototype,"locale",2);O([g({type:Object})],E.prototype,"selectedRange",2);O([g({type:String})],E.prototype,"role",2);O([v()],E.prototype,"isDragging",2);O([v()],E.prototype,"dragDayIndex",2);O([v()],E.prototype,"dragStartSlotIndex",2);O([v()],E.prototype,"dragEndSlotIndex",2);E=O([F("glatam-calendar-week-view")],E);var xe=Object.defineProperty,$e=Object.getOwnPropertyDescriptor,C=(a,t,e,s)=>{for(var r=s>1?void 0:s?$e(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&xe(t,e,r),r};let _=class extends M{constructor(){super(...arguments),this.day=null,this.slots=[],this.locale="es",this.selectedRange=null,this.role="provider",this.isDragging=!1,this.dragStartSlotIndex=null,this.dragEndSlotIndex=null,this.handleMouseUp=()=>{if(!this.isDragging||!this.day||this.dragStartSlotIndex===null||this.dragEndSlotIndex===null){this.isDragging=!1;return}this.isDragging=!1;const a=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),t=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex),e=this.day.slots.slice(a,t+1);e.some(s=>s.isBlocked)||this.dispatchEvent(new CustomEvent("range-select",{detail:{dateString:this.day.dateString,start:e[0].start,end:e[e.length-1].end},bubbles:!0,composed:!0})),this.dragStartSlotIndex=null,this.dragEndSlotIndex=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("mouseup",this.handleMouseUp)}disconnectedCallback(){window.removeEventListener("mouseup",this.handleMouseUp),super.disconnectedCallback()}handleMouseDown(a,t){if(t&&this.day){if(this.role==="buyer")return;this.dispatchEvent(new CustomEvent("slot-click",{detail:{dateString:this.day.dateString,slot:this.day.slots[a],isBlocked:!0},bubbles:!0,composed:!0}));return}this.isDragging=!0,this.dragStartSlotIndex=a,this.dragEndSlotIndex=a}handleMouseEnter(a,t){this.isDragging&&!t&&(this.dragEndSlotIndex=a)}isSlotSelected(a){return!this.day||!this.selectedRange||this.selectedRange.dateString!==this.day.dateString?!1:a.start>=this.selectedRange.start&&a.end<=this.selectedRange.end}isSlotDragSelecting(a){if(!this.isDragging)return!1;const t=Math.min(this.dragStartSlotIndex,this.dragEndSlotIndex),e=Math.max(this.dragStartSlotIndex,this.dragEndSlotIndex);return a>=t&&a<=e}render(){if(!this.day)return m`<div>Cargando...</div>`;const a=this.day.dateString===new Date().toISOString().split("T")[0],t=new Intl.DateTimeFormat(this.locale,{weekday:"long",day:"numeric",month:"long"}).format(this.day.date);return m`
      <div class="time-col">
        <div class="header-cell">Hora</div>
        ${this.slots.map(e=>m`<div class="slot-cell time-slot-label">${e.start}</div>`)}
      </div>

      <div class="day-col">
        <div class="header-cell ${a?"today":""}">
          <div style="text-transform: capitalize;">${t}</div>
        </div>

        ${this.day.slots.map((e,s)=>{var r,i;const o=e.isBlocked,l=this.isSlotSelected(e),n=this.isSlotDragSelecting(s);return m`
            <div
              class=${nt({"slot-cell":!0,available:!o,blocked:o,selected:l,"drag-selecting":n})}
              @mousedown=${()=>this.handleMouseDown(s,o)}
              @mouseenter=${()=>this.handleMouseEnter(s,o)}
              title=${o&&(r=e.rule)!=null&&r.description?e.rule.description:""}
            >
              ${o?((i=e.rule)==null?void 0:i.description)||"Ocupado":l?"Reservado":""}
            </div>
          `})}
      </div>
    `}};_.styles=L`
    :host {
      display: grid; grid-template-columns: var(--glatam-time-col-width) 1fr; gap: 2px;
      width: 100%; background-color: var(--glatam-border); border: 1px solid var(--glatam-border);
      border-radius: var(--glatam-grid-border-radius); overflow: hidden; user-select: none;
    }
    .time-col { background-color: var(--glatam-surface); display: flex; flex-direction: column; }
    .day-col { background-color: var(--glatam-bg); display: flex; flex-direction: column; }
    .header-cell {
      height: 60px; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background-color: var(--glatam-surface); border-bottom: 2px solid var(--glatam-border);
      font-size: 0.875rem; font-weight: 500;
    }
    .header-cell.today { color: var(--glatam-primary); font-weight: 700; }
    .slot-cell {
      height: var(--glatam-slot-height); border-bottom: 1px solid var(--glatam-border);
      display: flex; align-items: center; justify-content: center; font-size: 0.75rem;
      cursor: pointer; transition: background-color var(--glatam-transition-fast); position: relative;
    }
    .time-slot-label { font-size: 0.7rem; color: var(--glatam-text-secondary); }
    .slot-cell.available:hover { background-color: var(--glatam-surface); }
    .slot-cell.blocked {
      background-color: var(--glatam-blocked-bg);
      background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, var(--glatam-blocked-stripe) 5px, var(--glatam-blocked-stripe) 10px);
      color: var(--glatam-blocked-text); cursor: not-allowed; font-weight: 600; padding: 0 10px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .slot-cell.selected { background-color: var(--glatam-selection-bg); border-left: 3px solid var(--glatam-selection-border); }
    .slot-cell.drag-selecting { background-color: var(--glatam-primary-light); }
  `;C([g({type:Object})],_.prototype,"day",2);C([g({type:Array})],_.prototype,"slots",2);C([g({type:String})],_.prototype,"locale",2);C([g({type:Object})],_.prototype,"selectedRange",2);C([g({type:String})],_.prototype,"role",2);C([v()],_.prototype,"isDragging",2);C([v()],_.prototype,"dragStartSlotIndex",2);C([v()],_.prototype,"dragEndSlotIndex",2);_=C([F("glatam-calendar-day-view")],_);var Se=Object.defineProperty,we=Object.getOwnPropertyDescriptor,R=(a,t,e,s)=>{for(var r=s>1?void 0:s?we(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&Se(t,e,r),r};let D=class extends M{constructor(){super(...arguments),this.open=!1,this.dateString="",this.startTime="",this.endTime="",this.isRange=!1,this.existingRule=null,this.description="",this.blockAllDay=!0,this.isRecurring=!1,this.selectedDays=[]}willUpdate(a){a.has("open")&&this.open&&(this.existingRule?(this.description="Bloqueo",this.blockAllDay=!this.existingRule.slots||this.existingRule.slots.length===0,this.isRecurring=this.existingRule.type==="weekly",this.selectedDays=this.existingRule.daysOfWeek||[]):(this.description="",this.blockAllDay=!this.isRange,this.isRecurring=!1,this.selectedDays=[new Date(this.dateString+"T00:00:00").getDay()]))}toggleDay(a){this.selectedDays.indexOf(a)>-1?this.selectedDays=this.selectedDays.filter(t=>t!==a):this.selectedDays=[...this.selectedDays,a]}handleSave(){const a={title:this.description||"Bloqueo",blockAllDay:this.blockAllDay,isRecurring:this.isRecurring,selectedDays:this.selectedDays,dateString:this.dateString,startTime:this.startTime,endTime:this.endTime};this.dispatchEvent(new CustomEvent("save-rule",{detail:a,bubbles:!0,composed:!0}))}handleDelete(){this.existingRule&&this.dispatchEvent(new CustomEvent("delete-rule",{detail:{id:this.existingRule.id},bubbles:!0,composed:!0}))}render(){const a=["D","L","M","M","J","V","S"],t=this.isRange?`${this.dateString} (${this.startTime} - ${this.endTime})`:this.dateString;return m`
      <div class=${nt({"modal-overlay":!0,open:this.open})}>
        <div class="modal-content">
          <h3>${this.existingRule?"Gestionar Bloqueo":"Crear Bloqueo"}</h3>
          
          <div style="font-size: 0.85rem; color: var(--glatam-text-secondary);">
            Selección: <strong>${t}</strong>
          </div>

          <div class="form-group">
            <label>Descripción / Nota</label>
            <input 
              type="text" 
              .value=${this.description} 
              @input=${e=>this.description=e.target.value}
              placeholder="Ej. Reunión de equipo, Vacaciones" 
            />
          </div>

          <div class="switch-row">
            <label>Bloquear todo el día</label>
            <label class="switch">
              <input 
                type="checkbox" 
                .checked=${this.blockAllDay} 
                @change=${e=>this.blockAllDay=e.target.checked}
              />
              <span class="slider"></span>
            </label>
          </div>

          <div class="switch-row">
            <label>Repetir semanalmente</label>
            <label class="switch">
              <input 
                type="checkbox" 
                .checked=${this.isRecurring} 
                @change=${e=>this.isRecurring=e.target.checked}
              />
              <span class="slider"></span>
            </label>
          </div>

          ${this.isRecurring?m`
                <div class="form-group">
                  <label>Repetir los días</label>
                  <div class="days-grid">
                    ${[1,2,3,4,5,6,0].map(e=>m`
                      <button 
                        class="day-btn ${this.selectedDays.includes(e)?"selected":""}"
                        @click=${()=>this.toggleDay(e)}
                      >
                        ${a[e]}
                      </button>
                    `)}
                  </div>
                </div>
              `:""}

          <div class="btn-actions">
            ${this.existingRule?m`<button class="btn btn-danger" @click=${this.handleDelete}>Eliminar</button>`:""}
            <button class="btn btn-cancel" @click=${()=>this.dispatchEvent(new CustomEvent("close"))}>Cancelar</button>
            <button class="btn btn-save" @click=${this.handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    `}};D.styles=L`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0; pointer-events: none;
      transition: opacity var(--glatam-transition-normal);
    }
    .modal-overlay.open {
      opacity: 1; pointer-events: auto;
    }
    .modal-content {
      background: var(--glatam-bg);
      color: var(--glatam-text);
      border-radius: 24px;
      padding: 28px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
      border: 1px solid var(--glatam-border);
      transform: scale(0.92) translateY(10px);
      transition: transform var(--glatam-transition-normal), background-color var(--glatam-transition-normal);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .modal-overlay.open .modal-content {
      transform: scale(1) translateY(0);
    }
    h3 { margin: 0; font-size: 1.3rem; font-weight: 700; letter-spacing: -0.02em; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    label { font-size: 0.8rem; color: var(--glatam-text-secondary); font-weight: 600; }
    input[type="text"] {
      background: var(--glatam-surface);
      border: 1px solid var(--glatam-border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--glatam-text);
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: border-color var(--glatam-transition-fast);
    }
    input[type="text"]:focus {
      border-color: var(--glatam-primary);
    }
    .switch-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0;
    }
    
    /* Apple Switch Style */
    .switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 26px;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: var(--glatam-border);
      transition: .25s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 26px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .25s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }
    input:checked + .slider {
      background-color: var(--glatam-primary);
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .days-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      margin-top: 4px;
    }
    .day-btn {
      width: 36px;
      height: 36px;
      margin: 0 auto;
      border-radius: 50%;
      border: 1px solid var(--glatam-border);
      background: var(--glatam-bg);
      color: var(--glatam-text);
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color var(--glatam-transition-fast), color var(--glatam-transition-fast), border-color var(--glatam-transition-fast);
    }
    .day-btn:hover {
      background-color: var(--glatam-surface);
    }
    .day-btn.selected {
      background: var(--glatam-primary);
      color: var(--glatam-text-light);
      border-color: var(--glatam-primary);
    }
    .btn-actions { display: flex; gap: 10px; margin-top: 10px; justify-content: flex-end; }
    .btn {
      padding: 10px 18px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity var(--glatam-transition-fast), transform var(--glatam-transition-fast);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .btn:active { transform: scale(0.97); }
    .btn-cancel { background: transparent; color: var(--glatam-text); border: 1px solid var(--glatam-border); }
    .btn-cancel:hover { background-color: var(--glatam-surface); }
    .btn-save { background: var(--glatam-primary); color: var(--glatam-text-light); }
    .btn-save:hover { opacity: 0.95; }
    .btn-danger {
      background: rgba(255, 69, 58, 0.12);
      color: #ff453a;
      margin-right: auto;
    }
    .btn-danger:hover {
      background: rgba(255, 69, 58, 0.18);
    }
  `;R([g({type:Boolean})],D.prototype,"open",2);R([g({type:String})],D.prototype,"dateString",2);R([g({type:String})],D.prototype,"startTime",2);R([g({type:String})],D.prototype,"endTime",2);R([g({type:Boolean})],D.prototype,"isRange",2);R([g({type:Object})],D.prototype,"existingRule",2);R([v()],D.prototype,"description",2);R([v()],D.prototype,"blockAllDay",2);R([v()],D.prototype,"isRecurring",2);R([v()],D.prototype,"selectedDays",2);D=R([F("glatam-calendar-modal")],D);var ke=Object.defineProperty,De=Object.getOwnPropertyDescriptor,b=(a,t,e,s)=>{for(var r=s>1?void 0:s?De(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&ke(t,e,r),r};const Ee=[{start:"09:00",end:"10:00"},{start:"10:00",end:"11:00"},{start:"11:00",end:"12:00"},{start:"12:00",end:"13:00"},{start:"13:00",end:"14:00"},{start:"14:00",end:"15:00"},{start:"15:00",end:"16:00"},{start:"16:00",end:"17:00"},{start:"17:00",end:"18:00"}];let y=class extends M{constructor(){super(...arguments),this.role="provider",this.size="medium",this.view="month",this.locale="es",this.startOfWeekDay=0,this.rules=[],this.selectedDates=[],this.selectedRange=null,this.hostTimezone="America/Bogota",this.activeTimezone="local",this.slots=Ee,this.minDate="",this.maxDate="",this.showNeighboringMonth=!0,this.tileClassName=null,this.activeDate=new Date,this.localRules=[],this.darkMode=!1,this.modalOpen=!1,this.modalDateString="",this.modalStartTime="",this.modalEndTime="",this.modalIsRange=!1,this.modalExistingRule=null}firstUpdated(){this.darkMode=window.matchMedia("(prefers-color-scheme: dark)").matches,this.localRules=[...this.rules]}willUpdate(a){a.has("rules")&&this.rules.length>0&&this.localRules.length===0&&(this.localRules=[...this.rules])}updated(a){a.has("darkMode")&&this.classList.toggle("dark-mode",this.darkMode)}handlePrev(){const a=new Date(this.activeDate);this.view==="month"?a.setMonth(a.getMonth()-1):this.view==="week"?a.setDate(a.getDate()-7):a.setDate(a.getDate()-1),this.activeDate=a}handleNext(){const a=new Date(this.activeDate);this.view==="month"?a.setMonth(a.getMonth()+1):this.view==="week"?a.setDate(a.getDate()+7):a.setDate(a.getDate()+1),this.activeDate=a}getHeaderTitle(){const a=this.view==="month"?{month:"long",year:"numeric"}:this.view==="week"?{month:"short",year:"numeric"}:{day:"numeric",month:"long",year:"numeric"};return new Intl.DateTimeFormat(this.locale,a).format(this.activeDate)}handleDaySelect(a){const{dateString:t,isBlocked:e}=a.detail;this.role==="buyer"&&e||(this.activeDate=new Date(t+"T00:00:00"),this.view="day",this.dispatchEvent(new CustomEvent("date-selected",{detail:{dateString:t},bubbles:!0,composed:!0})))}handleRangeSelect(a){var t,e;const{dateString:s,start:r,end:i}=a.detail,o=this.activeTimezone==="local"?st(this.activeDate,this.hostTimezone,"local"):0,l=this.getDisplaySlots(o),n=l.findIndex(u=>u.start===r),d=l.findIndex(u=>u.end===i),h=((t=this.slots[n])==null?void 0:t.start)||r,p=((e=this.slots[d])==null?void 0:e.end)||i;if(this.role==="buyer"){this.selectedRange={dateString:s,start:r,end:i},this.dispatchEvent(new CustomEvent("booking-selected",{detail:{dateString:s,start:r,end:i,hostStart:h,hostEnd:p},bubbles:!0,composed:!0}));return}this.openModal(s,h,p,!0,null)}handleSlotClick(a){const{dateString:t,slot:e}=a.detail,s=new Date(t+"T00:00:00"),r=this.activeTimezone==="local"?st(this.activeDate,this.hostTimezone,"local"):0,i=this.getDisplaySlots(r),o=i.findIndex(d=>d.start===e.start),l=this.slots[o]||e;if(this.role==="buyer"){this.selectedRange={dateString:t,start:e.start,end:e.end},this.dispatchEvent(new CustomEvent("booking-selected",{detail:{dateString:t,start:e.start,end:e.end,hostStart:l.start,hostEnd:l.end},bubbles:!0,composed:!0}));return}const n=this.localRules.find(d=>at(s,l,[d]));this.openModal(t,l.start,l.end,!0,n||null)}handleBlockDayAction(){const a=q(this.activeDate),t=this.localRules.find(e=>at(this.activeDate,void 0,[e]));this.openModal(a,"","",!1,t||null)}openModal(a,t,e,s,r){this.modalDateString=a,this.modalStartTime=t,this.modalEndTime=e,this.modalIsRange=s,this.modalExistingRule=r,this.modalOpen=!0}handleSaveRule(a){const t=a.detail,e=this.modalExistingRule?this.modalExistingRule.id:`rule-${Date.now()}`,s={id:e,type:t.isRecurring?"weekly":"date-range",slots:t.blockAllDay?void 0:[{start:t.startTime,end:t.endTime}],daysOfWeek:t.isRecurring?t.selectedDays:void 0,startDate:t.isRecurring?void 0:t.dateString,endDate:t.isRecurring?void 0:t.dateString,description:t.title};this.localRules=this.modalExistingRule?this.localRules.map(r=>r.id===e?s:r):[...this.localRules,s],this.modalOpen=!1,this.dispatchEvent(new CustomEvent("rules-changed",{detail:{rules:this.localRules},bubbles:!0,composed:!0}))}handleDeleteRule(a){this.localRules=this.localRules.filter(t=>t.id!==a.detail.id),this.modalOpen=!1,this.dispatchEvent(new CustomEvent("rules-changed",{detail:{rules:this.localRules},bubbles:!0,composed:!0}))}getDisplaySlots(a){return a===0?this.slots:this.slots.map(t=>{const e=Wt(t,a),s=e.dayShift>0?" (+1d)":e.dayShift<0?" (-1d)":"";return{start:e.start+s,end:e.end+s}})}render(){var a;const t=this.activeDate.getFullYear(),e=this.activeDate.getMonth(),s=at(this.activeDate,void 0,this.localRules),r=this.activeTimezone==="local"?st(this.activeDate,this.hostTimezone,"local"):0,i=this.getDisplaySlots(r),o=n=>n.map(d=>({...d,slots:d.slots.map((h,p)=>{var u,c;return{...h,start:((u=i[p])==null?void 0:u.start)||h.start,end:((c=i[p])==null?void 0:c.end)||h.end}})})),l=((a=this.hostTimezone.split("/").pop())==null?void 0:a.replace("_"," "))||"Anfitrión";return m`
      <div class="calendar-header">
        <div class="nav-group">
          <button class="btn" @click=${()=>this.activeDate=new Date}>Hoy</button>
          <button class="btn" @click=${this.handlePrev}>&lt;</button>
          <button class="btn" @click=${this.handleNext}>&gt;</button>
          <span class="nav-title" style="text-transform: capitalize;">${this.getHeaderTitle()}</span>
        </div>
        
        <div class="view-group">
          ${this.role==="provider"?m`
            <div class="timezone-badge">
              🌐 Zona:
              <select class="timezone-select" @change=${n=>this.activeTimezone=n.target.value}>
                <option value="local" ?selected=${this.activeTimezone==="local"}>Mi Hora</option>
                <option value="host" ?selected=${this.activeTimezone==="host"}>Hora ${l}</option>
              </select>
            </div>
          `:""}
          ${this.role==="provider"&&this.view==="day"?m`<button class="btn btn-primary" @click=${this.handleBlockDayAction} style="margin-right: 8px;">${s?"Liberar Día":"Bloquear Día"}</button>`:""}
          <button class="btn" @click=${()=>this.darkMode=!this.darkMode} style="margin-right: 8px;">${this.darkMode?"☀️":"🌙"}</button>
          <div class="btn-group">
            <button class="btn ${this.view==="month"?"active":""}" @click=${()=>this.view="month"}>Mes</button>
            <button class="btn ${this.view==="week"?"active":""}" @click=${()=>this.view="week"}>Semana</button>
            <button class="btn ${this.view==="day"?"active":""}" @click=${()=>this.view="day"}>Día</button>
          </div>
        </div>
      </div>

      <div class="calendar-body">
        ${this.view==="month"?m`<glatam-calendar-month-view .days=${jt(t,e,this.localRules,this.slots,this.startOfWeekDay)} .locale=${this.locale} .startOfWeekDay=${this.startOfWeekDay} .role=${this.role} .size=${this.size} .minDate=${this.minDate} .maxDate=${this.maxDate} .showNeighboringMonth=${this.showNeighboringMonth} .tileClassName=${this.tileClassName} @day-select=${this.handleDaySelect}></glatam-calendar-month-view>`:this.view==="week"?m`<glatam-calendar-week-view .days=${o(Mt(this.activeDate,this.localRules,this.slots,this.startOfWeekDay))} .slots=${i} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-week-view>`:m`<glatam-calendar-day-view .day=${o(Mt(this.activeDate,this.localRules,this.slots,this.startOfWeekDay)).find(n=>n.dateString===q(this.activeDate))||null} .slots=${i} .locale=${this.locale} .selectedRange=${this.selectedRange} .role=${this.role} @range-select=${this.handleRangeSelect} @slot-click=${this.handleSlotClick}></glatam-calendar-day-view>`}
      </div>

      <glatam-calendar-modal
        .open=${this.modalOpen} .dateString=${this.modalDateString} .startTime=${this.modalStartTime} .endTime=${this.modalEndTime}
        .isRange=${this.modalIsRange} .existingRule=${this.modalExistingRule} @save-rule=${this.handleSaveRule}
        @delete-rule=${this.handleDeleteRule} @close=${()=>this.modalOpen=!1}
      ></glatam-calendar-modal>
    `}};y.styles=[Lt,Ht];b([g({type:String})],y.prototype,"role",2);b([g({type:String,reflect:!0})],y.prototype,"size",2);b([g({type:String})],y.prototype,"view",2);b([g({type:String})],y.prototype,"locale",2);b([g({type:Number})],y.prototype,"startOfWeekDay",2);b([g({type:Array})],y.prototype,"rules",2);b([g({type:Array})],y.prototype,"selectedDates",2);b([g({type:Object})],y.prototype,"selectedRange",2);b([g({type:String})],y.prototype,"hostTimezone",2);b([g({type:String})],y.prototype,"activeTimezone",2);b([g({type:Array})],y.prototype,"slots",2);b([g({type:String})],y.prototype,"minDate",2);b([g({type:String})],y.prototype,"maxDate",2);b([g({type:Boolean})],y.prototype,"showNeighboringMonth",2);b([g({attribute:!1})],y.prototype,"tileClassName",2);b([v()],y.prototype,"activeDate",2);b([v()],y.prototype,"localRules",2);b([v()],y.prototype,"darkMode",2);b([v()],y.prototype,"modalOpen",2);b([v()],y.prototype,"modalDateString",2);b([v()],y.prototype,"modalStartTime",2);b([v()],y.prototype,"modalEndTime",2);b([v()],y.prototype,"modalIsRange",2);b([v()],y.prototype,"modalExistingRule",2);y=b([F("glatam-calendar")],y);var _e=Object.defineProperty,Ae=Object.getOwnPropertyDescriptor,S=(a,t,e,s)=>{for(var r=s>1?void 0:s?Ae(t,e):t,i=a.length-1,o;i>=0;i--)(o=a[i])&&(r=(s?o(t,e,r):o(r))||r);return s&&r&&_e(t,e,r),r};let x=class extends M{constructor(){super(...arguments),this.role="buyer",this.locale="es",this.startOfWeekDay=0,this.rules=[],this.selectedRange=null,this.size="medium",this.hostTimezone="America/Bogota",this.activeTimezone="local",this.minDate="",this.maxDate="",this.showNeighboringMonth=!0,this.tileClassName=null,this.slots=[{start:"09:00",end:"10:00"},{start:"10:00",end:"11:00"},{start:"11:00",end:"12:00"},{start:"12:00",end:"13:00"},{start:"13:00",end:"14:00"},{start:"14:00",end:"15:00"},{start:"15:00",end:"16:00"},{start:"16:00",end:"17:00"},{start:"17:00",end:"18:00"}],this.activeDate=new Date,this.dropdownOpen=!1,this.dropdownSelectedDateString=""}handleDropdownDaySelect(a){this.dropdownSelectedDateString=a.detail.dateString}selectDropdownSlot(a){const t={dateString:this.dropdownSelectedDateString,start:a.displayStart,end:a.displayEnd,hostStart:a.start,hostEnd:a.end};this.selectedRange={dateString:this.dropdownSelectedDateString,start:a.displayStart,end:a.displayEnd},this.dispatchEvent(new CustomEvent("booking-selected",{detail:t,bubbles:!0,composed:!0})),this.dropdownOpen=!1,this.dropdownSelectedDateString=""}render(){const a=this.selectedRange?`Reserva: ${this.selectedRange.dateString} (${this.selectedRange.start} - ${this.selectedRange.end})`:"Seleccionar Fecha y Hora",t=this.activeDate.getFullYear(),e=this.activeDate.getMonth(),s=this.dropdownSelectedDateString?new Date(this.dropdownSelectedDateString+"T00:00:00"):null,r=s&&this.activeTimezone==="local"?st(s,this.hostTimezone,"local"):0,i=s?this.slots.map(o=>{const l=at(s,o,this.rules),n=Wt(o,r),d=n.dayShift>0?" (+1d)":n.dayShift<0?" (-1d)":"";return{...o,displayStart:n.start+d,displayEnd:n.end+d,isBlocked:l}}):[];return m`
      <div class="dropdown-container">
        <button class="btn btn-primary dropdown-toggle" @click=${()=>this.dropdownOpen=!this.dropdownOpen}>
          <span>${a}</span> <span>${this.dropdownOpen?"▲":"▼"}</span>
        </button>

        ${this.dropdownOpen?m`
              <div class="dropdown-card" style="--glatam-day-min-height: 38px;">
                ${this.dropdownSelectedDateString?m`
                      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--glatam-border); padding-bottom:8px;">
                        <button class="btn" style="height:28px; padding:0 8px; font-size:0.75rem;" @click=${()=>this.dropdownSelectedDateString=""}>&lt; Volver</button>
                        <span style="font-size:0.8rem; font-weight:600; color: var(--glatam-text);">${this.dropdownSelectedDateString}</span>
                      </div>
                      <div class="slot-list">
                        ${i.map(o=>m`
                          <button
                            class="slot-btn ${o.isBlocked?"blocked":""}"
                            ?disabled=${o.isBlocked}
                            @click=${()=>this.selectDropdownSlot(o)}
                          >
                            ${o.displayStart} - ${o.displayEnd} ${o.isBlocked?"(Ocupado)":""}
                          </button>
                        `)}
                      </div>
                    `:m`
                      <div style="font-weight:600; font-size:0.9rem; text-align:center; color: var(--glatam-text);">Selecciona un Día</div>
                      <glatam-calendar-month-view
                        .days=${jt(t,e,this.rules,this.slots,this.startOfWeekDay)}
                        .locale=${this.locale}
                        .startOfWeekDay=${this.startOfWeekDay}
                        .role=${this.role}
                        size="small"
                        .minDate=${this.minDate}
                        .maxDate=${this.maxDate}
                        .showNeighboringMonth=${this.showNeighboringMonth}
                        .tileClassName=${this.tileClassName}
                        @day-select=${this.handleDropdownDaySelect}
                      ></glatam-calendar-month-view>
                    `}
              </div>
            `:""}
      </div>
    `}};x.styles=[Lt,Ht,L`
      :host {
        display: inline-block;
        background: transparent;
        border: none;
        padding: 0;
        box-shadow: none;
        width: 100%;
      }
    `];S([g({type:String})],x.prototype,"role",2);S([g({type:String})],x.prototype,"locale",2);S([g({type:Number})],x.prototype,"startOfWeekDay",2);S([g({type:Array})],x.prototype,"rules",2);S([g({type:Object})],x.prototype,"selectedRange",2);S([g({type:String,reflect:!0})],x.prototype,"size",2);S([g({type:String})],x.prototype,"hostTimezone",2);S([g({type:String})],x.prototype,"activeTimezone",2);S([g({type:String})],x.prototype,"minDate",2);S([g({type:String})],x.prototype,"maxDate",2);S([g({type:Boolean})],x.prototype,"showNeighboringMonth",2);S([g({attribute:!1})],x.prototype,"tileClassName",2);S([g({type:Array})],x.prototype,"slots",2);S([v()],x.prototype,"activeDate",2);S([v()],x.prototype,"dropdownOpen",2);S([v()],x.prototype,"dropdownSelectedDateString",2);x=S([F("glatam-calendar-mini")],x);document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("my-calendar"),t=document.getElementById("my-calendar-mini"),e=document.getElementById("role-select"),s=document.getElementById("size-select"),r=document.getElementById("variant-select"),i=document.getElementById("selection-output"),o=document.querySelector("aside ul");if(!a||!t||!e||!s||!r||!i||!o)return;const l=[{id:"weekend-block",type:"weekly",daysOfWeek:[0,6]},{id:"weekly-meeting",type:"weekly",daysOfWeek:[1],slots:[{start:"14:00",end:"16:00"}]}],n=new Date,d=new Date;d.setMonth(n.getMonth()+3);const h=c=>{const f=c.getFullYear(),w=String(c.getMonth()+1).padStart(2,"0"),T=String(c.getDate()).padStart(2,"0");return`${f}-${w}-${T}`};[a,t].forEach(c=>{c.rules=l,c.locale="es",c.startOfWeekDay=1,c.minDate=h(n),c.maxDate=h(d),c.showNeighboringMonth=!0,c.tileClassName=({date:f})=>f.getDay()===5?"casual-friday":""});const p=c=>{if(o.innerHTML="",c.length===0){o.innerHTML='<li style="color: var(--glatam-text-secondary); font-style: italic;">Sin bloqueos activos.</li>';return}c.forEach(f=>{const w=document.createElement("li");let T=f.type==="weekly"?`Semanal [${f.daysOfWeek.map(Q=>["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"][Q]).join(", ")}]`:`Rango: ${f.startDate}`;T+=f.slots&&f.slots.length>0?` (${f.slots.map(Q=>`${Q.start}-${Q.end}`).join(", ")})`:" (Todo el día)",w.innerHTML=`<strong>${f.id.substring(0,8)}</strong>: ${T}`,o.appendChild(w)})};p(l),a.addEventListener("rules-changed",c=>{t.rules=c.detail.rules,p(c.detail.rules)}),t.addEventListener("rules-changed",c=>{a.rules=c.detail.rules,p(c.detail.rules)});const u=c=>{const{dateString:f,start:w,end:T}=c.detail;i.innerHTML=`
      <div class="result-item" style="border-left-color: #ff9500; background-color: rgba(255, 149, 0, 0.08);">
        <strong style="color: #ff9500;">🎉 ¡Reserva Realizada (Buyer)!</strong>
        <div>Fecha: <strong>${f}</strong></div>
        <div>Horario: <strong>${w} - ${T}</strong></div>
        <div style="font-size: 0.8rem; color: #86868b; margin-top: 6px;">
          (Emitió el evento <strong>'booking-selected'</strong> para guardar la compra)
        </div>
      </div>
    `};a.addEventListener("booking-selected",u),t.addEventListener("booking-selected",u),a.addEventListener("date-selected",c=>{a.role!=="buyer"&&(i.innerHTML=`
      <div class="result-item" style="border-left-color: #34c759; background-color: rgba(52, 199, 89, 0.08);">
        <strong>Día Seleccionado:</strong>
        <div>${c.detail.dateString}</div>
        <div style="font-size: 0.8rem; color: #86868b; margin-top: 4px;">(Se abrió el modal para bloquear/liberar)</div>
      </div>
    `)}),a.addEventListener("range-selected",c=>{a.role!=="buyer"&&(i.innerHTML=`
      <div class="result-item" style="border-left-color: #5856d6; background-color: rgba(88, 86, 214, 0.08);">
        <strong>Rango Seleccionado:</strong>
        <div>Día: ${c.detail.dateString}</div>
        <div>Horario: ${c.detail.start} - ${c.detail.end}</div>
      </div>
    `)}),e.addEventListener("change",()=>{const c=e.value;a.role=c,t.role=c,i.innerHTML=c==="buyer"?'<div class="result-item" style="border-left-color: #ff9500;"><strong>Modo Comprador Activo</strong><div>Selecciona una celda u hora libre para reservar.</div></div>':'<div class="result-item" style="border-left-color: #5856d6;"><strong>Modo Anfitrión Activo</strong><div>Haz clic o arrastra para crear/eliminar bloqueos.</div></div>'}),s.addEventListener("change",()=>{const c=s.value;a.setAttribute("size",c),t.setAttribute("size",c)}),r.addEventListener("change",()=>{r.value==="mini"?(a.classList.add("hidden"),t.classList.remove("hidden"),t.rules=a.rules):(t.classList.add("hidden"),a.classList.remove("hidden"),a.rules=t.rules)})});
