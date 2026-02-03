"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/content";
import TagFilter from "@/components/tag-filter";
import ProjectCard from "@/components/project-card";

type ProjectsGalleryProps = {
  projects: Project[];
};

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedContext, setSelectedContext] = useState<string>("All");

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) =>
      project.tags.forEach((tag) => tagSet.add(tag)),
    );
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const contexts = useMemo(() => {
    const contextSet = new Set<string>();
    projects.forEach((project) => contextSet.add(project.context));
    return Array.from(contextSet).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const contextMatch =
        selectedContext === "All" || project.context === selectedContext;
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => project.tags.includes(tag));
      return contextMatch && tagMatch;
    });
  }, [projects, selectedContext, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedContext("All");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <TagFilter
        tags={tags}
        contexts={contexts}
        selectedTags={selectedTags}
        selectedContext={selectedContext}
        onToggleTag={toggleTag}
        onSelectContext={setSelectedContext}
        onClear={clearFilters}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            No projects match these filters yet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
