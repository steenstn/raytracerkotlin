import org.w3c.dom.DedicatedWorkerGlobalScope
import org.w3c.dom.MessageEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.cos
import kotlin.math.round
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.random.Random

val width = 800
val height = 500

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
        Sphere(3.0, -2.0, 0.0, 1.0, Material.light(40.0, 40.0, 40.0)),
        Sphere(-1.0, 0.0, -2.5, 1.0, Material(Vector(1.0,0.6,0.1),Vector(), Material.Type.SPECULAR)),
        Sphere(1.0, 0.5, -1.0, 0.5, Material(Vector(0.2,0.5,1.0), Vector(), Material.Type.DIFFUSE)),
        Plane(0.0, 1.0, 0.0, Vector(0.0,-1.0,0.0), Material(Vector(0.2,0.5,0.2), Vector(), Material.Type.DIFFUSE))
        )

val xmax = 5
val ymax = 5
val maxBounces = 50
var numBounces = 0
var endImage = arrayListOf<Double>()
var numPasses = 1

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
            val dir = Vector(x / xmax, y / ymax, -1.0).normalize()

            val s = Vector(0.0, -0.5, 7.0)

            val numRays = 100
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

        if (screenY % 200 == 0) {
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
    val closestIntersection = intersections.minBy { (it.position-start).length() } ?: return Vector(0.50,0.50,0.80)

    if(closestIntersection.material.types.contains(Material.Type.LIGHT)) {
        return closestIntersection.material.emittance
    } else {
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
        return closestIntersection.material.color * reflected
    }

}
