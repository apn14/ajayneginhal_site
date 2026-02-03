import Link from "next/link";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card/70 p-5 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted">
          <span>{project.context}</span>
          <span>{project.dates}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="text-sm text-muted">{project.summary}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
