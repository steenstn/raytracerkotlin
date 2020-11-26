import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.MessageEvent
import org.w3c.dom.Worker
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.round
import kotlin.random.Random
import kotlin.reflect.typeOf

val width = 800
val height = 500
/*

importScripts("lib/kotlin.js")

 */

val canvas = document.getElementById("c") as HTMLCanvasElement
val context = canvas.getContext("2d") as CanvasRenderingContext2D
var worker : Worker? = null
fun main() {
    canvas.width = width
    canvas.height = height
    val blackImage = arrayListOf<Double>()
    for(i in 0..width*height*3) {
        blackImage.add(0.0)
    }

    worker = Worker("out/production/raytracerkotlin/raytracerkotlin.js")
    worker!!.postMessage("start")
    worker!!.addEventListener("message", {e -> render(e)})

}

fun render(e: Event) {

    val event = e as MessageEvent

    val imageString = (event.data as String)
    val imageList = imageString.substring(1,imageString.length-1).split(",")
    val doubleList = imageList.map { s -> s.toDouble() }


    var index = 0
    for(y in 0 until height) {
        for(x in 0 until width) {
            context.fillStyle = fillStyle(doubleList[index], doubleList[index+1], doubleList[index+2])
            context.fillRect(x.toDouble(), y.toDouble(),1.0,1.0)
            index+=3
        }
    }
    println("rendered")
    worker!!.postMessage("start")


}



fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}
