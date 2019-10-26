import org.w3c.dom.DedicatedWorkerGlobalScope
import org.w3c.dom.MessageEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.*
import kotlin.random.Random

val width = 500
val height = 300

/*
Vänsterorienterat
x går höger
y går neråt
z går mot skärmen

*/

fun clamp(value : Double, min : Double, max : Double) : Double {
    return if(value > max) max else if (value < min) min else value
}
external val self: DedicatedWorkerGlobalScope
val spheres = listOf(
        //Sphere(3.0, -2.0, 15.0, 1.0, Material.light(100.0)),
        Sphere(7.5, -5.0, -2.0, 2.0, Material.light(20.0)),
        Sphere(-1.0, 0.0, -2.5, 1.0, Material(Vector(1.0,0.6,0.1).mixWhite(),Vector(), Material.Type.SPECULAR)),
        Sphere(1.0, 0.5, -1.0, 0.5, Material(Vector(0.2,0.5,1.0).mixWhite(), Vector(), Material.Type.DIFFUSE)),
        //Plane(15.0, 0.0, 0.0, Vector(-1.0,0.0,0.0), Material(Vector(0.25,0.53,0.2).mixWhite(), Vector(), Material.Type.DIFFUSE)),
        //Plane(-15.0, 0.0, 0.0, Vector(1.0,0.0,0.0), Material(Vector(0.12,0.15,0.12).mixWhite(), Vector(), Material.Type.DIFFUSE)),
        Plane(0.0, 1.0, 0.0, Vector(0.0,-1.0,0.0), Material(Vector(0.2,0.3,0.2).mixWhite(), Vector(), Material.Type.DIFFUSE))
       // Plane(0.0, -6.0, 0.0, Vector(0.0,1.0,0.0), Material(Vector(0.2,0.3,0.2).mixWhite(), Vector(), Material.Type.DIFFUSE)),
      //  Plane(0.0, 0.0, 15.0, Vector(0.0,0.0,-1.0), Material(Vector(0.25,0.3,0.2).mixWhite(), Vector(), Material.Type.DIFFUSE)),
     //   Plane(0.0, 0.0, -15.0, Vector(0.0,0.0,1.0), Material(Vector(0.25,0.3,0.2).mixWhite(), Vector(), Material.Type.DIFFUSE))

        )

val xmax = 5
val ymax = 5
val maxBounces = 10
var numBounces = 0
var endImage = arrayListOf<Double>()
var numPasses = 1
val DoF = 0.0
val focusLength = 7.0

 fun main() {
    println("Started webworker")
    for(i in 0 until width*height*3)
    {
        endImage.add(0.0)
    }
    self.addEventListener("message",  {
        println("worker got message!")
        raytrace()
    })
}

fun raytrace() {
    var index = 0
    for (screenY in 0 until height) {

        for (screenX in 0 until width) {
            var endColor = Vector()
            val x = (screenX * 6.0) / width - 3.0
            val y = (screenY * 6.0) * height / width / height - 3.0 * height / width
            val dir = Vector(x / xmax, (y-0) / ymax, -1.0).normalize()

            val s = Vector(0.0, -0.5, 7.0)

            val numRays = 10
            for (i in 0 until numRays) {
                numBounces = 0

                endColor += shootRay(s, dir)

            }

            endColor /= numRays.toDouble()
            endImage[index] += endColor.x
            endImage[index+1] += endColor.y
            endImage[index+2] += endColor.z

            index+=3

        }

        if (screenY % 50 == 0) {
            println(screenY)
        }
    }
    val imageToRender = endImage.map { clamp(it/numPasses, 0.0, 1.0) }
    numPasses++
    self.postMessage(JSON.stringify(imageToRender))

    println("posted message")

}


fun shootRay(start : Vector, direction : Vector) : Vector {
    if(numBounces++ > maxBounces) {
        return Vector()
    }
    val intersections = spheres.mapNotNull { it.getIntersection(start, direction) }
    val closestIntersection = intersections.minBy { (it.position-start).length() } ?: return Vector()

    if(closestIntersection.material.types.contains(Material.Type.LIGHT)) {
        return closestIntersection.material.emittance
    } else {
       // val explicitRay = explicitRay(closestIntersection)
        val randomVector = Vector.random()
        val crossed = randomVector.cross(closestIntersection.normal).normalize()
        val eps1 = Random.nextDouble()*3.14159*2.0
        val eps2 = sqrt(Random.nextDouble())

        val x = cos(eps1)*eps2
        val y = sin(eps1)*eps2
        val z = sqrt(1.0 - eps2*eps2)

        val tangent = closestIntersection.normal.cross(crossed)

        val newDirection = if(closestIntersection.material.types.contains(Material.Type.SPECULAR) && Random.nextDouble() > 0.4) {
            direction - closestIntersection.normal * 2.0 * (closestIntersection.normal.dot(direction))
        }
        else {
            crossed * x + tangent * y + closestIntersection.normal * z
        }

        val reflected = shootRay(closestIntersection.position, newDirection)
        return closestIntersection.material.color * reflected// + explicitRay
    }

}

fun explicitRay(surfacePoint :SurfacePoint) : Vector {
    val lights = spheres.filter { it.material.types.contains(Material.Type.LIGHT) }
    var lightValue = Vector()
    lights.forEach {
        val randomPointOnLight = it.getRandomPoint()
        val direction = randomPointOnLight.position - surfacePoint.position

        val intersections = spheres.mapNotNull { s -> s.getIntersection(surfacePoint.position, direction) }
        val closestIntersection = intersections.minBy { s -> (s.position-surfacePoint.position).length()}

        if(closestIntersection != null && closestIntersection.material.isLight()) {
            lightValue += (surfacePoint.material.color * surfacePoint.normal.dot(closestIntersection.normal))*-1.0
        }
    }
    return lightValue
}
