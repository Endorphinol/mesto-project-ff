(()=>{"use strict";function t(t,e,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__like-button"),u=c.querySelector(".card__image"),i=c.querySelector(".card__count");return i.textContent=t.likes?t.likes.length:0,c.querySelector(".card__title").textContent=t.name,c.querySelector(".card__like-button").addEventListener("click",(function(){return n(t._id,a).then((function(t){i.textContent=t.likes.length,a.classList.toggle("card__like-button_is-active")})).catch((function(t){console.log("Ошибка",t)}))})),o!==t.owner._id?c.querySelector(".card__delete-button").classList.remove("card__delete-button"):c.querySelector(".card__delete-button").addEventListener("click",(function(){return e(c,t._id).catch((function(t){console.log("Ошибка",t)}))})),u.addEventListener("click",(function(){r(t.link,t.name)})),u.src=t.link,u.alt=t.name,c}function e(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(t){t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&n(e)}}var r=function(t,e,n){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(n.errorClass),o.textContent="",o.classList.remove(n.inputErrorClass)},c=function(t,e){t.disabled=!0,t.classList.add(e.inactiveButtonClass)},a=function(t,e,n){var o,r;!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(r=n,(o=e).disabled=!1,o.classList.remove(r.inactiveButtonClass)):c(e,n)};function u(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(n){r(t,n,e)})),c(o,e)}var i="https://nomoreparties.co/v1/wff-cohort-35",l="08a2006d-1e8e-4054-8f6b-d1d1b6dfc2ea",s=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))},d=function(t,e){return fetch("".concat(i,"/cards/").concat(e),{method:"DELETE",headers:{authorization:"".concat(l)}}).then((function(e){e.ok&&t.remove()}))},p=function(t,e){var n=e.classList.contains("card__like-button_is-active");return fetch("".concat(i,"/cards/likes/").concat(t),{method:n?"DELETE":"PUT",headers:{authorization:"".concat(l)}}).then(s)};function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var _=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_new_avatar"),S=document.querySelector(".profile__image"),b=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),E=document.querySelector('.popup__form[name="edit-profile"]'),k=document.querySelector('.popup__form[name="new-place"]'),L=document.querySelector(".popup__image"),x=document.querySelector(".popup_type_image"),A=document.querySelector(".popup__caption"),T=document.querySelector(".places__list"),w=document.querySelector('.popup__form[name="new-avatar"]'),j=document.querySelector(".popup__input_type_avatar"),z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function O(t,n){L.src=t,L.alt=n,A.textContent=n,e(x)}S.addEventListener("click",(function(){u(E,z),e(h)})),y.addEventListener("click",(function(){u(k,z),e(v)})),_.addEventListener("click",(function(){u(E,z),b.value=g.textContent,q.value=C.textContent,e(m)})),document.addEventListener("click",(function(t){t.target.classList.contains("popup__close")&&n(t.target.closest(".popup"))})),document.addEventListener("click",(function(t){var e=document.querySelector(".popup_is-opened");t.target===e&&n(e)})),function(t){Array.from(document.querySelectorAll(t.formSelector)).forEach((function(e){!function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);a(n,o,e),n.forEach((function(c){c.addEventListener("input",(function(){!function(t,e,n){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?r(t,e,n):function(t,e,n,o){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(o.errorClass),r.textContent=n,r.classList.add(o.inputErrorClass)}(t,e,e.validationMessage,n)}(t,c,e),a(n,o,e)}))}))}(e,t)}))}(z),w.addEventListener("submit",(function(t){t.preventDefault();var e,o=w.querySelector(".popup__button");o.textContent="Сохранение...",o.disabled=!0,(e=j,fetch("".concat(e.value),{method:"HEAD"}).then((function(t){t.ok||console.log("Произошла ошибка"),t.headers.get("Content-Type").startsWith("image/")||console.log("URL не является картинкой")}))).catch((function(t){console.log("Ошибка",t)})),function(t){return fetch("".concat(i,"/users/me/avatar"),{method:"PATCH",headers:{authorization:"".concat(l),"Content-Type":"application/json"},body:JSON.stringify({avatar:"".concat(t.value)})}).then(s)}(j).then((function(t){S.style.backgroundImage="url(".concat(t.avatar,")")})).finally((function(){o.textContent="Сохранить",o.disabled=!1,n(h)})).catch((function(t){console.log("Ошибка:",t)}))})),E.addEventListener("submit",(function(t){t.preventDefault(),g.textContent=b.value,C.textContent=q.value;var e,o,r=E.querySelector(".popup__button");r.textContent="Сохранение...",r.disabled=!0,(e=b.value,o=q.value,fetch("".concat(i,"/users/me"),{method:"PATCH",headers:{authorization:"".concat(l),"Content-Type":"application/json"},body:JSON.stringify({name:e,about:o})}).then(s)).then((function(t){g.textContent=t.name,C.textContent=t.about})).finally((function(){r.textContent="Сохранить",r.disabled=!1,n(m)})).catch((function(t){console.log("Ошибка",t)}))})),k.addEventListener("submit",(function(e){e.preventDefault();var o,r,c=k.querySelector(".popup__button"),a={name:document.querySelector(".popup__input_type_card-name").value,link:document.querySelector(".popup__input_type_url").value};c.textContent="Сохранение...",c.disabled=!0,(o=a.name,r=a.link,fetch("".concat(i,"/cards"),{method:"POST",headers:{authorization:"".concat(l),"Content-Type":"application/json"},body:JSON.stringify({name:o,link:r})}).then(s)).then((function(e){var n=t(e,d,p,e.owner._id,O);T.prepend(n)})).finally((function(){c.textContent="Сохранить",c.disabled=!1,k.reset(),n(v)})).catch((function(t){console.log("Ошибка",t)}))}));var B=[fetch("".concat(i,"/users/me"),{method:"GET",headers:{authorization:"".concat(l)}}).then(s).then((function(t){return document.querySelector(".profile__image").style.backgroundImage="url(".concat(t.avatar,")"),g.textContent=t.name,C.textContent=t.about,t})).catch((function(t){console.log("Ошибка",t)})),fetch("".concat(i,"/cards"),{method:"GET",headers:{authorization:"".concat(l)}}).then(s).then((function(t){return t})).catch((function(){console.log("Ошибка",error)}))];Promise.all(B).then((function(e){var n,o,r=(o=2,function(t){if(Array.isArray(t))return t}(n=e)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==e);i=!0);}catch(t){l=!0,r=t}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(n,o)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],a=r[1],u=c._id;a.forEach((function(e){var n=t(e,d,p,u,O);T.append(n)}))}))})();
//# sourceMappingURL=main.js.map