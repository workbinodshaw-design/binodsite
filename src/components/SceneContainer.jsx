import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import BabySpiderman from './BabySpiderman';
import FloatingPanels from './FloatingPanels';
import Particles from './Particles';

const HolographicScene = ({ scrollProgress, setActiveCard }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const groupRef = useRef();
  const { camera, pointer } = useThree();

  const targetRotation = scrollProgress * Math.PI * 2;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Both mobile and desktop now use scroll-based rotation!
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        -targetRotation,
        0.15
      );
    }

    const targetX = pointer.x * 3;
    const targetY = pointer.y * 3 + 5; 

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef} position={isMobile ? [0, 1.5, 0] : [6, 0, 0]} scale={isMobile ? 1.15 : 1}>
      <React.Suspense fallback={null}>
        <BabySpiderman />
      </React.Suspense>
      <FloatingPanels setActiveCard={setActiveCard} />
    </group>
  );
};

const SceneContainer = ({ scrollProgress, setActiveCard }) => {
  return (
    <Canvas
      camera={{ position: [0, 5, 22], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#FAFAFA']} />
      
      {/* Lighting for Spiderman & Scene */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, 10, -5]} intensity={1.2} color="#E6E6FA" />
      
      {/* Vibrant colored point lights */}
      <pointLight position={[0, -1, 0]} intensity={4} color="#8A2BE2" distance={12} /> {/* Platform glow */}
      <pointLight position={[0, 2, 2]} intensity={3} color="#ffffff" distance={10} /> {/* Spiderman front light */}
      <pointLight position={[-3, 1, 3]} intensity={2} color="#98FF98" distance={10} /> {/* Mint side glow */}
      <pointLight position={[4, -1, -2]} intensity={2} color="#FF7F50" distance={10} /> {/* Coral back glow */}

      <Environment files="/potsdamer_platz_1k.hdr" />

      {/* Main Content */}
      <HolographicScene scrollProgress={scrollProgress} setActiveCard={setActiveCard} />
      
      {/* Environment / Background */}
      <Particles count={150} />

      {/* Post Processing */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.7} 
          luminanceSmoothing={0.9} 
          intensity={1.2} 
          radius={0.8}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default SceneContainer;
