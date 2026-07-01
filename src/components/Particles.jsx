import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 200 }) => {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions and velocities for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      
      const speed = 0.01 + Math.random() * 0.02;
      const scale = 0.05 + Math.random() * 0.1;
      
      temp.push({ x, y, z, speed, scale });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        // Drift upwards and slightly horizontally
        particle.y += particle.speed;
        particle.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
        
        // Loop back to bottom if they go too high
        if (particle.y > 20) {
          particle.y = -20;
        }

        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.scale.setScalar(particle.scale);
        dummy.updateMatrix();
        
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#E6E6FA" transparent opacity={0.6} />
    </instancedMesh>
  );
};

export default Particles;
