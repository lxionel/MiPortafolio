import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RotateCw, Move3d, Eye, RefreshCw, ZoomIn } from "lucide-react";
import { ScreenCodeTexture } from "./ScreenCodeTexture";

export const Workstation3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<"front" | "screen" | "top">("front");

  // Camera target controls
  const cameraAnimRef = useRef<{
    targetPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
  }>({
    targetPos: new THREE.Vector3(0, 1.3, 3.8),
    targetLookAt: new THREE.Vector3(0, 0.2, 0),
  });

  const setCameraPreset = (preset: "front" | "screen" | "top") => {
    setCurrentView(preset);
    if (preset === "front") {
      cameraAnimRef.current.targetPos.set(0, 1.3, 3.8);
      cameraAnimRef.current.targetLookAt.set(0, 0.2, 0);
    } else if (preset === "screen") {
      cameraAnimRef.current.targetPos.set(0, 0.95, 2.3);
      cameraAnimRef.current.targetLookAt.set(0, 0.65, 0);
    } else if (preset === "top") {
      cameraAnimRef.current.targetPos.set(0, 3.5, 2.8);
      cameraAnimRef.current.targetLookAt.set(0, 0, 0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.3, 3.8);

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Code Canvas Texture Engine
    const codeTextureEngine = new ScreenCodeTexture();

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0a101d, 3.5);
    scene.add(ambientLight);

    // Key Light (Cyan)
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 4.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    // Rim / Backlight (Indigo / Purple)
    const rimLight = new THREE.DirectionalLight(0x818cf8, 3.0);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Screen Glow Light (Casts on keyboard & setup)
    const screenGlowLight = new THREE.PointLight(0x38bdf8, 3.5, 5);
    screenGlowLight.position.set(0, 0.8, 0.5);
    scene.add(screenGlowLight);

    // Interactive pointer light
    const pointerLight = new THREE.PointLight(0x06b6d4, 2.5, 6);
    pointerLight.position.set(0, 2, 2);
    scene.add(pointerLight);

    // Root model group for user rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Cylindrical Tech Pedestal
    const pedestalGeom = new THREE.CylinderGeometry(1.9, 2.0, 0.12, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.9,
      roughness: 0.25,
    });
    const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
    pedestal.position.y = -0.76;
    rootGroup.add(pedestal);

    // Glowing Neon Rings on Pedestal Edge
    const outerRingGeom = new THREE.RingGeometry(1.92, 1.96, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = -0.69;
    rootGroup.add(outerRing);

    const innerRingGeom = new THREE.RingGeometry(1.4, 1.43, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const innerRing = new THREE.Mesh(innerRingGeom, innerRingMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = -0.69;
    rootGroup.add(innerRing);

    // Display Hologram Panel with Active Code
    const screenWidth = 1.7;
    const screenHeight = 1.05;
    const screenGeom = new THREE.PlaneGeometry(screenWidth, screenHeight);
    const screenMat = new THREE.MeshBasicMaterial({
      map: codeTextureEngine.texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.96,
    });
    const codeScreenMesh = new THREE.Mesh(screenGeom, screenMat);
    // Positioned directly above and aligned with laptop setup
    codeScreenMesh.position.set(0, 0.72, -0.2);
    codeScreenMesh.rotation.x = -0.12; // Slight ergonomic tilt back
    rootGroup.add(codeScreenMesh);

    // Glowing screen border
    const borderGeom = new THREE.EdgesGeometry(screenGeom);
    const borderMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const screenBorder = new THREE.LineSegments(borderGeom, borderMat);
    codeScreenMesh.add(screenBorder);

    // Floating Stardust Particles
    const pCount = 220;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 6;
      pPos[i + 1] = (Math.random() - 0.5) * 4;
      pPos[i + 2] = (Math.random() - 0.5) * 5;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.022,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Load High-Def Laptop Model
    const loader = new GLTFLoader();
    const modelUrl = `${import.meta.env.BASE_URL}assets/models/laptop.glb`;

    loader.load(
      modelUrl,
      (gltf) => {
        const laptopScene = gltf.scene;

        // Auto-center and normalize scale to protagonist size
        const bbox = new THREE.Box3().setFromObject(laptopScene);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        // Generous protagonist scale
        const targetScale = 2.6 / (maxDim || 1);

        laptopScene.scale.setScalar(targetScale);
        laptopScene.position.x = -center.x * targetScale;
        laptopScene.position.y = -center.y * targetScale - 0.45;
        laptopScene.position.z = -center.z * targetScale + 0.15;

        laptopScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.35;
              mat.metalness = 0.85;
              mat.needsUpdate = true;
            }
          }
        });

        rootGroup.add(laptopScene);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadPercent(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.warn("Error loading 3D laptop model, continuing scene:", err);
        setLoading(false);
      }
    );

    // Rotation & Pointer Drag State
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = -0.25;
    let targetRotX = 0.1;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevX = "touches" in e ? e.touches[0].clientX : e.clientX;
      prevY = "touches" in e ? e.touches[0].clientY : e.clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);

      pointerLight.position.x = nx * 3;
      pointerLight.position.y = ny * 2 + 1;

      if (!isDragging) return;

      const dx = clientX - prevX;
      const dy = clientY - prevY;

      targetRotY += dx * 0.008;
      targetRotX += dy * 0.005;
      // Clamp vertical tilt to keep setup elegant
      targetRotX = Math.max(-0.25, Math.min(0.65, targetRotX));

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener("mousedown", onPointerDown);
    canvasDom.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvasDom.addEventListener("touchstart", onPointerDown, { passive: true });
    canvasDom.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Animation Render Loop
    const clock = new THREE.Clock();
    const currentLookAt = new THREE.Vector3(0, 0.2, 0);

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Update interactive code texture with blinking cursor
      codeTextureEngine.update(elapsedTime * 1000);

      // Floating gentle levitation
      rootGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.05;

      // Auto-rotation when not dragging
      if (autoRotate && !isDragging) {
        targetRotY += 0.003;
      }

      // Smooth damping lerp for rotation
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

      // Smooth camera transition to presets
      camera.position.lerp(cameraAnimRef.current.targetPos, 0.06);
      currentLookAt.lerp(cameraAnimRef.current.targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      // Ambient particle drift
      particles.rotation.y = elapsedTime * 0.025;
      outerRing.rotation.z = elapsedTime * 0.12;
      innerRing.rotation.z = -elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvasDom.removeEventListener("mousedown", onPointerDown);
      canvasDom.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      canvasDom.removeEventListener("touchstart", onPointerDown);
      canvasDom.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      renderer.dispose();
      pedestalGeom.dispose();
      pedestalMat.dispose();
      outerRingGeom.dispose();
      outerRingMat.dispose();
      innerRingGeom.dispose();
      innerRingMat.dispose();
      screenGeom.dispose();
      screenMat.dispose();
      borderGeom.dispose();
      borderMat.dispose();
      pGeom.dispose();
      pMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate]);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] flex items-center justify-center select-none">
      {/* 3D Canvas mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md rounded-3xl border border-slate-800">
          <div className="w-14 h-14 border-2 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
          <p className="text-sm font-mono text-cyan-400 font-semibold tracking-wide">
            Cargando Estación 3D en Alta Resolución...
          </p>
          <div className="w-56 bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${Math.max(loadPercent, 20)}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 font-mono mt-2">
            {loadPercent > 0 ? `${loadPercent}%` : "Iniciando shaders y mallas..."}
          </span>
        </div>
      )}

      {/* Top Floating View Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none px-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 shadow-lg pointer-events-auto">
          <button
            onClick={() => setCameraPreset("front")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              currentView === "front"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Frontal</span>
          </button>

          <button
            onClick={() => setCameraPreset("screen")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              currentView === "screen"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Código</span>
          </button>

          <button
            onClick={() => setCameraPreset("top")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              currentView === "top"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Move3d className="w-3.5 h-3.5" />
            <span>Superior</span>
          </button>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl backdrop-blur-md border text-xs font-mono transition-all shadow-lg pointer-events-auto ${
            autoRotate
              ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25"
              : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Alternar rotación continua"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">
            {autoRotate ? "Giro Activo" : "Pausado"}
          </span>
        </button>
      </div>

      {/* Bottom status helper */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none px-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300 font-mono shadow-lg pointer-events-auto">
          <Move3d className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Arrastra con cursor o dedo para rotar 360°</span>
        </div>

        <button
          onClick={() => setCameraPreset("front")}
          className="p-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors pointer-events-auto shadow-lg"
          title="Restablecer posición inicial"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};