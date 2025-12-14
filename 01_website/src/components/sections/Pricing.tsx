import { Button } from "@/components/ui/Button";
import { CheckCircleIcon } from "@/components/icons";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started and see where you stand",
    features: [
      "Full profile builder",
      "Unlimited school matching",
      "Basic chance labels (Reach/Match/Safety)",
      "Top 3 gaps identified",
      "Browse summer programs",
      "Track up to 5 schools",
    ],
    cta: "Start Free",
    variant: "secondary" as const,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "The full playbook for serious students",
    features: [
      "Everything in Free",
      "Detailed chance % per school",
      "Full gap analysis + action plan",
      "Personalized program matching",
      "Unlimited deadline tracking",
      "Essay tracker",
      "Progress tracking over time",
    ],
    cta: "Get Pro",
    variant: "primary" as const,
    popular: true,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-[var(--s3-bg-secondary)]">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="text-center mb-16">
          <div className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--s3-cyan)] mb-4">
            Simple Pricing
          </div>
          <h2 className="font-display text-5xl md:text-6xl tracking-wide mb-4">
            START FREE. UPGRADE WHEN READY.
          </h2>
          <p className="text-[var(--s3-text-secondary)] max-w-xl mx-auto">
            Annual: $149/year (save $79) • Lifetime: $399 one-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`
                relative p-8 rounded-2xl border
                ${
                  tier.popular
                    ? "bg-[var(--s3-bg-elevated)] border-[var(--s3-cyan)]"
                    : "bg-[var(--s3-bg-primary)] border-[var(--s3-border)]"
                }
              `}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--s3-cyan)] text-[var(--s3-text-inverse)] text-xs font-semibold uppercase tracking-wide rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl tracking-wide mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-bold">
                    {tier.price}
                  </span>
                  <span className="text-[var(--s3-text-muted)]">
                    {tier.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--s3-text-secondary)] mt-2">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircleIcon
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        tier.popular
                          ? "text-[var(--s3-cyan)]"
                          : "text-[var(--s3-success)]"
                      }`}
                    />
                    <span className="text-sm text-[var(--s3-text-secondary)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button variant={tier.variant} className="w-full">
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="text-sm text-[var(--s3-cyan)] hover:underline"
          >
            See all pricing options →
          </Link>
        </div>
      </div>
    </section>
  );
}

