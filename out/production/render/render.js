if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'render'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'render'.");
}
var render = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var width;
  var height;
  var canvas;
  var context;
  function main$lambda(e) {
    println(JSON.stringify(e));
    return Unit;
  }
  function main$lambda$lambda(closure$e) {
    return function () {
      println(closure$e.data);
      return Unit;
    };
  }
  function main$lambda_0(e) {
    return main$lambda$lambda(e);
  }
  function main() {
    canvas.width = width;
    canvas.height = height;
    var worker = new Worker('out/production/raytracerkotlin/raytracerkotlin.js');
    worker.onerror = main$lambda;
    worker.onmessage = main$lambda_0;
    println(JSON.stringify(worker));
  }
  function waitMethod$lambda() {
    waitMethod();
    return Unit;
  }
  function waitMethod() {
    println('waiting');
    window.setTimeout(waitMethod$lambda, 1000);
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
  _.main = main;
  _.waitMethod = waitMethod;
  _.fillStyle_yvo9jy$ = fillStyle;
  _.fillStyle_qt1dr2$ = fillStyle_0;
  width = 1000;
  height = 600;
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  main();
  Kotlin.defineModule('render', _);
  return _;
}(typeof render === 'undefined' ? {} : render, kotlin);
