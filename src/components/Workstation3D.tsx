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

  const cameraAnimRef = useRef<{
    targetPos: THREE.Vector3;
    targetLookAt: THREE.Vector3;
  }>({
    targetPos: new THREE.Vector3(0, 1.0, 3.5),
    targetLookAt: new THREE.Vector3(0, 0.15, 0),
  });

  const setCameraPreset = (preset: "front" | "screen" | "top") => {
    setCurrentView(preset);
    if (preset === "front") {
      cameraAnimRef.current.targetPos.set(0, 1.0, 3.5);
      cameraAnimRef.current.targetLookAt.set(0, 0.15, 0);
    } else if (preset === "screen") {
      cameraAnimRef.current.targetPos.set(0, 0.48, 1.95);
      cameraAnimRef.current.targetLookAt.set(0, 0.38, -0.25);
    } else if (preset === "top") {
      cameraAnimRef.current.targetPos.set(0, 2.9, 2.2);
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
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.0, 3.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Code Texture Engine
    const codeEngine = new ScreenCodeTexture();

    // Professional Studio Lighting (Sophisticated & Balanced)
    const ambientLight = new THREE.AmbientLight(0x0f131a, 3.0);
    scene.add(ambientLight);

    // Neutral Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Soft Rim Light
    const rimLight = new THREE.DirectionalLight(0x94a3b8, 2.2);
    rimLight.position.set(-3, 3, -3);
    scene.add(rimLight);

    // Gentle Screen Light shining onto keyboard
    const screenGlow = new THREE.PointLight(0x58a6ff, 1.8, 3.5);
    screenGlow.position.set(0, 0.5, 0.2);
    scene.add(screenGlow);

    // Interactive pointer light
    const pointerLight = new THREE.PointLight(0x38bdf8, 1.2, 5);
    pointerLight.position.set(0, 2, 2);
    scene.add(pointerLight);

    // Root Group for user rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Minimalist Executive Desk Mat / Pedestal
    const pedestalGeom = new THREE.CylinderGeometry(1.85, 1.9, 0.08, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x11141d,
      metalness: 0.8,
      roughness: 0.35,
    });
    const pedestal = new THREE.Mesh(pedestalGeom, pedestalMat);
    pedestal.position.y = -0.72;
    rootGroup.add(pedestal);

    // Subtle brushed metal perimeter ring
    const ringGeom = new THREE.RingGeometry(1.86, 1.88, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.67;
    rootGroup.add(ring);

    // Ambient Stardust Particles (Subtle)
    const pCount = 140;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 5.5;
      pPos[i + 1] = (Math.random() - 0.5) * 3.5;
      pPos[i + 2] = (Math.random() - 0.5) * 4.5;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.018,
      transparent: true,
      opacity: 0.4,
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

        // Auto-center and normalize scale
        const bbox = new THREE.Box3().setFromObject(laptopScene);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.5 / (maxDim || 1);

        laptopScene.scale.setScalar(targetScale);
        laptopScene.position.x = -center.x * targetScale;
        laptopScene.position.y = -center.y * targetScale - 0.4;
        laptopScene.position.z = -center.z * targetScale;

        // IMPORTANT FIX: Rotate 180 degrees so the FRONT (keyboard + inner screen) faces the camera!
        laptopScene.rotation.y = Math.PI;

        laptopScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.38;
              mat.metalness = 0.8;
              mat.needsUpdate = true;
            }
          }
        });

        // Integrated Code Screen attached flush on the laptop display
        const screenWidth = 1.48;
        const screenHeight = 0.94;
        const screenGeom = new THREE.PlaneGeometry(screenWidth, screenHeight);
        const screenMat = new THREE.MeshBasicMaterial({
          map: codeEngine.texture,
          side: THREE.DoubleSide,
        });
        const codeScreenMesh = new THREE.Mesh(screenGeom, screenMat);
        // Positioned inside the open display bezel
        codeScreenMesh.position.set(0, 0.48, -0.32);
        codeScreenMesh.rotation.x = -0.28; // Matches the physical laptop screen tilt

        // Subtle frame around screen
        const borderGeom = new THREE.EdgesGeometry(screenGeom);
        const borderMat = new THREE.LineBasicMaterial({
          color: 0x30363d,
          linewidth: 1,
        });
        const screenBorder = new THREE.LineSegments(borderGeom, borderMat);
        codeScreenMesh.add(screenBorder);

        laptopScene.add(codeScreenMesh);
        rootGroup.add(laptopScene);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadPercent(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.warn("Error loading laptop.glb:", err);
        setLoading(false);
      }
    );

    // Rotation & Drag Handling
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0.15; // Natural slight angle displaying keyboard and screen
    let targetRotX = 0.08;

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

      targetRotY += dx * 0.007;
      targetRotX += dy * 0.004;
      targetRotX = Math.max(-0.2, Math.min(0.5, targetRotX));

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

    // Animation Loop
    const clock = new THREE.Clock();
    const currentLookAt = new THREE.Vector3(0, 0.15, 0);

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Update code texture
      codeEngine.update(elapsedTime * 1000);

      // Gentle floating levitation
      rootGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.04;

      // Auto-rotation when idle
      if (autoRotate && !isDragging) {
        targetRotY += 0.0025;
      }

      // Smooth damping lerp
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

      // Camera lerp
      camera.position.lerp(cameraAnimRef.current.targetPos, 0.06);
      currentLookAt.lerp(cameraAnimRef.current.targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      // Particle drift
      particles.rotation.y = elapsedTime * 0.02;

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
      ringGeom.dispose();
      ringMat.dispose();
      pGeom.dispose();
      pMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate]);

  return (
    <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] flex items-center justify-center select-none">
      {/* 3D Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#090a0f]/90 backdrop-blur-md rounded-3xl border border-white/5">
          <div className="w-12 h-12 border-2 border-white/10 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-sm font-mono text-slate-300 font-medium">
            Cargando Estación 3D...
          </p>
          <div className="w-48 bg-zinc-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${Math.max(loadPercent, 20)}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 font-mono mt-2">
            {loadPercent > 0 ? `${loadPercent}%` : "Iniciando WebGL..."}
          </span>
        </div>
      )}

      {/* Camera Presets Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none px-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0e1118]/85 backdrop-blur-md border border-white/10 shadow-xl pointer-events-auto">
          <button
            onClick={() => setCameraPreset("front")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              currentView === "front"
                ? "bg-white/15 text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Frontal</span>
          </button>

          <button
            onClick={() => setCameraPreset("screen")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              currentView === "screen"
                ? "bg-white/15 text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Código</span>
          </button>

          <button
            onClick={() => setCameraPreset("top")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              currentView === "top"
                ? "bg-white/15 text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Move3d className="w-3.5 h-3.5" />
            <span>Superior</span>
          </button>
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl backdrop-blur-md border text-xs font-mono transition-all shadow-xl pointer-events-auto ${
            autoRotate
              ? "bg-white/10 border-white/20 text-white hover:bg-white/15"
              : "bg-[#0e1118]/85 border-white/10 text-slate-400 hover:text-slate-200"
          }`}
          title="Alternar rotación automática"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">
            {autoRotate ? "Rotando" : "Pausado"}
          </span>
        </button>
      </div>

      {/* Bottom helper badges */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none px-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e1118]/85 backdrop-blur-md border border-white/10 text-xs text-slate-300 font-mono shadow-lg pointer-events-auto">
          <Move3d className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Arrastra para rotar 360° en cualquier ángulo</span>
        </div>

        <button
          onClick={() => setCameraPreset("front")}
          className="p-2 rounded-full bg-[#0e1118]/85 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white transition-colors pointer-events-auto shadow-lg"
          title="Reiniciar perspectiva"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};