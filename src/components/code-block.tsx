type CodeBlockProps = {
  language: string;
  description?: string;
  placeholder?: boolean;
  code?: string;
};

export default function CodeBlock({
  language,
  description,
  placeholder,
  code,
}: CodeBlockProps) {
  if (placeholder || !code) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card/60 p-4">
        <p className="text-xs uppercase tracking-wide text-muted">
          {language} code
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">
          Code example forthcoming
        </p>
        {description ? (
          <p className="mt-1 text-xs text-muted">{description}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-slate-950/90 p-4 text-sm text-slate-100">
      <p className="text-xs uppercase tracking-wide text-slate-300">
        {language}
      </p>
      {description ? (
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      ) : null}
      <pre className="mt-4 overflow-x-auto font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
