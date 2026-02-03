import Image from "next/image";

type FigureProps = {
  image: string;
  alt: string;
  caption?: string;
};

export default function Figure({ image, alt, caption }: FigureProps) {
  const isPlaceholder = image.includes("placeholders");

  return (
    <figure className="space-y-3">
      {isPlaceholder ? (
        <div className="flex h-56 w-full items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 text-sm font-semibold text-muted">
          Figure coming soon
        </div>
      ) : (
        <Image
          src={image}
          alt={alt}
          width={1200}
          height={720}
          className="h-auto w-full rounded-2xl border border-border"
        />
      )}
      {caption ? (
        <figcaption className="text-xs text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
