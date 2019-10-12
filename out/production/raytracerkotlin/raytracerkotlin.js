importScripts("https://steenstn.github.io/raytracerkotlin/out/production/raytracerkotlin/lib/kotlin.js")
importScripts("https://steenstn.github.io/raytracerkotlin/out/production/raytracerkotlin/raytracerkotlin.js")

if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'raytracerkotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'raytracerkotlin'.");
}
var raytracerkotlin = function (_, Kotlin) {
  'use strict';
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var Math_0 = Math;
  var Random = Kotlin.kotlin.random.Random;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  Material$Type.prototype = Object.create(Enum.prototype);
  Material$Type.prototype.constructor = Material$Type;
  Plane.prototype = Object.create(Mesh.prototype);
  Plane.prototype.constructor = Plane;
  Sphere.prototype = Object.create(Mesh.prototype);
  Sphere.prototype.constructor = Sphere;
  var width;
  var height;
  var spheres;
  function main() {
    println('Started webworker');
    var xmax = 5;
    var ymax = 5;
    var endColor = Vector_init();
    var endImage = new Float64Array(Kotlin.imul(width, height) * 3 | 0);
    var index = 0;
    self.postMessage('endImage');
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
  _.main = main;
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
  main();
  Kotlin.defineModule('raytracerkotlin', _);
  return _;
}(typeof raytracerkotlin === 'undefined' ? {} : raytracerkotlin, kotlin);
