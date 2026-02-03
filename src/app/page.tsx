import Link from "next/link";
import { getAllProjects, getExperience, getProfile } from "@/lib/content";
import ProjectCard from "@/components/project-card";

export default async function HomePage() {
  const profile = await getProfile();
  const projects = await getAllProjects();
  const experiences = await getExperience();

  const featuredSlugs = new Set([
    "implantable-cardiac-electrogram-pacemaker",
    "manufacturing-automation-system",
    "multi-modal-biopotential-amplifier",
    "molecular-dynamics-data-pipelines",
  ]);

  const featured = projects.filter((project) => featuredSlugs.has(project.slug));

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">
              Engineering Portfolio
            </p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
              {profile.name}
            </h1>
            <p className="text-lg text-muted">{profile.headline}</p>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {profile.about}
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            {profile.location ? (
              <span className="rounded-full border border-border px-4 py-2">
                {profile.location}
              </span>
            ) : null}
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
            >
              {profile.email}
            </a>
            {profile.phone ? (
              <span className="rounded-full border border-border px-4 py-2">
                {profile.phone}
              </span>
            ) : null}
            {profile.linkedin ? (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-4 py-2 transition hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900 transition hover:brightness-110"
            >
              View Projects
            </Link>
            <Link
              href="/experience"
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
            >
              Experience Timeline
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card/70 p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Current Focus
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              Building automation and tracking systems for manufacturing lines.
            </li>
            <li>
              Designing embedded medical devices with robust signal conditioning.
            </li>
            <li>
              Developing computational pipelines for molecular dynamics research.
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Projects
            </h2>
            <p className="text-sm text-muted">
              A cross-section of automation, biomedical, and computational work.
            </p>
          </div>
          <Link href="/projects" className="text-sm text-accent">
            Explore all projects {"->"}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Experience Snapshot
          </h2>
          <p className="text-sm text-muted">
            Industry, research, and design leadership roles.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {experiences.map((item) => (
            <div
              key={item.slug}
              className="rounded-2xl border border-border bg-card/70 p-5"
            >
              <p className="text-xs uppercase tracking-wide text-muted">
                {item.dates}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-muted">{item.organization}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
