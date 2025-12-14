import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/icons";

export function FinalCTA() {
  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="text-center">
          <h2 className="font-display text-5xl md:text-7xl tracking-wide mb-6">
            READY TO TAKE
            <br />
            <span className="text-[var(--s3-cyan)]">CONTROL?</span>
          </h2>
          <p className="text-lg text-[var(--s3-text-secondary)] max-w-xl mx-auto mb-10">
            The college process doesn&apos;t have to be chaos. Start free and see
            where you stand in 5 minutes.
          </p>
          <Button size="lg" icon={<ArrowRightIcon />}>
            Get Started Free
          </Button>
        </div>
      </div>
    </section>
  );
}

