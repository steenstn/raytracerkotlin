if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'raytracerkotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'raytracerkotlin'.");
}
var raytracerkotlin = function (_, Kotlin) {
  'use strict';
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var throwCCE = Kotlin.throwCCE;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.intrinsics.COROUTINE_SUSPENDED;
  var CoroutineImpl = Kotlin.kotlin.coroutines.CoroutineImpl;
  var Unit = Kotlin.kotlin.Unit;
  var coroutines = Kotlin.kotlin.coroutines;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Continuation = Kotlin.kotlin.coroutines.Continuation;
  var startCoroutine = Kotlin.kotlin.coroutines.startCoroutine_x18nsh$;
  var Random = Kotlin.kotlin.random.Random;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var internal = Kotlin.kotlin.coroutines.js.internal;
  var Result = Kotlin.kotlin.Result;
  var createFailure = Kotlin.kotlin.createFailure_tcv7n7$;
  var intercepted = Kotlin.kotlin.coroutines.intrinsics.intercepted_f9mg25$;
  var SafeContinuation_init = Kotlin.kotlin.coroutines.SafeContinuation_init_wj8d80$;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  Material$Type.prototype = Object.create(Enum.prototype);
  Material$Type.prototype.constructor = Material$Type;
  Plane.prototype = Object.create(Mesh.prototype);
  Plane.prototype.constructor = Plane;
  Sphere.prototype = Object.create(Mesh.prototype);
  Sphere.prototype.constructor = Sphere;
  function suspendCoroutine$lambda(closure$block) {
    return function (c) {
      var safe = SafeContinuation_init(intercepted(c));
      closure$block(safe);
      return safe.getOrThrow();
    };
  }
  var width;
  var height;
  var spheres;
  var canvas;
  var context;
  function await$lambda$lambda(closure$cont) {
    return function (it) {
      closure$cont.resumeWith_tl1gpc$(new Result(it));
      return Unit;
    };
  }
  function await$lambda$lambda_0(closure$cont) {
    return function (it) {
      closure$cont.resumeWith_tl1gpc$(new Result(createFailure(it)));
      return Unit;
    };
  }
  function await$lambda(this$await) {
    return function (cont) {
      this$await.then(await$lambda$lambda(cont), await$lambda$lambda_0(cont));
      return Unit;
    };
  }
  function Coroutine$await($receiver_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$await.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$await.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$await.prototype.constructor = Coroutine$await;
  Coroutine$await.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = suspendCoroutine$lambda(await$lambda(this.local$$receiver))(this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.result_0;
            return this.result_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function await_0($receiver_0, continuation_0, suspended) {
    var instance = new Coroutine$await($receiver_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  }
  function launch$ObjectLiteral() {
  }
  launch$ObjectLiteral.prototype.resumeWith_tl1gpc$ = function (result) {
  };
  Object.defineProperty(launch$ObjectLiteral.prototype, 'context', {
    get: function () {
      return coroutines.EmptyCoroutineContext;
    }
  });
  launch$ObjectLiteral.prototype.resume_s877gv$ = function (value) {
  };
  launch$ObjectLiteral.prototype.resumeWithException_tcv7n7$ = function (e) {
    console.log('Coroutine failed: ' + e);
  };
  launch$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: [Continuation]
  };
  function launch(block) {
    startCoroutine(block, new launch$ObjectLiteral());
  }
  function Coroutine$main$lambda(closure$xmax_0, closure$ymax_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$closure$xmax = closure$xmax_0;
    this.local$closure$ymax = closure$ymax_0;
    this.local$tmp$ = void 0;
    this.local$tmp$_0 = void 0;
    this.local$screenX = void 0;
    this.local$screenY = void 0;
    this.local$dir = void 0;
    this.local$s = void 0;
    this.local$endColor = void 0;
    this.local$numRays = void 0;
    this.local$i = void 0;
    this.local$tmp$_1 = void 0;
  }
  Coroutine$main$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$main$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$main$lambda.prototype.constructor = Coroutine$main$lambda;
  Coroutine$main$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$tmp$ = width;
            this.local$screenX = 0;
            this.state_0 = 2;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            if (this.local$screenX > this.local$tmp$) {
              this.state_0 = 11;
              continue;
            }

            this.local$tmp$_0 = height;
            this.local$screenY = 0;
            this.state_0 = 3;
            continue;
          case 3:
            if (this.local$screenY > this.local$tmp$_0) {
              this.state_0 = 9;
              continue;
            }

            var x = this.local$screenX * 6.0 / width - 3.0;
            var y = this.local$screenY * 6.0 * height / width / height - 3.0 * height / width;
            this.local$dir = (new Vector(x / this.local$closure$xmax, y / this.local$closure$ymax, -1.0)).normalize();
            this.local$s = new Vector(0.0, 0.0, 7.0);
            this.local$endColor = Vector_init();
            this.local$numRays = 20;
            this.local$i = 0;
            this.state_0 = 4;
            continue;
          case 4:
            if (this.local$i > this.local$numRays) {
              this.state_0 = 7;
              continue;
            }

            this.local$tmp$_1 = this.local$endColor;
            this.state_0 = 5;
            this.result_0 = shootRay(this.local$s, this.local$dir, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 5:
            this.local$endColor = this.local$tmp$_1.plus_spvnod$(this.result_0);
            this.state_0 = 6;
            continue;
          case 6:
            this.local$i++;
            this.state_0 = 4;
            continue;
          case 7:
            this.local$endColor = this.local$endColor.div_14dthe$(this.local$numRays);
            context.fillStyle = fillStyle_1(this.local$endColor);
            context.fillRect(this.local$screenX, this.local$screenY, 1.0, 1.0);
            this.state_0 = 8;
            continue;
          case 8:
            this.local$screenY++;
            this.state_0 = 3;
            continue;
          case 9:
            this.state_0 = 10;
            continue;
          case 10:
            this.local$screenX++;
            this.state_0 = 2;
            continue;
          case 11:
            return Unit;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function main$lambda(closure$xmax_0, closure$ymax_0) {
    return function (continuation_0, suspended) {
      var instance = new Coroutine$main$lambda(closure$xmax_0, closure$ymax_0, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function main(continuation) {
    canvas.width = width;
    canvas.height = height;
    var xmax = 5;
    var ymax = 5;
    launch(main$lambda(xmax, ymax));
  }
  function Coroutine$shootRay(start_0, direction_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$tmp$ = void 0;
    this.local$tmp$_0 = void 0;
    this.local$start = start_0;
    this.local$direction = direction_0;
  }
  Coroutine$shootRay.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$shootRay.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$shootRay.prototype.constructor = Coroutine$shootRay;
  Coroutine$shootRay.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$tmp$ = spheres.iterator();
            this.state_0 = 2;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            if (!this.local$tmp$.hasNext()) {
              this.state_0 = 6;
              continue;
            }

            var sphere = this.local$tmp$.next();
            if ((this.local$tmp$_0 = sphere.getIntersection_nmolro$(this.local$start, this.local$direction)) != null) {
              if (this.local$tmp$_0.material.type === Material$Type$LIGHT_getInstance()) {
                return this.local$tmp$_0.material.emittance;
              }
               else {
                var randomVector = Vector$Companion_getInstance().random();
                var crossed = randomVector.cross_spvnod$(this.local$tmp$_0.normal).normalize();
                var eps1 = Random.Default.nextDouble() * 3.14159 * 2.0;
                var x = Random.Default.nextDouble();
                var eps2 = Math_0.sqrt(x);
                var x_0 = Math_0.cos(eps1) * eps2;
                var y = Math_0.sin(eps1) * eps2;
                var x_1 = 1.0 - eps2 * eps2;
                var z = Math_0.sqrt(x_1);
                var tangent = this.local$tmp$_0.normal.cross_spvnod$(crossed);
                var newDirection = crossed.times_14dthe$(x_0).plus_spvnod$(tangent.times_14dthe$(y)).plus_spvnod$(this.local$tmp$_0.normal.times_14dthe$(z));
                this.state_0 = 3;
                this.result_0 = shootRay(this.local$tmp$_0.position, newDirection, this);
                if (this.result_0 === COROUTINE_SUSPENDED)
                  return COROUTINE_SUSPENDED;
                continue;
              }
            }
             else {
              this.state_0 = 5;
              continue;
            }

          case 3:
            var reflected = this.result_0;
            return this.local$tmp$_0.material.color.times_spvnod$(reflected);
          case 4:
            this.state_0 = 5;
            continue;
          case 5:
            this.state_0 = 2;
            continue;
          case 6:
            return new Vector(0.7, 0.7, 0.7);
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function shootRay(start_0, direction_0, continuation_0, suspended) {
    var instance = new Coroutine$shootRay(start_0, direction_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  }
  function fillStyle(r, g, b) {
    return fillStyle_0(numberToInt(round(r * 255)), numberToInt(round(g * 255)), numberToInt(round(b * 255)));
  }
  function fillStyle_0(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  function fillStyle_1(color) {
    var r = numberToInt(color.x * 255);
    var g = numberToInt(color.y * 255);
    var b = numberToInt(color.z * 255);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  function Material(color, emittance, type) {
    this.color = color;
    this.emittance = emittance;
    this.type = type;
  }
  function Material$Type(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Material$Type_initFields() {
    Material$Type_initFields = function () {
    };
    Material$Type$DIFFUSE_instance = new Material$Type('DIFFUSE', 0);
    Material$Type$LIGHT_instance = new Material$Type('LIGHT', 1);
  }
  var Material$Type$DIFFUSE_instance;
  function Material$Type$DIFFUSE_getInstance() {
    Material$Type_initFields();
    return Material$Type$DIFFUSE_instance;
  }
  var Material$Type$LIGHT_instance;
  function Material$Type$LIGHT_getInstance() {
    Material$Type_initFields();
    return Material$Type$LIGHT_instance;
  }
  Material$Type.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Type',
    interfaces: [Enum]
  };
  function Material$Type$values() {
    return [Material$Type$DIFFUSE_getInstance(), Material$Type$LIGHT_getInstance()];
  }
  Material$Type.values = Material$Type$values;
  function Material$Type$valueOf(name) {
    switch (name) {
      case 'DIFFUSE':
        return Material$Type$DIFFUSE_getInstance();
      case 'LIGHT':
        return Material$Type$LIGHT_getInstance();
      default:throwISE('No enum constant Material.Type.' + name);
    }
  }
  Material$Type.valueOf_61zpoe$ = Material$Type$valueOf;
  Material.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Material',
    interfaces: []
  };
  function Mesh(x, y, z) {
    this.position = new Vector(x, y, z);
  }
  Mesh.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Mesh',
    interfaces: []
  };
  function Plane(x, y, z, normal, material) {
    Mesh.call(this, x, y, z);
    this.normal = normal;
    this.material = material;
  }
  Plane.prototype.getIntersection_nmolro$ = function (start, direction) {
    var distance = this.position.minus_spvnod$(start).dot_spvnod$(this.normal) / direction.dot_spvnod$(this.normal);
    if (distance > 1.0E-5) {
      var endMovement = direction.times_14dthe$(distance);
      var intersectionPoint = start.plus_spvnod$(endMovement);
      return new SurfacePoint(intersectionPoint, this.normal, this.material);
    }
    return null;
  };
  Plane.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Plane',
    interfaces: [Mesh]
  };
  function Sphere(x, y, z, radius, material) {
    Mesh.call(this, x, y, z);
    this.radius = radius;
    this.material = material;
  }
  Sphere.prototype.getIntersection_nmolro$ = function (start, direction) {
    var center = this.position;
    var v = start.minus_spvnod$(center);
    var wee = v.dot_spvnod$(direction) * v.dot_spvnod$(direction) - (v.x * v.x + v.y * v.y + v.z * v.z - this.radius * this.radius);
    if (wee > 0) {
      var intersectionDistance = [v.dot_spvnod$(direction) * -1 + Math_0.sqrt(wee), v.dot_spvnod$(direction) * -1 - Math_0.sqrt(wee)];
      var a = intersectionDistance[0];
      var b = intersectionDistance[1];
      var closestIntersection = Math_0.min(a, b);
      if (closestIntersection < 1.0E-5)
        return null;
      var endDistance = direction.times_14dthe$(closestIntersection);
      var endPosition = start.plus_spvnod$(endDistance);
      return new SurfacePoint(endPosition, this.getNormal_spvnod$(endPosition), this.material);
    }
    return null;
  };
  Sphere.prototype.getNormal_spvnod$ = function (pos) {
    return pos.minus_spvnod$(this.position).normalize();
  };
  Sphere.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Sphere',
    interfaces: [Mesh]
  };
  function SurfacePoint(position, normal, material) {
    this.position = position;
    this.normal = normal;
    this.material = material;
  }
  SurfacePoint.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SurfacePoint',
    interfaces: []
  };
  function Vector(x, y, z) {
    Vector$Companion_getInstance();
    this.x = x;
    this.y = y;
    this.z = z;
  }
  function Vector$Companion() {
    Vector$Companion_instance = this;
  }
  Vector$Companion.prototype.random = function () {
    return new Vector(Random.Default.nextDouble_lu1900$(-1.0, 1.0), Random.Default.nextDouble_lu1900$(-1.0, 1.0), Random.Default.nextDouble_lu1900$(-1.0, 1.0));
  };
  Vector$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Vector$Companion_instance = null;
  function Vector$Companion_getInstance() {
    if (Vector$Companion_instance === null) {
      new Vector$Companion();
    }
    return Vector$Companion_instance;
  }
  Vector.prototype.normalize = function () {
    var x = this.x * this.x + this.y * this.y + this.z * this.z;
    var abs = Math_0.sqrt(x);
    return new Vector(this.x / abs, this.y / abs, this.z / abs);
  };
  Vector.prototype.dot_spvnod$ = function (vec) {
    return this.x * vec.x + this.y * vec.y + this.z * vec.z;
  };
  Vector.prototype.length = function () {
    var x = this.x * this.x + this.y * this.y + this.z * this.z;
    return Math_0.sqrt(x);
  };
  Vector.prototype.cross_spvnod$ = function (vec) {
    return new Vector(this.y * vec.z - this.z * vec.y, -1 * (this.x * vec.z - this.z * vec.x), this.x * vec.y - this.y * vec.x);
  };
  Vector.prototype.minus_spvnod$ = function (vec) {
    return new Vector(this.x - vec.x, this.y - vec.y, this.z - vec.z);
  };
  Vector.prototype.div_14dthe$ = function (value) {
    return new Vector(this.x / value, this.y / value, this.z / value);
  };
  Vector.prototype.times_14dthe$ = function (value) {
    return new Vector(this.x * value, this.y * value, this.z * value);
  };
  Vector.prototype.times_spvnod$ = function (vec) {
    return new Vector(this.x * vec.x, this.y * vec.y, this.z * vec.z);
  };
  Vector.prototype.plus_spvnod$ = function (vec) {
    return new Vector(this.x + vec.x, this.y + vec.y, this.z + vec.z);
  };
  Vector.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Vector',
    interfaces: []
  };
  function Vector_init($this) {
    $this = $this || Object.create(Vector.prototype);
    Vector.call($this, 0.0, 0.0, 0.0);
    return $this;
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
  Object.defineProperty(_, 'spheres', {
    get: function () {
      return spheres;
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
  _.await_t11jrl$ = await_0;
  _.launch_g2bo5h$ = launch;
  _.main = main;
  _.shootRay_nmolro$ = shootRay;
  _.fillStyle_yvo9jy$ = fillStyle;
  _.fillStyle_qt1dr2$ = fillStyle_0;
  _.fillStyle_spvnod$ = fillStyle_1;
  Object.defineProperty(Material$Type, 'DIFFUSE', {
    get: Material$Type$DIFFUSE_getInstance
  });
  Object.defineProperty(Material$Type, 'LIGHT', {
    get: Material$Type$LIGHT_getInstance
  });
  Material.Type = Material$Type;
  _.Material = Material;
  _.Mesh = Mesh;
  _.Plane = Plane;
  _.Sphere = Sphere;
  _.SurfacePoint = SurfacePoint;
  Object.defineProperty(Vector, 'Companion', {
    get: Vector$Companion_getInstance
  });
  _.Vector_init = Vector_init;
  _.Vector = Vector;
  width = 1000;
  height = 600;
  spheres = listOf([new Sphere(3.0, -2.0, 0.0, 1.0, new Material(Vector_init(), new Vector(4.0, 4.0, 4.0), Material$Type$LIGHT_getInstance())), new Sphere(-1.0, 0.0, -1.5, 1.0, new Material(new Vector(1.0, 0.6, 0.1), Vector_init(), Material$Type$DIFFUSE_getInstance())), new Sphere(1.0, 0.5, -1.0, 0.5, new Material(new Vector(0.2, 0.5, 1.0), Vector_init(), Material$Type$DIFFUSE_getInstance())), new Plane(0.0, 1.0, 0.0, new Vector(0.0, -1.0, 0.0), new Material(new Vector(0.2, 0.5, 0.2), Vector_init(), Material$Type$DIFFUSE_getInstance()))]);
  var tmp$, tmp$_0;
  canvas = Kotlin.isType(tmp$ = document.getElementById('c'), HTMLCanvasElement) ? tmp$ : throwCCE();
  context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
  main(internal.EmptyContinuation, false);
  Kotlin.defineModule('raytracerkotlin', _);
  return _;
}(typeof raytracerkotlin === 'undefined' ? {} : raytracerkotlin, kotlin);
