importScripts("lib/kotlin.js")
if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'raytracerkotlin'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'raytracerkotlin'.");
}
var raytracerkotlin = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var Random = Kotlin.kotlin.random.Random;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwISE = Kotlin.throwISE;
  var setOf = Kotlin.kotlin.collections.setOf_mh5how$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var setOf_0 = Kotlin.kotlin.collections.setOf_i5x0yv$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var min = Kotlin.kotlin.collections.min_l63kqw$;
  var math = Kotlin.kotlin.math;
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
  var scene;
  var xmax;
  var ymax;
  var maxBounces;
  var numBounces;
  var endImage;
  var numPasses;
  var DoF;
  var focusLength;
  var numRays;
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
    var tmp$, tmp$_0, tmp$_1;
    var index = 0;
    tmp$ = height;
    for (var screenY = 0; screenY < tmp$; screenY++) {
      tmp$_0 = width;
      for (var screenX = 0; screenX < tmp$_0; screenX++) {
        var endColor = Vector_init();
        var x = screenX * 6.0 / width - 3.0;
        var y = screenY * 6.0 * height / width / height - 3.0 * height / width;
        var dir = (new Vector((x + scene.cameraDirection.x) / xmax, (y + scene.cameraDirection.y) / ymax, scene.cameraDirection.z)).normalize();
        var s = scene.cameraPosition;
        tmp$_1 = numRays;
        for (var i = 0; i < tmp$_1; i++) {
          numBounces = 0;
          var s2 = s.plus_spvnod$(Vector$Companion_getInstance().random().times_14dthe$(DoF));
          var position2 = s.plus_spvnod$(dir.times_14dthe$(focusLength));
          var dir2 = position2.minus_spvnod$(s2);
          endColor = endColor.plus_spvnod$(shootRay(s2, dir2.normalize()));
        }
        endColor = endColor.div_14dthe$(numRays);
        endImage.set_wxm5ur$(index, endImage.get_za3lpa$(index) + endColor.x);
        endImage.set_wxm5ur$(index + 1 | 0, endImage.get_za3lpa$(index + 1 | 0) + endColor.y);
        endImage.set_wxm5ur$(index + 2 | 0, endImage.get_za3lpa$(index + 2 | 0) + endColor.z);
        index = index + 3 | 0;
      }
      if (screenY % 50 === 0) {
        println(screenY);
      }
    }
    var $receiver = endImage;
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_2;
    tmp$_2 = $receiver.iterator();
    while (tmp$_2.hasNext()) {
      var item = tmp$_2.next();
      destination.add_11rb$(clamp(item / numPasses, 0.0, 1.0));
    }
    var imageToRender = destination;
    numPasses = numPasses + 1 | 0;
    self.postMessage(JSON.stringify(imageToRender));
    println('posted message');
  }
  function shootRay(start, direction) {
    var tmp$, tmp$_0, tmp$_1;
    if ((tmp$ = numBounces, numBounces = tmp$ + 1 | 0, tmp$) > maxBounces) {
      return Vector_init();
    }
    var $receiver = scene.meshes;
    var destination = ArrayList_init_0();
    var tmp$_2;
    tmp$_2 = $receiver.iterator();
    while (tmp$_2.hasNext()) {
      var element = tmp$_2.next();
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
      return scene.ambientColor;
    }
    var closestIntersection = tmp$_0;
    if (closestIntersection.material.types.contains_11rb$(Material$Type$LIGHT_getInstance())) {
      return closestIntersection.material.emittance;
    }
     else if (closestIntersection.material.types.contains_11rb$(Material$Type$GLASS_getInstance()) && Random.Default.nextDouble() > 0.1) {
      return shootRefractedRay(closestIntersection.position, direction, closestIntersection, 1.0);
    }
     else {
      var explicitRay_0 = explicitRay(closestIntersection);
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
      if (closestIntersection.material.types.contains_11rb$(Material$Type$SPECULAR_getInstance()) && Random.Default.nextDouble() > 0.4) {
        tmp$_1 = direction.minus_spvnod$(closestIntersection.normal.times_14dthe$(2.0).times_14dthe$(closestIntersection.normal.dot_spvnod$(direction)));
      }
       else {
        tmp$_1 = crossed.times_14dthe$(x_0).plus_spvnod$(tangent.times_14dthe$(y)).plus_spvnod$(closestIntersection.normal.times_14dthe$(z));
      }
      var newDirection = tmp$_1;
      var reflected = shootRay(closestIntersection.position, newDirection.normalize());
      return closestIntersection.material.color.times_spvnod$(reflected);
    }
  }
  function explicitRay(surfacePoint) {
    var $receiver = scene.meshes;
    var destination = ArrayList_init_0();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.material.isLight())
        destination.add_11rb$(element);
    }
    var lights = destination;
    var lightValue = {v: Vector_init()};
    var tmp$_0;
    tmp$_0 = lights.iterator();
    loop_label: while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      var randomPointOnLight = element_0.getRandomPoint();
      var direction = randomPointOnLight.position.minus_spvnod$(surfacePoint.position).normalize();
      var $receiver_0 = scene.meshes;
      var destination_0 = ArrayList_init_0();
      var tmp$_1;
      tmp$_1 = $receiver_0.iterator();
      while (tmp$_1.hasNext()) {
        var element_1 = tmp$_1.next();
        var tmp$_0_0;
        if ((tmp$_0_0 = element_1.getIntersection_nmolro$(surfacePoint.position, direction)) != null) {
          destination_0.add_11rb$(tmp$_0_0);
        }
      }
      var intersections = destination_0;
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
        var minValue = minElem.position.minus_spvnod$(surfacePoint.position).length();
        do {
          var e = iterator.next();
          var v = e.position.minus_spvnod$(surfacePoint.position).length();
          if (Kotlin.compareTo(minValue, v) > 0) {
            minElem = e;
            minValue = v;
          }
        }
         while (iterator.hasNext());
        minBy$result = minElem;
      }
       while (false);
      var closestIntersection = minBy$result;
      if (closestIntersection != null && closestIntersection.material.isLight()) {
        lightValue.v = lightValue.v.plus_spvnod$(surfacePoint.material.color.times_14dthe$(surfacePoint.normal.dot_spvnod$(direction)));
      }
    }
    return lightValue.v;
  }
  function shootRefractedRay(start, direction, surfacePoint, refractionIndex) {
    var tmp$;
    var refractionIndex2 = 1.5;
    var n = refractionIndex / refractionIndex2;
    var cosI = surfacePoint.normal.dot_spvnod$(direction);
    var sinT2 = n * n * (1.0 - cosI * cosI);
    var tmp$_0 = direction.times_14dthe$(n);
    var tmp$_1 = surfacePoint.normal;
    var tmp$_2 = n * cosI;
    var x = 1.0 - sinT2;
    var refracted = tmp$_0.plus_spvnod$(tmp$_1.times_14dthe$(tmp$_2 - Math_0.sqrt(x)));
    var newDirection = refracted.normalize();
    var newStart = start.plus_spvnod$(direction.times_14dthe$(1.0E-4));
    var $receiver = scene.meshes;
    var destination = ArrayList_init_0();
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var element = tmp$_3.next();
      var tmp$_0_0;
      if ((tmp$_0_0 = element.getIntersection_nmolro$(newStart, newDirection)) != null) {
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
      var minValue = minElem.position.minus_spvnod$(newStart).length();
      do {
        var e = iterator.next();
        var v = e.position.minus_spvnod$(newStart).length();
        if (Kotlin.compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
       while (iterator.hasNext());
      minBy$result = minElem;
    }
     while (false);
    tmp$ = minBy$result;
    if (tmp$ == null) {
      return Vector_init();
    }
    var closestIntersection = tmp$;
    var normalOut = closestIntersection.normal.times_14dthe$(-1.0);
    var cosOut = normalOut.dot_spvnod$(direction);
    var sinT2Out = n * n * (1.0 - cosOut * cosOut);
    var tmp$_4 = direction.times_14dthe$(n);
    var tmp$_5 = n * cosOut;
    var x_0 = 1.0 - sinT2Out;
    var refractedOut = tmp$_4.plus_spvnod$(normalOut.times_14dthe$(tmp$_5 - Math_0.sqrt(x_0)));
    var directionOut = refractedOut.normalize();
    if (sinT2Out > 1) {
      return Vector_init();
    }
     else {
      return shootRay(closestIntersection.position.plus_spvnod$(directionOut.times_14dthe$(1.0E-4)), directionOut);
    }
  }
  function Material(color, emittance, types) {
    Material$Companion_getInstance();
    this.color = color;
    this.emittance = emittance;
    this.types = types;
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
    Material$Type$SPECULAR_instance = new Material$Type('SPECULAR', 2);
    Material$Type$GLASS_instance = new Material$Type('GLASS', 3);
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
  var Material$Type$SPECULAR_instance;
  function Material$Type$SPECULAR_getInstance() {
    Material$Type_initFields();
    return Material$Type$SPECULAR_instance;
  }
  var Material$Type$GLASS_instance;
  function Material$Type$GLASS_getInstance() {
    Material$Type_initFields();
    return Material$Type$GLASS_instance;
  }
  Material$Type.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Type',
    interfaces: [Enum]
  };
  function Material$Type$values() {
    return [Material$Type$DIFFUSE_getInstance(), Material$Type$LIGHT_getInstance(), Material$Type$SPECULAR_getInstance(), Material$Type$GLASS_getInstance()];
  }
  Material$Type.values = Material$Type$values;
  function Material$Type$valueOf(name) {
    switch (name) {
      case 'DIFFUSE':
        return Material$Type$DIFFUSE_getInstance();
      case 'LIGHT':
        return Material$Type$LIGHT_getInstance();
      case 'SPECULAR':
        return Material$Type$SPECULAR_getInstance();
      case 'GLASS':
        return Material$Type$GLASS_getInstance();
      default:throwISE('No enum constant Material.Type.' + name);
    }
  }
  Material$Type.valueOf_61zpoe$ = Material$Type$valueOf;
  function Material$Companion() {
    Material$Companion_instance = this;
  }
  Material$Companion.prototype.light_yvo9jy$ = function (r, g, b) {
    return new Material(new Vector(1.0, 1.0, 1.0), new Vector(r, g, b), setOf(Material$Type$LIGHT_getInstance()));
  };
  Material$Companion.prototype.light_14dthe$ = function (rgb) {
    return this.light_yvo9jy$(rgb, rgb, rgb);
  };
  Material$Companion.prototype.diffuse_yvo9jy$ = function (r, g, b) {
    return Material_init((new Vector(r, g, b)).mixWhite(), Vector_init(), Material$Type$DIFFUSE_getInstance());
  };
  Material$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Material$Companion_instance = null;
  function Material$Companion_getInstance() {
    if (Material$Companion_instance === null) {
      new Material$Companion();
    }
    return Material$Companion_instance;
  }
  Material.prototype.isLight = function () {
    return this.types.contains_11rb$(Material$Type$LIGHT_getInstance());
  };
  Material.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Material',
    interfaces: []
  };
  function Material_init(color, emittance, type, $this) {
    $this = $this || Object.create(Material.prototype);
    Material.call($this, color, emittance, setOf(type));
    return $this;
  }
  function Mesh(x, y, z, material) {
    this.material = material;
    this.position = new Vector(x, y, z);
  }
  Mesh.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Mesh',
    interfaces: []
  };
  function Plane(x, y, z, normal, material) {
    Mesh.call(this, x, y, z, material);
    this.normal = normal;
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
  Plane.prototype.getRandomPoint = function () {
    return new SurfacePoint(this.position, this.normal, this.material);
  };
  Plane.prototype.getArea = function () {
    return 1.0;
  };
  Plane.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Plane',
    interfaces: [Mesh]
  };
  function Scene(meshes, cameraPosition, cameraDirection, ambientColor) {
    this.meshes = meshes;
    this.cameraPosition = cameraPosition;
    this.cameraDirection = cameraDirection;
    this.ambientColor = ambientColor;
  }
  Scene.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Scene',
    interfaces: []
  };
  function SceneCreator() {
    SceneCreator$Companion_getInstance();
  }
  function SceneCreator$Companion() {
    SceneCreator$Companion_instance = this;
  }
  SceneCreator$Companion.prototype.standardScene = function () {
    var cameraPostion = new Vector(0.0, -2.0, 8.0);
    var cameraDirection = new Vector(0.0, 0.5, -1.0);
    var meshes = listOf([new Sphere(-4.5, -5.0, 3.0, 2.0, Material$Companion_getInstance().light_14dthe$(5.0)), new Sphere(-2.0, -1.0, -3.0, 2.0, Material_init((new Vector(1.0, 0.6, 0.1)).mixWhite(), Vector_init(), Material$Type$SPECULAR_getInstance())), new Sphere(1.0, 0.0, 0.8, 1.0, new Material((new Vector(0.2, 0.5, 1.0)).mixWhite(), Vector_init(), setOf_0([Material$Type$GLASS_getInstance(), Material$Type$SPECULAR_getInstance()]))), new Sphere(3.0, -2.0, -3.0, 3.0, Material_init((new Vector(0.8, 0.2, 0.2)).mixWhite(), Vector_init(), Material$Type$DIFFUSE_getInstance())), new Plane(0.0, 1.0, 0.0, new Vector(0.0, -1.0, 0.0), Material_init((new Vector(0.2, 0.3, 0.2)).mixWhite(), Vector_init(), Material$Type$DIFFUSE_getInstance())), new Plane(0.0, -1000.0, 0.0, new Vector(0.0, 1.0, 0.0), Material$Companion_getInstance().light_yvo9jy$(0.9, 0.9, 1.0))]);
    return new Scene(meshes, cameraPostion, cameraDirection, Vector_init());
  };
  SceneCreator$Companion.prototype.molecule = function () {
    var cameraPostion = new Vector(0.0, -0.5, 30.0);
    var cameraDirection = new Vector(0.0, 0.0, -1.0);
    var spheres = mutableListOf([new Sphere(0.0, 0.0, 0.0, 1.0, Material$Companion_getInstance().diffuse_yvo9jy$(0.2, 0.3, 1.0))]);
    var position = Vector_init();
    for (var i = 0; i <= 200; i++) {
      var newDir = Vector$Companion_getInstance().random().normalize().times_14dthe$(1.1);
      position = position.plus_spvnod$(newDir);
      var color = Random.Default.nextDouble() > 0.7 ? new Vector(1.0, 0.2, 0.33) : new Vector(0.65, 1.2, 0.64);
      spheres.add_11rb$(new Sphere(position.x, position.y, position.z, 1.0, Material$Companion_getInstance().diffuse_yvo9jy$(color.x, color.y, color.z)));
    }
    return new Scene(spheres, cameraPostion, cameraDirection, new Vector(1.0, 1.0, 1.0));
  };
  SceneCreator$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var SceneCreator$Companion_instance = null;
  function SceneCreator$Companion_getInstance() {
    if (SceneCreator$Companion_instance === null) {
      new SceneCreator$Companion();
    }
    return SceneCreator$Companion_instance;
  }
  SceneCreator.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SceneCreator',
    interfaces: []
  };
  function Sphere(x, y, z, radius, material) {
    Mesh.call(this, x, y, z, material);
    this.radius = radius;
  }
  Sphere.prototype.getIntersection_nmolro$ = function (start, direction) {
    var tmp$;
    var center = this.position;
    var v = start.minus_spvnod$(center);
    var wee = v.dot_spvnod$(direction) * v.dot_spvnod$(direction) - (v.x * v.x + v.y * v.y + v.z * v.z - this.radius * this.radius);
    if (wee > 0) {
      var intersectionDistance = [v.dot_spvnod$(direction) * -1 + Math_0.sqrt(wee), v.dot_spvnod$(direction) * -1 - Math_0.sqrt(wee)];
      var destination = ArrayList_init_0();
      var tmp$_0;
      for (tmp$_0 = 0; tmp$_0 !== intersectionDistance.length; ++tmp$_0) {
        var element = intersectionDistance[tmp$_0];
        if (element > 1.0E-5)
          destination.add_11rb$(element);
      }
      var intersectionsInDirection = destination;
      tmp$ = min(intersectionsInDirection);
      if (tmp$ == null) {
        return null;
      }
      var closestIntersection = tmp$;
      var endDistance = direction.times_14dthe$(closestIntersection);
      var endPosition = start.plus_spvnod$(endDistance);
      return new SurfacePoint(endPosition, this.getNormal_spvnod$(endPosition), this.material);
    }
    return null;
  };
  Sphere.prototype.getNormal_spvnod$ = function (pos) {
    return pos.minus_spvnod$(this.position).normalize();
  };
  Sphere.prototype.getRandomPoint = function () {
    var randomPoint = Vector$Companion_getInstance().random().normalize().times_14dthe$(this.radius).plus_spvnod$(this.position);
    return new SurfacePoint(randomPoint, this.getNormal_spvnod$(randomPoint), this.material);
  };
  Sphere.prototype.getArea = function () {
    return 4 * math.PI * this.radius * this.radius;
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
  Vector.prototype.mixWhite = function () {
    return new Vector((this.x + 1.0) / 2.0, (this.y + 1.0) / 2.0, (this.z + 1.0) / 2);
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
  Object.defineProperty(_, 'scene', {
    get: function () {
      return scene;
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
  Object.defineProperty(_, 'DoF', {
    get: function () {
      return DoF;
    }
  });
  Object.defineProperty(_, 'focusLength', {
    get: function () {
      return focusLength;
    }
  });
  Object.defineProperty(_, 'numRays', {
    get: function () {
      return numRays;
    }
  });
  _.main = main;
  _.raytrace = raytrace;
  _.shootRay_nmolro$ = shootRay;
  _.explicitRay_69qewt$ = explicitRay;
  _.shootRefractedRay_jrus1h$ = shootRefractedRay;
  Object.defineProperty(Material$Type, 'DIFFUSE', {
    get: Material$Type$DIFFUSE_getInstance
  });
  Object.defineProperty(Material$Type, 'LIGHT', {
    get: Material$Type$LIGHT_getInstance
  });
  Object.defineProperty(Material$Type, 'SPECULAR', {
    get: Material$Type$SPECULAR_getInstance
  });
  Object.defineProperty(Material$Type, 'GLASS', {
    get: Material$Type$GLASS_getInstance
  });
  Material.Type = Material$Type;
  Object.defineProperty(Material, 'Companion', {
    get: Material$Companion_getInstance
  });
  _.Material_init_rzjqkf$ = Material_init;
  _.Material = Material;
  _.Mesh = Mesh;
  _.Plane = Plane;
  _.Scene = Scene;
  Object.defineProperty(SceneCreator, 'Companion', {
    get: SceneCreator$Companion_getInstance
  });
  _.SceneCreator = SceneCreator;
  _.Sphere = Sphere;
  _.SurfacePoint = SurfacePoint;
  Object.defineProperty(Vector, 'Companion', {
    get: Vector$Companion_getInstance
  });
  _.Vector_init = Vector_init;
  _.Vector = Vector;
  width = 800;
  height = 500;
  scene = SceneCreator$Companion_getInstance().standardScene();
  xmax = 5;
  ymax = 5;
  maxBounces = 10;
  numBounces = 0;
  endImage = ArrayList_init_0();
  numPasses = 1;
  DoF = 0.1;
  focusLength = 7.0;
  numRays = 1;
  main();
  Kotlin.defineModule('raytracerkotlin', _);
  return _;
}(typeof raytracerkotlin === 'undefined' ? {} : raytracerkotlin, kotlin);
