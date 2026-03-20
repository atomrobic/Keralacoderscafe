"use client";

import Link from "next/link";
import { type MouseEvent, useRef } from "react";
import { Github, MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionReveal from "./SectionReveal";
import { GITHUB_REPO_URL, WHATSAPP_GATE_PATH } from "../lib/site-links";

const notePoints = [
  "ask good questions",
  "learn in public",
  "build with others",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const noteY = useTransform(scrollYProgress, [0, 1], [0, 44]);

  function handleNoteMove(event: MouseEvent<HTMLDivElement>) {
    const element = noteRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform =
      `perspective(1200px) rotateX(${(-offsetY * 5.5).toFixed(2)}deg) ` +
      `rotateY(${(offsetX * 7.5).toFixed(2)}deg) rotateZ(${(-1.2 + offsetX * 2.4).toFixed(2)}deg)`;
  }

  function resetNote() {
    const element = noteRef.current;
    if (!element) return;

    element.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) rotateZ(-1.2deg)";
  }

  return (
    <header
      ref={sectionRef}
      className="relative overflow-clip border-b border-[color:var(--ui-border-soft)] px-6 pb-24 pt-32 md:px-12 lg:min-h-[100svh] lg:pb-32 lg:pt-40"
    >
      <div className="absolute inset-0 -z-20 bg-kcc-bg" />
      <motion.div style={{ y: gridY }} className="noise-overlay -z-10 opacity-100" />
      <motion.div
        style={{ y: orbY }}
        className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-[color:var(--ui-orb)] blur-[120px]"
      />
      <motion.div
        style={{ y: noteY }}
        className="absolute right-[-6rem] top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-[color:var(--ui-hero-glow)] blur-[180px]"
      />

      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)]">
          <SectionReveal className="max-w-[720px]">
            <h1 className="max-w-[820px] text-[clamp(3.5rem,9vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-[color:var(--ui-page-text)]">
              Kerala Coders
              <span className="ml-4 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.035em] text-[color:var(--ui-page-text)] [text-shadow:0_2px_12px_rgba(255,255,255,0.08)]">
                Cafe
              </span>
            </h1>

            <p className="mt-7 max-w-[620px] text-[1.05rem] leading-8 text-[color:var(--ui-page-text-muted)] md:text-lg">
              A vibrant community of developers, designers, and tech
              enthusiasts from Kerala. Building the future, one commit at a
              time.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[color:var(--ui-button-primary-bg)] px-6 text-sm font-semibold text-[color:var(--ui-button-primary-text)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>

              <Link
                href={WHATSAPP_GATE_PATH}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-button-secondary-bg)] px-6 text-sm font-semibold text-[color:var(--ui-button-secondary-text)] transition-transform duration-300 hover:-translate-y-1 hover:bg-[color:var(--ui-button-secondary-hover)]"
              >
                <MessageCircle className="h-4 w-4" />
                Join WhatsApp
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal
            className="relative mx-auto hidden w-full max-w-[500px] md:block"
            delay={0.12}
          >
            <motion.div style={{ y: noteY }} className="relative pt-8">
              <div
                ref={noteRef}
                onMouseMove={handleNoteMove}
                onMouseLeave={resetNote}
                className="cursor-pencil note-pinned relative rounded-[1.8rem] border border-black/12 bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f4_100%)] p-7 text-black shadow-[0_36px_100px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out will-change-transform sm:p-8"
                style={{
                  transform:
                    "perspective(1200px) rotateX(0deg) rotateY(0deg) rotateZ(-1.2deg)",
                }}
              >
                <div className="note-nail" />
                <div className="note-hole" />
                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-[linear-gradient(transparent_0,transparent_39px,rgba(0,0,0,0.06)_39px,rgba(0,0,0,0.06)_40px)] bg-[length:100%_40px]" />
                <div className="pointer-events-none absolute inset-y-0 left-8 w-px bg-rose-300/40" />

                <div className="relative pl-5">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">
                    note for new people
                  </div>

                  <div className="mt-5 font-[family-name:var(--font-hand)] text-[2.35rem] leading-[1.03] text-black/80 sm:text-[2.7rem]">
                    <div>hi builder,</div>
                    <div className="mt-3">this is a place</div>
                    <div>to grow with</div>
                    <div>good people.</div>
                  </div>

                  <div className="mt-9 space-y-3 font-[family-name:var(--font-hand)] text-[1.45rem] text-black/72 sm:text-[1.6rem]">
                    {notePoints.map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <span className="text-black/46">-</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4 border-t border-black/10 pt-5">
                    <div className="font-[family-name:var(--font-hand)] text-[1.65rem] leading-none text-black/64">
                      see you in KCC
                    </div>
                    <div className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-xs uppercase tracking-[0.18em] text-black/46">
                      700+ developers
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </header>
  );
}
