export function Demo() {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--s3-cyan)] mb-4">
            See It In Action
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide">
            YOUR COMMAND CENTER
          </h2>
        </div>

        {/* Dashboard mockup */}
        <div className="relative mx-auto max-w-5xl">
          <div
            className="
              bg-[var(--s3-bg-elevated)] 
              border border-[var(--s3-border)] 
              rounded-2xl 
              overflow-hidden
              shadow-2xl
            "
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--s3-border)]">
              <div className="w-3 h-3 rounded-full bg-[var(--s3-error)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--s3-warning)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--s3-success)]" />
              <div className="flex-1 ml-4">
                <div className="max-w-md mx-auto bg-[var(--s3-bg-surface)] rounded-md px-3 py-1 text-xs text-[var(--s3-text-muted)]">
                  app.sesame3.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content mockup */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Schools list */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-display text-lg tracking-wide text-[var(--s3-text-muted)]">
                  YOUR SCHOOLS
                </h3>
                {[
                  { name: "Stanford University", chance: "23%", type: "Reach" },
                  { name: "UCLA", chance: "45%", type: "Match" },
                  { name: "UC San Diego", chance: "72%", type: "Safety" },
                ].map((school) => (
                  <div
                    key={school.name}
                    className="flex items-center justify-between p-4 bg-[var(--s3-bg-surface)] rounded-lg"
                  >
                    <div>
                      <div className="font-semibold">{school.name}</div>
                      <div className="text-sm text-[var(--s3-text-muted)]">
                        {school.type}
                      </div>
                    </div>
                    <div className="font-mono text-xl font-semibold text-[var(--s3-cyan)]">
                      {school.chance}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <h3 className="font-display text-lg tracking-wide text-[var(--s3-text-muted)]">
                  UPCOMING
                </h3>
                <div className="p-4 bg-[var(--s3-warning-subtle)] border border-[rgba(250,204,21,0.3)] rounded-lg">
                  <div className="text-sm font-semibold text-[var(--s3-warning)]">
                    UC Apps Due
                  </div>
                  <div className="font-mono text-2xl font-bold text-[var(--s3-warning)]">
                    5 days
                  </div>
                </div>
                <div className="p-4 bg-[var(--s3-bg-surface)] rounded-lg">
                  <div className="text-sm text-[var(--s3-text-muted)]">
                    Essays Complete
                  </div>
                  <div className="font-mono text-2xl font-bold text-[var(--s3-success)]">
                    80%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div
            className="absolute -inset-4 -z-10 opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.3) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

