import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import ProjectCaseStudy from "@/components/project-case-study";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);
  if (!result) {
    notFound();
  }

  const { body, ...project } = result;
  let narrative = null;

  if (body.trim().length > 0) {
    try {
      narrative = await renderMdx(body);
    } catch {
      narrative = null;
    }
  }

  return (
    <div className="space-y-12">
      {narrative ? (
        <section className="rounded-2xl border border-border bg-card/70 p-6">
          <div className="space-y-4">{narrative}</div>
        </section>
      ) : null}
      <ProjectCaseStudy project={project} />
    </div>
  );
}
