"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[9444],{

/***/ 9444:
/*!*************************************!*\
  !*** ./src/app/login/login.page.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginPage: () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 177);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 9417);
/* harmony import */ var _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular/standalone */ 9834);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 7901);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7705);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 1626);








let LoginPage = /*#__PURE__*/(() => {
  var _LoginPage;
  class LoginPage {
    constructor(router, http) {
      this.router = router;
      this.http = http;
      this.username = '';
      this.password = '';
    }
    ngOnInit() {}
    onLogin() {
      console.log('onLogin method triggered');
      if (this.username.trim() && this.password.trim()) {
        console.log('Sending login request with:', {
          username: this.username,
          password: this.password
        });
        this.http.post('http://localhost:8081/api/login', {
          username: this.username,
          password: this.password
        }).subscribe(response => {
          console.log('Login successful:', response);
          // Store the token in localStorage
          localStorage.setItem('token', response.token);
          this.router.navigate(['/tabs/tab1']);
        }, error => {
          console.error('Login failed:', error);
          alert('Invalid username or password');
        });
      } else {
        alert('Please enter both username and password.');
      }
    }
  }
  _LoginPage = LoginPage;
  _LoginPage.ɵfac = function LoginPage_Factory(t) {
    return new (t || _LoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient));
  };
  _LoginPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: _LoginPage,
    selectors: [["app-login"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
    decls: 18,
    vars: 2,
    consts: [[1, "ion-padding"], [1, "page-title"], [1, "login-container"], [3, "ngSubmit"], ["position", "floating"], ["type", "text", "name", "username", "required", "", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "required", "", 3, "ngModelChange", "ngModel"], [1, "submit-container"], ["type", "submit", 1, "logo-submit"], ["src", "assets/images/home-logo.png", "alt", "Login", 1, "home-logo"], [1, "page-footer"]],
    template: function LoginPage_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-content", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Home Inventory");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2)(4, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function LoginPage_Template_form_ngSubmit_4_listener() {
          return ctx.onLogin();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ion-item")(6, "ion-label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Username");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ion-input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_8_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ion-item")(10, "ion-label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "ion-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayListener"]("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_12_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayBindingSet"](ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7)(14, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " SWDV655 Final Project ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx.username);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtwoWayProperty"]("ngModel", ctx.password);
      }
    },
    dependencies: [_ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonContent, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular_standalone__WEBPACK_IMPORTED_MODULE_3__.IonInput, _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    styles: ["ion-content[_ngcontent-%COMP%] {\n  --background: #ffffff;\n}\n\n.login-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: calc(100% - 100px);\n}\n\nform[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 300px;\n}\n\nion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --border-color: var(--ion-color-primary);\n  --highlight-color-focused: var(--ion-color-primary);\n  margin-bottom: 1rem;\n}\n\n.submit-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 2rem;\n}\n\n.logo-submit[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n  transition: transform 0.3s ease;\n}\n.logo-submit[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.logo-submit[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n\n.home-logo[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n}"]
  });
  return LoginPage;
})();

/***/ })

}]);