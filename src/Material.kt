 class Material(val color: Vector, val emittance: Vector, val types : Set<Type>) {
     constructor(color: Vector, emittance: Vector, type: Type) : this(color, emittance, setOf(type))

     enum class Type {
        DIFFUSE, LIGHT, SPECULAR
     }

     companion object {
         fun light(r : Double, g: Double, b: Double) : Material{
             return Material(Vector(1.0, 1.0, 1.0), Vector(r, g, b), setOf(Type.LIGHT))
         }

         fun light(rgb : Double) : Material {
             return light(rgb, rgb, rgb)
         }
     }


     fun isLight() : Boolean {
         return this.types.contains(Type.LIGHT)
     }
}