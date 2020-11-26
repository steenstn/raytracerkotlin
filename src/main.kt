import org.w3c.dom.DedicatedWorkerGlobalScope
import org.w3c.dom.MessageEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.*
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

val scene = SceneCreator.standardScene()

val xmax = 5
val ymax = 5
val maxBounces = 10
var numBounces = 0
var endImage = arrayListOf<Double>()
var numPasses = 1
val DoF = 0.1
val focusLength = 7.0
val numRays = 1

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
            val dir = Vector((x+scene.cameraDirection.x) / xmax, (y+scene.cameraDirection.y) / ymax, scene.cameraDirection.z).normalize()

            val s = scene.cameraPosition

            for (i in 0 until numRays) {
                numBounces = 0
                val s2 = s + Vector.random()*DoF
                val position2 = s + dir*focusLength
                val dir2 = position2 - s2
                endColor += shootRay(s2, dir2.normalize())

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
    val intersections = scene.meshes.mapNotNull { it.getIntersection(start, direction) }
    val closestIntersection = intersections.minBy { (it.position-start).length() } ?: return scene.ambientColor

    if(closestIntersection.material.types.contains(Material.Type.LIGHT)) {
        return closestIntersection.material.emittance
    }  else if(closestIntersection.material.types.contains(Material.Type.GLASS) && Random.nextDouble() > 0.1) {
        return shootRefractedRay(closestIntersection.position, direction, closestIntersection, 1.0)
    } else {
        val explicitRay = explicitRay(closestIntersection)
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

        val reflected = shootRay(closestIntersection.position, newDirection.normalize())
        return closestIntersection.material.color * (reflected ) //explicitRay
    }

}

fun explicitRay(surfacePoint :SurfacePoint) : Vector {
    val lights = scene.meshes.filter { it.material.isLight() }
    var lightValue = Vector()
    lights.forEach {
        val randomPointOnLight = it.getRandomPoint()
        val direction = (randomPointOnLight.position - surfacePoint.position).normalize()

        val intersections = scene.meshes.mapNotNull { s -> s.getIntersection(surfacePoint.position, direction) }
        val closestIntersection = intersections.minBy { s -> (s.position-surfacePoint.position).length()}

        if(closestIntersection != null && closestIntersection.material.isLight()) {

            lightValue += (surfacePoint.material.color * surfacePoint.normal.dot(direction))
        }
    }
    return lightValue
}

fun shootRefractedRay(start: Vector, direction: Vector, surfacePoint: SurfacePoint, refractionIndex : Double) : Vector {
    val refractionIndex2 = 1.5

    val n = refractionIndex / refractionIndex2
    val cosI = surfacePoint.normal.dot(direction)
    val sinT2 = n * n * (1.0 - cosI*cosI)

    val refracted = direction*n + surfacePoint.normal*(n*cosI- sqrt(1.0-sinT2))

    val newDirection = refracted.normalize()
    val newStart = start + direction*0.0001

    val intersections = scene.meshes.mapNotNull { s -> s.getIntersection(newStart, newDirection) }
    val closestIntersection = intersections.minBy { s -> (s.position-newStart).length()}?: return Vector()
    val normalOut = closestIntersection.normal*-1.0

    val cosOut = normalOut.dot(direction)
    val sinT2Out = n*n * (1.0-cosOut*cosOut)
    val refractedOut = direction * n + normalOut*(n*cosOut-sqrt(1.0-sinT2Out))
    val directionOut = refractedOut.normalize()
    if(sinT2Out > 1) {
        return Vector()
    } else {
        return shootRay(closestIntersection.position+directionOut*0.0001, directionOut)
    }



}