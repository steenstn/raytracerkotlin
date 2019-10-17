if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'render'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'render'.");
}
var render = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var width;
  var height;
  var canvas;
  var context;
  function main$lambda(closure$blackImage) {
    return function () {
      render(closure$blackImage);
      return Unit;
    };
  }
  function main() {
    var tmp$;
    canvas.width = width;
    canvas.height = height;
    var blackImage = ArrayList_init();
    tmp$ = Kotlin.imul(width, height) * 3 | 0;
    for (var i = 0; i <= tmp$; i++) {
      blackImage.add_11rb$(0.0);
    }
    window.setTimeout(main$lambda(blackImage), 1);
  }
  function render$lambda$lambda$lambda(closure$doubleList) {
    return function () {
      render(closure$doubleList);
      return Unit;
    };
  }
  function render$lambda(e) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var event = Kotlin.isType(tmp$ = e, MessageEvent) ? tmp$ : throwCCE();
    var imageString = typeof (tmp$_0 = event.data) === 'string' ? tmp$_0 : throwCCE();
    println('image from event in main thread');
    println(imageString);
    var endIndex = imageString.length - 1 | 0;
    var imageList = split(imageString.substring(1, endIndex), [',']);
    var destination = ArrayList_init_0(collectionSizeOrDefault(imageList, 10));
    var tmp$_3;
    tmp$_3 = imageList.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      destination.add_11rb$(toDouble(item));
    }
    var doubleList = destination;
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
    println('rendered');
    window.setTimeout(render$lambda$lambda$lambda(doubleList), 10);
    return Unit;
  }
  function render(image) {
    var worker = new Worker('out/production/raytracerkotlin/raytracerkotlin.js');
    worker.postMessage(JSON.stringify(image));
    worker.addEventListener('message', render$lambda);
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
  _.render_d3e2cz$ = render;
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
