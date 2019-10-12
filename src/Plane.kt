class Plane(x : Double, y : Double, z : Double, val normal : Vector, val material: Material) : Mesh(x, y, z) {
    override fun getIntersection(start: Vector, direction: Vector): SurfacePoint? {
        val distance = (position-start).dot(normal)/direction.dot(normal)
        if(distance > 0.00001) {
            val endMovement = direction * distance
            val intersectionPoint = start + endMovement
            return SurfacePoint(intersectionPoint, normal, material)
        }
        return null
    }

}