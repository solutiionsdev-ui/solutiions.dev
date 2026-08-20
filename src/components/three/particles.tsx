'use client'

import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * ~40 sparse points. The circular sprite is generated on a canvas at runtime
 * rather than loaded, so this costs zero network bytes.
 */
export function Particles({ count = 40 }: { count?: number }) {
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    // Deterministic placement — a seeded LCG, so the composition is identical
    // on every render and between server and client.
    let seed = 20240816
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }

    for (let i = 0; i < count; i += 1) {
      const radius = 1.9 + random() * 1.6
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7
      array[i * 3 + 2] = radius * Math.cos(phi)
    }
    return array
  }, [count])

  const sprite = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (context) {
      const gradient = context.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2,
      )
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.6)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, size, size)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])

  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry()
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return buffer
  }, [positions])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.045}
        map={sprite}
        transparent
        depthWrite={false}
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}
