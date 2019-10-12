import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.Worker
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.round

val width = 1000
val height = 600
/*
importScripts("https://steenstn.github.io/raytracerkotlin/out/production/raytracerkotlin/lib/kotlin.js")
 */

val canvas = document.getElementById("c") as HTMLCanvasElement
val context = canvas.getContext("2d") as CanvasRenderingContext2D

fun main() {

    canvas.width = width
    canvas.height = height

    val worker = Worker("out/production/raytracerkotlin/raytracerkotlin.js")
    worker.onerror = {e -> println(JSON.stringify(e))}
    worker.onmessage = {e -> {
        println(e.data)
    }}
    println(JSON.stringify(worker))
}
fun waitMethod() {
    println("waiting")
    window.setTimeout({waitMethod()}, 1000)
}
fun fillStyle(r: Double, g: Double, b: Double) : String {
    return fillStyle(round(r*255).toInt(), round(g*255).toInt(), round(b*255).toInt())
}

fun fillStyle(r: Int, g: Int, b: Int) : String {
    return "rgb($r, $g, $b)"
}
