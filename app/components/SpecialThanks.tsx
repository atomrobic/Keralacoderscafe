"use client";

import { useEffect, useMemo, useState } from "react";
import SectionReveal from "./SectionReveal";

interface Contributor {
  id: number;
  login: string;
}

const fallbackNames = [
  "Kerala Coders Cafe",
  "Open Source Builders",
  "Community Contributors",
  "Curious Developers",
];

export default function SpecialThanks() {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    let ignore = false;

    async function loadContributors() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=24"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const data = await response.json();

        if (!ignore && Array.isArray(data)) {
          setContributors(data);
        }
      } catch (error) {
        console.error("Error fetching contributors for marquee:", error);
      }
    }

    loadContributors();

    return () => {
      ignore = true;
    };
  }, []);

  const names = useMemo(() => {
    const source = contributors.length
      ? contributors.map((contributor) => contributor.login)
      : fallbackNames;

    return [...source, ...source, ...source];
  }, [contributors]);

  return (
    <section
      id="thanks"
      className="border-y border-white/8 bg-black px-0 py-24 text-white"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <SectionReveal className="max-w-[760px]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/42">
            Special Thanks
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-white">
            Recognition for the people
            <span className="ml-3 font-[family-name:var(--font-editorial)] italic text-white/76">
              moving this forward.
            </span>
          </h2>
          <p className="mt-5 max-w-[620px] text-base leading-8 text-white/58 md:text-lg">
            A small thank-you to the contributors who keep the website and
            community in motion.
          </p>
        </SectionReveal>
      </div>

      <div className="mt-12 space-y-4 overflow-hidden">
        <div className="marquee-shell">
          <div className="marquee-track">
            {names.map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="inline-flex items-center gap-4 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-lg font-medium tracking-[-0.03em] text-white/84"
              >
                {name}
                <span className="h-1.5 w-1.5 rounded-full bg-white/28" />
              </span>
            ))}
          </div>
        </div>

        <div className="marquee-shell">
          <div className="marquee-track marquee-track-reverse">
            {names.map((name, index) => (
              <span
                key={`reverse-${name}-${index}`}
                className="inline-flex items-center gap-4 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-lg font-medium tracking-[-0.03em] text-white/68"
              >
                {name}
                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
