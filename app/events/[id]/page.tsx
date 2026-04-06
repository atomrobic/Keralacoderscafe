"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { REPOS, Project } from "@/lib/projects";
import { PROJECT_DETAILS, ProjectContent } from "@/lib/project-details";
import DiagonalGrid from "@/components/ui/demo";
import BackgroundGlow from "@/components/ui/background-components";
import ModelViewer from "@/app/components/ModelViewer";

/* ─── Reusable Components ─────────────────────────────────────── */

const StatCard = ({ bg, label, value }: { bg: string; label: string; value: string }) => (
  <div className={`${bg} border-4 border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center`}>
    <div className="text-2xl md:text-4xl font-black tracking-tighter">{value}</div>
    <div className="font-bold uppercase text-xs md:text-sm tracking-widest mt-2 opacity-75">{label}</div>
  </div>
);

const FeatureCard = ({ icon, label, bg }: { icon: string; label: string; bg: string }) => (
  <div className="flex items-center gap-3 md:gap-4 bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors cursor-default">
    <div className={`${bg} border-2 border-black p-2 flex-shrink-0`}>
      <span className="material-symbols-outlined text-xl md:text-2xl">{icon}</span>
    </div>
    <span className="font-bold text-sm md:text-lg uppercase tracking-tight leading-tight">{label}</span>
  </div>
);

const TeamMember = ({ name, role, img, shadow }: { name: string; role: string; img: string; shadow: string }) => (
  <div className="flex flex-col items-center gap-3 group">
    <div className={`w-32 h-32 md:w-48 md:h-48 border-4 border-black rounded-full overflow-hidden ${shadow} group-hover:scale-105 transition-transform duration-300`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="text-center">
      <h3 className="text-xl md:text-2xl font-black uppercase group-hover:text-amber-500 transition-colors">{name}</h3>
      <p className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">{role}</p>
    </div>
  </div>
);

/* ─── Bespoke Project Detail ─────────────────────────────────────── */

function BespokeProjectDetail({ content }: { content: ProjectContent }) {
  const { hero, userFeatures, ownerFeatures, why, team, progress, vision } = content;

  return (
    <DiagonalGrid className="bg-background text-on-background font-body min-h-screen">
      <BackgroundGlow className="absolute inset-0 pointer-events-none z-0" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@800;900&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 48; }
        h1, h2, h3, h4 { font-family: 'Epilogue', sans-serif; }
      `}</style>

      <div className="relative px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto space-y-16 md:space-y-24">

        {/* Hero Section */}
        <section className={`grid ${hero.img ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8 lg:gap-12 items-center`}>
          <div className={`order-2 lg:order-1 mt-6 sm:mt-8 lg:mt-0 space-y-8 ${!hero.img ? 'text-center max-w-4xl mx-auto' : ''}`}>
            <div className={`inline-flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-yellow-400 font-black uppercase text-xs tracking-tighter shadow-[4px_4px_0px_0px_rgba(255,100,100,1)] ${!hero.img ? 'mx-auto' : ''}`}>
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              {hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
              {hero.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? <span className="bg-yellow-400 px-2">{word}</span> : word + ' '}
                </span>
              ))}
            </h1>
            <p className={`text-base md:text-xl font-medium leading-relaxed opacity-90 ${!hero.img ? 'mx-auto' : 'max-w-xl'}`}>
              {hero.intro}
            </p>
            <div className={`flex gap-4 ${!hero.img ? 'justify-center' : ''}`}>
              <button className="bg-primary text-on-primary border-4 border-black px-6 md:px-10 py-3 md:py-5 text-lg md:text-2xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                Try Prototype
              </button>
            </div>
          </div>
          {(content.glbModel || hero.img) && (
            <div className={`order-1 lg:order-2 relative group w-full ${!content.glbModel ? 'aspect-video md:aspect-auto' : 'aspect-square lg:aspect-auto lg:h-[600px]'}`}>
              {content.glbModel ? (
                <div className="w-full h-full">
                  <ModelViewer modelUrl={content.glbModel} />
                </div>
              ) : (
                <>
                  <div className="absolute -top-4 -left-4 w-full h-full bg-secondary-container border-4 border-black hidden md:block"></div>
                  <div className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full h-full overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hero.img} alt={hero.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* Vision & Progress */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,74,34,1)] relative overflow-hidden">
            <div className="absolute -top-3 -left-2 bg-black text-white px-4 py-2 font-black text-xs uppercase tracking-widest border-2 border-black z-10">Our Vision</div>
            <h2 className="text-2xl md:text-5xl font-black uppercase mb-6 tracking-tighter pt-4 leading-none">The Trusted <span className="text-green-600 underline">Discovery</span> Platform</h2>
            <p className="leading-relaxed font-bold text-lg opacity-80 mb-6">{vision}</p>
          </div>
          <div className="bg-yellow-400 border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,106,52,1)] relative">
            <div className="absolute -top-3 -left-2 bg-secondary text-white px-4 py-2 font-black text-xs uppercase tracking-widest border-2 border-black z-10">Project Progress</div>
            <h2 className="text-2xl md:text-5xl font-black uppercase mb-6 tracking-tighter pt-4 leading-none">{progress.phase}</h2>
            <p className="leading-relaxed opacity-75 font-bold mb-8">Platform is currently in community-vetting phase. Volunteers are mapping local shops and verifying hygiene standards across three districts.</p>
            <div className="space-y-4">
              <div className="h-6 bg-white border-2 border-black rounded-sm overflow-hidden flex">
                <div className="h-full bg-black transition-all duration-1000" style={{ width: `${progress.percentage}%` }}></div>
              </div>
              <div className="flex justify-between items-center font-black uppercase text-sm tracking-widest">
                <span>Development</span>
                <span>{progress.percentage}% Complete</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features for Users */}
        <section>
          <h2 className="text-2xl md:text-5xl font-black uppercase mb-8 md:mb-16 tracking-tighter border-l-8 border-black pl-4 md:pl-8">
            What Food Explorers Can Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {userFeatures.map((f) => <FeatureCard key={f.label} {...f} />)}
          </div>
        </section>

        {/* Features for Owners */}
        <section className="bg-white border-4 border-black p-10 md:p-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl md:text-5xl font-black uppercase mb-12 tracking-tighter">For Business Owners</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {ownerFeatures.map((f) => (
              <div key={f.label} className="flex gap-6 items-start group">
                <div className={`${f.bg} border-4 border-black p-3 group-hover:rotate-6 transition-transform`}>
                  <span className="material-symbols-outlined text-4xl">{f.icon}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-xl uppercase tracking-tight">{f.label.split(":")[0]}</h3>
                  <p className="font-bold opacity-60 leading-tight">{f.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Platform */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Why this <br /> <span className="bg-red-400 px-3">Platform?</span></h2>
          <div className="space-y-4">
            {why.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-2xl border-2 border-black group-hover:bg-yellow-400 group-hover:text-black transition-all">{idx + 1}</div>
                <p className="font-black uppercase text-lg md:text-2xl tracking-tighter group-hover:translate-x-2 transition-transform">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Contribution Member List</h2>
            <p className="font-bold uppercase tracking-widest opacity-60 mt-4 underline decoration-black underline-offset-4 decoration-2">Building Kerala&apos;s Digital Heritage</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            {team.map((person) => <TeamMember key={person.name} {...person} />)}
          </div>
        </section>

        {/* CTA / Conclusion */}
        <section className="bg-black text-white p-10 md:p-24 border-4 border-yellow-400 text-center relative overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container -mr-16 -mt-16 rotate-45 border-4 border-black"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-container -ml-16 -mb-16 rotate-45 border-4 border-black"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-8xl font-black uppercase text-yellow-400 tracking-tighter leading-none italic">
              Protecting Tradition
            </h2>
            <p className="text-lg md:text-3xl font-medium leading-relaxed opacity-90 border-l-4 border-yellow-400 pl-8 text-left italic">
              This project is not just a listing platform. It is a community-driven initiative to promote Kerala’s traditional food culture, support local businesses, and help people discover the best local experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-400 text-black border-4 border-white px-10 py-5 text-xl md:text-3xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
                Become a Contributor
              </button>
            </div>
          </div>
        </section>
      </div>
    </DiagonalGrid>
  );
}

/* ─── Generic Project Detail ─────────────────────────────────────── */

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</div>
    <div className="text-slate-900 font-medium">{value}</div>
  </div>
);

function GenericProjectDetail({ project }: { project: Project }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 md:py-6">
          <a href="/events" className="text-slate-600 hover:text-slate-900 flex items-center gap-2 text-sm font-medium">
            ← Back to Projects
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-300">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          In Progress
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">{project.name}</h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{project.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <InfoCard label="Problem" value={project.problem} />
          <InfoCard label="Target Audience" value={project.audience} />
          <InfoCard label="Primary Language" value={project.language} />
          <InfoCard label="Submitted By" value={project.submittedBy || "Anonymous"} />
        </div>

        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Topics</div>
          <div className="flex flex-wrap gap-2">
            {project.topics.map((topic) => (
              <span key={topic} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
            View Document
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </main>
    </div>
  );
}

/* ─── Route ─────────────────────────────────────────────────────── */
export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const numId = parseInt(id, 10);
  const project = REPOS.find((r) => r.id === numId);
  const bespokeDetails = PROJECT_DETAILS[numId];

  if (!project) notFound();

  if (bespokeDetails) return <BespokeProjectDetail content={bespokeDetails} />;
  return <GenericProjectDetail project={project} />;
}
