import { getExperience } from "@/lib/content";
import ExperienceTimeline from "@/components/experience-timeline";

export const metadata = {
  title: "Experience",
  description: "Industry, research, and leadership experience timeline.",
};

export default async function ExperiencePage() {
  const experience = await getExperience();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">
          Experience
        </p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          Industry and Research Timeline
        </h1>
        <p className="max-w-2xl text-base text-muted">
          Roles across automation engineering, biomedical design leadership, and
          molecular dynamics research.
        </p>
      </header>
      <ExperienceTimeline items={experience} />
    </div>
  );
}
