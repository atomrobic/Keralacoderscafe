"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, GitCommitHorizontal, Pin } from "lucide-react";
import { getFeaturedContributor } from "../lib/contributors";
import { useContributorsData } from "../lib/use-contributors-data";
import { GITHUB_REPO_URL } from "../lib/site-links";

const numberFormatter = new Intl.NumberFormat("en-IN");

function getRankAccent(index: number) {
  if (index === 0) {
    return {
      stripe: "bg-[#ffd84d]",
      badge: "bg-[#ffd84d] text-[color:var(--color-kcc-ink)]",
      label: "bg-[#fff2a8]",
      avatar: "bg-[#ffe175]",
    };
  }

  if (index === 1) {
    return {
      stripe: "bg-[#9be7ff]",
      badge: "bg-[#9be7ff] text-[color:var(--color-kcc-ink)]",
      label: "bg-[#dff8ff]",
      avatar: "bg-[#bdefff]",
    };
  }

  if (index === 2) {
    return {
      stripe: "bg-[#ffb7d8]",
      badge: "bg-[#ffb7d8] text-[color:var(--color-kcc-ink)]",
      label: "bg-[#ffe0ef]",
      avatar: "bg-[#ffd0e7]",
    };
  }

  return {
    stripe: "bg-[#dfd7cb]",
    badge: "bg-[#f0ebe2] text-[color:var(--color-kcc-ink)]",
    label: "bg-[#f6f2ea]",
    avatar: "bg-[#ebe4d8]",
  };
}

function getNameClasses(login: string) {
  if (login.length > 24) {
    return "text-[0.96rem] leading-[1.06] break-all";
  }

  if (login.length > 18) {
    return "text-[1.02rem] leading-[1.08] break-words";
  }

  return "text-[1.12rem] leading-[1.04]";
}

function ContributorsBackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-[0.8rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to home
    </Link>
  );
}

function ContributorsGridSkeleton() {
  return (
    <div className="mt-6 grid gap-4 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] p-4 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)]"
        >
          <div className="skeleton h-2 w-full rounded-[0.4rem]" />

          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="skeleton h-8 w-24 rounded-[0.65rem]" />
            <div className="skeleton h-8 w-14 rounded-[0.65rem]" />
          </div>

          <div className="mx-auto mt-4 skeleton h-[4.4rem] w-[4.4rem] rounded-[0.95rem]" />

          <div className="mt-5 space-y-2 text-center">
            <div className="mx-auto skeleton h-5 w-28 rounded-[0.55rem]" />
            <div className="mx-auto skeleton h-4 w-32 rounded-[0.55rem]" />
          </div>

          <div className="mt-4 skeleton h-[4.6rem] rounded-[0.85rem]" />
          <div className="mt-3 skeleton h-4 w-24 rounded-[0.55rem]" />
        </div>
      ))}
    </div>
  );
}

export default function ContributorsDirectory() {
  const { contributors, config, loading, error } = useContributorsData();

  return (
    <section className="relative z-10 px-6 pb-16 pt-28 md:px-12 md:pt-32">
      <div className="mx-auto max-w-[1320px]">
        <ContributorsBackButton />

        {error ? (
          <div className="mt-6 rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] p-6 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)]">
            <p className="text-lg font-black tracking-[-0.04em]">
              Contributors could not be loaded right now.
            </p>
            <p className="mt-2 max-w-[44rem] text-sm leading-7 text-black/70">
              {error}
            </p>
            <Link
              href={`${GITHUB_REPO_URL}/graphs/contributors`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-[0.8rem] border-2 border-[color:var(--color-kcc-ink)] bg-[#ffd84d] px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Open GitHub contributors
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : loading ? (
          <ContributorsGridSkeleton />
        ) : (
          <div className="mt-6 grid gap-4 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {contributors.map((contributor, index) => {
              const featuredContributor = getFeaturedContributor(
                config,
                contributor.login,
              );
              const accent = getRankAccent(index);

              return (
                <Link
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex min-h-[15.8rem] flex-col overflow-hidden rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] p-4 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--contributors-card-shadow-hover)]"
                >
                  <div className={`absolute inset-x-0 top-0 h-2 ${accent.stripe}`} />

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div
                      className={`inline-flex items-center gap-2 rounded-[0.7rem] border-2 border-[color:var(--color-kcc-ink)] px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[color:var(--color-kcc-ink)] ${accent.label}`}
                    >
                      <Pin className="h-3.5 w-3.5" />
                      {featuredContributor ? "Featured" : "Contributor"}
                    </div>

                    <div
                      className={`inline-flex min-w-14 items-center justify-center rounded-[0.7rem] border-2 border-[color:var(--color-kcc-ink)] px-3 py-1.5 text-[0.68rem] font-black tracking-[0.16em] ${accent.badge}`}
                    >
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <div
                      className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1rem] border-2 border-[color:var(--color-kcc-ink)] ${accent.avatar}`}
                    >
                      <div className="relative h-[3.9rem] w-[3.9rem] overflow-hidden rounded-[0.8rem] border-2 border-[color:var(--color-kcc-ink)] bg-white/85">
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h2
                      className={`font-black tracking-[-0.05em] text-[color:var(--color-kcc-ink)] ${getNameClasses(contributor.login)}`}
                    >
                      {contributor.login}
                    </h2>

                    <p className="mt-2 min-h-[2.35rem] text-[0.62rem] font-bold uppercase leading-5 tracking-[0.14em] text-black/60">
                      {featuredContributor?.role ?? "Community Contributor"}
                    </p>
                  </div>

                  <div className="mt-4 rounded-[0.85rem] border-2 border-[color:var(--color-kcc-ink)] bg-white/80 px-3 py-3">
                    <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-black/55">
                      Contributions
                    </div>

                    <div className="mt-2 flex items-end justify-between gap-3">
                      <span className="text-[1.55rem] font-black leading-none tracking-[-0.05em] text-[color:var(--color-kcc-ink)]">
                        {numberFormatter.format(contributor.contributions)}
                      </span>
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-[0.75rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)]">
                        <GitCommitHorizontal className="h-4 w-4 text-[color:var(--color-kcc-ink)]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-black/60">
                    <span>View profile</span>
                    <span className="inline-flex items-center gap-1 text-[color:var(--color-kcc-ink)]">
                      Open
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
