import { FeatureCard } from "@/components/ui/Card";
import { ChartIcon, TargetIcon, SearchIcon, ClockIcon } from "@/components/icons";

const features = [
  {
    icon: <ChartIcon />,
    title: "SEE YOUR REAL ODDS",
    description:
      "We crunch the data. You see where you stand at every school—reach, match, or safety. No guessing.",
  },
  {
    icon: <TargetIcon />,
    title: "KNOW WHAT TO WORK ON",
    description:
      "Missing leadership? Need more rigor? We'll tell you what's weak—and exactly what to do about it.",
  },
  {
    icon: <SearchIcon />,
    title: "FIND WHAT FITS YOU",
    description:
      "Summer research, internships, volunteering types—matched to YOUR profile, not generic lists.",
  },
  {
    icon: <ClockIcon />,
    title: "NEVER MISS A DEADLINE",
    description:
      "Applications, financial aid, programs—all in one place. We'll remind you before it's too late.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="text-center mb-16">
          <div className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--s3-cyan)] mb-4">
            What You Get
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide">
            BUILT FOR THE FIGHT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

