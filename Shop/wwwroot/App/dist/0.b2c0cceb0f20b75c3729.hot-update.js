webpackHotUpdate(0,{22:function(e,o,t){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.registerUser=o.singOutToken=o.logInToken=void 0;var r,n,a=t(36),s=(r=a)&&r.__esModule?r:{default:r},c=t(76),i=t(30),l=t(29);(n=t(2).enterModule)&&n(e);var u,p,g=o.logInToken=function(e,o){var t={userName:e,password:o};return s.default.post(c.GET_TOKEN,t).then(function(e){var o=e.data.token;o&&(localStorage.setItem("access_token",o),console.log("setToken",o)),localStorage.getItem("access_token")&&(0,l.api)().get(i.GET_USER_ROLE).then(function(e){var o=e.data.role;if(console.log("getUserROle",o),o)switch(o){case"Admin":window.location.replace("/adminPanel");break;case"Client":window.location.replace("/userPanel")}})}).catch(function(e){console.error(e)})},d=o.singOutToken=function(e){localStorage.getItem("access_token")&&(localStorage.removeItem("access_token"),window.location.replace("/"),e())},S=o.registerUser=function(e){return s.default.post(i.REGISTRATION_USER,e)};u=t(2).default,p=t(2).leaveModule,u&&(u.register(g,"logInToken","D:/Project C#/Core/InternetShop/Shop/Shop/wwwroot/App/services/authService.js"),u.register(d,"singOutToken","D:/Project C#/Core/InternetShop/Shop/Shop/wwwroot/App/services/authService.js"),u.register(S,"registerUser","D:/Project C#/Core/InternetShop/Shop/Shop/wwwroot/App/services/authService.js"),p(e))}).call(this,t(4)(e))}});