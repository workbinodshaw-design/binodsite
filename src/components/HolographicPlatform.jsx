import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Torus, Ring, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const OrbitingParticle = ({ radius, speed, color, size }) => {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime * speed;
      ref.current.position.x = Math.cos(time) * radius;
      ref.current.position.z = Math.sin(time) * radius;
    }
  });

  return (
    <Sphere ref={ref} args={[size, 16, 16]}>
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </Sphere>
  );
};

const HolographicPlatform = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.y += delta * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.y -= delta * 0.15;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * 0.1;
  });

  return (
    <group position={[0, -3, 0]}>
      {/* Central Base Cylinder */}
      <Cylinder args={[3, 3.5, 0.5, 64]} position={[0, -0.25, 0]}>
        <meshPhysicalMaterial 
          color="#FDFDFD"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </Cylinder>

      {/* Inner Glowing Disc */}
      <Cylinder args={[2.5, 2.5, 0.6, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#E6E6FA" transparent opacity={0.6} />
      </Cylinder>
      
      {/* Platform Surface Glass */}
      <Cylinder args={[2.8, 2.8, 0.1, 64]} position={[0, 0.35, 0]}>
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
        />
      </Cylinder>

      {/* Holographic Rings */}
      <group ref={ring1Ref} position={[0, 0.5, 0]}>
        <Torus args={[4, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.6} />
        </Torus>
        <OrbitingParticle radius={4} speed={0.5} color="#8A2BE2" size={0.08} />
        <OrbitingParticle radius={4} speed={0.5} color="#8A2BE2" size={0.05} />
      </group>

      <group ref={ring2Ref} position={[0, 0.2, 0]}>
        <Torus args={[4.8, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#FF7F50" transparent opacity={0.4} />
        </Torus>
        <OrbitingParticle radius={4.8} speed={-0.3} color="#FF7F50" size={0.06} />
      </group>

      <group ref={ring3Ref} position={[0, -0.1, 0]}>
        <Torus args={[5.5, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#98FF98" transparent opacity={0.3} />
        </Torus>
        <OrbitingParticle radius={5.5} speed={0.2} color="#98FF98" size={0.04} />
      </group>
      
      {/* Ground Reflection Ring */}
      <Ring args={[3.5, 7, 64]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]}>
        <meshBasicMaterial color="#E6E6FA" transparent opacity={0.05} />
      </Ring>
    </group>
  );
};

export default HolographicPlatform;
