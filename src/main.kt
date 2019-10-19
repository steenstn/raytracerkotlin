import org.w3c.dom.DedicatedWorkerGlobalScope
import org.w3c.dom.MessageEvent
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.cos
import kotlin.math.round
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.random.Random

val width = 500
val height = 300

/*
Vänsterorienterat
x går höger
y går neråt
z går mot skärmen

*/
external val self: DedicatedWorkerGlobalScope
val spheres = listOf(
        Sphere(3.0, -2.0, 0.0, 1.0, Material(Vector(), Vector(4.0,4.0,4.0), Material.Type.LIGHT)),
        Sphere(-1.0, 0.0, -1.5, 1.0, Material(Vector(1.0,0.6,0.1),Vector(), Material.Type.DIFFUSE)),
        Sphere(1.0, 0.5, -1.0, 0.5, Material(Vector(0.2,0.5,1.0), Vector(), Material.Type.DIFFUSE)),
        Plane(0.0, 1.0, 0.0, Vector(0.0,-1.0,0.0), Material(Vector(0.2,0.5,0.2), Vector(), Material.Type.DIFFUSE))
        )

//val canvas = document.getElementById("c") as HTMLCanvasElement
//val context = canvas.getContext("2d") as CanvasRenderingContext2D
val xmax = 5
val ymax = 5
var endColor = Vector()
var endImage = DoubleArray(width*height*3) {0.0}

 fun main() {
     println("Started webworker")

     self.addEventListener("message",  {
         println("worker got message!")
         raytrace()
     })
}

fun raytrace() {
    var index = 0
    for (screenY in 0..height) {

        for (screenX in 0..width) {
            val x = (screenX * 6.0) / width - 3.0
            val y = (screenY * 6.0) * height / width / height - 3.0 * height / width
            val dir = Vector(x / xmax, y / ymax, -1.0).normalize()

            val s = Vector(0.0, 0.0, 7.0)

            val numRays = 10
            for (i in 0..numRays) {
                endColor += shootRay(s, dir)
            }

            endColor /= numRays.toDouble()
            endImage[index++] = endColor.x// + image[index])
            endImage[index++] = endColor.y// + image[index])
            endImage[index++] = endColor.z// + image[index])


        }

        if (screenY % 200 == 0) {
            println(screenY)
        }
    }
    self.postMessage(JSON.stringify(endImage))

    println("posted message")


}

fun wait() {
    self.setTimeout({wait()}, 500)
}


 fun shootRay(start : Vector, direction : Vector) : Vector {

    for(sphere in spheres) {

        sphere.getIntersection(start, direction)?.let {
            if(it.material.type == Material.Type.LIGHT) {
                return it.material.emittance
            } else {
                val randomVector = Vector.random()
                val crossed = randomVector.cross(it.normal).normalize()
                val eps1 = Random.nextDouble()*3.14159*2.0
                val eps2 = sqrt(Random.nextDouble())

                val x = cos(eps1)*eps2
                val y = sin(eps1)*eps2
                val z = sqrt(1.0 - eps2*eps2)

                val tangent = it.normal.cross(crossed)

                val newDirection = crossed * x + tangent * y + it.normal * z
                val reflected = shootRay(it.position, newDirection)
                return it.material.color * reflected
            }
        }
    }
    return Vector(0.0,0.0,0.0)
}
fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}

fun fillStyle(color : Vector) : String {
    val r = (color.x*255).toInt()
    val g = (color.y*255).toInt()
    val b = (color.z*255).toInt()

    return "rgb($r, $g, $b)"
}