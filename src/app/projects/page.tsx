import { getAllProjects } from "@/lib/content";
import ProjectsGallery from "@/components/projects-gallery";

export const metadata = {
  title: "Projects",
  description: "Engineering projects across automation, biomedical devices, and research.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">Projects</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Technical Case Studies
        </h1>
        <p className="max-w-2xl text-base text-muted">
          Browse a curated catalog of systems spanning industrial automation,
          embedded medical devices, and computational research. Use filters to
          explore by context or technology stack.
        </p>
      </header>
      <ProjectsGallery projects={projects} />
    </div>
  );
}
