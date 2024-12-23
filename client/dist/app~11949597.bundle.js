/*! For license information please see app~11949597.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkurbanaid=self.webpackChunkurbanaid||[]).push([[229],{2326:function(t,e,n){n(2675),n(9463),n(6412),n(2259),n(8125),n(8706),n(3792),n(2062),n(4782),n(2010),n(4731),n(479),n(875),n(287),n(6099),n(3362),n(7764),n(3500),n(2953);var a=n(8752),r=n(6296),o=n(4299),i=n(4182);n(9340);function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(){l=function(){return e};var t,e={},n=Object.prototype,a=n.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function d(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{d({},"")}catch(t){d=function(t,e,n){return t[e]=n}}function p(t,e,n,a){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),s=new O(a||[]);return r(i,"_invoke",{value:j(t,n,s)}),i}function m(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var g="suspendedStart",f="suspendedYield",h="executing",v="completed",y={};function b(){}function x(){}function w(){}var k={};d(k,i,(function(){return this}));var L=Object.getPrototypeOf,I=L&&L(L(z([])));I&&I!==n&&a.call(I,i)&&(k=I);var E=w.prototype=b.prototype=Object.create(k);function _(t){["next","throw","return"].forEach((function(e){d(t,e,(function(t){return this._invoke(e,t)}))}))}function M(t,e){function n(r,o,i,l){var c=m(t[r],t,o);if("throw"!==c.type){var u=c.arg,d=u.value;return d&&"object"==s(d)&&a.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,i,l)}),(function(t){n("throw",t,i,l)})):e.resolve(d).then((function(t){u.value=t,i(u)}),(function(t){return n("throw",t,i,l)}))}l(c.arg)}var o;r(this,"_invoke",{value:function(t,a){function r(){return new e((function(e,r){n(t,a,e,r)}))}return o=o?o.then(r,r):r()}})}function j(e,n,a){var r=g;return function(o,i){if(r===h)throw Error("Generator is already running");if(r===v){if("throw"===o)throw i;return{value:t,done:!0}}for(a.method=o,a.arg=i;;){var s=a.delegate;if(s){var l=B(s,a);if(l){if(l===y)continue;return l}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(r===g)throw r=v,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);r=h;var c=m(e,n,a);if("normal"===c.type){if(r=a.done?v:f,c.arg===y)continue;return{value:c.arg,done:a.done}}"throw"===c.type&&(r=v,a.method="throw",a.arg=c.arg)}}}function B(e,n){var a=n.method,r=e.iterator[a];if(r===t)return n.delegate=null,"throw"===a&&e.iterator.return&&(n.method="return",n.arg=t,B(e,n),"throw"===n.method)||"return"!==a&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+a+"' method")),y;var o=m(r,e.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,y;var i=o.arg;return i?i.done?(n[e.resultName]=i.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,y):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function D(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function z(e){if(e||""===e){var n=e[i];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,o=function n(){for(;++r<e.length;)if(a.call(e,r))return n.value=e[r],n.done=!1,n;return n.value=t,n.done=!0,n};return o.next=o}}throw new TypeError(s(e)+" is not iterable")}return x.prototype=w,r(E,"constructor",{value:w,configurable:!0}),r(w,"constructor",{value:x,configurable:!0}),x.displayName=d(w,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,d(t,u,"GeneratorFunction")),t.prototype=Object.create(E),t},e.awrap=function(t){return{__await:t}},_(M.prototype),d(M.prototype,c,(function(){return this})),e.AsyncIterator=M,e.async=function(t,n,a,r,o){void 0===o&&(o=Promise);var i=new M(p(t,n,a,r),o);return e.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(E),d(E,u,"Generator"),d(E,i,(function(){return this})),d(E,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var a in e)n.push(a);return n.reverse(),function t(){for(;n.length;){var a=n.pop();if(a in e)return t.value=a,t.done=!1,t}return t.done=!0,t}},e.values=z,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(D),!e)for(var n in this)"t"===n.charAt(0)&&a.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function r(a,r){return s.type="throw",s.arg=e,n.next=a,r&&(n.method="next",n.arg=t),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var l=a.call(i,"catchLoc"),c=a.call(i,"finallyLoc");if(l&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(l){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),D(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var a=n.completion;if("throw"===a.type){var r=a.arg;D(n)}return r}}throw Error("illegal catch attempt")},delegateYield:function(e,n,a){return this.delegate={iterator:z(e),resultName:n,nextLoc:a},"next"===this.method&&(this.arg=t),y}},e}function c(t,e,n,a,r,o,i){try{var s=t[o](i),l=s.value}catch(t){return void n(t)}s.done?e(l):Promise.resolve(l).then(a,r)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function i(t){c(o,a,r,i,s,"next",t)}function s(t){c(o,a,r,i,s,"throw",t)}i(void 0)}))}}var d={reportId:null,map:null,init:function(){var t=this;return u(l().mark((function e(){return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.reportId=i.A.getRiwayatDetailId(),t.reportId){e.next=5;break}throw new Error("Invalid report ID");case 5:return e.next=7,t.render();case 7:return a.A.afterRender(),e.next=10,t.loadReportDetails();case 10:t.initializeImageModal(),e.next=18;break;case 13:return e.prev=13,e.t0=e.catch(0),e.next=18,Swal.fire({icon:"error",title:"Error",text:"Gagal memuat detail riwayat"});case 18:case"end":return e.stop()}}),e,null,[[0,13]])})))()},cleanupMap:function(){this.map&&(this.map.remove(),this.map=null)},initMap:function(t,e,n){var a=this;this.cleanupMap(),document.getElementById("reportMap")&&"undefined"!=typeof L&&(this.map=L.map("reportMap").setView([t,e],15),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(this.map),L.marker([t,e]).addTo(this.map).bindPopup('<div class="p-2">'.concat(n,"</div>")).openPopup(),setTimeout((function(){a.map.invalidateSize()}),100))},loadReportDetails:function(){var t=this;return u(l().mark((function e(){var n,a;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.A.show(),t.reportId){e.next=4;break}throw new Error("Report ID is missing");case 4:return e.next=7,o.default.getDetailRiwayat(t.reportId);case 7:n=e.sent,a={id:n.id,judul:n.judul,jenisInfrastruktur:n.jenis_infrastruktur,deskripsi:n.deskripsi,tanggalKejadian:new Date(n.tanggal_kejadian).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"}),tanggalSelesai:new Date(n.tanggal_selesai).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"}),alamat:n.alamat,status:n.status.charAt(0).toUpperCase()+n.status.slice(1),namaPelapor:n.nama_pelapor,keteranganLaporan:n.keterangan_laporan,buktiLampiran:{url:n.bukti_lampiran,caption:"Bukti Lampiran Laporan"},latitude:n.latitude,longitude:n.longitude},t.renderReportDetails(a),e.next=17;break;case 12:return e.prev=12,e.t0=e.catch(0),e.next=17,Swal.fire({icon:"error",title:"Error",text:e.t0.message||"Gagal memuat detail riwayat"});case 17:return e.prev=17,r.A.hide(),e.finish(17);case 20:case"end":return e.stop()}}),e,null,[[0,12,17,20]])})))()},renderReportDetails:function(t){var e=document.getElementById("report-detail-container");e&&(e.innerHTML='\n      <div class="bg-white rounded-lg shadow-lg p-4 lg:p-6">\n        \x3c!-- Header --\x3e\n        <div class="flex items-center gap-4 mb-6 pb-4 border-b">\n          <a href="/admin/riwayat" \n             class="inline-flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">\n            <span class="material-icons-round">arrow_back</span>\n          </a>\n          <div>\n            <h1 class="text-xl lg:text-2xl font-bold text-gray-800 mb-2">\n              '.concat(t.judul,'\n            </h1>\n            <p class="text-gray-600 text-sm lg:text-base">\n              ID Laporan: #').concat(t.id,'\n            </p>\n          </div>\n        </div>\n\n        \x3c!-- Information Grid --\x3e\n        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">\n          <div class="h-full">\n            <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Detail Laporan</h2>\n            <div class="bg-gray-50 rounded-lg p-4 h-[calc(100%-2rem)]">\n              <div class="flex flex-col h-full justify-between">\n                <div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Status</label>\n                    <p class="mt-1">\n                      <span class="px-3 py-1 rounded-full text-sm ').concat("Diterima"===t.status?"bg-green-100 text-green-800":"bg-red-100 text-red-800",'">\n                        ').concat(t.status,'\n                      </span>\n                    </p>\n                  </div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Jenis Infrastruktur</label>\n                    <p class="text-gray-800 font-medium">').concat(t.jenisInfrastruktur,'</p>\n                  </div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Deskripsi</label>\n                    <p class="text-gray-800">').concat(t.deskripsi,'</p>\n                  </div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Alamat</label>\n                    <p class="text-gray-800">').concat(t.alamat,'</p>\n                  </div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Tanggal Kejadian</label>\n                    <p class="text-gray-800">').concat(t.tanggalKejadian,'</p>\n                  </div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Tanggal Selesai</label>\n                    <p class="text-gray-800">').concat(t.tanggalSelesai,'</p>\n                  </div>\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Keterangan Laporan</label>\n                    <div class="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-100">\n                      <div class="flex items-start space-x-3">\n                        <span class="material-icons-round text-blue-500 mt-0.5">info</span>\n                        <div>\n                          <h4 class="font-semibold text-blue-900 mb-1">Catatan Admin:</h4>\n                          <p class="text-blue-800 whitespace-pre-line">').concat(t.keteranganLaporan,'</p>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  \n                  \x3c!-- Map Section --\x3e\n                  <div class="mb-4">\n                    <label class="text-sm text-gray-500">Lokasi pada Peta</label>\n                    ').concat(t.latitude&&t.longitude?'\n                      <div id="reportMap" class="h-80 mt-2 rounded-lg"></div>\n                      <div class="mt-2 flex flex-col space-y-2">\n                        <a href="https://www.google.com/maps?q='.concat(t.latitude,",").concat(t.longitude,'" \n                           target="_blank" \n                           class="inline-flex items-center text-blue-600 hover:text-blue-800">\n                          <span class="material-icons-round text-sm mr-1">map</span>\n                          Google Maps\n                        </a>\n                        <a href="https://www.openstreetmap.org/?mlat=').concat(t.latitude,"&mlon=").concat(t.longitude,'&zoom=15" \n                           target="_blank" \n                           class="inline-flex items-center text-blue-600 hover:text-blue-800">\n                          <span class="material-icons-round text-sm mr-1">open_in_new</span>\n                          OpenStreetMap\n                        </a>\n                      </div>\n                    '):'\n                      <div class="mt-2 p-4 bg-gray-100 rounded-lg text-center text-gray-600">\n                        <span class="material-icons-round text-2xl mb-2">location_off</span>\n                        <p>Lokasi tidak tersedia di peta</p>\n                      </div>\n                    ','\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n          \x3c!-- Bukti Lampiran --\x3e\n          <div class="h-full">\n            <h2 class="text-sm uppercase text-gray-500 font-medium mb-2">Bukti Lampiran</h2>\n            <div class="bg-gray-50 rounded-lg p-4">\n              <div class="relative h-full min-h-[600px] group">\n                <img src="').concat(t.buktiLampiran.url,'"\n                     alt="Bukti lampiran"\n                     class="absolute inset-0 w-full h-full object-contain rounded-lg"\n                     onerror="this.src=\'https://via.placeholder.com/400x300?text=Bukti+Lampiran+Tidak+Tersedia\'">\n                <button onclick="showImageModal(\'').concat(t.buktiLampiran.url,'\')" \n                        class="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">\n                    <span class="material-icons-round">fullscreen</span>\n                </button>\n              </div>\n              <p class="text-sm text-gray-600 text-center mt-4">').concat(t.buktiLampiran.caption,'</p>\n            </div>\n          </div>\n\n        <div id="imageModal" class="fixed inset-0 bg-black/90 hidden z-50">\n            <div class="fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/30 p-2 rounded-lg backdrop-blur-sm z-[60]">\n                <button onclick="zoomIn()" \n                        class="p-2 text-white hover:text-gray-300 bg-black/50 rounded-lg flex items-center gap-1">\n                    <span class="material-icons-round">zoom_in</span>\n                    <span class="text-sm">Zoom In</span>\n                </button>\n                <button onclick="zoomOut()" \n                        class="p-2 text-white hover:text-gray-300 bg-black/50 rounded-lg flex items-center gap-1">\n                    <span class="material-icons-round">zoom_out</span>\n                    <span class="text-sm">Zoom Out</span>\n                </button>\n                <button id="panButton"\n                        onclick="togglePanMode()" \n                        class="p-2 text-white hover:text-gray-300 bg-black/50 rounded-lg flex items-center gap-1">\n                    <span class="material-icons-round">pan_tool</span>\n                    <span class="text-sm">Pan</span>\n                </button>\n                <button onclick="resetTransform()" \n                        class="p-2 text-white hover:text-gray-300 bg-black/50 rounded-lg flex items-center gap-1">\n                    <span class="material-icons-round">restart_alt</span>\n                    <span class="text-sm">Reset</span>\n                </button>\n                <button onclick="closeImageModal()" \n                        class="p-2 text-white hover:text-gray-300 bg-black/50 rounded-lg flex items-center gap-1">\n                    <span class="material-icons-round">close</span>\n                    <span class="text-sm">Close</span>\n                </button>\n            </div>\n\n            <div id="imageContainer" class="fixed inset-0 overflow-auto flex items-center justify-center">\n                <img id="modalImage" \n                     src="" \n                     alt="Full size image" \n                     class="transform origin-center transition-transform duration-200 select-none max-w-none"\n                     draggable="false">\n            </div>\n        </div>\n        </div>\n      </div>\n    '),t.latitude&&t.longitude&&this.initMap(t.latitude,t.longitude,t.alamat))},render:function(){var t=document.getElementById("app");t&&(t.innerHTML='\n      <div class="min-h-screen bg-gray-100">\n        '.concat(a.A.render(),'\n        \n        <main class="lg:ml-64 p-4 lg:p-8">\n          <div id="report-detail-container">\n          </div>\n        </main>\n      </div>\n    '))},initializeImageModal:function(){var t,e,n=document.getElementById("reportMap"),a=1,r=!1,o=0,i=0;window.showImageModal=function(t){var e=document.getElementById("imageModal"),r=document.getElementById("modalImage");document.getElementById("imageContainer");e.classList.remove("hidden"),r.src=t,r.onload=function(){var t=window.innerWidth,e=window.innerHeight;if(r.naturalWidth/r.naturalHeight>t/e){r.naturalWidth;r.style.width="".concat(.9*t,"px"),r.style.height="auto"}else{r.naturalHeight;r.style.height="".concat(.9*e,"px"),r.style.width="auto"}},document.body.style.overflow="hidden",n&&(n.style.opacity="0.3",n.style.transition="opacity 0.3s ease"),a=1,o=0,i=0,s()},window.closeImageModal=function(){document.getElementById("imageModal").classList.add("hidden"),document.body.style.overflow="auto",n&&(n.style.opacity="1"),a=1,o=0,i=0,s()};var s=function(){var t=document.getElementById("modalImage");t&&(t.style.transform="translate(".concat(o,"px, ").concat(i,"px) scale(").concat(a,")"))};window.togglePanMode=function(){var t=document.getElementById("imageContainer"),e=document.getElementById("panButton");"grab"===t.style.cursor?(t.style.cursor="default",e.classList.remove("bg-blue-500"),e.classList.add("bg-black/50")):(t.style.cursor="grab",e.classList.remove("bg-black/50"),e.classList.add("bg-blue-500"))},window.zoomIn=function(){a+=.2,s()},window.zoomOut=function(){a>.2&&(a-=.2,s())},window.resetTransform=function(){a=1,o=0,i=0,s();var t=document.getElementById("imageContainer"),e=document.getElementById("panButton");t.style.cursor="default",e.classList.remove("bg-blue-500"),e.classList.add("bg-black/50")};var l=document.getElementById("imageContainer");l&&(l.addEventListener("mousedown",(function(n){"modalImage"===n.target.id&&(r=!0,t=n.clientX-o,e=n.clientY-i,l.style.cursor="grabbing")})),window.addEventListener("mousemove",(function(n){r&&(o=n.clientX-t,i=n.clientY-e,s())})),window.addEventListener("mouseup",(function(){r=!1,l.style.cursor="grab"})),l.addEventListener("dragstart",(function(t){t.preventDefault()})));var c=document.getElementById("imageModal");null==c||c.addEventListener("click",(function(t){t.target===c&&closeImageModal()})),document.addEventListener("keydown",(function(t){if(c&&!c.classList.contains("hidden"))switch(t.key){case"Escape":closeImageModal();break;case"+":case"=":zoomIn();break;case"-":case"_":zoomOut();break;case"ArrowLeft":o+=50,s();break;case"ArrowRight":o-=50,s();break;case"ArrowUp":i+=50,s();break;case"ArrowDown":i-=50,s()}})),null==c||c.addEventListener("wheel",(function(t){c.classList.contains("hidden")||(t.preventDefault(),t.deltaY<0?zoomIn():zoomOut())}))},cleanup:function(){this.cleanupMap(),r.A.hide()}};e.A=d}}]);
//# sourceMappingURL=app~11949597.bundle.js.map