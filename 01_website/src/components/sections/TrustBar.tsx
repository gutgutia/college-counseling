export function TrustBar() {
  return (
    <section className="py-8 border-y border-[var(--s3-border)]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
          <p className="text-sm text-[var(--s3-text-muted)] uppercase tracking-widest">
            Tracking{" "}
            <span className="text-[var(--s3-text-primary)] font-semibold">
              1,200+
            </span>{" "}
            college deadlines so you don&apos;t have to
          </p>
          <span className="hidden md:inline text-[var(--s3-text-muted)]">•</span>
          <p className="text-sm text-[var(--s3-text-muted)] uppercase tracking-widest">
            <span className="text-[var(--s3-text-primary)] font-semibold">
              500+
            </span>{" "}
            summer programs indexed
          </p>
          <span className="hidden md:inline text-[var(--s3-text-muted)]">•</span>
          <p className="text-sm text-[var(--s3-text-muted)] uppercase tracking-widest">
            Built for the{" "}
            <span className="text-[var(--s3-cyan)] font-semibold">
              Class of 2026
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

