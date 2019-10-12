if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'render'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'render'.");
}
var render = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var toString = Kotlin.toString;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var width;
  var height;
  var canvas;
  var context;
  var worker;
  function main$lambda$lambda(closure$e) {
    return function () {
      println('image ' + toString(closure$e.data));
      return Unit;
    };
  }
  function main$lambda(e) {
    return main$lambda$lambda(e);
  }
  function main() {
    canvas.width = width;
    canvas.height = height;
    worker = new Worker('out/production/raytracerkotlin/raytracerkotlin.js');
    println('in render');
    ensureNotNull(worker).onmessage = main$lambda;
    waitMethod();
  }
  function waitMethod$lambda() {
    waitMethod();
    return Unit;
  }
  function waitMethod() {
    window.setTimeout(waitMethod$lambda, 50);
  }
  function fillStyle(r, g, b) {
    return fillStyle_0(numberToInt(round(r * 255)), numberToInt(round(g * 255)), numberToInt(round(b * 255)));
  }
  function fillStyle_0(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  Object.defineProperty(_, 'width', {
    get: function () {
      return width;
    }
  });
  Object.defineProperty(_, 'height', {
    get: function () {
      return height;
    }
  });
  Object.defineProperty(_, 'canvas', {
    get: function () {
      return canvas;
    }
  });
  Object.defineProperty(_, 'context', {
    get: function () {
      return context;
    }
  });
  Object.defineProperty(_, 'worker', {
    get: function () {
      return worker;
    },
    set: function (value) {
      worker = value;
    }
  });
  _.main = main;
  _.waitMethod = waitMethod;
  _.fillStyle_yvo9jy$ = fillStyle;
  _.fillStyle_qt1dr2$ = fillStyle_0;
  width = 1000;
  height = 600;
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  worker = null;
  main();
  Kotlin.defineModule('render', _);
  return _;
}(typeof render === 'undefined' ? {} : render, kotlin);
