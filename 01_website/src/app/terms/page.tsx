import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Service — Sesame3",
  description: "Terms and conditions for using Sesame3.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-['Satoshi'] text-4xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-[var(--text-muted)] mb-12">
              Last updated: December 14, 2024
            </p>

            <div className="prose prose-lg max-w-none space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Welcome to Sesame3
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  These Terms of Service (&quot;Terms&quot;) govern your use of Sesame3 (&quot;Service&quot;), 
                  an AI-powered college counseling platform operated by Sesame3 (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). 
                  By using our Service, you agree to these Terms. If you don&apos;t agree, please don&apos;t use the Service.
                </p>
              </section>

              {/* Nature of Service */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Nature of Our Service
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Sesame3 is an AI-powered tool designed to help students navigate the college application process. 
                  Our Service provides:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2 mb-4">
                  <li>AI-powered guidance and advice on college applications</li>
                  <li>Estimated admission chances based on publicly available data</li>
                  <li>School recommendations and list building tools</li>
                  <li>Task management and timeline planning</li>
                  <li>Essay feedback and review assistance</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
                  <p className="text-amber-900 font-medium mb-2">Important:</p>
                  <p className="text-amber-800">
                    Sesame3 is an informational and organizational tool. We are <strong>not</strong> a licensed 
                    educational consultant, college counselor, or admissions professional. Our AI advisor 
                    provides guidance based on patterns and publicly available information — it is not a 
                    substitute for professional advice.
                  </p>
                </div>
              </section>

              {/* No Guarantees */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  No Guarantees of Admission Outcomes
                </h2>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
                  <p className="text-[var(--text-main)] leading-relaxed mb-4">
                    <strong>Our chance estimates are directional guidance only.</strong> They are based on 
                    historical data, publicly available admission statistics, and general patterns. They are 
                    <strong> not predictions, guarantees, or promises</strong> of admission to any college or university.
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    College admissions decisions are made by individual institutions based on their own criteria, 
                    which may include factors we cannot assess (institutional priorities, holistic review, 
                    demonstrated interest, etc.). Many qualified applicants are not admitted to highly 
                    selective schools due to factors beyond grades and test scores.
                  </p>
                  <p className="text-[var(--text-main)] font-medium">
                    You acknowledge that: (a) our estimates may differ significantly from actual outcomes; 
                    (b) we make no guarantee about admission to any school; and (c) you should not rely solely 
                    on our estimates when making important educational decisions.
                  </p>
                </div>
              </section>

              {/* AI Limitations */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  AI Advisor Limitations
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Our AI advisor is powered by large language models and is designed to be helpful, but it has limitations:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                  <li><strong className="text-[var(--text-main)]">Not always accurate:</strong> AI can make mistakes, provide outdated information, or give advice that doesn&apos;t fit your specific situation.</li>
                  <li><strong className="text-[var(--text-main)]">Not professional advice:</strong> Our AI is not a licensed counselor, therapist, lawyer, or financial advisor. For professional advice, consult a qualified professional.</li>
                  <li><strong className="text-[var(--text-main)]">Verify important information:</strong> Always verify critical information (deadlines, requirements, policies) with official sources such as college websites and admissions offices.</li>
                  <li><strong className="text-[var(--text-main)]">No emergency support:</strong> If you&apos;re experiencing a mental health crisis, please contact a crisis helpline or emergency services.</li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Limitation of Liability
                </h2>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6">
                  <p className="text-[var(--text-main)] leading-relaxed mb-4">
                    <strong>To the maximum extent permitted by law, Sesame3, its officers, directors, employees, 
                    and affiliates shall not be liable for:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2 mb-4">
                    <li>Any admission decisions or outcomes at any educational institution</li>
                    <li>Any reliance on advice, recommendations, or estimates provided by the AI advisor</li>
                    <li>Any actions you take or don&apos;t take based on information from our Service</li>
                    <li>Missed deadlines, incorrect information, or any errors in the Service</li>
                    <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of data, opportunities, or any other losses related to your use of the Service</li>
                  </ul>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Our total liability for any claims arising from your use of the Service is limited to 
                    the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
                  </p>
                </div>
              </section>

              {/* Disclaimer of Warranties */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Disclaimer of Warranties
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, 
                  either express or implied, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                  <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                  <li>That the Service will be uninterrupted, secure, or error-free</li>
                  <li>That the information provided will be accurate, complete, or current</li>
                  <li>That the results from using the Service will meet your expectations</li>
                </ul>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Your Responsibilities
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  When using Sesame3, you agree to:
                </p>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                  <li><strong className="text-[var(--text-main)]">Provide accurate information:</strong> Your profile and academic information should be truthful and accurate.</li>
                  <li><strong className="text-[var(--text-main)]">Submit your own work:</strong> Essays and content you submit for review should be your own original work.</li>
                  <li><strong className="text-[var(--text-main)]">Verify critical information:</strong> Double-check important dates, requirements, and policies with official sources.</li>
                  <li><strong className="text-[var(--text-main)]">Use the Service lawfully:</strong> Don&apos;t use our Service for any illegal or unauthorized purpose.</li>
                  <li><strong className="text-[var(--text-main)]">Keep your account secure:</strong> You&apos;re responsible for maintaining the security of your account credentials.</li>
                </ul>
              </section>

              {/* Academic Integrity */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Academic Integrity
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  Sesame3 is designed to help you develop and refine your own ideas — not to write your 
                  applications for you. You are responsible for ensuring your use of our Service complies 
                  with the academic integrity policies of your school and the colleges you&apos;re applying to.
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  When you submit essays or applications to colleges, you are representing that the work 
                  is substantially your own. AI-generated content should be used as a starting point, 
                  feedback, or inspiration — not copied verbatim.
                </p>
              </section>

              {/* Account Terms */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Account Terms
                </h2>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                  <li>You must be at least 13 years old to use Sesame3.</li>
                  <li>If you&apos;re under 18, we encourage parental awareness of your use.</li>
                  <li>You may only maintain one account per person.</li>
                  <li>You&apos;re responsible for all activity that occurs under your account.</li>
                  <li>We may suspend or terminate accounts that violate these Terms.</li>
                </ul>
              </section>

              {/* Payments */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Payments and Subscriptions
                </h2>
                <ul className="list-disc pl-6 text-[var(--text-muted)] space-y-2">
                  <li>Free features are available without payment. Premium features require a subscription.</li>
                  <li>Subscriptions renew automatically unless canceled before the renewal date.</li>
                  <li>You can cancel your subscription at any time; access continues until the end of the billing period.</li>
                  <li>Refunds are provided at our discretion. Contact support for refund requests.</li>
                  <li>Prices may change with notice; changes apply to future billing cycles only.</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Intellectual Property
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  <strong className="text-[var(--text-main)]">Your content:</strong> You retain ownership of 
                  all content you create and submit (essays, profile information, etc.). By using our Service, 
                  you grant us a limited license to use this content to provide and improve our Service.
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  <strong className="text-[var(--text-main)]">Our content:</strong> The Sesame3 name, logo, 
                  website design, and software are our intellectual property. You may not copy, modify, or 
                  distribute our materials without permission.
                </p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Indemnification
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  You agree to indemnify and hold harmless Sesame3 and its affiliates from any claims, 
                  damages, or expenses arising from: (a) your use of the Service; (b) your violation of 
                  these Terms; (c) your violation of any rights of another party; or (d) any content you 
                  submit through the Service.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Termination
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                  You may stop using our Service at any time. You can delete your account in your settings, 
                  which will permanently remove your data.
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We may suspend or terminate your access if you violate these Terms, if your use poses 
                  a risk to us or other users, or if we discontinue the Service. We&apos;ll try to provide 
                  notice when reasonable.
                </p>
              </section>

              {/* Changes */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Changes to These Terms
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We may update these Terms from time to time. We&apos;ll notify you of material changes 
                  via email or a notice on our website. Your continued use after changes means you accept 
                  the new Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Governing Law
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  These Terms are governed by the laws of the State of Delaware, without regard to 
                  conflict of law principles. Any disputes will be resolved in the courts of Delaware.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="font-['Satoshi'] text-2xl font-bold mb-4">
                  Contact Us
                </h2>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Questions about these Terms? Contact us at{" "}
                  <a href="mailto:legal@sesame3.com" className="text-[var(--accent-primary)] hover:underline">
                    legal@sesame3.com
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
