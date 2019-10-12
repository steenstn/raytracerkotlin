if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'render'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'render'.");
}
var render = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var toString = Kotlin.toString;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var Unit = Kotlin.kotlin.Unit;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var width;
  var height;
  var canvas;
  var context;
  function main$lambda(e) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var event = Kotlin.isType(tmp$ = e, MessageEvent) ? tmp$ : throwCCE();
    println('message: ' + toString(event.data));
    println(typeof event.data);
    var imageString = typeof (tmp$_0 = event.data) === 'string' ? tmp$_0 : throwCCE();
    var imageList = split(imageString, [',']);
    var index = 0;
    tmp$_1 = height;
    for (var y = 0; y <= tmp$_1; y++) {
      tmp$_2 = width;
      for (var x = 0; x <= tmp$_2; x++) {
        context.fillStyle = fillStyle(toDouble(imageList.get_za3lpa$(index)), toDouble(imageList.get_za3lpa$(index + 1 | 0)), toDouble(imageList.get_za3lpa$(index + 2 | 0)));
        context.fillRect(x, y, 1.0, 1.0);
        index = index + 3 | 0;
      }
    }
    return Unit;
  }
  function main() {
    canvas.width = width;
    canvas.height = height;
    var worker = new Worker('out/production/raytracerkotlin/raytracerkotlin.js');
    worker.addEventListener('message', main$lambda);
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
  width = 1000;
  height = 600;
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  main();
  Kotlin.defineModule('render', _);
  return _;
}(typeof render === 'undefined' ? {} : render, kotlin);
