import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";

const contentRoot = path.join(process.cwd(), "content");
const projectsDir = path.join(contentRoot, "projects");

const LinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

const FigureSchema = z.object({
  image: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

const CodeBlockSchema = z.object({
  language: z.string(),
  description: z.string().optional(),
  placeholder: z.boolean(),
});

const SectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
  codeBlocks: z.array(CodeBlockSchema).optional(),
  figures: z.array(FigureSchema).optional(),
});

const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  dates: z.string(),
  context: z.enum(["Academic", "Industry", "Research", "Personal"]),
  role: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  reminders: z.array(z.string()),
  technologies: z.array(z.string()),
  links: z.array(LinkSchema),
  hero: z
    .object({
      image: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })
    .optional(),
  sections: z.array(SectionSchema),
});

const ProfileSchema = z.object({
  name: z.string(),
  headline: z.string(),
  about: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  location: z.string().optional(),
});

const ExperienceSchema = z.object({
  slug: z.string(),
  organization: z.string(),
  role: z.string(),
  dates: z.string(),
  location: z.string().optional(),
  summary: z.string(),
  bullets: z.array(z.string()),
  technologies: z.array(z.string()),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type ProjectWithBody = Project & { body: string };

const readJson = async <T>(filePath: string, schema: z.ZodSchema<T>) => {
  const raw = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  return schema.parse(data);
};

export const getProfile = cache(async () =>
  readJson(path.join(contentRoot, "profile.json"), ProfileSchema),
);

export const getExperience = cache(async () =>
  readJson(path.join(contentRoot, "experience.json"), z.array(ExperienceSchema)),
);

const normalizeSlug = (value?: string | null) =>
  (value ?? "").replace(/\uFEFF/g, "").trim();

const listProjectSlugs = async () => {
  const entries = await fs.readdir(projectsDir);
  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => normalizeSlug(entry.replace(/\.mdx$/, "")))
    .filter(Boolean);
};

export const getProjectSlugs = cache(async () => listProjectSlugs());

const resolveSlugFromDisk = async (slug: string) => {
  const normalized = normalizeSlug(slug).toLowerCase();
  if (!normalized) return null;
  const slugs = await listProjectSlugs();
  const match = slugs.find(
    (entry) => normalizeSlug(entry).toLowerCase() === normalized,
  );
  return match ?? null;
};

const readProjectFile = async (slug: string): Promise<ProjectWithBody> => {
  const safeSlug = normalizeSlug(slug);
  if (!safeSlug) {
    const error = new Error("Missing project slug");
    (error as NodeJS.ErrnoException).code = "ENOENT";
    throw error;
  }
  const filePath = path.join(projectsDir, `${safeSlug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      const resolved = await resolveSlugFromDisk(safeSlug);
      if (!resolved) {
        throw error;
      }
      raw = await fs.readFile(
        path.join(projectsDir, `${resolved}.mdx`),
        "utf8",
      );
    } else {
      throw error;
    }
  }
  const { data, content } = matter(raw);
  const project = ProjectSchema.parse({
    ...data,
    slug: safeSlug,
  });

  return { ...project, body: content };
};

export const getProjectBySlug = async (
  slug: string,
): Promise<ProjectWithBody | null> => {
  try {
    return await readProjectFile(slug);
  } catch (error) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
};

export const getAllProjects = cache(async () => {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(slugs.map((slug) => readProjectFile(slug)));
  return projects.sort((a, b) => a.title.localeCompare(b.title));
});
