"use client";

/**
 * "Where we serve" — cinematic miniature India.
 * A canvas-painted heightmap displaces a plane clipped to the official
 * Survey-of-India outline (terrain), resting on an extruded slab (base).
 * Markers glow, pulse and label the natural places Bohopods thrive.
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { INDIA_OUTLINE } from "@/lib/india-outline";
import { cn } from "@/lib/utils";

/* ---------- Geo ---------- */
const LON = { min: 68.484, max: 97.415 };
const LAT = { min: 8.078, max: 37.078 };
const SIZE = 10; // world units across the widest span
const SX = SIZE / (LON.max - LON.min);
const SY = SIZE / (LAT.max - LAT.min);
const toX = (lon: number) => (lon - (LON.min + LON.max) / 2) * SX;
const toY = (lat: number) => (lat - (LAT.min + LAT.max) / 2) * SY;

/** Natural places where Bohopods thrive — edit freely: name, lat, lon, tag. */
export type Spot = { name: string; lat: number; lon: number; tag: string };
export const SPOTS: Spot[] = [
  { name: "Manali", lat: 32.24, lon: 77.19, tag: "Himalayan hills" },
  { name: "Kasauli", lat: 30.9, lon: 76.96, tag: "Pine hills" },
  { name: "Rishikesh", lat: 30.09, lon: 78.27, tag: "River valley" },
  { name: "Jim Corbett", lat: 29.39, lon: 79.13, tag: "Forest edge" },
  { name: "Udaipur", lat: 24.58, lon: 73.68, tag: "Lakes" },
  { name: "Mount Abu", lat: 24.59, lon: 72.7, tag: "Hill station" },
  { name: "Igatpuri", lat: 19.7, lon: 73.56, tag: "Ghats" },
  { name: "Lonavala", lat: 18.75, lon: 73.41, tag: "Ghats" },
  { name: "Alibaug", lat: 18.64, lon: 72.87, tag: "Coast" },
  { name: "Mahabaleshwar", lat: 17.92, lon: 73.66, tag: "Ghats" },
  { name: "Goa", lat: 15.3, lon: 74.05, tag: "Coast" },
  { name: "Gokarna", lat: 14.55, lon: 74.32, tag: "Coast" },
  { name: "Coorg", lat: 12.42, lon: 75.74, tag: "Coffee hills" },
  { name: "Wayanad", lat: 11.68, lon: 76.13, tag: "Forest" },
  { name: "Munnar", lat: 10.09, lon: 77.06, tag: "Tea hills" },
  { name: "Kodaikanal", lat: 10.24, lon: 77.49, tag: "Hill station" },
  { name: "Darjeeling", lat: 27.04, lon: 88.26, tag: "Tea hills" },
  { name: "Shillong", lat: 25.57, lon: 91.88, tag: "Pine hills" },
];

/* ---------- Height model (drawn into a canvas, sampled for markers) ---------- */
const TEX = 768;
const lonToU = (lon: number) => ((lon - LON.min) / (LON.max - LON.min)) * TEX;
const latToV = (lat: number) => (1 - (lat - LAT.min) / (LAT.max - LAT.min)) * TEX;
const UPP = TEX / (LON.max - LON.min); // px per ° lon
const VPP = TEX / (LAT.max - LAT.min); // px per ° lat

type Pt = [number, number];
type Ctx = CanvasRenderingContext2D;

/** Blurred bright polyline = a mountain range on the height canvas. */
function ridge(ctx: Ctx, pts: Pt[], w: number, bright: number, blur: number) {
  ctx.save();
  ctx.strokeStyle = `rgba(255,255,255,${bright})`;
  ctx.lineWidth = w;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = `rgba(255,255,255,${Math.min(1, bright)})`;
  ctx.shadowBlur = blur;
  ctx.beginPath();
  pts.forEach(([lon, lat], i) => {
    const x = lonToU(lon), y = latToV(lat);
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  });
  ctx.stroke();
  ctx.restore();
}

/** Soft radial blob (plateau / massif / desert), sized in degrees. */
function blob(ctx: Ctx, lon: number, lat: number, rLon: number, rLat: number, inner: string, outer = "rgba(0,0,0,0)") {
  const x = lonToU(lon), y = latToV(lat), rx = rLon * UPP, ry = rLat * VPP, r = Math.max(rx, ry);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(rx / r, ry / r);
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function strokePath(ctx: Ctx, pts: Pt[]) {
  ctx.beginPath();
  pts.forEach(([lon, lat], i) => {
    const x = lonToU(lon), y = latToV(lat);
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  });
  ctx.stroke();
}

/* Real geographic features (approx lon/lat) */
const HIMALAYA: Pt[] = [[74, 34], [75.5, 33], [77.5, 32], [79, 31], [81, 30.3], [83, 29], [85, 28.3], [87, 27.8], [88.5, 27.6], [90, 28], [92, 28.2], [93.5, 28.6], [95.2, 28.2]];
const RIVERS: Pt[][] = [
  [[78.5, 30], [79.5, 28], [81.5, 25.6], [83.5, 25.3], [85.5, 25.2], [87.5, 24.3], [88.4, 22.8]], // Ganga
  [[77.2, 29.6], [77.6, 27.5], [80, 26], [81.8, 25.4]],                                            // Yamuna
  [[95.3, 28], [93.5, 27.2], [91.5, 26.6], [90, 26], [89.6, 24.5], [88.6, 23]],                    // Brahmaputra
  [[81.7, 22.9], [78.5, 22.4], [75, 22], [73.2, 21.7]],                                            // Narmada
  [[78, 21.5], [75.5, 21.2], [73.1, 21.1]],                                                        // Tapti
  [[73.8, 19.9], [76.5, 19.4], [79, 18.9], [81, 17.8], [82.2, 16.9]],                              // Godavari
  [[73.9, 17.9], [76.5, 16.8], [78.5, 16.5], [80.5, 16.3], [81, 15.8]],                            // Krishna
  [[81.6, 20.5], [83.5, 20.6], [86.4, 20.3]],                                                      // Mahanadi
  [[76, 12.4], [78, 11.4], [79.8, 10.8]],                                                          // Cauvery
];

function paintCanvases() {
  const path = new Path2D();
  INDIA_OUTLINE.forEach(([lon, lat], i) => {
    const x = lonToU(lon);
    const y = latToV(lat);
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  });
  path.closePath();

  /* ---------- Height map (real ranges) ---------- */
  const h = document.createElement("canvas");
  h.width = h.height = TEX;
  const hc = h.getContext("2d")!;
  hc.fillStyle = "#000";
  hc.fillRect(0, 0, TEX, TEX);
  hc.save();
  hc.clip(path);
  hc.fillStyle = "#1c1c1c"; // plains base
  hc.fillRect(0, 0, TEX, TEX);

  // Plateaus / massifs
  blob(hc, 77.5, 17.3, 6.6, 5.8, "rgba(255,255,255,0.34)"); // Deccan plateau
  blob(hc, 85.4, 23.2, 3.6, 3.0, "rgba(255,255,255,0.3)");  // Chota Nagpur
  blob(hc, 76.6, 11.4, 1.5, 1.5, "rgba(255,255,255,0.6)");  // Nilgiris knot

  // Himalaya — layered arc: broad mass → high range → snow crest
  ridge(hc, HIMALAYA, 52, 0.5, 34);
  ridge(hc, HIMALAYA, 26, 0.85, 24);
  ridge(hc, HIMALAYA, 11, 1.0, 15);
  ridge(hc, [[74, 35], [76, 35.2], [77.6, 34.4]], 34, 0.9, 24); // Karakoram / NW
  ridge(hc, [[92, 28.5], [94, 28.8], [96, 28]], 28, 0.85, 20);   // Arunachal

  // Peninsular & central ranges
  ridge(hc, [[72.6, 24.5], [73.7, 26], [75, 27.2], [76.3, 28.2]], 15, 0.42, 18);           // Aravalli
  ridge(hc, [[73, 22.6], [76, 23.2], [79, 23.6], [82.5, 24.1]], 13, 0.4, 16);              // Vindhya
  ridge(hc, [[73.6, 21.6], [77, 22], [80.5, 22.4]], 13, 0.4, 16);                          // Satpura
  ridge(hc, [[73.3, 20.6], [73.7, 18.6], [74.2, 16.6], [75, 14.6], [75.8, 12.8], [76.6, 11], [77.4, 8.9]], 15, 0.62, 20); // Western Ghats
  ridge(hc, [[79.3, 13], [80.5, 14.6], [82, 16.4], [83.5, 18.4], [85.2, 20.6]], 10, 0.36, 16); // Eastern Ghats
  ridge(hc, [[90.3, 25.5], [91.5, 25.6], [92.6, 25.4]], 16, 0.55, 16);                     // Meghalaya

  // fine speckle relief
  for (let i = 0; i < 3200; i++) {
    hc.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
    hc.fillRect(Math.random() * TEX, Math.random() * TEX, 2, 2);
  }
  hc.restore();

  const hData = hc.getImageData(0, 0, TEX, TEX).data;

  /* ---------- Color map (land cover + hydrography) ---------- */
  const c = document.createElement("canvas");
  c.width = c.height = TEX;
  const cc = c.getContext("2d")!;
  cc.fillStyle = "#0c1207";
  cc.fillRect(0, 0, TEX, TEX);
  cc.save();
  cc.clip(path);
  // humid-green base
  cc.fillStyle = "#95a86a";
  cc.fillRect(0, 0, TEX, TEX);
  // Thar desert (NW) — sandy
  blob(cc, 71.6, 27, 4.6, 4.2, "#dcc891");
  blob(cc, 73.2, 29, 3, 2.8, "#d6c085");
  // Deccan — drier olive-tan wash
  blob(cc, 77.5, 17.3, 6.6, 5.8, "rgba(196,184,124,0.55)");
  // richer green: Gangetic + coastal humid belts
  blob(cc, 87.5, 24, 4, 3.2, "#7f9c56");
  blob(cc, 75.5, 10.5, 3, 3, "#7a9a52");

  // Forest belts (deep green)
  cc.save();
  cc.strokeStyle = "rgba(42,74,30,0.5)";
  cc.lineWidth = 26;
  cc.lineCap = "round";
  cc.lineJoin = "round";
  cc.shadowColor = "rgba(42,74,30,0.45)";
  cc.shadowBlur = 20;
  strokePath(cc, [[73.5, 20.4], [74.2, 16.6], [75.6, 12.8], [76.8, 10.2], [77.4, 8.9]]); // W Ghats
  strokePath(cc, [[89.8, 26], [92.5, 27.4], [95.6, 28]]);                                 // NE
  strokePath(cc, [[76, 22.4], [80, 22.8], [83.2, 23]]);                                   // Central India
  strokePath(cc, [[77, 29], [82, 27.6], [88, 26.6]]);                                     // Terai
  cc.restore();

  // Elevation shading — snow crests + hill depth from the height map
  const img = cc.getImageData(0, 0, TEX, TEX);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const elev = hData[i] / 255;
    if (elev > 0.6) {
      const t = Math.min(1, (elev - 0.6) / 0.35);
      d[i] += (247 - d[i]) * t;
      d[i + 1] += (245 - d[i + 1]) * t;
      d[i + 2] += (238 - d[i + 2]) * t;
    } else if (elev > 0.3) {
      const t = (elev - 0.3) / 0.3;
      d[i] *= 1 - 0.26 * t;
      d[i + 1] *= 1 - 0.14 * t;
      d[i + 2] *= 1 - 0.28 * t;
    }
  }
  cc.putImageData(img, 0, 0);

  // Rivers (teal-blue), drawn over the shaded terrain
  cc.save();
  cc.strokeStyle = "rgba(126,172,182,0.92)";
  cc.lineWidth = 3.4;
  cc.lineCap = "round";
  cc.lineJoin = "round";
  cc.shadowColor = "rgba(150,200,210,0.6)";
  cc.shadowBlur = 4;
  RIVERS.forEach((r) => strokePath(cc, r));
  cc.restore();

  cc.restore(); // end clip
  // crisp coastline
  cc.strokeStyle = "rgba(250,248,241,0.5)";
  cc.lineWidth = 2;
  cc.stroke(path);

  /* Alpha mask */
  const a = document.createElement("canvas");
  a.width = a.height = TEX;
  const ac = a.getContext("2d")!;
  ac.fillStyle = "#000";
  ac.fillRect(0, 0, TEX, TEX);
  ac.fillStyle = "#fff";
  ac.fill(path);

  return { h, c, a, hData };
}

/* ---------- Marker ---------- */
function Marker({
  spot,
  y,
  index,
  active,
  setActive,
  reduced,
}: {
  spot: Spot;
  y: number;
  index: number;
  active: boolean;
  setActive: (i: number | null) => void;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const born = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!born.current) born.current = t;
    const age = t - born.current - index * 0.12; // staggered rise
    const s = THREE.MathUtils.clamp(age * 2.2, 0, 1);
    const ease = 1 - Math.pow(1 - s, 3);
    if (group.current) {
      group.current.scale.setScalar(ease * (active ? 1.45 : 1));
      group.current.position.y = y + 0.05 + ease * 0.05;
    }
    if (ring.current && !reduced) {
      const p = ((t * 0.6 + index * 0.35) % 1);
      ring.current.scale.setScalar(1 + p * 2.6);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.5;
    }
  });

  return (
    <group
      ref={group}
      position={[toX(spot.lon), y, -toY(spot.lat)]}
      onPointerOver={(e) => { e.stopPropagation(); setActive(index); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setActive(null); document.body.style.cursor = ""; }}
      onClick={(e) => { e.stopPropagation(); setActive(index); }}
    >
      {/* glow core */}
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#e8c98a" emissive="#9c7a3c" emissiveIntensity={active ? 2.4 : 1.4} />
      </mesh>
      {/* pulse ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.07, 0.085, 32]} />
        <meshBasicMaterial color="#e8c98a" transparent opacity={0.4} depthWrite={false} />
      </mesh>
      {/* stem */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.1, 6]} />
        <meshBasicMaterial color="#e8c98a" transparent opacity={0.65} />
      </mesh>
      <Html
        center
        distanceFactor={9}
        position={[0, 0.16, 0]}
        style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        zIndexRange={[20, 0]}
      >
        <div
          className={cn(
            "rounded-full border px-2.5 py-1 font-display tracking-wide backdrop-blur-sm transition-all duration-300",
            active
              ? "border-bronze/60 bg-forest-deep/85 text-[13px] text-paper shadow-lg"
              : "border-paper/15 bg-forest-deep/55 text-[11px] text-paper/85",
          )}
        >
          {spot.name}
          {active && <span className="ml-1.5 text-sage/90">· {spot.tag}</span>}
        </div>
      </Html>
    </group>
  );
}

/* ---------- Terrain + slab ---------- */
function IndiaMesh({ maps }: { maps: ReturnType<typeof paintCanvases> }) {
  const { colorTex, heightTex, alphaTex, shape } = useMemo(() => {
    const colorTex = new THREE.CanvasTexture(maps.c);
    const heightTex = new THREE.CanvasTexture(maps.h);
    const alphaTex = new THREE.CanvasTexture(maps.a);
    colorTex.colorSpace = THREE.SRGBColorSpace;
    const shape = new THREE.Shape(
      INDIA_OUTLINE.map(([lon, lat]) => new THREE.Vector2(toX(lon), toY(lat))),
    );
    return { colorTex, heightTex, alphaTex, shape };
  }, [maps]);

  return (
    <group>
      {/* relief surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[SIZE, SIZE, 300, 300]} />
        <meshStandardMaterial
          map={colorTex}
          displacementMap={heightTex}
          displacementScale={0.95}
          alphaMap={alphaTex}
          transparent
          alphaTest={0.5}
          roughness={0.85}
          metalness={0}
        />
      </mesh>
      {/* slab base — the miniature's body */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <extrudeGeometry args={[shape, { depth: 0.22, bevelEnabled: false }]} />
        <meshStandardMaterial color="#22301a" roughness={0.85} />
      </mesh>
    </group>
  );
}

/* ---------- Camera drift + pointer parallax ---------- */
function Rig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree();
  const start = useRef<number | null>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (start.current === null) start.current = t;
    const age = t - start.current;
    const intro = 1 - Math.pow(1 - THREE.MathUtils.clamp(age / 2.4, 0, 1), 3);
    const drift = reduced ? 0 : Math.sin(t * 0.12) * 0.55;
    const px = reduced ? 0 : pointer.x * 0.45;
    const py = reduced ? 0 : pointer.y * 0.25;
    camera.position.x = drift + px + 0.6;
    camera.position.y = 8.2 - intro * 1.4 - py;
    camera.position.z = 8.6 - intro * 0.8;
    camera.lookAt(0.2, -0.4, -0.6);
  });
  return null;
}

/* ---------- Scene ---------- */
export default function IndiaTerrain3D() {
  const [maps, setMaps] = useState<ReturnType<typeof paintCanvases> | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMaps(paintCanvases());
  }, []);

  const markerYs = useMemo(() => {
    if (!maps) return [];
    return SPOTS.map((s) => {
      const u = Math.round(lonToU(s.lon));
      const v = Math.round(latToV(s.lat));
      const elev = maps.hData[(v * TEX + u) * 4] / 255;
      return 0.02 + elev * 0.9;
    });
  }, [maps]);

  if (!maps) return null;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 33, position: [0.6, 8.2, 8.6] }}
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.35 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={1.15} color="#e6e4cf" />
      <hemisphereLight args={["#fff2d8", "#4a5a34", 0.9]} />
      <directionalLight position={[5, 8, 4]} intensity={2.1} color="#ffdca6" />
      <directionalLight position={[-5, 4, -4]} intensity={0.4} color="#9ec0d6" />
      <IndiaMesh maps={maps} />
      {SPOTS.map((s, i) => (
        <Marker
          key={s.name}
          spot={s}
          y={markerYs[i] ?? 0.1}
          index={i}
          active={active === i}
          setActive={setActive}
          reduced={reduced}
        />
      ))}
      {!reduced && (
        <Sparkles count={70} scale={[12, 4, 12]} position={[0, 2.2, 0]} size={1.6} speed={0.28} color="#d8e0c2" opacity={0.5} />
      )}
      <Rig reduced={reduced} />
    </Canvas>
  );
}
