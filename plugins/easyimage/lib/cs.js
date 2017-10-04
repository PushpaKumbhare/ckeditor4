/*!
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://github.com/ckeditor/ckeditor-cloudservices-core/blob/master/LICENSE.md.
 */
(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=1)})([function(a,b,c){'use strict';function d(a,b=512){try{const c=a.match(h)[1],d=atob(a.replace(h,'')),e=[];for(let a=0;a<d.length;a+=b){const c=d.slice(a,a+b),f=Array(c.length);for(let a=0;a<c.length;a++)f[a]=c.charCodeAt(a);e.push(new Uint8Array(f))}return new Blob(e,{type:c})}catch(a){throw new Error('Problem with decoding Base64 image data.')}}function e(a){if('string'!=typeof a)return!1;const b=a.match(h);return!!(b&&b.length)}var f=c(2),g=c(3);const h=/^data:(\S*?);base64,/;class i{constructor(a,b,c){if(!a)throw new Error('File must be provided');if(!b)throw new Error('Token must be provided');if(!c)throw new Error('Api address must be provided');this.file=e(a)?d(a):a,this._token=b,this._apiAddress=c}onProgress(a){return this.on('progress',(b,c)=>a(c)),this}onError(a){return this.once('error',(b,c)=>a(c)),this}abort(){this.xhr.abort()}send(){return this._prepareRequest(),this._attachXHRListeners(),this._sendRequest()}_prepareRequest(){const a=new XMLHttpRequest;a.open('POST',this._apiAddress),a.setRequestHeader('Authorization',this._token),a.responseType='json',this.xhr=a}_attachXHRListeners(){function a(a){return()=>b.fire('error',a)}const b=this,c=this.xhr;c.addEventListener('error',a('Network Error')),c.addEventListener('abort',a('Abort')),c.upload&&c.upload.addEventListener('progress',(a)=>{a.lengthComputable&&this.fire('progress',{total:a.total,uploaded:a.loaded})}),c.addEventListener('load',()=>{const a=c.status,b=c.response;if(200>a||299<a)return this.fire('error',b.message||b.error)})}_sendRequest(){const a=new FormData,b=this.xhr;return a.append('file',this.file),new Promise((c,d)=>{b.addEventListener('load',()=>{const a=b.status,e=b.response;return 200>a||299<a?d(e.message||e.error):c(e)}),b.addEventListener('error',()=>d('Network Error')),b.addEventListener('abort',()=>d('Abort')),b.send(a)})}}Object(f.a)(i,g.a),b.a=i},function(a,b,c){'use strict';Object.defineProperty(b,'__esModule',{value:!0});var d=c(0),e=c(8);c.d(b,'FileUploader',function(){return d.a}),c.d(b,'UploadGateway',function(){return e.a}),window.CKEDITOR=window.CKEDITOR||{},window.CKEDITOR.cloudServices={FileUploader:d.a,UploadGateway:e.a}},function(a,b){'use strict';b.a=function(a,...b){b.forEach((b)=>{Object.getOwnPropertyNames(b).concat(Object.getOwnPropertySymbols(b)).forEach((c)=>{if(!(c in a.prototype)){const d=Object.getOwnPropertyDescriptor(b,c);d.enumerable=!1,Object.defineProperty(a.prototype,c,d)}})})}},function(a,b,c){'use strict';function d(a,b){a[q]||(a[q]=b||Object(m.a)())}function e(a){return a[q]}function f(a){return a._events||Object.defineProperty(a,'_events',{value:{}}),a._events}function g(){return{callbacks:[],childEvents:[]}}function h(a,b){const c=f(a);if(c[b])return;let d=b,e=null;const h=[];for(;''!==d&&!c[d];)c[d]=g(),h.push(c[d]),e&&c[d].childEvents.push(e),e=d,d=d.substr(0,d.lastIndexOf(':'));if(''!==d){var i,j=!0,k=!1;try{for(var l,m=h[Symbol.iterator]();!(j=(l=m.next()).done);j=!0){const a=l.value;a.callbacks=c[d].callbacks.slice()}}catch(a){k=!0,i=a}finally{try{!j&&m['return']&&m['return']()}finally{if(k)throw i}}c[d].childEvents.push(e)}}function j(a,b){const c=f(a)[b];if(!c)return[];let d=[c.callbacks];for(let e=0;e<c.childEvents.length;e++){const b=j(a,c.childEvents[e]);d=d.concat(b)}return d}function i(a,b){let c;return a._events&&(c=a._events[b])&&c.callbacks.length?c.callbacks:-1<b.indexOf(':')?i(a,b.substr(0,b.lastIndexOf(':'))):null}function k(a,b,c){var d,e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done);e=!0){let a=g.value;var i=o(a,2);let d=i[0],e=i[1];e?'function'==typeof e&&(e=e(b.name)):e=b.name;const f=new l.a(b.source,e);f.path=[...b.path],d.fire(f,...c)}}catch(a){f=!0,d=a}finally{try{!e&&h['return']&&h['return']()}finally{if(f)throw d}}}var l=c(4),m=c(6),n=c(7),o=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h['return']&&h['return']()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}();const p=Symbol('listeningTo'),q=Symbol('emitterId'),r={on(a,b,c={}){h(this,a);const d=j(this,a),e=n.a.get(c.priority);b={callback:b,context:c.context||this,priority:e};var f,g=!0,i=!1;try{for(var k,l=d[Symbol.iterator]();!(g=(k=l.next()).done);g=!0){const a=k.value;let c=!1;for(let d=0;d<a.length;d++)if(a[d].priority<e){a.splice(d,0,b),c=!0;break}c||a.push(b)}}catch(a){i=!0,f=a}finally{try{!g&&l['return']&&l['return']()}finally{if(i)throw f}}},once(a,b,c){this.on(a,function(a,...c){a.off(),b.call(this,a,...c)},c)},off(a,b,c){const d=j(this,a);var e,f=!0,g=!1;try{for(var h,i=d[Symbol.iterator]();!(f=(h=i.next()).done);f=!0){const a=h.value;for(let d=0;d<a.length;d++)a[d].callback==b&&(c&&c!=a[d].context||(a.splice(d,1),d--))}}catch(a){g=!0,e=a}finally{try{!f&&i['return']&&i['return']()}finally{if(g)throw e}}},listenTo(a,b,c,f){let g,h;this[p]||(this[p]={});const i=this[p];e(a)||d(a);const j=e(a);(g=i[j])||(g=i[j]={emitter:a,callbacks:{}}),(h=g.callbacks[b])||(h=g.callbacks[b]=[]),h.push(c),a.on(b,c,f)},stopListening(a,b,c){const d=this[p];let f=a&&e(a);const g=d&&f&&d[f],h=g&&b&&g.callbacks[b];if(d&&(!a||g)&&(!b||h))if(c)a.off(b,c);else if(h){for(;c=h.pop();)a.off(b,c);delete g.callbacks[b]}else if(g){for(b in g.callbacks)this.stopListening(a,b);delete d[f]}else{for(f in d)this.stopListening(d[f].emitter);delete this[p]}},fire(a,...b){const c=a instanceof l.a?a:new l.a(this,a),d=c.name;let e=i(this,d);if(c.path.push(this),e){const a=[c,...b];e=Array.from(e);for(let b=0;b<e.length&&(e[b].callback.apply(e[b].context,a),c.off.called&&(delete c.off.called,this.off(d,e[b].callback,e[b].context)),!c.stop.called);b++);}if(this._delegations){const a=this._delegations.get(d),e=this._delegations.get('*');a&&k(a,c,b),e&&k(e,c,b)}return c['return']},delegate(...a){return{to:(b,c)=>{this._delegations||(this._delegations=new Map);var d,e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done);e=!0){const a=g.value,d=this._delegations.get(a);d?d.set(b,c):this._delegations.set(a,new Map([[b,c]]))}}catch(a){f=!0,d=a}finally{try{!e&&h['return']&&h['return']()}finally{if(f)throw d}}}}},stopDelegating(a,b){if(this._delegations)if(!a)this._delegations.clear();else if(!b)this._delegations['delete'](a);else{const c=this._delegations.get(a);c&&c['delete'](b)}}};b.a=r},function(a,b,c){'use strict';var d=c(5);b.a=class{constructor(a,b){this.source=a,this.name=b,this.path=[],this.stop=Object(d.a)(),this.off=Object(d.a)()}}},function(a,b){'use strict';b.a=function(){return function a(){a.called=!0}}},function(a,b){'use strict';b.a=function(){let a='e';for(let b=0;8>b;b++)a+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return a}},function(a,b){'use strict';const c={get(a){return'number'==typeof a?a:this[a]||this.normal},highest:1e5,high:1e3,normal:0,low:-1e3,lowest:-1e5};b.a=c},function(a,b,c){'use strict';var d=c(0);b.a=class{constructor(a,b){if(!a)throw new Error('Token must be provided');if(!b)throw new Error('Api address must be provided');this._token=a,this._apiAddress=b}upload(a){return new d.a(a,this._token,this._apiAddress)}}}]);