import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';

const BabySpiderman = () => {
  const groupRef = useRef();

  // useGLTF handles suspense automatically. It will pause rendering until the model loads.
  const modelPath = '/spiderman.glb';
  const { scene } = useGLTF(modelPath);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle breathing animation anchored to the platform
      groupRef.current.position.y = -4.0 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      
      // Look around slowly (optional, you can remove this if the model looks weird rotating)
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -4.0, 0]} scale={[1.5, 1.5, 1.5]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Renders the GLTF model facing the camera */}
      <primitive object={scene} />
    </group>
  );
};

// Preload the model to prevent popping
useGLTF.preload(import.meta.env.BASE_URL + 'spiderman.glb');

export default BabySpiderman;
