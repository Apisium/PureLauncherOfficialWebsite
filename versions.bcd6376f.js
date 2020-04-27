parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"tI7p":[function(require,module,exports) {
module.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var n=document.activeElement,t=[],a=0;a<e.rangeCount;a++)t.push(e.getRangeAt(a));switch(n.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":n.blur();break;default:n=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||t.forEach(function(n){e.addRange(n)}),n&&n.focus()}};
},{}],"gpwS":[function(require,module,exports) {
"use strict";var e=require("toggle-selection"),t={"text/plain":"Text","text/html":"Url",default:"Text"},o="Copy to clipboard: #{key}, Enter";function a(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function n(n,r){var c,l,s,i,p,d,u=!1;r||(r={}),c=r.debug||!1;try{if(s=e(),i=document.createRange(),p=document.getSelection(),(d=document.createElement("span")).textContent=n,d.style.all="unset",d.style.position="fixed",d.style.top=0,d.style.clip="rect(0, 0, 0, 0)",d.style.whiteSpace="pre",d.style.webkitUserSelect="text",d.style.MozUserSelect="text",d.style.msUserSelect="text",d.style.userSelect="text",d.addEventListener("copy",function(e){if(e.stopPropagation(),r.format)if(e.preventDefault(),void 0===e.clipboardData){c&&console.warn("unable to use e.clipboardData"),c&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var o=t[r.format]||t.default;window.clipboardData.setData(o,n)}else e.clipboardData.clearData(),e.clipboardData.setData(r.format,n);r.onCopy&&(e.preventDefault(),r.onCopy(e.clipboardData))}),document.body.appendChild(d),i.selectNodeContents(d),p.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");u=!0}catch(m){c&&console.error("unable to copy using execCommand: ",m),c&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(r.format||"text",n),r.onCopy&&r.onCopy(window.clipboardData),u=!0}catch(m){c&&console.error("unable to copy using clipboardData: ",m),c&&console.error("falling back to prompt"),l=a("message"in r?r.message:o),window.prompt(l,n)}}finally{p&&("function"==typeof p.removeRange?p.removeRange(i):p.removeAllRanges()),d&&document.body.removeChild(d),s()}return u}module.exports=n;
},{"toggle-selection":"tI7p"}],"JMqS":[function(require,module,exports) {
"use strict";var n=a(require("copy-to-clipboard"));function a(n){return n&&n.__esModule?n:{default:n}}var e=!1,c=!1;$("#old-versions").click(function(){c=$(this).prop("checked"),t()}),$("#copy-mode").click(function(){e=$(this).prop("checked")});var o,i=function(n){var a=n.toString();return a.length<2?"0"+a:a},t=function(){for(var n=$i("releaseVersion"),a=$i("snapshotVersion"),e=$i("oldVersion"),t=$i("releaseTime"),s="",r=o.versions.length,l=0;l<r;l++){var p=o.versions[l];if(c||!p.k){var f=void 0,d=void 0;switch(p.k){case 1:f="snapshot",d=a;break;case 2:f="snapshot",d=e;break;default:f="release",d=n}var b=new Date(1e3*p.t);s+='<li onclick="install(event, '.concat(l,', 0)">\n      ').concat(p.i,' <span class="badge ').concat(f,'">').concat(d,"</span>\n      ").concat(p.a?'<span class="badge fabric" onclick="install(event, '.concat(l,', 1)">Fabric</span>'):"","\n      ").concat(p.f?'<span class="badge forge" onclick="install(event, '.concat(l,', 2)">Forge</span>'):"","\n      ").concat(p.o?'<span class="badge optifine" onclick="install(event, '.concat(l,', 3)">Optifine</span>'):"","\n      <p>").concat(t,": ").concat(b.getFullYear(),"-").concat(i(b.getMonth()+1),"-").concat(i(b.getDay())," ").concat(i(b.getHours()),":").concat(i(b.getHours()),"</p>\n    </li>")}}$("#book-body").html('<ul>\n    <li id="list-header">'.concat($i("versionsTopText"),' <span class="badge fabric">Fabric</span> <span class="badge forge">Forge</span> <span class="badge optifine">Optifine</span></li>\n    ').concat(s,"\n  </ul>"))};window.install=function(a,c,i){var t=o.versions[c],s={type:"Version",mcVersion:t.i};switch(i){case 1:s.id=t.a+"-Fabric",s.$fabric=[t.a,o.latest.fabricLoader];break;case 2:s.id=t.i+"-Forge-"+t.f,s.$forge=t.f;break;case 3:s.id=t.i+"-Optifine-"+t.o[0]+"-"+t.o[0],s.$optifine=t.o;break;default:s.id=t.i,s.$vanilla=!0}s=JSON.stringify(s),e?(0,n.default)(s):window.open("/i.html?"+encodeURIComponent(s),"_blank"),a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},fetch("https://s.pl.apisium.cn/minecraft.json").then(function(n){return n.json()}).then(function(n){o=n,t()}).catch(console.error);
},{"copy-to-clipboard":"gpwS"}]},{},["JMqS"], null)