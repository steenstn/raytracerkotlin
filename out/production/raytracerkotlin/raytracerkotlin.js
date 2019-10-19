importScripts("https://steenstn.github.io/raytracerkotlin/out/production/raytracerkotlin/lib/kotlin.js")
if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'raytracerkotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'raytracerkotlin'.");
}
var raytracerkotlin = function (_, Kotlin) {
  'use strict';
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var Random = Kotlin.kotlin.random.Random;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var numberToInt = Kotlin.numberToInt;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  Material$Type.prototype = Object.create(Enum.prototype);
  Material$Type.prototype.constructor = Material$Type;
  Plane.prototype = Object.create(Mesh.prototype);
  Plane.prototype.constructor = Plane;
  Sphere.prototype = Object.create(Mesh.prototype);
  Sphere.prototype.constructor = Sphere;
  var width;
  var height;
  function clamp(value, min, max) {
    return value > max ? max : value < min ? min : value;
  }
  var spheres;
  var xmax;
  var ymax;
  var maxBounces;
  var numBounces;
  var endImage;
  var numPasses;
  function main$lambda(it) {
    println('worker got message!');
    raytrace();
    return Unit;
  }
  function main() {
    var tmp$;
    println('Started webworker');
    tmp$ = Kotlin.imul(width, height) * 3 | 0;
    for (var i = 0; i < tmp$; i++) {
      endImage.add_11rb$(0.0);
    }
    self.addEventListener('message', main$lambda);
  }
  function raytrace() {
    var tmp$, tmp$_0;
    var index = 0;
    tmp$ = height;
    for (var screenY = 0; screenY < tmp$; screenY++) {
      tmp$_0 = width;
      for (var screenX = 0; screenX < tmp$_0; screenX++) {
        var endColor = Vector_init();
        var x = screenX * 6.0 / width - 3.0;
        var y = screenY * 6.0 * height / width / height - 3.0 * height / width;
        var dir = (new Vector(x / xmax, y / ymax, -1.0)).normalize();
        var s = new Vector(0.0, 0.0, 7.0);
        var numRays = 100;
        for (var i = 0; i < numRays; i++) {
          endColor = endColor.plus_spvnod$(shootRay(s, dir));
        }
        endColor = endColor.div_14dthe$(numRays);
        endImage.set_wxm5ur$(index, endImage.get_za3lpa$(index) + endColor.x);
        endImage.set_wxm5ur$(index + 1 | 0, endImage.get_za3lpa$(index + 1 | 0) + endColor.y);
        endImage.set_wxm5ur$(index + 2 | 0, endImage.get_za3lpa$(index + 2 | 0) + endColor.z);
        index = index + 3 | 0;
      }
      if (screenY % 200 === 0) {
        println(screenY);
      }
    }
    var $receiver = endImage;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_1;
    tmp$_1 = $receiver.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination.add_11rb$(clamp(item / numPasses, 0.0, 1.0));
    }
    var imageToRender = destination;
    numPasses = numPasses + 1 | 0;
    self.postMessage(JSON.stringify(imageToRender));
    println('posted message');
  }
  function shootRay(start, direction) {
    var tmp$, tmp$_0;
    if ((tmp$ = numBounces, numBounces = tmp$ + 1 | 0, tmp$) > maxBounces) {
      return Vector_init();
    }
    var $receiver = spheres;
    var destination = ArrayList_init_0();
    var tmp$_1;
    tmp$_1 = $receiver.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      var tmp$_0_0;
      if ((tmp$_0_0 = element.getIntersection_nmolro$(start, direction)) != null) {
        destination.add_11rb$(tmp$_0_0);
      }
    }
    var intersections = destination;
    var minBy$result;
    minBy$break: do {
      var iterator = intersections.iterator();
      if (!iterator.hasNext()) {
        minBy$result = null;
        break minBy$break;
      }
      var minElem = iterator.next();
      if (!iterator.hasNext()) {
        minBy$result = minElem;
        break minBy$break;
      }
      var minValue = minElem.position.minus_spvnod$(start).length();
      do {
        var e = iterator.next();
        var v = e.position.minus_spvnod$(start).length();
        if (Kotlin.compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
       while (iterator.hasNext());
      minBy$result = minElem;
    }
     while (false);
    tmp$_0 = minBy$result;
    if (tmp$_0 == null) {
      return new Vector(0.0, 0.0, 0.0);
    }
    var closestIntersection = tmp$_0;
    if (closestIntersection.material.type === Material$Type$LIGHT_getInstance()) {
      return closestIntersection.material.emittance;
    }
     else {
      var randomVector = Vector$Companion_getInstance().random();
      var crossed = randomVector.cross_spvnod$(closestIntersection.normal).normalize();
      var eps1 = Random.Default.nextDouble() * 3.14159 * 2.0;
      var x = Random.Default.nextDouble();
      var eps2 = Math_0.sqrt(x);
      var x_0 = Math_0.cos(eps1) * eps2;
      var y = Math_0.sin(eps1) * eps2;
      var x_1 = 1.0 - eps2 * eps2;
      var z = Math_0.sqrt(x_1);
      var tangent = closestIntersection.normal.cross_spvnod$(crossed);
      var newDirection = crossed.times_14dthe$(x_0).plus_spvnod$(tangent.times_14dthe$(y)).plus_spvnod$(closestIntersection.normal.times_14dthe$(z));
      var reflected = shootRay(closestIntersection.position, newDirection);
      return closestIntersection.material.color.times_spvnod$(reflected);
    }
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
  _.clamp_yvo9jy$ = clamp;
  Object.defineProperty(_, 'spheres', {
    get: function () {
      return spheres;
    }
  });
  Object.defineProperty(_, 'xmax', {
    get: function () {
      return xmax;
    }
  });
  Object.defineProperty(_, 'ymax', {
    get: function () {
      return ymax;
    }
  });
  Object.defineProperty(_, 'maxBounces', {
    get: function () {
      return maxBounces;
    }
  });
  Object.defineProperty(_, 'numBounces', {
    get: function () {
      return numBounces;
    },
    set: function (value) {
      numBounces = value;
    }
  });
  Object.defineProperty(_, 'endImage', {
    get: function () {
      return endImage;
    },
    set: function (value) {
      endImage = value;
    }
  });
  Object.defineProperty(_, 'numPasses', {
    get: function () {
      return numPasses;
    },
    set: function (value) {
      numPasses = value;
    }
  });
  _.main = main;
  _.raytrace = raytrace;
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
  width = 500;
  height = 300;
  spheres = listOf([new Sphere(3.0, -2.0, 0.0, 1.0, new Material(Vector_init(), new Vector(40.0, 40.0, 40.0), Material$Type$LIGHT_getInstance())), new Sphere(-1.0, 0.0, -1.5, 1.0, new Material(new Vector(1.0, 0.6, 0.1), Vector_init(), Material$Type$DIFFUSE_getInstance())), new Sphere(1.0, 0.5, -1.0, 0.5, new Material(new Vector(0.2, 0.5, 1.0), Vector_init(), Material$Type$DIFFUSE_getInstance())), new Plane(0.0, 1.0, 0.0, new Vector(0.0, -1.0, 0.0), new Material(new Vector(0.2, 0.5, 0.2), Vector_init(), Material$Type$DIFFUSE_getInstance()))]);
  xmax = 5;
  ymax = 5;
  maxBounces = 20;
  numBounces = 0;
  endImage = ArrayList_init_0();
  numPasses = 1;
  main();
  Kotlin.defineModule('raytracerkotlin', _);
  return _;
}(typeof raytracerkotlin === 'undefined' ? {} : raytracerkotlin, kotlin);
