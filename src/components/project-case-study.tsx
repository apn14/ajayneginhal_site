import type { Project } from "@/lib/content";
import Figure from "@/components/figure";
import CodeBlock from "@/components/code-block";

type ProjectCaseStudyProps = {
  project: Project;
};

const splitParagraphs = (body: string) =>
  body.split(/\n\s*\n/).map((paragraph) => paragraph.trim());

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted">
          <span>{project.context}</span>
          <span className="h-1 w-1 rounded-full bg-muted" />
          <span>{project.dates}</span>
          <span className="h-1 w-1 rounded-full bg-muted" />
          <span>{project.role}</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-base text-muted">{project.summary}</p>
        </div>
        {project.hero ? (
          <Figure
            image={project.hero.image}
            alt={project.hero.alt}
            caption={project.hero.caption}
          />
        ) : null}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Key Reminders
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
            {project.reminders.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.links.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Links
              </p>
              <ul className="space-y-2 text-sm text-muted">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <div className="space-y-10">
        {project.sections.map((section) => (
          <section key={section.heading} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              {section.heading}
            </h2>
            <div className="space-y-3 text-sm text-muted">
              {splitParagraphs(section.body).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.figures && section.figures.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {section.figures.map((figure, index) => (
                  <Figure key={`${figure.alt}-${index}`} {...figure} />
                ))}
              </div>
            ) : null}
            {section.codeBlocks && section.codeBlocks.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {section.codeBlocks.map((block, index) => (
                  <CodeBlock
                    key={`${block.language}-${index}`}
                    {...block}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
