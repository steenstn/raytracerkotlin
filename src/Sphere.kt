import kotlin.math.min
import kotlin.math.sqrt

class Sphere(x: Double, y: Double, z: Double, val radius : Double, val material : Material) : Mesh(x, y, z) {

    override fun getIntersection(start: Vector, direction: Vector): SurfacePoint? {
        val center  = this.position
        val v = start - center

        val wee=(v.dot(direction))*(v.dot(direction))-(v.x*v.x+v.y*v.y+v.z*v.z-this.radius*this.radius)
        if(wee > 0) {
            val intersectionDistance = arrayOf(v.dot(direction)*-1+sqrt(wee),
                                            v.dot(direction)*-1-sqrt(wee))

            val closestIntersection = min(intersectionDistance[0],intersectionDistance[1])
            if(closestIntersection < 0.00001) return null

            val endDistance = direction * closestIntersection
            val endPosition = start + endDistance

            return SurfacePoint(endPosition, getNormal(endPosition), this.material)
        }
        return null
    }

    fun getNormal(pos: Vector) : Vector {
        return pos.minus(position).normalize()
    }


}