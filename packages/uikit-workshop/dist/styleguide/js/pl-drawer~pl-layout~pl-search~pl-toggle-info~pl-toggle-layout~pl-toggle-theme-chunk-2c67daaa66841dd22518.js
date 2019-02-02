(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pl-drawer~pl-layout~pl-search~pl-toggle-info~pl-toggle-layout~pl-toggle-theme"],{

/***/ "./src/scripts/actions/app.js":
/*!************************************!*\
  !*** ./src/scripts/actions/app.js ***!
  \************************************/
/*! exports provided: UPDATE_THEME_MODE, UPDATE_LAYOUT_MODE, UPDATE_DRAWER_ANIMATION_STATE, UPDATE_DRAWER_STATE, UPDATE_DRAWER_HEIGHT, IS_VIEWALL_PAGE, updateLayoutMode, updateThemeMode, updateDrawerState, updateDrawerAnimationState, updateDrawerHeight, isViewallPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_THEME_MODE\", function() { return UPDATE_THEME_MODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_LAYOUT_MODE\", function() { return UPDATE_LAYOUT_MODE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DRAWER_ANIMATION_STATE\", function() { return UPDATE_DRAWER_ANIMATION_STATE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DRAWER_STATE\", function() { return UPDATE_DRAWER_STATE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UPDATE_DRAWER_HEIGHT\", function() { return UPDATE_DRAWER_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IS_VIEWALL_PAGE\", function() { return IS_VIEWALL_PAGE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateLayoutMode\", function() { return updateLayoutMode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateThemeMode\", function() { return updateThemeMode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateDrawerState\", function() { return updateDrawerState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateDrawerAnimationState\", function() { return updateDrawerAnimationState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateDrawerHeight\", function() { return updateDrawerHeight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isViewallPage\", function() { return isViewallPage; });\nvar UPDATE_THEME_MODE = 'UPDATE_THEME_MODE';\nvar UPDATE_LAYOUT_MODE = 'UPDATE_LAYOUT_MODE';\nvar UPDATE_DRAWER_ANIMATION_STATE = 'UPDATE_DRAWER_ANIMATION_STATE';\nvar UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';\nvar UPDATE_DRAWER_HEIGHT = 'UPDATE_DRAWER_HEIGHT';\nvar IS_VIEWALL_PAGE = 'IS_VIEWALL_PAGE';\nvar updateLayoutMode = function updateLayoutMode(layoutMode) {\n  return function (dispatch, getState) {\n    if (getState().app.layoutMode !== layoutMode) {\n      dispatch({\n        type: UPDATE_LAYOUT_MODE,\n        layoutMode: layoutMode\n      });\n    }\n  };\n};\nvar updateThemeMode = function updateThemeMode(themeMode) {\n  return function (dispatch, getState) {\n    if (getState().app.themeMode !== themeMode) {\n      dispatch({\n        type: UPDATE_THEME_MODE,\n        themeMode: themeMode\n      });\n    }\n  };\n};\nvar updateDrawerState = function updateDrawerState(opened) {\n  return function (dispatch, getState) {\n    if (getState().app.drawerOpened !== opened) {\n      dispatch({\n        type: UPDATE_DRAWER_STATE,\n        opened: opened\n      });\n    }\n  };\n};\nvar updateDrawerAnimationState = function updateDrawerAnimationState(drawerIsAnimating) {\n  return function (dispatch, getState) {\n    if (getState().app.drawerIsAnimating !== drawerIsAnimating) {\n      dispatch({\n        type: UPDATE_DRAWER_ANIMATION_STATE,\n        drawerIsAnimating: drawerIsAnimating\n      });\n    }\n  };\n};\nvar updateDrawerHeight = function updateDrawerHeight(height) {\n  return function (dispatch, getState) {\n    if (getState().app.drawerHeight !== height) {\n      dispatch({\n        type: UPDATE_DRAWER_HEIGHT,\n        height: height\n      });\n    }\n  };\n};\nvar isViewallPage = function isViewallPage(isViewall) {\n  return function (dispatch, getState) {\n    if (getState().app.isViewallPage !== isViewall) {\n      dispatch({\n        type: IS_VIEWALL_PAGE,\n        isViewall: isViewall\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack:///./src/scripts/actions/app.js?");

/***/ }),

/***/ "./src/scripts/components/base-component.js":
/*!**************************************************!*\
  !*** ./src/scripts/components/base-component.js ***!
  \**************************************************/
/*! exports provided: BaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseComponent\", function() { return BaseComponent; });\n/* harmony import */ var skatejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! skatejs */ \"./node_modules/skatejs/dist/es/index.js\");\n/* harmony import */ var _skatejs_renderer_preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @skatejs/renderer-preact */ \"./node_modules/@skatejs/renderer-preact/dist/es/index.js\");\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store.js */ \"./src/scripts/store.js\");\n/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ \"./src/scripts/utils/index.js\");\n/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! preact */ \"./node_modules/preact/dist/preact.mjs\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar BaseComponent =\n/*#__PURE__*/\nfunction (_withComponent) {\n  _inherits(BaseComponent, _withComponent);\n\n  function BaseComponent() {\n    _classCallCheck(this, BaseComponent);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(BaseComponent).apply(this, arguments));\n  }\n\n  _createClass(BaseComponent, [{\n    key: \"disconnectedCallback\",\n    value: function disconnectedCallback() {\n      this.__storeUnsubscribe();\n\n      if (_get(_getPrototypeOf(BaseComponent.prototype), \"disconnectedCallback\", this)) {\n        _get(_getPrototypeOf(BaseComponent.prototype), \"disconnectedCallback\", this).call(this);\n      }\n    }\n  }, {\n    key: \"connectedCallback\",\n    value: function connectedCallback() {\n      var _this = this;\n\n      this.__storeUnsubscribe = _store_js__WEBPACK_IMPORTED_MODULE_2__[\"store\"].subscribe(function () {\n        return _this._stateChanged(_store_js__WEBPACK_IMPORTED_MODULE_2__[\"store\"].getState());\n      });\n\n      this._stateChanged(_store_js__WEBPACK_IMPORTED_MODULE_2__[\"store\"].getState());\n\n      if (_get(_getPrototypeOf(BaseComponent.prototype), \"connectedCallback\", this)) {\n        _get(_getPrototypeOf(BaseComponent.prototype), \"connectedCallback\", this).call(this);\n      }\n    }\n  }, {\n    key: \"_stateChanged\",\n    value: function _stateChanged(state) {\n      throw new Error('_stateChanged() not implemented', this);\n    }\n    /**\n     * Update component state and schedule a re-render.\n     * @param {object} state A dict of state properties to be shallowly merged\n     * \tinto the current state, or a function that will produce such a dict. The\n     * \tfunction is called with the current state and props.\n     * @param {() => void} callback A function to be called once component state is\n     * \tupdated\n     */\n\n  }, {\n    key: \"setState\",\n    value: function setState(state, callback) {\n      if (!this._prevState) {\n        this._prevState = this.state;\n      }\n\n      this.state = Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_3__[\"extend\"])(Object(_utils_index_js__WEBPACK_IMPORTED_MODULE_3__[\"extend\"])({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);\n\n      if (callback) {\n        this._renderCallbacks.push(callback);\n      }\n\n      this.triggerUpdate();\n    }\n  }, {\n    key: \"_renderStyles\",\n    value: function _renderStyles(stylesheets) {\n      var styles = Array.from(stylesheets);\n      styles = styles.join(' ');\n\n      if (styles) {\n        return this.useShadow && Object(preact__WEBPACK_IMPORTED_MODULE_4__[\"h\"])(\"style\", null, styles);\n      } else {\n        return null;\n      }\n    }\n  }, {\n    key: \"renderRoot\",\n    get: function get() {\n      if (this.useShadow === true && _utils_index_js__WEBPACK_IMPORTED_MODULE_3__[\"supportsShadowDom\"]) {\n        return _get(_getPrototypeOf(BaseComponent.prototype), \"renderRoot\", this) || Object(skatejs__WEBPACK_IMPORTED_MODULE_0__[\"shadow\"])(this);\n      } else {\n        return this;\n      }\n    }\n  }]);\n\n  return BaseComponent;\n}(Object(skatejs__WEBPACK_IMPORTED_MODULE_0__[\"withComponent\"])(Object(_skatejs_renderer_preact__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()));\n\n//# sourceURL=webpack:///./src/scripts/components/base-component.js?");

/***/ }),

/***/ "./src/scripts/store.js":
/*!******************************************!*\
  !*** ./src/scripts/store.js + 2 modules ***!
  \******************************************/
/*! exports provided: store */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/pwa-helpers/lazy-reducer-enhancer.js */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/redux-thunk/es/index.js */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/redux/es/redux.js */
/*! ModuleConcatenation bailout: Cannot concat with ./src/scripts/actions/app.js because of ./src/scripts/components/pl-drawer/pl-drawer.js */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\n// EXTERNAL MODULE: ./node_modules/redux/es/redux.js\nvar redux = __webpack_require__(\"./node_modules/redux/es/redux.js\");\n\n// EXTERNAL MODULE: ./node_modules/redux-thunk/es/index.js\nvar es = __webpack_require__(\"./node_modules/redux-thunk/es/index.js\");\n\n// EXTERNAL MODULE: ./node_modules/pwa-helpers/lazy-reducer-enhancer.js\nvar lazy_reducer_enhancer = __webpack_require__(\"./node_modules/pwa-helpers/lazy-reducer-enhancer.js\");\n\n// EXTERNAL MODULE: ./src/scripts/actions/app.js\nvar actions_app = __webpack_require__(\"./src/scripts/actions/app.js\");\n\n// CONCATENATED MODULE: ./src/scripts/reducers/app.js\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar app_app = function app() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case actions_app[\"UPDATE_LAYOUT_MODE\"]:\n      return _objectSpread({}, state, {\n        layoutMode: action.layoutMode\n      });\n\n    case actions_app[\"UPDATE_THEME_MODE\"]:\n      return _objectSpread({}, state, {\n        themeMode: action.themeMode\n      });\n\n    case actions_app[\"UPDATE_DRAWER_STATE\"]:\n      return _objectSpread({}, state, {\n        drawerOpened: action.opened\n      });\n\n    case actions_app[\"UPDATE_DRAWER_HEIGHT\"]:\n      return _objectSpread({}, state, {\n        drawerHeight: action.height\n      });\n\n    case actions_app[\"UPDATE_DRAWER_ANIMATION_STATE\"]:\n      return _objectSpread({}, state, {\n        drawerIsAnimating: action.drawerIsAnimating\n      });\n\n    case actions_app[\"IS_VIEWALL_PAGE\"]:\n      return _objectSpread({}, state, {\n        isViewallPage: action.isViewall\n      });\n\n    default:\n      return state;\n  }\n};\n\n/* harmony default export */ var reducers_app = (app_app);\n// CONCATENATED MODULE: ./src/scripts/localstorage.js\nvar saveState = function saveState(state) {\n  var json = localStorage.getItem('patternlab') || '{}';\n  var stringifiedNewState = JSON.stringify(state);\n\n  if (stringifiedNewState !== json && stringifiedNewState !== '{}') {\n    localStorage.setItem('patternlab', stringifiedNewState);\n  }\n};\nvar loadState = function loadState() {\n  var json; // Temporarily don't load the cached state in debug mode.\n\n  if (window.location.hash === '#debug') {\n    json = '{}'; // Alternatively, clear the localStorage redux state with a #reset hash\n  } else if (window.location.hash === '#reset') {\n    localStorage.removeItem('patternlab');\n    json = {};\n  } else {\n    json = localStorage.getItem('patternlab') || '{}';\n  }\n\n  var state = JSON.parse(json);\n\n  if (state) {\n    // Add default state data here (if necessary)\n    if (state.app) {\n      if (state.app.drawerHeight && !state.app.drawerOpened) {\n        state.app.appHeight = window.innerHeight;\n      } else if (state.app.drawerHeight && state.app.drawerOpened) {\n        state.app.appHeight = window.innerHeight - state.app.drawerHeight;\n      }\n    }\n\n    if (state.app) {\n      if (state.app.themeMode === undefined) {\n        try {\n          if (window.patternlab.config.theme.color !== undefined) {\n            state.app.themeMode = window.patternlab.config.theme.color;\n          }\n        } catch (e) {\n          state.app.themeMode = 'dark';\n        }\n      }\n    }\n\n    return state;\n  } else {\n    return undefined;\n  }\n};\n// CONCATENATED MODULE: ./src/scripts/store.js\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"store\", function() { return store; });\n\n\n\n\n\nvar compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux[\"compose\"];\nvar store = Object(redux[\"createStore\"])(function (state, action) {\n  return state;\n}, loadState(), // If there is local storage data, load it.\ncompose(Object(lazy_reducer_enhancer[\"lazyReducerEnhancer\"])(redux[\"combineReducers\"]), Object(redux[\"applyMiddleware\"])(es[\"default\"])));\nstore.addReducers({\n  app: reducers_app\n}); // This subscriber writes to local storage anytime the state updates.\n\nstore.subscribe(function () {\n  saveState(store.getState());\n});\n\n//# sourceURL=webpack:///./src/scripts/store.js_+_2_modules?");

/***/ })

}]);