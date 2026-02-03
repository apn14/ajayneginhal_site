import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-muted">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        The page you are looking for does not exist. Try heading back to the
        portfolio overview.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-slate-900"
      >
        Back to home
      </Link>
    </div>
  );
}
