"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { customers } from "@/data/mock-data";
import { Globe } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeWireframe({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireColor = isDark ? "#34d399" : "#059669";

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      <Sphere args={[2, 48, 48]}>
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.06} />
      </Sphere>
      <Sphere args={[2.02, 48, 48]}>
        <meshBasicMaterial color={wireColor} transparent opacity={0.015} />
      </Sphere>
      {customers.map((customer) => {
        const pos = latLngToVector3(customer.lat, customer.lng, 2.05);
        const isVip = customer.segment === "vip";
        const size = isVip ? 0.06 : 0.04;
        const color = isVip ? "#f59e0b" : customer.segment === "new" ? "#10b981" : "#06b6d4";

        return (
          <group key={customer.id} position={pos}>
            <mesh>
              <sphereGeometry args={[size, 8, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
            {isVip && (
              <mesh>
                <ringGeometry args={[0.08, 0.12, 16]} />
                <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function GlobeScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <GlobeWireframe isDark={isDark} />
      <OrbitControls enableZoom enablePan={false} minDistance={3} maxDistance={8} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export function CustomerGlobe() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const segmentCounts = useMemo(() => {
    const counts = { vip: 0, returning: 0, new: 0, lost: 0 };
    customers.forEach((c) => counts[c.segment]++);
    return counts;
  }, []);

  return (
    <div className="sp-surface sp-card-hover rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-4 h-4" style={{ color: "var(--sp-accent)" }} />
        <h3
          className="text-sm font-semibold font-[family-name:var(--font-heading)]"
          style={{ color: "var(--sp-text)" }}
        >
          Customer World Map
        </h3>
        <span className="ml-auto text-[11px] font-medium" style={{ color: "var(--sp-text-muted)" }}>
          {customers.length} customers · {new Set(customers.map((c) => c.countryCode)).size} countries
        </span>
      </div>
      <div
        className="h-[340px] rounded-xl overflow-hidden relative"
        style={{ background: isDark ? "#060810" : "#f0f2f8" }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <GlobeScene isDark={isDark} />
        </Canvas>

        {/* Legend */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-3 sp-glass rounded-lg px-3 py-2"
        >
          {[
            { color: "#f59e0b", label: "VIP", count: segmentCounts.vip },
            { color: "#06b6d4", label: "Returning", count: segmentCounts.returning },
            { color: "#10b981", label: "New", count: segmentCounts.new },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span className="text-[10px] font-medium" style={{ color: "var(--sp-text-secondary)" }}>
                {item.label} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
