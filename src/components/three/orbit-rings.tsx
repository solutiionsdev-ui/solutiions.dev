'use client'

/** Three thin elliptical rings around the knot (brief §10.1). */
export function OrbitRings() {
  const rings: { radius: number; rotation: [number, number, number] }[] = [
    { radius: 1.75, rotation: [Math.PI / 2.4, 0, 0.3] },
    { radius: 2.05, rotation: [Math.PI / 1.9, 0.4, -0.2] },
    { radius: 2.35, rotation: [Math.PI / 3.2, -0.3, 0.6] },
  ]

  return (
    <group>
      {rings.map((ring, index) => (
        <mesh key={index} rotation={ring.rotation} scale={[1, 0.62, 1]}>
          <torusGeometry args={[ring.radius, 0.002, 8, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  )
}
