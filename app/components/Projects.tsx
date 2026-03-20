import { Github } from "lucide-react";
import SectionReveal from "./SectionReveal";

const projects = [
  {
    title: "Kerala Dev Directory",
    description:
      "A home for member profiles, skills, and discovery so people can find collaborators across the community.",
    tags: ["community", "profiles", "network"],
  },
  {
    title: "Tech Events Calendar",
    description:
      "A clearer way to track meetups, workshops, and community happenings across Kerala.",
    tags: ["events", "discover", "updates"],
  },
  {
    title: "Open Source Tracker",
    description:
      "A simple stream of community contributions, issues, and work worth noticing.",
    tags: ["open source", "visibility", "shipping"],
  },
  {
    title: "Learning Hub",
    description:
      "Curated guides and practical resources for the next wave of developers growing through the community.",
    tags: ["learning", "guides", "resources"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-[color:var(--ui-border-soft)] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <SectionReveal>
          <div className="max-w-[980px]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Projects
            </p>
            <h2 className="mt-5 text-[clamp(2.6rem,5vw,5.1rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[color:var(--ui-page-text)] lg:whitespace-nowrap">
              Simple ideas with
              <span className="ml-3 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.03em] text-[color:var(--ui-page-text)]">
                real value.
              </span>
            </h2>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <SectionReveal
              key={project.title}
              delay={0.08 + index * 0.06}
              y={24}
            >
              <article className="group relative flex h-full min-h-[320px] flex-col overflow-hidden border border-black/10 bg-[linear-gradient(180deg,#fafaf7_0%,#f3f2ec_100%)] p-7 text-black shadow-[0_22px_52px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_68px_rgba(0,0,0,0.28)]">
                <div className="absolute inset-x-0 top-0 h-px bg-black/8" />
                <div className="absolute left-0 top-0 h-full w-1 bg-black/5" />

                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex border border-black/10 bg-black/[0.03] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/42">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/38">
                    <span className="h-2 w-2 bg-black/55" />
                    Community Project
                  </div>
                </div>

                <h3 className="mt-6 text-[1.7rem] font-semibold leading-tight tracking-[-0.04em] text-black">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-[34ch] text-base leading-7 text-black/62">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="border border-black/10 bg-white/55 px-3 py-1.5 text-sm text-black/58"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-black/10 pt-6">
                  <div className="inline-flex items-center gap-2 text-sm text-black/48">
                    <Github className="h-4 w-4" />
                    GitHub soon
                  </div>

                  <div className="text-sm text-black/42">
                    Not clickable yet
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
