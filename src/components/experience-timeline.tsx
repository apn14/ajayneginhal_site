import type { Experience } from "@/lib/content";

type ExperienceTimelineProps = {
  items: Experience[];
};

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div
          key={item.slug}
          className="relative rounded-2xl border border-border bg-card/70 p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {item.role}
              </h3>
              <p className="text-sm text-muted">{item.organization}</p>
            </div>
            <div className="text-sm text-muted">
              <p>{item.dates}</p>
              {item.location ? <p>{item.location}</p> : null}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">{item.summary}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
