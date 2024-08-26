"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[7240],{

/***/ 7240:
/*!*****************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-backdrop.entry.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ion_backdrop: () => (/* binding */ Backdrop)
/* harmony export */ });
/* harmony import */ var _index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-7a952e7a.js */ 8393);
/* harmony import */ var _ionic_global_81a1064f_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ionic-global-81a1064f.js */ 4921);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */


const backdropIosCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";
const IonBackdropIosStyle0 = backdropIosCss;
const backdropMdCss = ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}";
const IonBackdropMdStyle0 = backdropMdCss;
const Backdrop = /*#__PURE__*/(() => {
  let Backdrop = class {
    constructor(hostRef) {
      (0,_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
      this.ionBackdropTap = (0,_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.d)(this, "ionBackdropTap", 7);
      this.visible = true;
      this.tappable = true;
      this.stopPropagation = true;
    }
    onMouseDown(ev) {
      this.emitTap(ev);
    }
    emitTap(ev) {
      if (this.stopPropagation) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      if (this.tappable) {
        this.ionBackdropTap.emit();
      }
    }
    render() {
      const mode = (0,_ionic_global_81a1064f_js__WEBPACK_IMPORTED_MODULE_1__.b)(this);
      return (0,_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.f, {
        key: 'c803b4302c8e722064feb03dafe3cb6e190b4f2b',
        tabindex: "-1",
        "aria-hidden": "true",
        class: {
          [mode]: true,
          'backdrop-hide': !this.visible,
          'backdrop-no-tappable': !this.tappable
        }
      });
    }
  };
  Backdrop.style = {
    ios: IonBackdropIosStyle0,
    md: IonBackdropMdStyle0
  };
  return Backdrop;
})();


/***/ })

}]);