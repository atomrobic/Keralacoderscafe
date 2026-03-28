"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Noto_Sans_Malayalam } from "next/font/google";

const malayalamFont = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const QUOTES = [
  { text: "PR merge ആയാൽ പിന്നെ party ആണ്!", sub: "When the PR drops, we celebrate" },
  { text: "Open source: നമ്മൾ എഴുതുന്നു, ലോകം ഉപയോഗിക്കുന്നു.", sub: "We code it, the world runs on it" },
  { text: "Code ഒളിച്ചു വെക്കരുത്, share ചെയ്യൂ!", sub: "Don't hide your code, open source it" },
  { text: "Fork it. Fix it. Ship it.", sub: "The Kerala open source way" },
  { text: "നമ്മുടെ code, നമ്മുടെ community.", sub: "Our code, our community" },
  { text: "ഒറ്റക്ക് code ചെയ്യുന്നതിലും രസം ഒരുമിച്ചാണ്.", sub: "Building together is always better" },
  { text: "Issues ഉണ്ടെങ്കിൽ PR ഇടൂ, കരഞ്ഞിട്ട് കാര്യമില്ല!", sub: "Don't cry over issues, raise a PR" },
  { text: "Local host-ൽ മാത്രം പോരാ, GitHub-ലും കിടക്കട്ടെ.", sub: "Take it from localhost to the world" },
];

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    // Only display loading bar on the Events and Join (Group) pages
    if (pathname !== "/events" && pathname !== "/join") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setQuoteIdx(Math.floor(Math.random() * QUOTES.length));

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 150);

    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
    }, 2200);

    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 800);

    return () => {
      clearTimeout(timeout);
      clearInterval(progressInterval);
      clearInterval(quoteInterval);
    };
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  const quote = QUOTES[quoteIdx];

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFEB3B] font-sans">
      {/* Dot grid bg */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="flex flex-col items-center gap-6 w-full max-w-lg px-6 z-10">

        {/* KCC Logo + name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center">
            <span className="text-[#FFEB3B] font-mono font-bold text-lg">KCC</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-black">KERALA CODERS CAFE</p>
            <p className={`text-xs text-gray-600 mt-0.5 ${malayalamFont.className}`}>കേരള കോഡേഴ്സ് കഫേ</p>
          </div>
        </div>

        {/* Loading title box */}
        <div className="bg-[#00AEEF] border-4 border-black px-6 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2 w-full text-center relative">
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-black" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-black" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-black" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-black" />
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Loading...
          </h1>
        </div>

        {/* Progress bar + % */}
        <div className="flex w-full items-end gap-4">
          <div className="flex-1 h-14 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-1 relative overflow-hidden">
            <div
              className="h-full bg-[#FF3B3B] border-r-4 border-black transition-all duration-150 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)" }}
              />
            </div>
          </div>
          <div className="bg-white border-4 border-black px-4 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-2 flex-shrink-0 min-w-[5rem] text-center">
            <span className="font-black text-2xl tracking-tighter text-black">{progress}%</span>
          </div>
        </div>

        {/* Inspiration quote */}
        <div className="text-center transition-all duration-300">
          <p className={`text-sm font-semibold text-black ${malayalamFont.className}`}>{quote.text}</p>
          <p className="text-xs text-gray-600 mt-1">{quote.sub}</p>
        </div>

      </div>
    </div>
  );
}