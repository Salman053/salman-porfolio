
// =========================
// components/3d/Globe.tsx — simple 3D hero accent
// =========================
"use client";
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export function Globe() {
  const mesh = useRef<Mesh>(null!);
  useFrame((_, dt) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += dt * 0.3;
  });
  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial metalness={0.3} roughness={0.2} color="#60a5fa" />
    </mesh>
  );
}
