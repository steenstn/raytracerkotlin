abstract class Mesh(x: Double, y: Double, z: Double) {
    val position : Vector = Vector(x, y, z)

    abstract fun getIntersection(start : Vector, direction: Vector) : SurfacePoint?
}