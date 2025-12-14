import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--s3-border)] py-16">
      <div className="max-w-[1400px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col leading-[0.85] mb-4">
              <span className="font-display text-[24px] tracking-wide text-[var(--s3-text-primary)]">
                SESAME
              </span>
              <span className="font-display text-[24px] tracking-wide text-[var(--s3-cyan)]">
                3
              </span>
            </Link>
            <p className="text-sm text-[var(--s3-text-secondary)]">
              College prep, reimagined.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-[var(--s3-text-muted)] uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-[var(--s3-text-secondary)] hover:text-[var(--s3-text-primary)] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-[var(--s3-text-secondary)] hover:text-[var(--s3-text-primary)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-[var(--s3-text-muted)] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--s3-text-secondary)] hover:text-[var(--s3-text-primary)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[var(--s3-text-secondary)] hover:text-[var(--s3-text-primary)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm tracking-widest text-[var(--s3-text-muted)] uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--s3-text-secondary)] hover:text-[var(--s3-text-primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--s3-text-secondary)] hover:text-[var(--s3-text-primary)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--s3-border)] text-center">
          <p className="text-sm text-[var(--s3-text-muted)]">
            © {new Date().getFullYear()} Sesame3. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

