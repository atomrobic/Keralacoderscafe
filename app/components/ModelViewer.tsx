"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, PerspectiveCamera, ContactShadows, Float, Html, useProgress, Stage, Center } from "@react-three/drei";
import { Suspense, useMemo, Component, ReactNode, useState, useRef } from "react";
import { Box3, Vector3 } from "three";
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Maximize2 } from "lucide-react";

class ErrorBoundary extends Component<{ children: ReactNode; fallback: (error: Error) => ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) return this.props.fallback(this.state.error!);
    return this.props.children;
  }
}

function Loader({ error }: { error?: string }) {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4 text-center px-4 w-64 md:w-80">
        {error ? (
          <div className="bg-red-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="material-symbols-outlined text-red-500 text-3xl mb-2">error</span>
            <p className="font-black uppercase text-xs tracking-tighter text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="w-48 h-2 bg-black border-2 border-black relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-black uppercase text-xs tracking-tighter">Loading 3D {Math.round(progress)}%</span>
            <p className="text-[10px] font-bold opacity-50 uppercase mt-1">Direct .glb link required</p>
          </>
        )}
      </div>
    </Html>
  );
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer({ modelUrl }: { modelUrl: string }) {
  const orbitRef = useRef<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const handleZoom = (delta: number) => {
    if (orbitRef.current) {
      orbitRef.current.setAzimuthalAngle(orbitRef.current.getAzimuthalAngle() + 0.1); // Small nudge
      // Manual zoom via camera distance is better handled via controls directly.
    }
  };

  const resetView = () => {
    if (orbitRef.current) {
      orbitRef.current.reset();
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
      
      {/* 📊 Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter border-2 border-black group-hover:bg-yellow-400 group-hover:text-black transition-colors w-fit">
          High fidelity Render
        </div>
      </div>

      {/* 🛠️ Interactive Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={resetView}
          title="Reset View"
          className="p-2 hover:bg-yellow-400 border-2 border-transparent hover:border-black transition-all"
        >
          <RefreshCw size={20} strokeWidth={3} />
        </button>
        <div className="w-[2px] h-6 bg-black" />
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? "Stop Rotation" : "Start Rotation"}
          className={`p-2 border-2 border-transparent hover:border-black transition-all ${autoRotate ? 'bg-yellow-400 border-black' : 'hover:bg-yellow-400'}`}
        >
          <RotateCw size={20} strokeWidth={3} className={autoRotate ? 'animate-spin-slow' : ''} />
        </button>
        <div className="w-[2px] h-6 bg-black" />
        <p className="px-2 font-black uppercase text-[10px] tracking-widest hidden md:block">Interactive View</p>
      </div>

      {/* 💡 Hint Overlay */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-y-0 group-hover:-translate-y-1 transition-transform">
          <Maximize2 size={14} className="text-black" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Drag to Orbit • Scroll to Zoom</span>
        </div>
      </div>
      
      <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 5, 5], fov: 45 }}>
        <ErrorBoundary fallback={(err) => <Loader error={err.message.includes("Unexpected token") ? "Invalid File Format (Check if URL is a direct .glb link)" : err.message} />}>
          <Suspense fallback={<Loader />}>
            <Stage intensity={0.5} environment="city" adjustCamera shadow={{ type: 'contact', opacity: 0.2 }}>
               <Center>
                  <Model url={modelUrl} />
               </Center>
            </Stage>
            
            <OrbitControls 
              ref={orbitRef}
              makeDefault
              enableDamping={true}
              dampingFactor={0.05}
              autoRotate={autoRotate}
              autoRotateSpeed={2}
              minDistance={2}
              maxDistance={15}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Suspense>
        </ErrorBoundary>
      </Canvas>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
