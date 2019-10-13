if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'render'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'render'.");
}
var render = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var Random = Kotlin.kotlin.random.Random;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var width;
  var height;
  var canvas;
  var context;
  function main$lambda(closure$worker) {
    return function (e) {
      var closure$worker_0 = closure$worker;
      var tmp$, tmp$_0;
      var event = Kotlin.isType(tmp$ = e, MessageEvent) ? tmp$ : throwCCE();
      var imageString = typeof (tmp$_0 = event.data) === 'string' ? tmp$_0 : throwCCE();
      var endIndex = imageString.length - 1 | 0;
      var imageList = split(imageString.substring(1, endIndex), [',']);
      context.fillStyle = fillStyle_0(150, 50, 50);
      context.fillRect(Random.Default.nextDouble_14dthe$(450.0), Random.Default.nextDouble_14dthe$(250.0), 20.0, 20.0);
      println('rendered');
      closure$worker_0.postMessage('start');
      return Unit;
    };
  }
  function main() {
    canvas.width = width;
    canvas.height = height;
    var worker = new Worker('out/production/raytracerkotlin/raytracerkotlin.js');
    worker.addEventListener('message', main$lambda(worker));
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
  _.fillStyle_yvo9jy$ = fillStyle;
  _.fillStyle_qt1dr2$ = fillStyle_0;
  width = 500;
  height = 300;
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  main();
  Kotlin.defineModule('render', _);
  return _;
}(typeof render === 'undefined' ? {} : render, kotlin);
