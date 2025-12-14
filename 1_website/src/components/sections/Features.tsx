import { Sparkles, Target, School, Map, Check } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "An advisor who truly knows you",
    description: "Forget generic advice. Ask anything — from \"Should I apply ED to Yale?\" to \"How do I write about my research?\" — and get personalized answers based on your full profile.",
    points: [
      "Strategic guidance tailored to your strengths",
      "Voice and text — chat however you're comfortable",
      "Available 24/7, infinitely patient",
    ],
    screenshot: "/screenshots/feature-advisor.html",
  },
  {
    icon: Target,
    title: "Know your real chances",
    description: "No guesswork, no sugar-coating. See how you compare to typical admits at each school, understand exactly where you're strong or falling short, and get actionable advice on how to improve.",
    points: [
      "Factor-by-factor breakdown against admits",
      "Clear reach, target, and safety tiers",
      "Personalized recommendations to close gaps",
    ],
    screenshot: "/screenshots/feature-chances.html",
    reverse: true,
  },
  {
    icon: School,
    title: "Build a balanced list",
    description: "Stop obsessing over one dream school. Build a smart, balanced list with reaches, targets, and safeties — and track every application from start to finish.",
    points: [
      "Visual balance of reach/target/safety schools",
      "AI-suggested schools based on your fit",
      "Application status tracking",
    ],
    screenshot: "/screenshots/feature-schools.html",
  },
  {
    icon: Map,
    title: "One thing at a time",
    description: "College apps are overwhelming. We break it down into clear goals, simple tasks, and a timeline that keeps you focused — not frantic.",
    points: [
      "Personalized goals based on your deadlines",
      "Daily focus: just tackle the next thing",
      "AI tips to help you move faster",
    ],
    screenshot: "/screenshots/feature-roadmap.html",
    reverse: true,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[var(--bg-page)]">
      <div className="container">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`grid md:grid-cols-2 gap-16 items-center mb-24 last:mb-0 ${
              feature.reverse ? "md:direction-rtl" : ""
            }`}
            style={{ direction: feature.reverse ? "rtl" : "ltr" }}
          >
            {/* Content */}
            <div className="max-w-lg" style={{ direction: "ltr" }}>
              <div className="w-12 h-12 bg-[var(--accent-surface)] rounded-xl flex items-center justify-center text-[var(--accent-primary)] mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h2 className="font-['Satoshi'] text-4xl font-bold mb-4">
                {feature.title}
              </h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-[var(--text-muted)]">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Screenshot */}
            <div 
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
              style={{ 
                direction: "ltr",
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)"
              }}
            >
              <iframe
                src={feature.screenshot}
                className="w-full h-[620px] border-none pointer-events-none"
                loading="lazy"
                scrolling="no"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
