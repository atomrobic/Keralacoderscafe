import NavBar from "../components/NavBar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContributorsLoading() {
  return (
    <main className="relative z-10 overflow-x-clip bg-kcc-bg pb-24 text-kcc-text md:pb-0">
      <NavBar />

      <section className="relative z-10 px-6 pb-16 pt-28 md:px-12 md:pt-32">
        <div className="mx-auto max-w-[1320px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[0.8rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

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
        </div>
      </section>
    </main>
  );
}
