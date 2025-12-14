import { ShieldCheck } from "lucide-react";

export function Trust() {
  return (
    <section className="py-16 bg-[var(--accent-surface)] border-y border-[var(--accent-border)]">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 max-w-xl mx-auto text-center md:text-left">
          <div className="w-14 h-14 bg-[var(--accent-primary)] rounded-2xl flex items-center justify-center text-white flex-shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-['Satoshi'] text-xl font-bold text-[var(--accent-primary)] mb-1">
              Your data stays yours
            </h3>
            <p className="text-[var(--text-muted)]">
              We never share or sell your information. Your profile, conversations, and essays are private — always. We&apos;re here to help you, not monetize you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
