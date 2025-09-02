
// =========================
// components/3d/Scene.tsx — R3F canvas wrapper
// =========================
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Globe } from "./globe";

export default function Scene() {
  return (
    <div className="h-64 md:h-80 w-full">
      <Canvas shadows camera={{ position: [2.8, 1.6, 3.2], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <Globe />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}