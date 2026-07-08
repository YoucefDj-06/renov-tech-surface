import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function RailTrack() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = (state.clock.elapsedTime * 2) % 4
    }
  })

  const sleepers = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      x: (i % 2) * 0.8 - 0.4,
      z: -i * 0.5,
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {/* Left rail */}
      <mesh position={[-0.6, 0, -10]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.15, 40]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Right rail */}
      <mesh position={[0.6, 0, -10]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.12, 0.15, 40]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Sleepers */}
      {sleepers.map((s, i) => (
        <mesh key={i} position={[0, -0.05, s.z]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.08, 0.25]} />
          <meshStandardMaterial color="#2a2d35" metalness={0.5} roughness={0.6} />
        </mesh>
      ))}
      {/* Ballast */}
      <mesh position={[0, -0.15, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 40]} />
        <meshStandardMaterial color="#1a1a22" roughness={0.9} />
      </mesh>
    </group>
  )
}

function RepairZone() {
  const repairRef = useRef<THREE.Mesh>(null)
  const laserRef = useRef<THREE.Mesh>(null)
  const sparkRef = useRef<THREE.Points>(null)

  const sparkPositions = useMemo(() => {
    const count = 80
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.4
      positions[i * 3 + 1] = Math.random() * 0.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    return positions
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const cycle = t % 8

    if (repairRef.current) {
      const repairProgress = Math.max(0, Math.min(1, (cycle - 4) / 2))
      ;(repairRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        repairProgress * 0.8
      repairRef.current.scale.x = 0.3 + repairProgress * 0.7
    }

    if (laserRef.current) {
      const scanActive = cycle > 1 && cycle < 4
      laserRef.current.visible = scanActive
      if (scanActive) {
        laserRef.current.position.x = Math.sin(t * 4) * 0.3
      }
    }

    if (sparkRef.current) {
      const weldActive = cycle > 4 && cycle < 7
      sparkRef.current.visible = weldActive
      if (weldActive) {
        sparkRef.current.rotation.y = t * 2
        const positions = sparkRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += 0.02
          if (positions[i + 1] > 0.6) positions[i + 1] = 0
        }
        sparkRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <group position={[0, 0.08, -2]}>
      {/* Crack / damage zone */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.5, 0.02, 0.15]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Repair glow */}
      <mesh ref={repairRef} position={[0, 0.04, 0]}>
        <boxGeometry args={[0.5, 0.03, 0.12]} />
        <meshStandardMaterial
          color="#ff6b00"
          emissive="#ff6b00"
          emissiveIntensity={0}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Laser scan line */}
      <mesh ref={laserRef} position={[0, 0.3, 0]} visible={false}>
        <boxGeometry args={[0.02, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#00a3ff"
          emissive="#0066ff"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Sparks */}
      <points ref={sparkRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#ffaa00" transparent opacity={0.9} />
      </points>
    </group>
  )
}

function Scene() {
  useFrame((state) => {
    state.camera.position.z = 3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    state.camera.lookAt(0, 0, -3)
  })

  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 5, 25]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 3, 2]} intensity={0.5} color="#0066ff" />
      <pointLight position={[-1, 1, -2]} intensity={0.8} color="#ff6b00" />
      <directionalLight position={[0, 5, -5]} intensity={0.3} color="#ffffff" />
      <Stars radius={50} depth={30} count={800} factor={2} saturation={0} fade speed={0.5} />
      <RailTrack />
      <RepairZone />
    </>
  )
}

export default function RailScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1.2, 3], fov: 60 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-carbon/60 via-transparent to-carbon" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-carbon/40 via-transparent to-carbon/40" />
    </div>
  )
}
