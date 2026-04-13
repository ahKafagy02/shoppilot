"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { customers } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Globe sphere */}
      <Sphere args={[2, 48, 48]}>
        <meshBasicMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Slightly larger glow sphere */}
      <Sphere args={[2.02, 48, 48]}>
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.02}
        />
      </Sphere>

      {/* Customer points */}
      {customers.map((customer) => {
        const pos = latLngToVector3(customer.lat, customer.lng, 2.05);
        const isVip = customer.segment === "vip";
        const size = isVip ? 0.06 : 0.04;
        const color = isVip ? "#f59e0b" : customer.segment === "new" ? "#10b981" : "#06b6d4";

        return (
          <group key={customer.id} position={pos}>
            {/* Dot */}
            <mesh>
              <sphereGeometry args={[size, 8, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {/* Glow ring */}
            {isVip && (
              <mesh>
                <ringGeometry args={[0.08, 0.12, 16]} />
                <meshBasicMaterial
                  color="#f59e0b"
                  transparent
                  opacity={0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <GlobeWireframe />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function CustomerGlobe() {
  const segmentCounts = useMemo(() => {
    const counts = { vip: 0, returning: 0, new: 0, lost: 0 };
    customers.forEach((c) => counts[c.segment]++);
    return counts;
  }, []);

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-zinc-300 flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-400" />
          Customer World Map
          <span className="ml-auto text-xs text-zinc-500 font-normal">
            {customers.length} customers · {new Set(customers.map((c) => c.countryCode)).size} countries
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] rounded-lg overflow-hidden bg-zinc-950 relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <GlobeScene />
          </Canvas>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-zinc-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-zinc-700/50">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-[10px] text-zinc-400">VIP ({segmentCounts.vip})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-[10px] text-zinc-400">Returning ({segmentCounts.returning})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-zinc-400">New ({segmentCounts.new})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
