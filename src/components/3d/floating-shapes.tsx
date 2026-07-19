"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Box } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

// Les matériaux très métalliques/peu rugueux réfléchissent surtout
// l'environnement Three.js (vide, donc noir) plutôt que leur propre
// couleur — mélangé en alpha sur un fond sombre ça reste riche, mais sur
// un fond clair la même transparence vire au gris délavé. En clair on
// réduit le métal/la transparence et on pousse les lumières colorées pour
// que le violet/cyan reste identifiable ; le rendu sombre (déjà validé)
// n'est pas touché.
function AnimatedSphere({ position, color, speed = 1, distort = 0.3, isLight }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  isLight: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={isLight ? 0.45 : 0.2}
          metalness={isLight ? 0.25 : 0.8}
        />
      </Sphere>
    </Float>
  );
}

function AnimatedTorus({ position, color, isLight }: {
  position: [number, number, number];
  color: string;
  isLight: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={isLight ? 0.55 : 0.3}
          metalness={isLight ? 0.15 : 0.9}
          transparent
          opacity={isLight ? 0.95 : 0.8}
        />
      </Torus>
    </Float>
  );
}

function AnimatedBox({ position, color, isLight }: {
  position: [number, number, number];
  color: string;
  isLight: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <Float speed={1} rotationIntensity={1.5} floatIntensity={1.5}>
      <Box ref={meshRef} args={[1.2, 1.2, 1.2]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={isLight ? 0.55 : 0.4}
          metalness={isLight ? 0.2 : 0.7}
          transparent
          opacity={isLight ? 0.9 : 0.7}
        />
      </Box>
    </Float>
  );
}

function Particles({ count = 100 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.05}
        color="#818cf8"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Teintes plus saturées/foncées pour le clair : les hex "400" d'origine
// sont des pastels pensés pour ressortir sur noir ; sur blanc ils se
// diluent bien plus vite (moins d'écart de luminance à exploiter), donc
// on descend d'un ou deux crans sur l'échelle Tailwind pour compenser.
const SHAPE_COLORS_LIGHT: Record<string, string> = {
  "#818cf8": "#4338ca", // indigo-400 → indigo-700
  "#a78bfa": "#6d28d9", // violet-400 → violet-700
  "#22d3ee": "#0891b2", // cyan-400 → cyan-600
  "#f472b6": "#be185d", // pink-400 → pink-700
};

function Scene({ isLight }: { isLight: boolean }) {
  const c = (darkColor: string) => (isLight ? SHAPE_COLORS_LIGHT[darkColor] : darkColor);

  return (
    <>
      {/* Lights — moins de lumière ambiante (uniforme, désature tout) et
          des points colorés plus forts en clair, pour que le violet/cyan
          domine la teinte des formes au lieu de se diluer vers le gris. */}
      <ambientLight intensity={isLight ? 0.3 : 0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={isLight ? 1.1 : 0.5} color="#818cf8" />
      <pointLight position={[10, -10, 5]} intensity={isLight ? 1.1 : 0.5} color="#22d3ee" />

      {/* Shapes */}
      <AnimatedSphere position={[-3, 1, -2]} color={c("#818cf8")} distort={0.4} isLight={isLight} />
      <AnimatedSphere position={[3, -1, -3]} color={c("#a78bfa")} speed={0.8} distort={0.3} isLight={isLight} />
      <AnimatedTorus position={[0, 2, -4]} color={c("#22d3ee")} isLight={isLight} />
      <AnimatedBox position={[4, 0, -2]} color={c("#f472b6")} isLight={isLight} />

      {/* Particles */}
      <Particles count={200} />
    </>
  );
}

// Aucune particule ni forme retirée ici — seule l'EXÉCUTION de la boucle de
// rendu est mise en pause quand l'onglet n'est pas visible (économie
// CPU/GPU/batterie). Le clock interne de Three.js continue de s'écouler
// pendant la pause, donc l'animation reprend naturellement à sa position
// réelle au retour sur l'onglet, sans saut visuel.
function useFrameloopOnVisibility(): "always" | "never" {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const handleVisibilityChange = () => {
      setFrameloop(document.hidden ? "never" : "always");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return frameloop;
}

export function FloatingShapes() {
  const frameloop = useFrameloopOnVisibility();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        frameloop={frameloop}
      >
        <Scene isLight={isLight} />
      </Canvas>
    </div>
  );
}
