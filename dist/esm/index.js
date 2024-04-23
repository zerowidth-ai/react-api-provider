import t,{useState as r,useCallback as e,useContext as n,createContext as o}from"react";function i(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function a(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?i(Object(e),!0).forEach((function(r){l(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function c(){c=function(){return r};var t,r={},e=Object.prototype,n=e.hasOwnProperty,o=Object.defineProperty||function(t,r,e){t[r]=e.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",f=i.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(t){s=function(t,r,e){return t[r]=e}}function l(t,r,e,n){var i=r&&r.prototype instanceof m?r:m,a=Object.create(i.prototype),c=new A(n||[]);return o(a,"_invoke",{value:S(t,e,c)}),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}r.wrap=l;var p="suspendedStart",y="suspendedYield",v="executing",d="completed",g={};function m(){}function b(){}function w(){}var x={};s(x,a,(function(){return this}));var O=Object.getPrototypeOf,j=O&&O(O(T([])));j&&j!==e&&n.call(j,a)&&(x=j);var E=w.prototype=m.prototype=Object.create(x);function L(t){["next","throw","return"].forEach((function(r){s(t,r,(function(t){return this._invoke(r,t)}))}))}function P(t,r){function e(o,i,a,c){var u=h(t[o],t,i);if("throw"!==u.type){var f=u.arg,s=f.value;return s&&"object"==typeof s&&n.call(s,"__await")?r.resolve(s.__await).then((function(t){e("next",t,a,c)}),(function(t){e("throw",t,a,c)})):r.resolve(s).then((function(t){f.value=t,a(f)}),(function(t){return e("throw",t,a,c)}))}c(u.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new r((function(r,o){e(t,n,r,o)}))}return i=i?i.then(o,o):o()}})}function S(r,e,n){var o=p;return function(i,a){if(o===v)throw Error("Generator is already running");if(o===d){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=I(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=d,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var f=h(r,e,n);if("normal"===f.type){if(o=n.done?d:y,f.arg===g)continue;return{value:f.arg,done:n.done}}"throw"===f.type&&(o=d,n.method="throw",n.arg=f.arg)}}}function I(r,e){var n=e.method,o=r.iterator[n];if(o===t)return e.delegate=null,"throw"===n&&r.iterator.return&&(e.method="return",e.arg=t,I(r,e),"throw"===e.method)||"return"!==n&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=h(o,r.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[r.resultName]=a.value,e.next=r.nextLoc,"return"!==e.method&&(e.method="next",e.arg=t),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function _(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function k(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function T(r){if(r||""===r){var e=r[a];if(e)return e.call(r);if("function"==typeof r.next)return r;if(!isNaN(r.length)){var o=-1,i=function e(){for(;++o<r.length;)if(n.call(r,o))return e.value=r[o],e.done=!1,e;return e.value=t,e.done=!0,e};return i.next=i}}throw new TypeError(typeof r+" is not iterable")}return b.prototype=w,o(E,"constructor",{value:w,configurable:!0}),o(w,"constructor",{value:b,configurable:!0}),b.displayName=s(w,f,"GeneratorFunction"),r.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===b||"GeneratorFunction"===(r.displayName||r.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,s(t,f,"GeneratorFunction")),t.prototype=Object.create(E),t},r.awrap=function(t){return{__await:t}},L(P.prototype),s(P.prototype,u,(function(){return this})),r.AsyncIterator=P,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new P(l(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(E),s(E,f,"Generator"),s(E,a,(function(){return this})),s(E,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=T,A.prototype={constructor:A,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(k),!r)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function o(n,o){return c.type="throw",c.arg=r,e.next=n,o&&(e.method="next",e.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),f=n.call(a,"finallyLoc");if(u&&f){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!f)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),k(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;k(e)}return o}}throw Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:T(r),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=t),g}},r}function u(t){var r=function(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,r||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof r?r:r+""}function f(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function s(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function a(t){f(i,n,o,a,c,"next",t)}function c(t){f(i,n,o,a,c,"throw",t)}a(void 0)}))}}function l(t,r,e){return(r=u(r))in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function h(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var n,o,i,a,c=[],u=!0,f=!1;try{if(i=(e=e.call(t)).next,0===r){if(Object(e)!==e)return;u=!1}else for(;!(u=(n=i.call(e)).done)&&(c.push(n.value),c.length!==r);u=!0);}catch(t){f=!0,o=t}finally{try{if(!u&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw o}}return c}}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return p(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return p(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}var y=o(),v=function(){return"id_".concat(Date.now(),"_").concat(Math.random().toString(36).substr(2,9))},d=function(n){var o=n.children,i=n.appId,u=n.endpointId,f=n.proxyUrl,p=n.debugMode;p&&console.log("ZeroWidthApiProvider",{appId:i,endpointId:u,proxyUrl:f,debugMode:p});var d=u||i;if(i&&console.warn("Warning: The appId prop is deprecated and will be removed in future versions. Please use endpointId instead."),!d||"string"!=typeof d||"string"!=typeof f)throw new Error("endpointId (or appId for backward compatibility) and proxyUrl props must be provided as strings to ZeroWidthApiProvider");var g=h(r({}),2),m=g[0],b=g[1],w=h(r({}),2),x=w[0],O=w[1],j=h(r({}),2),E=j[0],L=j[1],P=e(s(c().mark((function t(){var r,e,n,o,i,u=arguments;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=u.length>0&&void 0!==u[0]?u[0]:{},e=u.length>1&&void 0!==u[1]?u[1]:v(),L((function(t){return a(a({},t),{},l({},e,!0))})),O((function(t){return a(a({},t),{},l({},e,null))})),t.prev=4,n="".concat(f,"/process/").concat(d,"/").concat(r.agentId),t.next=8,fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});case 8:return o=t.sent,t.next=11,o.json();case 11:i=t.sent,b((function(t){return a(a({},t),{},l({},e,i))})),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(4),O((function(r){return a(a({},r),{},l({},e,t.t0))}));case 18:return t.prev=18,L((function(t){return a(a({},t),{},l({},e,!1))})),t.finish(18);case 21:case"end":return t.stop()}}),t,null,[[4,15,18,21]])}))),[f,d]),S=e(s(c().mark((function t(){var r,e,n,o,i,u,s,h,p,y=arguments;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=(r=y.length>0&&void 0!==y[0]?y[0]:{}).agentId,n=r.userId,o=r.sessionId,i=r.startAfter,u=y.length>1&&void 0!==y[1]?y[1]:v(),L((function(t){return a(a({},t),{},l({},u,!0))})),O((function(t){return a(a({},t),{},l({},u,null))})),t.prev=4,s=new URLSearchParams(i?{startAfter:i}:{}),t.next=8,fetch("".concat(f,"/history/").concat(d,"/").concat(e,"/").concat(n,"/").concat(o,"?").concat(s));case 8:return h=t.sent,t.next=11,h.json();case 11:p=t.sent,b((function(t){return a(a({},t),{},l({},u,p))})),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(4),O((function(r){return a(a({},r),{},l({},u,t.t0))}));case 18:return t.prev=18,L((function(t){return a(a({},t),{},l({},u,!1))})),t.finish(18);case 21:case"end":return t.stop()}}),t,null,[[4,15,18,21]])}))),[f,d]);return t.createElement(y.Provider,{value:{data:m,error:x,loading:E,process:P,getHistory:S}},o)},g=function(){var t=n(y);if(void 0===t)throw new Error("useZeroWidthApi must be used within a ZeroWidthApiProvider");return t};export{d as ZeroWidthApiProvider,g as useZeroWidthApi};
//# sourceMappingURL=index.js.map