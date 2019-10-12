import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.Worker
import kotlin.browser.document
import kotlin.math.round

val width = 1000
val height = 600

val canvas = document.getElementById("c") as HTMLCanvasElement
val context = canvas.getContext("2d") as CanvasRenderingContext2D

fun main() {

    canvas.width = width
    canvas.height = height

    val worker = Worker("out/production/raytracerkotlin/raytracerkotlin.js")
    worker.onmessage = {e -> {

        println("image " + e.data)

        /*for(i in 0..width*height*3) {

                context.fillStyle = fillStyle(endColor)
                context.fillRect(i.toDouble()%width,i.toDouble(),1.0,1.0)

        }*/
    }}
}

fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}
