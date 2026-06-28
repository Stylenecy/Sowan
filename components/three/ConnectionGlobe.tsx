'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AMBER = '#E8920C';
const CREAM = '#F5F1E8';
const GLOBE_R = 2;

function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const offset = 2 / samples;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    points.push(
      new THREE.Vector3(Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius)
    );
  }
  return points;
}

function Globe({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo(() => fibonacciSphere(46, GLOBE_R), []);

  const arcs = useMemo(() => {
    const pairs: [number, number][] = [
      [0, 20], [5, 30], [10, 40], [3, 25], [15, 38],
      [8, 33], [12, 28], [1, 44], [18, 36], [22, 42], [6, 31],
    ];
    return pairs.map(([i, j]) => {
      const a = nodes[i % nodes.length];
      const b = nodes[j % nodes.length];
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_R * 1.34);
      return new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(40);
    });
  }, [nodes]);

  useFrame((_, delta) => {
    if (group.current && !reducedMotion) group.current.rotation.y += delta * 0.14;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.1]}>
      {/* dark inner sphere — depth + occludes back hemisphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_R * 0.985, 48, 48]} />
        <meshStandardMaterial color="#1c1712" roughness={1} metalness={0} />
      </mesh>
      {/* wireframe lattice */}
      <mesh>
        <icosahedronGeometry args={[GLOBE_R, 4]} />
        <meshBasicMaterial color={CREAM} wireframe transparent opacity={0.07} />
      </mesh>
      {/* nodes (mentors) */}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.026, 12, 12]} />
          <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={2.4} toneMapped={false} />
        </mesh>
      ))}
      {/* connection arcs (cross-generational links) */}
      {arcs.map((pts, i) => (
        <Line key={i} points={pts} color={AMBER} lineWidth={1.1} transparent opacity={0.45} toneMapped={false} />
      ))}
    </group>
  );
}

export default function ConnectionGlobe({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 3, 5]} intensity={60} color={AMBER} />
      <pointLight position={[-5, -2, -3]} intensity={12} color={CREAM} />
      <Globe reducedMotion={reducedMotion} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.45}
        rotateSpeed={0.35}
      />
    </Canvas>
  );
}
