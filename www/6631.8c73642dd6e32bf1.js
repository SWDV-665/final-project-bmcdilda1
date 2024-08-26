"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([[6631],{

/***/ 6631:
/*!***********************************************************!*\
  !*** ./node_modules/@ionic/core/components/status-tap.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startStatusTap: () => (/* binding */ startStatusTap)
/* harmony export */ });
/* harmony import */ var D_projects_final_app_dev2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 467);
/* harmony import */ var _stencil_core_internal_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stencil/core/internal/client */ 2617);
/* harmony import */ var _index8_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index8.js */ 7849);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers.js */ 1656);

/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */



const startStatusTap = () => {
  const win = window;
  win.addEventListener('statusTap', () => {
    (0,_stencil_core_internal_client__WEBPACK_IMPORTED_MODULE_1__.readTask)(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = (0,_index8_js__WEBPACK_IMPORTED_MODULE_2__.a)(el);
      if (contentEl) {
        new Promise(resolve => (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.c)(contentEl, resolve)).then(() => {
          (0,_stencil_core_internal_client__WEBPACK_IMPORTED_MODULE_1__.writeTask)( /*#__PURE__*/(0,D_projects_final_app_dev2_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
            /**
             * If scrolling and user taps status bar,
             * only calling scrollToTop is not enough
             * as engines like WebKit will jump the
             * scroll position back down and complete
             * any in-progress momentum scrolling.
             */
            contentEl.style.setProperty('--overflow', 'hidden');
            yield (0,_index8_js__WEBPACK_IMPORTED_MODULE_2__.s)(contentEl, 300);
            contentEl.style.removeProperty('--overflow');
          }));
        });
      }
    });
  });
};


/***/ })

}]);