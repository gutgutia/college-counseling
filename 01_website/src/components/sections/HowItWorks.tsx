const steps = [
  {
    number: "01",
    title: "BUILD YOUR PROFILE",
    description: "Grades, scores, activities—drop it all in. Takes 5 minutes.",
  },
  {
    number: "02",
    title: "SEE WHERE YOU STAND",
    description: "Instant matches, chances, and gaps. No more guessing.",
  },
  {
    number: "03",
    title: "GET TO WORK",
    description: "Follow your personalized action plan. We'll keep you on track.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[var(--s3-bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="text-center mb-16">
          <div className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--s3-cyan)] mb-4">
            Simple Process
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-[var(--s3-border)]" />
              )}

              <div className="text-center">
                <div className="font-mono text-6xl font-bold text-[var(--s3-cyan)] opacity-30 mb-4">
                  {step.number}
                </div>
                <h3 className="font-display text-2xl tracking-wide mb-4">
                  {step.title}
                </h3>
                <p className="text-[var(--s3-text-secondary)] max-w-[280px] mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

