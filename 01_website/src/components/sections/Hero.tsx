import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/Card";
import { PlayIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, rgba(0, 229, 255, 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0C13.5 0 0 13.5 0 30s13.5 30 30 30 30-13.5 30-30S46.5 0 30 0zm0 55C16.2 55 5 43.8 5 30S16.2 5 30 5s25 11.2 25 25-11.2 25-25 25z' fill='%2300E5FF'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1400px] mx-auto px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text content */}
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--s3-cyan)] mb-6">
              College Prep. Reimagined.
            </div>

            <h1 className="font-display text-[clamp(60px,10vw,100px)] leading-[0.9] tracking-wide mb-8">
              <span className="block">THE COLLEGE</span>
              <span className="block">PROCESS IS</span>
              <span className="block text-[var(--s3-cyan)]">CHAOS.</span>
            </h1>

            <p className="text-lg text-[var(--s3-text-secondary)] max-w-[480px] mb-10 leading-relaxed">
              One platform. Everything you need—programs, deadlines,
              strategy—personalized to you. No more 47 open tabs.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button icon={<PlayIcon />}>Start Free</Button>
              <Button variant="secondary">See How It Works</Button>
            </div>
          </div>

          {/* Floating cards */}
          <div className="relative h-[500px] hidden lg:flex items-center justify-center">
            <div className="absolute top-[10%] right-[10%] rotate-3">
              <StatCard label="SAT Score" value="1,520" trend="↑ 60 from practice" />
            </div>
            <div className="absolute bottom-[25%] left-[5%] -rotate-2">
              <StatCard label="Applications" value="12" trend="4 submitted" />
            </div>
            <div className="absolute bottom-[5%] right-[15%]">
              <StatCard label="Match Score" value="94%" trend="Stanford SIMR" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

