"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Language } from "../site-navbar";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=85", title: "Find your people" },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85", title: "Share the taxi route" },
  { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85", title: "Ngoa-Ekelle departures" },
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85", title: "Agree contributions" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85", title: "Leave after class" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85", title: "Build trust" },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=85", title: "Meet your group" },
  { src: "/chateau-ngoakelle.jpg", title: "Château Ngoa-Ekelle" },
  { src: "/university-campus.png", title: "University of Yaoundé I" },
  { src: "/yango-taxi.png", title: "Yango pickup" },
  { src: "/yellow-taxis.png", title: "Yellow taxis in Yaoundé" },
  { src: "/waka-passengers.png", title: "Waka together" },
];

interface TunnelCardData {
  item: (typeof IMAGES)[number];
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

const TUNNEL_CARDS: TunnelCardData[] = IMAGES.map((item, index) => {
  const goldenAngle = index * 137.5 * (Math.PI / 180);

  return {
    item,
    angleCos: Math.cos(goldenAngle),
    angleSin: Math.sin(goldenAngle),
    radiusFactorX: 0.28 + (index % 3) * 0.08,
    radiusFactorY: 0.26 + (index % 2) * 0.09,
    rotationZ: (index % 2 === 0 ? 1 : -1) * (3 + (index % 5) * 2),
    index,
  };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;
  const localProgress = useTransform(progress, [start, end], [0, 1]);
  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));
  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;
  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currentZ, pointerX, pointerY]: number[]) =>
      `translate3d(calc(-50% + ${baseX - pointerX * panStrength}px), calc(-50% + ${baseY - pointerY * panStrength}px), ${currentZ}px) rotateZ(${card.rotationZ}deg)`,
  );

  return (
    <motion.div
      style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
      className="pointer-events-auto absolute left-1/2 top-1/2 aspect-[4/5] cursor-pointer select-none will-change-transform"
    >
      <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-2xl shadow-neutral-950/20 ring-1 ring-black/10 transition-all duration-500 hover:ring-indigo-500/70 hover:shadow-indigo-500/25 dark:bg-neutral-900 dark:shadow-black/90 dark:ring-white/15 dark:hover:ring-white/40 dark:hover:shadow-white/10">
        <img
          src={card.item.src}
          alt={card.item.title}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 sm:p-5">
          <span className="text-xs font-mono uppercase tracking-widest text-white/95 drop-shadow-md sm:text-sm">
            {card.item.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface PerspectiveTunnelHeroProps {
  language: Language;
}

export default function PerspectiveTunnelHero({ language }: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      const current = rawProgress.get();
      const atStart = current <= 0 && event.deltaY < 0;
      const atEnd = current >= 1 && event.deltaY > 0;

      if (atStart || atEnd) return;

      event.preventDefault();
      const next = Math.min(1, Math.max(0, current + event.deltaY * 0.0008));
      rawProgress.set(next);
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, [rawProgress]);

  const pointer = useCameraParallax(!reduce);
  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[100svh] w-screen select-none items-center justify-center overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white"
      style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-70 [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] dark:bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] dark:opacity-65" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_75%)]" />
      <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-indigo-500/15 dark:border-white/10" />
      <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-neutral-300/60 dark:border-white/10" />

      <motion.div
        style={{ scale: titleScale, opacity: titleOpacity }}
        className="pointer-events-none z-0 flex max-w-xl flex-col items-center px-6 text-center"
      >
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.4em] text-indigo-600 dark:text-neutral-300">
          {language === "fr" ? "Le tableau de départ" : "The departure board"}
        </p>
        <h1 className="bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-400 bg-clip-text text-5xl font-bold leading-[0.9] tracking-tighter text-transparent sm:text-7xl md:text-8xl dark:from-white dark:via-white dark:to-white/40">
          {language === "fr" ? "WAKA" : "WAKA"}
          <br />
          {language === "fr" ? "ENSEMBLE." : "RIDE SHARE."}
        </h1>
        <p className="mt-4 max-w-[36ch] text-sm font-light text-neutral-600 sm:text-base dark:text-neutral-400">
          {language === "fr"
            ? "Trouvez des personnes qui vont dans votre direction, organisez votre départ et rentrez ensemble."
            : "Find people going your way, organise your departure, and get home together."}
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: promptOpacity }}
        className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400"
      >
        <span>{language === "fr" ? "Faites défiler pour découvrir Waka" : "Scroll to discover Waka"}</span>
        <div className="h-6 w-px bg-gradient-to-b from-indigo-500 to-transparent dark:from-white dark:to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {TUNNEL_CARDS.map((card) => (
          <TunnelCard
            key={card.index}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={TUNNEL_CARDS.length}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
}
