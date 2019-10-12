 class Material(val color: Vector, val emittance: Vector, val type : Type) {

     enum class Type {
        DIFFUSE, LIGHT
     }
}