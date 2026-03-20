import Link from "next/link";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { GITHUB_REPO_URL, WHATSAPP_GATE_PATH } from "../lib/site-links";

const cards = [
  {
    title: "Join the chat",
    description:
      "Meet other developers, ask questions, and stay close to what the community is building.",
    href: WHATSAPP_GATE_PATH,
    label: "Complete quick task",
    icon: MessageCircle,
    rotation: "-rotate-[1.15deg]",
  },
  {
    title: "Contribute on GitHub",
    description:
      "Help shape the website, improve the repo, and build useful things with the community.",
    href: GITHUB_REPO_URL,
    label: "View repository",
    icon: Github,
    rotation: "rotate-[1deg]",
  },
];

export default function JoinCTA() {
  return (
    <section id="join" className="border-t border-[color:var(--ui-border-soft)] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <SectionReveal className="max-w-[700px]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Get involved
            </p>
            <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
              Pick a simple way to
              <span className="ml-4 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.035em] text-[color:var(--ui-page-text)] [text-shadow:0_2px_12px_rgba(255,255,255,0.08)]">
                join in.
              </span>
            </h2>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[color:var(--ui-page-text-muted)]">
              You can start by joining the conversation, or jump into the repo
              and contribute directly. Both paths help the community move
              forward.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-4 py-2 text-sm text-[color:var(--ui-page-text-muted)]">
                open to beginners
              </div>
              <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-4 py-2 text-sm text-[color:var(--ui-page-text-muted)]">
                build in public
              </div>
              <div className="border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-4 py-2 text-sm text-[color:var(--ui-page-text-muted)]">
                learn with others
              </div>
            </div>
          </SectionReveal>

          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <SectionReveal
                  key={card.title}
                  delay={0.08 + index * 0.06}
                  y={22}
                >
                  <Link
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener" : undefined}
                    className={`cursor-pencil note-pinned group relative flex h-full min-h-[330px] flex-col overflow-hidden border border-black/12 bg-[linear-gradient(180deg,#fafaf7_0%,#f3f1eb_100%)] px-6 pb-6 pt-10 text-black shadow-[0_26px_62px_rgba(0,0,0,0.24)] transition-all duration-300 hover:rotate-0 hover:shadow-[0_34px_78px_rgba(0,0,0,0.28)] ${card.rotation}`}
                  >
                    <div className="note-nail" />
                    <div className="note-hole" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0,transparent_34px,rgba(0,0,0,0.045)_34px,rgba(0,0,0,0.045)_35px)] bg-[length:100%_35px]" />
                    <div className="pointer-events-none absolute inset-y-0 left-7 w-px bg-rose-300/45" />

                    <div className="relative pl-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="grid h-12 w-12 place-items-center border border-black/10 bg-black/[0.03] shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
                          <Icon className="h-5 w-5 text-black/78" />
                        </div>

                        <div className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/38">
                          <span className="h-2 w-2 bg-black/55" />
                          {index === 0 ? "Community" : "Open Source"}
                        </div>
                      </div>

                      <h3 className="mt-7 text-[1.75rem] font-semibold leading-tight tracking-[-0.045em] text-black">
                        {card.title}
                      </h3>

                      <p className="mt-4 max-w-[30ch] text-base leading-7 text-black/60">
                        {card.description}
                      </p>
                    </div>

                    <div className="relative mt-auto pl-4">
                      <div className="border-t border-black/10 pt-5">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-black/60 transition-colors duration-300 group-hover:text-black">
                          {card.label}
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
