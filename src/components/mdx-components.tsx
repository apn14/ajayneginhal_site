import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type AnchorProps = ComponentProps<"a"> & { href?: string };

const Anchor = ({ href = "", children, ...props }: AnchorProps) => {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
      {...props}
    >
      {children as ReactNode}
    </Link>
  );
};

export const mdxComponents = {
  a: Anchor,
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-10 text-2xl font-semibold text-foreground" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-8 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-4 text-base leading-relaxed text-muted" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-muted" {...props} />
  ),
  li: (props: ComponentProps<"li">) => (
    <li className="leading-relaxed" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-slate-900/10 px-1.5 py-0.5 text-sm font-mono text-foreground dark:bg-white/10"
      {...props}
    />
  ),
};
