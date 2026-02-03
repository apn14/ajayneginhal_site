import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

type ScrapedImage = {
  src: string;
  alt: string;
};

type ScrapedLink = {
  text: string;
  href: string;
};

type ScrapedPage = {
  slug: string;
  url: string;
  title: string;
  headings: string[];
  paragraphs: string[];
  bullets: string[];
  images: ScrapedImage[];
  links: ScrapedLink[];
};

const PAGES = [
  {
    slug: "authenticated-clothing-dropbox",
    url: "https://sites.duke.edu/ajayn/authenticated-clothing-dropbox/",
  },
  {
    slug: "cardiac-electrogram-and-pacemaker",
    url: "https://sites.duke.edu/ajayn/cardiac-electrogram-and-pacemaker/",
  },
  {
    slug: "diaphragm-pacing-device",
    url: "https://sites.duke.edu/ajayn/diaphragm-pacing-device/",
  },
  {
    slug: "take-home-physical-therapy-aid",
    url: "https://sites.duke.edu/ajayn/take-home-physical-therapy-aid/",
  },
  {
    slug: "whapam",
    url: "https://sites.duke.edu/ajayn/whapam/",
  },
];

const CONTENT_ROOT = path.join(process.cwd(), "content", "legacy");

const normalizeText = (text: string) =>
  text.replace(/\s+/g, " ").replace(/\u00a0/g, " ").trim();

const absolutize = (href: string, baseUrl: string) => {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
};

const writeJson = async (filePath: string, data: unknown) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};

const writeMdx = async (filePath: string, page: ScrapedPage) => {
  const frontmatter = [
    "---",
    `slug: ${page.slug}`,
    `title: "${page.title.replace(/\"/g, "'")}"`,
    `source: "${page.url}"`,
    "---",
    "",
  ].join("\n");

  const headingBlock = page.headings.length
    ? `## Headings\n\n${page.headings.map((h) => `- ${h}`).join("\n")}\n\n`
    : "";

  const paragraphBlock = page.paragraphs.length
    ? `${page.paragraphs.map((p) => `${p}\n`).join("\n")}\n`
    : "";

  const bulletBlock = page.bullets.length
    ? `## Bullets\n\n${page.bullets.map((b) => `- ${b}`).join("\n")}\n\n`
    : "";

  const imageBlock = page.images.length
    ? `## Images\n\n${page.images
        .map((img) => `- ${img.alt || "Image"}: ${img.src}`)
        .join("\n")}\n\n`
    : "";

  const linkBlock = page.links.length
    ? `## Links\n\n${page.links
        .map((link) => `- ${link.text || "Link"}: ${link.href}`)
        .join("\n")}\n`
    : "";

  const content = [
    frontmatter,
    `# ${page.title}`,
    "",
    headingBlock,
    paragraphBlock,
    bulletBlock,
    imageBlock,
    linkBlock,
  ]
    .filter(Boolean)
    .join("\n");

  await fs.writeFile(filePath, content, "utf8");
};

const scrapePage = async (slug: string, url: string): Promise<ScrapedPage> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const html = await response.text();
  const $ = load(html);

  const title = normalizeText($("h1").first().text()) || slug;

  const scope = $("main").length ? $("main") : $("body");

  const headings = scope
    .find("h2, h3")
    .map((_, el) => normalizeText($(el).text()))
    .get()
    .filter(Boolean);

  const paragraphs = scope
    .find("p")
    .map((_, el) => normalizeText($(el).text()))
    .get()
    .filter(Boolean);

  const bullets = scope
    .find("ul li")
    .map((_, el) => normalizeText($(el).text()))
    .get()
    .filter(Boolean);

  const images = scope
    .find("img")
    .map((_, el) => ({
      src: absolutize($(el).attr("src") || "", url),
      alt: normalizeText($(el).attr("alt") || "Image"),
    }))
    .get()
    .filter((img) => img.src);

  const links = scope
    .find("a")
    .map((_, el) => ({
      text: normalizeText($(el).text()),
      href: absolutize($(el).attr("href") || "", url),
    }))
    .get()
    .filter((link) => link.href && !link.href.startsWith("#"));

  return {
    slug,
    url,
    title,
    headings,
    paragraphs,
    bullets,
    images,
    links,
  };
};

const run = async () => {
  await fs.mkdir(CONTENT_ROOT, { recursive: true });

  for (const page of PAGES) {
    const scraped = await scrapePage(page.slug, page.url);
    const jsonPath = path.join(CONTENT_ROOT, `${page.slug}.json`);
    const mdxPath = path.join(CONTENT_ROOT, `${page.slug}.mdx`);

    await writeJson(jsonPath, scraped);
    await writeMdx(mdxPath, scraped);

    console.log(`Scraped ${page.slug}`);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
