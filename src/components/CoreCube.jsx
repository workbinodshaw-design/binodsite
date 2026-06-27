import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, MeshTransmissionMaterial, Edges } from '@react-three/drei';
import * as THREE from 'three';

const CoreCube = () => {
  const groupRef = useRef();
  const outerRef = useRef();
  const innerRef = useRef();
  const wireframeRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate the entire group slowly
      groupRef.current.rotation.y += delta * 0.05;
      
      // Fixed position, no floating/bobbing
      groupRef.current.position.y = 1.5; 
    }
    
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.1;
      outerRef.current.rotation.y += delta * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.2;
      innerRef.current.rotation.y += delta * 0.25;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += delta * 0.3;
      wireframeRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Premium Glass Cube */}
      <Box ref={outerRef} args={[3.5, 3.5, 3.5]}>
        <MeshTransmissionMaterial 
          backside
          backsideThickness={2}
          thickness={2.5}
          chromaticAberration={0.08}
          anisotropicBlur={0.2}
          ior={1.6}
          clearcoat={1}
          clearcoatRoughness={0.05}
          roughness={0.05}
          color="#ffffff"
          attenuationDistance={3}
          attenuationColor="#E6E6FA"
        />
      </Box>
      
      {/* Solid Inner Core */}
      <Box ref={innerRef} args={[1.8, 1.8, 1.8]}>
        <meshPhysicalMaterial 
          color="#8A2BE2"
          emissive="#8A2BE2"
          emissiveIntensity={2}
          metalness={0.2}
          roughness={0.1}
        />
      </Box>

      {/* Floating Wireframe structure around the core */}
      <Box ref={wireframeRef} args={[2.5, 2.5, 2.5]}>
        <meshBasicMaterial color="#FF7F50" wireframe transparent opacity={0.3} />
      </Box>
    </group>
  );
};

export default CoreCube;
