import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function CTA() {
  return (
    <section className="py-24 bg-[var(--bg-page)]">
      <div className="container">
        <div className="relative bg-gradient-to-br from-[var(--text-main)] to-[#1a1a1a] rounded-[32px] px-10 py-20 text-center overflow-hidden">
          {/* Glow effects */}
          <div className="absolute w-[500px] h-[500px] bg-[var(--accent-primary)] opacity-15 blur-3xl rounded-full -top-[200px] -left-[100px]" />
          <div className="absolute w-[500px] h-[500px] bg-[var(--accent-primary)] opacity-15 blur-3xl rounded-full -bottom-[200px] -right-[100px]" />

          <h2 className="font-['Satoshi'] text-4xl md:text-5xl font-bold text-white mb-5 relative">
            Ready to start your journey?
          </h2>
          <p className="text-lg text-white/70 max-w-md mx-auto mb-10 relative">
            Join students who are navigating college admissions with clarity and calm. It&apos;s free to get started.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative">
            <Button variant="white" href="#">
              <ArrowRight className="w-4 h-4" />
              Get Started Free
            </Button>
            <Button 
              variant="ghost" 
              href="#" 
              className="text-white border border-white/30 hover:bg-white/10"
            >
              Talk to Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
