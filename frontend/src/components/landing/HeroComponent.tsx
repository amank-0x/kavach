import { useState, useEffect, useCallback, useRef } from "react";

// --- CONFIGURATION BLOCK ---
export const CONFIG = {
  // Crimson / Alert Red palette
  primaryColor: "220, 38, 38",   // red-600
  secondaryColor: "239, 68, 68", // red-500

  // Animation speeds
  sphereRotationDuration: "240s",
  gridPanDuration: "180s",
  coreGlowDuration: "25s",

  // Depth & intensity
  wireframeOpacity: 0.65,
  wireframeShadowIntensity: 60,
  coreBlur: 200,
  parallaxDepth: 35,
  lerpFactor: 0.08,
  sphereDensity: 12,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function SphereHero() {
  const [targetMousePos, setTargetMousePos] = useState({ x: 0, y: 0 });
  const currentMousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  const animateLerp = useCallback(() => {
    currentMousePos.current.x = lerp(
      currentMousePos.current.x,
      targetMousePos.x,
      CONFIG.lerpFactor
    );
    currentMousePos.current.y = lerp(
      currentMousePos.current.y,
      targetMousePos.y,
      CONFIG.lerpFactor
    );
    setTargetMousePos(() => ({
      x: currentMousePos.current.x,
      y: currentMousePos.current.y,
    }));
    animationFrameRef.current = requestAnimationFrame(animateLerp);
  }, [targetMousePos.x, targetMousePos.y]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animateLerp);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animateLerp]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setTargetMousePos({
      x: (clientX - centerX) / centerX,
      y: (clientY - centerY) / centerY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const { x: smoothX, y: smoothY } = currentMousePos.current;
  const parallaxDepth = CONFIG.parallaxDepth;
  const rotationStrength = 5;

  const baseTranslate = `translate3d(${smoothX * parallaxDepth}px, ${smoothY * parallaxDepth}px, 0)`;
  const gridTranslate = `translate3d(${-smoothX * (parallaxDepth / 2)}px, ${-smoothY * (parallaxDepth / 2)}px, 0)`;
  const hazeTranslate = `translate3d(${smoothX * (parallaxDepth / 2)}px, ${smoothY * (parallaxDepth / 2)}px, 0)`;
  const tiltRotateX = smoothY * rotationStrength;
  const tiltRotateY = -smoothX * rotationStrength;

  const sphereRings = Array.from({ length: CONFIG.sphereDensity }, (_, i) => {
    const step = 90 / (CONFIG.sphereDensity / 2);
    const angle = i * step;
    return (
      <div
        key={`ring-${i}`}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `1px solid rgba(${CONFIG.primaryColor}, ${CONFIG.wireframeOpacity})`,
          boxShadow: `0 0 ${CONFIG.wireframeShadowIntensity}px rgba(${CONFIG.primaryColor}, 0.35)`,
          transform: i % 2 === 0 ? `rotateY(${angle}deg)` : `rotateX(${angle}deg)`,
        }}
      />
    );
  });

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center">

        {/* Layer 0 — Panning Grid */}
        <div
          className="absolute inset-0 grid-pan-anim"
          aria-hidden="true"
          style={{
            transform: gridTranslate,
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Layer 1 — Volumetric Haze */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            transform: hazeTranslate,
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CONFIG.primaryColor}, 0.18) 0%, transparent 55%)`,
            filter: "blur(140px)",
            opacity: 0.7,
            mixBlendMode: "screen",
          }}
        />

        {/* Layer 2 — Deep Base + Core Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            transform: baseTranslate,
            backgroundImage: `radial-gradient(at 50% 50%, rgba(${CONFIG.primaryColor}, 0.07) 0%, #030712 90%)`,
          }}
        >
          <div
            className="core-pulse-anim absolute rounded-full pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "420px",
              height: "420px",
              backgroundImage: `radial-gradient(circle, rgba(${CONFIG.secondaryColor}, 0.4) 0%, transparent 70%)`,
              filter: `blur(${CONFIG.coreBlur}px)`,
              boxShadow: `0 0 ${CONFIG.coreBlur / 2}px 30px rgba(${CONFIG.secondaryColor}, 0.18), 0 0 ${CONFIG.coreBlur}px 50px rgba(${CONFIG.primaryColor}, 0.12)`,
            }}
          />
        </div>

        {/* Layer 3 — Wireframe Sphere */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
          aria-hidden="true"
          style={{ perspective: "900px" }}
        >
          <div
            className="sphere-rotate-anim"
            style={{
              width: "700px",
              height: "700px",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateX(${tiltRotateX}deg) rotateY(${tiltRotateY}deg)`,
            }}
          >
            {sphereRings}
          </div>
        </div>

        {/* Layer 4 — Soft Bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            transform: baseTranslate,
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CONFIG.primaryColor}, 0.3) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(${CONFIG.secondaryColor}, 0.2) 0%, transparent 30%)`,
            mixBlendMode: "screen",
            filter: "blur(90px)",
            opacity: 0.9,
          }}
        />

        {/* Layer 5 — Film Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'url("https://cdn.21st.dev/assets/mirror/a7/a7723ec07acdbbcdda4e9de1d47d65cd28991ed00a3de07aa3720589bc9683f7.png")',
            backgroundSize: "200px",
            opacity: 0.05,
            mixBlendMode: "overlay",
          }}
        />

        {/* Layer 6 — Hero Content (z-40 so it stays strictly above background fade) */}
        <div className="relative z-40 flex flex-col items-center text-center max-w-4xl mx-auto px-8 gap-7">

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
          >
            AI-Powered Fake Identity
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #fca5a5 0%, #ef4444 60%, #dc2626 100%)",
              }}
            >
              &amp; Document Screening
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl font-medium"
            style={{ color: "#d1d5db", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            Kavach-AI combines automated{" "}
            <span className="text-red-400 font-semibold">OCR</span>,{" "}
            <span className="text-red-400 font-semibold">facial verification</span>, and{" "}
            <span className="text-red-400 font-semibold">Error Level Analysis (ELA)</span>{" "}
            to intercept sophisticated forgeries and generate instant risk scores.
          </p>

          {/* CTA Buttons - High Visibility Glass */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-2 relative z-50">
            <a
              href="/home"
              className="btn-glass btn-primary-glass min-w-[210px] w-56 sm:w-64 text-white font-extrabold text-base"
            >
              Get Started
            </a>

            <a
              href="/auth"
              className="btn-glass btn-ghost-glass min-w-[210px] w-56 sm:w-64 text-white font-extrabold text-base"
            >
              User Login
            </a>
          </div>

          {/* Fine-print */}
          <p className="text-xs tracking-wide mt-2" style={{ color: "#9ca3af" }}>
            Files encrypted in transit &nbsp;·&nbsp; Auto-deleted post-analysis &nbsp;·&nbsp; SIH 2026 — Problem Statement #26188
          </p>
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        {/* Bottom Atmospheric Fade to 100% Solid #030712 (z-10, strictly underneath content) */}
        <div
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none z-10"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(3, 7, 18, 0.3) 30%, rgba(3, 7, 18, 0.8) 70%, #030712 100%)",
          }}
        />
    </div>
  );
}
