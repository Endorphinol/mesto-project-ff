(()=>{"use strict";function t(t,e,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__like-button"),u=c.querySelector(".card__image"),i=c.querySelector(".card__count");return i.textContent=t.likes?t.likes.length:0,c.querySelector(".card__title").textContent=t.name,c.querySelector(".card__delete-button").addEventListener("click",(function(){return e(c,t._id)})),c.querySelector(".card__like-button").addEventListener("click",(function(){return n(i,a,t._id)})),o!==t.owner._id&&c.querySelector(".card__delete-button").classList.remove("card__delete-button"),u.addEventListener("click",(function(){r(t.link,t.name)})),u.src=t.link,u.alt=t.name,c}function e(t,e){fetch("https://nomoreparties.co/v1/wff-cohort-35/cards/".concat(e),{method:"DELETE",headers:{authorization:"08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea"}}).then((function(e){e.ok&&t.remove()})).catch((function(t){console.log("Ошибка",t)}))}function n(t,e,n){var o=e.classList.contains("card__like-button_is-active");fetch("https://nomoreparties.co/v1/wff-cohort-35/cards/likes/".concat(n),{method:o?"DELETE":"PUT",headers:{authorization:"08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea"}}).then((function(t){if(t.ok)return t.json()})).then((function(n){t.textContent=n.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(t){console.log("Ошибка",t)}))}function o(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function r(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&r(e)}}var a=function(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.disabled=!0,e.classList.add(n.inactiveButtonClass))};function u(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.errorClass),o.textContent="",o.classList.remove(e.inputErrorClass)})),o.disabled=!0,o.classList.add(e.inactiveButtonClass)}var i="https://nomoreparties.co/v1/wff-cohort-35",l="08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea";function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var d=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_type_edit"),f=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_new_avatar"),y=document.querySelector(".profile__image"),v=document.querySelector(".popup__input_type_name"),h=document.querySelector(".popup__input_type_description"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),q=document.querySelector('.popup__form[name="edit-profile"]'),C=document.querySelector('.popup__form[name="new-place"]'),g=document.querySelector(".popup__image"),k=document.querySelector(".popup_type_image"),E=document.querySelector(".popup__caption"),L=document.querySelector(".places__list"),x=document.querySelector('.popup__form[name="new-avatar"]'),j=document.querySelector(".popup__input_type_avatar"),A={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function w(t,e){g.src=t,g.alt=e,E.textContent=e,o(k)}y.addEventListener("click",(function(){u(q,A),o(_)})),f.addEventListener("click",(function(){u(C,A),o(m)})),d.addEventListener("click",(function(){u(q,A),v.value=S.textContent,h.value=b.textContent,o(p)})),document.addEventListener("click",(function(t){t.target.classList.contains("popup__close")&&r(t.target.closest(".popup"))})),document.addEventListener("click",(function(t){var e=document.querySelector(".popup_is-opened");t.target===e&&r(e)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);a(n,o,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.errorClass),o.textContent="",o.classList.remove(n.inputErrorClass)}(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o.errorClass),r.textContent=n,r.classList.add(o.inputErrorClass)}(t,e,e.validationMessage,n)}(t,r,e),a(n,o,e)}))}))}(e,t)}))}(A),x.addEventListener("submit",(function(t){t.preventDefault();var e=x.querySelector(".popup__button");e.textContent="Сохранение...",e.disabled=!0,fetch("".concat(j.value),{method:"HEAD"}).then((function(t){t.ok||console.log("Произошла ошибка"),t.headers.get("Content-Type").startsWith("image/")||console.log("URL не является картинкой")})).catch((function(t){console.log("Ошибка",t)})),function(t,e,n,o,r){fetch("".concat(i,"/users/me/avatar"),{method:"PATCH",headers:{authorization:"".concat(l),"Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(t.value)})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){r.style.backgroundImage="url(".concat(t.avatar,")")})).finally((function(){e.textContent="Сохранено",e.disabled=!1,n(o)})).catch((function(t){console.log("Ошибка:",t)}))}(j,e,r,_,y)})),q.addEventListener("submit",(function(t){t.preventDefault(),S.textContent=v.value,b.textContent=h.value;var e=q.querySelector(".popup__button");e.textContent="Сохранение...",e.disabled=!0,function(t,e,n,o,r,c,a){fetch("".concat(i,"/users/me"),{method:"PATCH",headers:{authorization:"".concat(l),"Content-Type":"application/json"},body:JSON.stringify({name:t.value,about:e.value})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){o.textContent=t.name,n.textContent=t.about})).finally((function(){a.textContent="Сохранено",a.disabled=!1,r(c)})).catch((function(t){console.log("Ошибка",t)}))}(v,h,b,S,r,p,e)})),C.addEventListener("submit",(function(o){o.preventDefault();var c=C.querySelector(".popup__button");c.textContent="Сохранение...",c.disabled=!0,function(t,e,n,o,r,c,a,u,s){var d={name:document.querySelector(".popup__input_type_card-name").value,link:document.querySelector(".popup__input_type_url").value};fetch("".concat(i,"/cards"),{method:"POST",headers:{authorization:"".concat(l),"Content-Type":"application/json"},body:JSON.stringify({name:d.name,link:d.link})}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){var e=r(t,c,a,t.owner._id,u);s.prepend(e)})).finally((function(){t.textContent="Сохранено",t.disabled=!1,n.reset(),e(o)})).catch((function(t){console.log("Ошибка",t)}))}(c,r,C,m,t,e,n,w,L)}));var T=[function(t,e){return fetch("".concat(i,"/users/me"),{method:"GET",headers:{authorization:"".concat(l)}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(n){return document.querySelector(".profile__image").style.backgroundImage="url(".concat(n.avatar,")"),t.textContent=n.name,e.textContent=n.about,n})).catch((function(t){console.log("Ошибка",t)}))}(S,b),fetch("".concat(i,"/cards"),{method:"GET",headers:{authorization:"".concat(l)}}).then((function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))})).then((function(t){return t})).catch((function(){console.log("Ошибка",error)}))];Promise.all(T).then((function(o){var r,c,a=(c=2,function(t){if(Array.isArray(t))return t}(r=o)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==e);i=!0);}catch(t){l=!0,r=t}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(r,c)||function(t,e){if(t){if("string"==typeof t)return s(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(t,e):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1],l=u._id;i.forEach((function(o){var r=t(o,e,n,l,w);L.append(r)}))}))})();
//# sourceMappingURL=main.js.map