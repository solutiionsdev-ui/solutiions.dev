'use client'

/**
 * The smaller matte sphere sitting behind and to the right of the knot —
 * it exists to give the chrome something non-reflective to be read against.
 */
export function MatteSphere() {
  return (
    <mesh position={[1.9, -0.75, -1.6]}>
      <sphereGeometry args={[0.62, 48, 48]} />
      <meshStandardMaterial color="#2a2a2e" roughness={0.9} metalness={0.05} />
    </mesh>
  )
}
