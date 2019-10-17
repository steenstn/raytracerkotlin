import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.MessageEvent
import org.w3c.dom.Worker
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.round
import kotlin.random.Random
import kotlin.reflect.typeOf

val width = 500
val height = 300
/*
importScripts("https://steenstn.github.io/raytracerkotlin/out/production/raytracerkotlin/lib/kotlin.js")
 */

val canvas = document.getElementById("c") as HTMLCanvasElement
val context = canvas.getContext("2d") as CanvasRenderingContext2D

fun main() {
    canvas.width = width
    canvas.height = height
    val blackImage = arrayListOf<Double>()
    for(i in 0..width*height*3) {
        blackImage.add(0.0)
    }

    window.setTimeout({render(blackImage)}, 1)

}

fun render(image : List<Double>) {
    var worker = Worker("out/production/raytracerkotlin/raytracerkotlin.js")
    worker.postMessage(JSON.stringify(image))
    worker.addEventListener("message", {e ->
        run {
            val event = e as MessageEvent
            //println("message: " + event.data)
            //println(jsTypeOf(event.data))

            val imageString = (event.data as String)
            println("image from event in main thread")
            println(imageString)
            val imageList = imageString.substring(1,imageString.length-1).split(",")
            val doubleList = imageList.map { s -> s.toDouble() }
            //context.fillStyle = fillStyle(50+Random.nextInt(150),50+Random.nextInt(150),50+Random.nextInt(150))
            //context.fillRect(Random.nextDouble(450.0), Random.nextDouble(250.0),20.0,20.0)

            var index = 0
            for(y in 0..height) {
                for(x in 0..width) {
                    context.fillStyle = fillStyle(imageList[index].toDouble(), imageList[index+1].toDouble(), imageList[index+2].toDouble())
                    context.fillRect(x.toDouble(), y.toDouble(),1.0,1.0)
                    index+=3
                }
            }
            println("rendered")
            window.setTimeout({render(doubleList)}, 10)
        }
    })
}



fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}
