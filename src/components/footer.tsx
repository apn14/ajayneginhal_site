import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p>Engineering portfolio and research case studies.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>
          <Link href="/experience" className="hover:text-foreground">
            Experience
          </Link>
          <a
            href="mailto:apn14@duke.edu"
            className="hover:text-foreground"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
