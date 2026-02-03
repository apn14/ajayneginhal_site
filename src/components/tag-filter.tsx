"use client";

type TagFilterProps = {
  tags: string[];
  contexts: string[];
  selectedTags: string[];
  selectedContext: string;
  onToggleTag: (tag: string) => void;
  onSelectContext: (context: string) => void;
  onClear: () => void;
};

export default function TagFilter({
  tags,
  contexts,
  selectedTags,
  selectedContext,
  onToggleTag,
  onSelectContext,
  onClear,
}: TagFilterProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card/70 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          Filters
        </h2>
        <button
          type="button"
          onClick={onClear}
          className="text-xs uppercase tracking-wide text-accent hover:text-accent-2"
        >
          Clear
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Context
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["All", ...contexts].map((context) => {
            const isActive =
              (context === "All" && selectedContext === "All") ||
              context === selectedContext;
            return (
              <button
                key={context}
                type="button"
                onClick={() => onSelectContext(context)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {context}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Tags
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => {
            const isActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
