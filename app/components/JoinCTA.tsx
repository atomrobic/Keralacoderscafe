"use client";

import Link from "next/link";
import PlugConnectedIcon from "@/components/ui/plug-connected-icon";
import GithubIcon from "@/components/ui/github-icon";
import UsersGroupIcon from "@/components/ui/users-group-icon";

export default function JoinCTA() {
  return (
    <section id="join" className="relative py-32 px-6 text-center bg-kcc-bg border-y border-kcc-border">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--kcc-gold)_0,transparent_70%)] pointer-events-none" />

      <span className="text-xs tracking-[0.5em] text-kcc-gold uppercase mb-6 block animate-fade-in">
        Join the movement
      </span>
      <h2
        className="text-5xl md:text-7xl italic text-kcc-accent mb-8 leading-[1.1]"
        style={{ fontFamily: "var(--font-newsreader)" }}
      >
        Ready to be part of something<br />bigger?
      </h2>
      <p className="text-kcc-text-dim max-w-2xl mx-auto mb-12 animate-fade-in-up">
        Whether you&apos;re a seasoned developer or just starting out, there&apos;s a place for
        you in Kerala Coders Cafe. Let&apos;s build the future together.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
            target="_blank"
            rel="noopener"
            className="border border-kcc-border text-kcc-accent px-10 py-5 text-sm tracking-widest uppercase font-semibold hover:bg-white/5 hover:border-kcc-gold transition-all duration-300 inline-flex items-center justify-center gap-3 group"
          >
            <GithubIcon size={20} className="group-hover:stroke-kcc-gold" />
            Fork on GitHub
          </Link>
          <Link
            href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
            target="_blank"
            rel="noopener"
            className="bg-kcc-accent text-kcc-bg px-10 py-5 text-sm tracking-widest uppercase font-semibold hover:bg-kcc-gold transition-all duration-300 inline-flex items-center justify-center gap-3 group"
          >
            <UsersGroupIcon size={20} color="black" className="group-hover:stroke-black" />
            Join Community
          </Link>
      </div>
    </section>
  );
}
