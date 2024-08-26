"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[1577],{

/***/ 3958:
/*!*************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ion-text.entry.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ion_text: () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-7a952e7a.js */ 8393);
/* harmony import */ var _theme_01f3f29c_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./theme-01f3f29c.js */ 333);
/* harmony import */ var _ionic_global_81a1064f_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ionic-global-81a1064f.js */ 4921);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */



const textCss = ":host(.ion-color){color:var(--ion-color-base)}";
const IonTextStyle0 = textCss;
const Text = /*#__PURE__*/(() => {
  let Text = class {
    constructor(hostRef) {
      (0,_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
      this.color = undefined;
    }
    render() {
      const mode = (0,_ionic_global_81a1064f_js__WEBPACK_IMPORTED_MODULE_2__.b)(this);
      return (0,_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.f, {
        key: '4b76333b1ea5cab134b9dc1f5670c0d5a253fc32',
        class: (0,_theme_01f3f29c_js__WEBPACK_IMPORTED_MODULE_1__.c)(this.color, {
          [mode]: true
        })
      }, (0,_index_7a952e7a_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
        key: '3dee5f16bc58b3d92547d910bd4f441a00ce2039'
      }));
    }
  };
  Text.style = IonTextStyle0;
  return Text;
})();


/***/ })

}]);