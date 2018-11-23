(window.webpackJsonp=window.webpackJsonp||[]).push([["pl-styleguide"],{"./src/scripts/components/styleguide.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mousetrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mousetrap */ \"./node_modules/mousetrap/mousetrap.js\");\n/* harmony import */ var mousetrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mousetrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ \"./src/scripts/utils/index.js\");\n/**\n * Styleguide.js - misc UI logic for Pattern Lab that needs refactoring\n */\n\n\n\n\n(function (w) {\n  var sw = document.body.clientWidth; //Viewport Width\n\n  var minViewportWidth = 240;\n  var maxViewportWidth = 2600; //set minimum and maximum viewport based on confg\n\n  if (window.config.ishMinimum !== undefined) {\n    minViewportWidth = parseInt(window.config.ishMinimum, 10); //Minimum Size for Viewport\n  }\n\n  if (window.config.ishMaximum !== undefined) {\n    maxViewportWidth = parseInt(window.config.ishMaximum, 10); //Maxiumum Size for Viewport\n  } //alternatively, use the ishViewportRange object\n\n\n  if (window.config.ishViewportRange !== undefined) {\n    minViewportWidth = window.config.ishViewportRange.s[0];\n    maxViewportWidth = window.config.ishViewportRange.l[1];\n  } //if both are set, then let's use the larger one.\n\n\n  if (window.config.ishViewportRange && window.config.ishMaximum) {\n    var largeRange = parseInt(window.config.ishViewportRange.l[1], 10);\n    var ishMaximum = parseInt(window.config.ishMaximum, 10);\n    maxViewportWidth = largeRange > ishMaximum ? largeRange : ishMaximum;\n  }\n\n  var viewportResizeHandleWidth = 14; //Width of the viewport drag-to-resize handle\n\n  var $sgIframe = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-iframe'); //Viewport element\n\n  var $sizePx = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-px'); //Px size input element in toolbar\n\n  var $sizeEms = jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-em'); //Em size input element in toolbar\n\n  var $bodySize = window.config.ishFontSize !== undefined ? parseInt(window.config.ishFontSize, 10) : parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').css('font-size'), 10); //Body size of the document\n\n  var discoID = false;\n  var discoMode = false;\n  var fullMode = true;\n  var hayMode = false; //Update dimensions on resize\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()(w).resize(function () {\n    sw = document.body.clientWidth;\n\n    if (fullMode === true) {\n      sizeiframe(sw, false);\n    }\n  }); //Size View Events\n  // handle small button\n\n  function goSmall() {\n    killDisco();\n    killHay();\n    fullMode = false;\n    sizeiframe(getRandom(minViewportWidth, window.config.ishViewportRange !== undefined ? parseInt(window.config.ishViewportRange.s[1], 10) : 500));\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-s').on('click', function (e) {\n    e.preventDefault();\n    goSmall();\n  });\n  mousetrap__WEBPACK_IMPORTED_MODULE_1___default.a.bind('ctrl+shift+s', function (e) {\n    goSmall();\n    return false;\n  }); // handle medium button\n\n  function goMedium() {\n    killDisco();\n    killHay();\n    fullMode = false;\n    sizeiframe(getRandom(window.config.ishViewportRange !== undefined ? parseInt(window.config.ishViewportRange.m[0], 10) : 500, window.config.ishViewportRange !== undefined ? parseInt(window.config.ishViewportRange.m[1], 10) : 800));\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-m').on('click', function (e) {\n    e.preventDefault();\n    goMedium();\n  });\n  mousetrap__WEBPACK_IMPORTED_MODULE_1___default.a.bind('ctrl+shift+m', function (e) {\n    goMedium();\n    return false;\n  }); // handle large button\n\n  function goLarge() {\n    killDisco();\n    killHay();\n    fullMode = false;\n    sizeiframe(getRandom(window.config.ishViewportRange !== undefined ? parseInt(window.config.ishViewportRange.l[0], 10) : 800, maxViewportWidth));\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-l').on('click', function (e) {\n    e.preventDefault();\n    goLarge();\n  });\n  mousetrap__WEBPACK_IMPORTED_MODULE_1___default.a.bind('ctrl+shift+l', function (e) {\n    goLarge();\n    return false;\n  }); //Click Full Width Button\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-full').on('click', function (e) {\n    //Resets\n    e.preventDefault();\n    killDisco();\n    killHay();\n    fullMode = true;\n    sizeiframe(sw);\n  }); //Click Random Size Button\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-random').on('click', function (e) {\n    e.preventDefault();\n    killDisco();\n    killHay();\n    fullMode = false;\n    sizeiframe(getRandom(minViewportWidth, sw));\n  }); //Click for Disco Mode, which resizes the viewport randomly\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-disco').on('click', function (e) {\n    e.preventDefault();\n    killHay();\n    fullMode = false;\n\n    if (discoMode) {\n      killDisco();\n    } else {\n      startDisco();\n    }\n  }); // Disco Mode\n\n  function disco() {\n    sizeiframe(getRandom(minViewportWidth, sw));\n  }\n\n  function killDisco() {\n    discoMode = false;\n    clearInterval(discoID);\n    discoID = false;\n  }\n\n  function startDisco() {\n    discoMode = true;\n    discoID = setInterval(disco, 800);\n  }\n\n  mousetrap__WEBPACK_IMPORTED_MODULE_1___default.a.bind('ctrl+shift+d', function (e) {\n    if (!discoMode) {\n      startDisco();\n    } else {\n      killDisco();\n    }\n\n    return false;\n  }); //Stephen Hay Mode - \"Start with the small screen first, then expand until it looks like shit. Time for a breakpoint!\"\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#pl-size-hay').on('click', function (e) {\n    e.preventDefault();\n    killDisco();\n\n    if (hayMode) {\n      killHay();\n    } else {\n      startHay();\n    }\n  }); //Stop Hay! Mode\n\n  function killHay() {\n    var currentWidth = $sgIframe.width();\n    hayMode = false;\n    $sgIframe.removeClass('hay-mode');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').removeClass('hay-mode');\n    sizeiframe(Math.floor(currentWidth));\n  } // start Hay! mode\n\n\n  function startHay() {\n    hayMode = true;\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').removeClass('vp-animate').width(minViewportWidth + viewportResizeHandleWidth);\n    $sgIframe.removeClass('vp-animate').width(minViewportWidth);\n    var timeoutID = window.setTimeout(function () {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').addClass('hay-mode').width(maxViewportWidth + viewportResizeHandleWidth);\n      $sgIframe.addClass('hay-mode').width(maxViewportWidth);\n      setInterval(function () {\n        var vpSize = $sgIframe.width();\n        updateSizeReading(vpSize);\n      }, 100);\n    }, 200);\n  } // start hay from a keyboard shortcut\n\n\n  mousetrap__WEBPACK_IMPORTED_MODULE_1___default.a.bind('ctrl+shift+h', function (e) {\n    if (!hayMode) {\n      startHay();\n    } else {\n      killHay();\n    }\n  }); //Pixel input\n\n  $sizePx.on('keydown', function (e) {\n    var val = Math.floor(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());\n\n    if (e.keyCode === 38) {\n      //If the up arrow key is hit\n      val++;\n      sizeiframe(val, false);\n    } else if (e.keyCode === 40) {\n      //If the down arrow key is hit\n      val--;\n      sizeiframe(val, false);\n    } else if (e.keyCode === 13) {\n      //If the Enter key is hit\n      e.preventDefault();\n      sizeiframe(val); //Size Iframe to value of text box\n\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).blur();\n    }\n  });\n  $sizePx.on('keyup', function () {\n    var val = Math.floor(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());\n    updateSizeReading(val, 'px', 'updateEmInput');\n  }); //Em input\n\n  $sizeEms.on('keydown', function (e) {\n    var val = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());\n\n    if (e.keyCode === 38) {\n      //If the up arrow key is hit\n      val++;\n      sizeiframe(Math.floor(val * $bodySize), false);\n    } else if (e.keyCode === 40) {\n      //If the down arrow key is hit\n      val--;\n      sizeiframe(Math.floor(val * $bodySize), false);\n    } else if (e.keyCode === 13) {\n      //If the Enter key is hit\n      e.preventDefault();\n      sizeiframe(Math.floor(val * $bodySize)); //Size Iframe to value of text box\n    }\n  });\n  $sizeEms.on('keyup', function () {\n    var val = parseFloat(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val());\n    updateSizeReading(val, 'em', 'updatePxInput');\n  }); // set 0 to 320px as a default\n\n  mousetrap__WEBPACK_IMPORTED_MODULE_1___default.a.bind('ctrl+shift+0', function (e) {\n    e.preventDefault();\n    sizeiframe(320, true);\n    return false;\n  }); //Resize the viewport\n  //'size' is the target size of the viewport\n  //'animate' is a boolean for switching the CSS animation on or off. 'animate' is true by default, but can be set to false for things like nudging and dragging\n\n  function sizeiframe(size, animate) {\n    var theSize;\n\n    if (size > maxViewportWidth) {\n      //If the entered size is larger than the max allowed viewport size, cap value at max vp size\n      theSize = maxViewportWidth;\n    } else if (size < minViewportWidth) {\n      //If the entered size is less than the minimum allowed viewport size, cap value at min vp size\n      theSize = minViewportWidth;\n    } else {\n      theSize = size;\n    } //Conditionally remove CSS animation class from viewport\n\n\n    if (animate === false) {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container, .pl-js-iframe').removeClass('vp-animate'); //If aninate is set to false, remove animate class from viewport\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container, .pl-js-iframe').addClass('vp-animate');\n    }\n\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').width(theSize + viewportResizeHandleWidth); //Resize viewport wrapper to desired size + size of drag resize handler\n\n    $sgIframe.width(theSize); //Resize viewport to desired size\n\n    var targetOrigin = window.location.protocol === 'file:' ? '*' : window.location.protocol + '//' + window.location.host;\n    var obj = JSON.stringify({\n      event: 'patternLab.resize',\n      resize: 'true'\n    });\n    document.querySelector('.pl-js-iframe').contentWindow.postMessage(obj, targetOrigin);\n    updateSizeReading(theSize); //Update values in toolbar\n\n    saveSize(theSize); //Save current viewport to cookie\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').on('transitionend webkitTransitionEnd', function (e) {\n    var targetOrigin = window.location.protocol === 'file:' ? '*' : window.location.protocol + '//' + window.location.host;\n    var obj = JSON.stringify({\n      event: 'patternLab.resize',\n      resize: 'true'\n    });\n    document.querySelector('.pl-js-iframe').contentWindow.postMessage(obj, targetOrigin);\n  });\n\n  function saveSize(size) {\n    if (!_utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].findValue('vpWidth')) {\n      _utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].addValue('vpWidth', size);\n    } else {\n      _utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].updateValue('vpWidth', size);\n    }\n  } //Update Pixel and Em inputs\n  //'size' is the input number\n  //'unit' is the type of unit: either px or em. Default is px. Accepted values are 'px' and 'em'\n  //'target' is what inputs to update. Defaults to both\n\n\n  function updateSizeReading(size, unit, target) {\n    var emSize, pxSize;\n\n    if (unit === 'em') {\n      //If size value is in em units\n      emSize = size;\n      pxSize = Math.floor(size * $bodySize);\n    } else {\n      //If value is px or absent\n      pxSize = size;\n      emSize = size / $bodySize;\n    }\n\n    if (target === 'updatePxInput') {\n      $sizePx.val(pxSize);\n    } else if (target === 'updateEmInput') {\n      $sizeEms.val(emSize.toFixed(2));\n    } else {\n      $sizeEms.val(emSize.toFixed(2));\n      $sizePx.val(pxSize);\n    }\n  }\n  /* Returns a random number between min and max */\n\n\n  function getRandom(min, max) {\n    return Math.floor(Math.random() * (max - min) + min);\n  } //Update The viewport size\n\n\n  function updateViewportWidth(size) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-iframe').width(size);\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').width(size * 1 + 14);\n    updateSizeReading(size);\n  }\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').on('touchstart', function (event) {}); // handles widening the \"viewport\"\n  //   1. on \"mousedown\" store the click location\n  //   2. make a hidden div visible so that it can track mouse movements and make sure the pointer doesn't get lost in the iframe\n  //   3. on \"mousemove\" calculate the math, save the results to a cookie, and update the viewport\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-resize-handle').mousedown(function (event) {\n    // capture default data\n    var origClientX = event.clientX;\n    var origViewportWidth = $sgIframe.width();\n    fullMode = false; // show the cover\n\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-viewport-cover').css('display', 'block'); // add the mouse move event and capture data. also update the viewport width\n\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-viewport-cover').mousemove(function (e) {\n      var viewportWidth = origViewportWidth + 2 * (e.clientX - origClientX);\n\n      if (viewportWidth > minViewportWidth) {\n        if (!_utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].findValue('vpWidth')) {\n          _utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].addValue('vpWidth', viewportWidth);\n        } else {\n          _utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].updateValue('vpWidth', viewportWidth);\n        }\n\n        sizeiframe(viewportWidth, false);\n      }\n    });\n    return false;\n  }); // on \"mouseup\" we unbind the \"mousemove\" event and hide the cover again\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').mouseup(function () {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-viewport-cover').unbind('mousemove');\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-viewport-cover').css('display', 'none');\n  }); // capture the viewport width that was loaded and modify it so it fits with the pull bar\n\n  var origViewportWidth = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-iframe').width();\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').width(origViewportWidth);\n  var testWidth = window.screen.width;\n\n  if (window.orientation !== undefined) {\n    testWidth = window.orientation === 0 ? window.screen.width : window.screen.height;\n  }\n\n  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() === testWidth && 'ontouchstart' in document.documentElement && jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width() <= 1024) {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-resize-container').width(0);\n  } else {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-iframe').width(origViewportWidth - 14);\n  }\n\n  updateSizeReading(jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-iframe').width()); // get the request vars\n\n  var oGetVars = _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].getRequestVars(); // pre-load the viewport width\n\n  var vpWidth = 0;\n  var trackViewportWidth = true; // can toggle this feature on & off\n\n  if (oGetVars.h !== undefined || oGetVars.hay !== undefined) {\n    startHay();\n  } else if (oGetVars.d !== undefined || oGetVars.disco !== undefined) {\n    startDisco();\n  } else if (oGetVars.w !== undefined || oGetVars.width !== undefined) {\n    vpWidth = oGetVars.w !== undefined ? oGetVars.w : oGetVars.width;\n    vpWidth = vpWidth.indexOf('em') !== -1 ? Math.floor(Math.floor(vpWidth.replace('em', '')) * $bodySize) : Math.floor(vpWidth.replace('px', ''));\n    _utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].updateValue('vpWidth', vpWidth);\n    updateViewportWidth(vpWidth);\n  } else if (trackViewportWidth && (vpWidth = _utils__WEBPACK_IMPORTED_MODULE_2__[\"DataSaver\"].findValue('vpWidth'))) {\n    updateViewportWidth(vpWidth);\n  } // set up the defaults for the\n\n\n  var baseIframePath = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('index.html', '');\n  var iFramePath = baseIframePath + 'styleguide/html/styleguide.html?' + Date.now();\n\n  if (_utils__WEBPACK_IMPORTED_MODULE_2__[\"patternName\"] !== 'all') {\n    var patternPath = _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].getFileName(_utils__WEBPACK_IMPORTED_MODULE_2__[\"patternName\"]);\n    iFramePath = patternPath !== '' ? baseIframePath + patternPath + '?' + Date.now() : iFramePath;\n    document.getElementById('title').innerHTML = 'Pattern Lab - ' + _utils__WEBPACK_IMPORTED_MODULE_2__[\"patternName\"];\n    window.history.replaceState({\n      pattern: _utils__WEBPACK_IMPORTED_MODULE_2__[\"patternName\"]\n    }, null, null);\n  }\n\n  _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].skipBack = true;\n  document.querySelector('.pl-js-iframe').contentWindow.location.replace(iFramePath); // Close all dropdowns and navigation\n\n  function closePanels() {\n    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-nav-container, .pl-js-acc-handle, .pl-js-acc-panel').removeClass('pl-is-active');\n  } // update the iframe with the source from clicked element in pull down menu. also close the menu\n  // having it outside fixes an auto-close bug i ran into\n\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('a[data-patternpartial]').on('click', function (e) {\n    e.preventDefault(); // update the iframe via the history api handler\n\n    var obj = JSON.stringify({\n      event: 'patternLab.updatePath',\n      path: _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].getFileName(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-patternpartial'))\n    });\n    document.querySelector('.pl-js-iframe').contentWindow.postMessage(obj, _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].targetOrigin);\n    closePanels();\n  }); // handle when someone clicks on the grey area of the viewport so it auto-closes the nav\n\n  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-viewport').click(function () {\n    closePanels();\n  }); // Listen for resize changes\n\n  if (window.orientation !== undefined) {\n    var origOrientation = window.orientation;\n    window.addEventListener('orientationchange', function () {\n      if (window.orientation !== origOrientation) {\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-vp-iframe-container').width(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width());\n        jquery__WEBPACK_IMPORTED_MODULE_0___default()('.pl-js-iframe').width(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width());\n        updateSizeReading(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).width());\n        origOrientation = window.orientation;\n      }\n    }, false);\n  } // watch the iframe source so that it can be sent back to everyone else.\n  // based on the great MDN docs at https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage\n\n\n  function receiveIframeMessage(event) {\n    // does the origin sending the message match the current host? if not dev/null the request\n    if (window.location.protocol !== 'file:' && event.origin !== window.location.protocol + '//' + window.location.host || event.data === '' // message received, but no data included; prevents JSON.parse error below\n    ) {\n        return;\n      }\n\n    var data = {};\n\n    try {\n      data = typeof event.data !== 'string' ? event.data : JSON.parse(event.data);\n    } catch (e) {// @todo: how do we want to handle exceptions here?\n    }\n\n    if (data.event !== undefined) {\n      if (data.event === 'patternLab.pageLoad') {\n        if (!_utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].skipBack) {\n          if (window.history.state === undefined || window.history.state === null || window.history.state.pattern !== data.patternpartial) {\n            _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].pushPattern(data.patternpartial, data.path);\n          }\n          /*\n          if (wsnConnected) {\n          var iFramePath = urlHandler.getFileName(data.patternpartial);\n          wsn.send( '{\"url\": \"'+iFramePath+'\", \"patternpartial\": \"'+event.data.patternpartial+'\" }' );\n          }\n          */\n\n        } // reset the defaults\n\n\n        _utils__WEBPACK_IMPORTED_MODULE_2__[\"urlHandler\"].skipBack = false;\n      } else if (data.event === 'patternLab.keyPress') {\n        if (data.keyPress === 'ctrl+shift+s') {\n          goSmall();\n        } else if (data.keyPress === 'ctrl+shift+m') {\n          goMedium();\n        } else if (data.keyPress === 'ctrl+shift+l') {\n          goLarge();\n        } else if (data.keyPress === 'ctrl+shift+d') {\n          if (!discoMode) {\n            startDisco();\n          } else {\n            killDisco();\n          }\n        } else if (data.keyPress === 'ctrl+shift+h') {\n          if (!hayMode) {\n            startHay();\n          } else {\n            killHay();\n          }\n        } else if (data.keyPress === 'ctrl+shift+0') {\n          sizeiframe(320, true);\n        } // @todo: chat with Brian on if this code is still used and necessary; both the `mqs` and `found` variables are both currently undefined.\n        // else if (found === data.keyPress.match(/ctrl\\+shift\\+([1-9])/)) {\n        //   let val = mqs[found[1] - 1];\n        //   const type = val.indexOf('px') !== -1 ? 'px' : 'em';\n        //   val = val.replace(type, '');\n        //   const width = type === 'px' ? val * 1 : val * $bodySize;\n        //   sizeiframe(width, true);\n        // }\n        // return false;\n\n      }\n    }\n  }\n\n  window.addEventListener('message', receiveIframeMessage, false);\n})(undefined);\n\n//# sourceURL=webpack:///./src/scripts/components/styleguide.js?")}}]);