import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Language } from "./site-navbar";
import { BrandLogo } from "./brand-logo";

interface TermsPageProps {
  language: Language;
  onBack: () => void;
}

const englishSections = [
  {
    title: "1. About Waka",
    paragraphs: [
      "Waka is a coordination platform that helps people discover and organise shared journeys. Waka does not operate taxis, provide transportation, employ drivers, or guarantee that a ride will take place.",
      "When you use Waka, you remain responsible for deciding whether to join a group, where to meet, how to travel, and whether the arrangements are suitable for you.",
    ],
  },
  {
    title: "2. Eligibility and accounts",
    paragraphs: [
      "You must provide accurate information and keep your account secure. You may not impersonate another person, create an account for someone else without permission, or use Waka if you are not legally able to accept these terms.",
      "You are responsible for activity under your account and must notify us if you believe your account has been compromised. We may suspend or close accounts that violate these terms or create a safety risk.",
    ],
  },
  {
    title: "3. Ride groups and user conduct",
    paragraphs: [
      "Ride groups are user-created coordination spaces. Group details, destinations, departure windows, meeting points, and participation may change. Do not rely on a group listing as a guaranteed booking or transportation service.",
      "You agree to communicate respectfully, provide truthful information, avoid harassment, threats, discrimination, spam, fraud, and illegal activity, and never pressure another person to share private information or meet in an unsafe place.",
    ],
  },
  {
    title: "4. Safety",
    paragraphs: [
      "Use public, well-lit meeting points and exercise your own judgment before meeting anyone. Do not share passwords, payment credentials, access codes, or unnecessary personal information through Waka.",
      "If you feel unsafe, leave the situation and contact local emergency services or a trusted person. Waka cannot verify every user, vehicle, driver, location, or statement and does not guarantee personal safety.",
    ],
  },
  {
    title: "5. Location information",
    paragraphs: [
      "If you grant browser location permission, Waka may use your location to support nearby-user and meeting-point features. You can refuse or revoke location permission through your browser or device settings.",
      "Use location sharing only when necessary. Location data may be approximate, unavailable, delayed, or inaccurate. Never use Waka location features as a substitute for emergency or navigation services.",
    ],
  },
  {
    title: "6. User content and communications",
    paragraphs: [
      "You retain ownership of content you submit, but grant Waka permission to host, display, and process it as needed to provide and protect the service. Do not submit content that violates another person's rights or contains confidential information you are not authorised to share.",
      "We may remove content or restrict access when reasonably necessary to protect users, investigate abuse, comply with law, or maintain the service.",
    ],
  },
  {
    title: "7. Third-party services and costs",
    paragraphs: [
      "Waka may use third-party services for authentication, hosting, maps, communications, or transportation coordination. Those services may have their own terms and privacy policies.",
      "Waka does not process or guarantee contributions, taxi fares, refunds, or disputes between participants unless expressly stated in the product. You are responsible for costs you agree to with other users or third parties.",
    ],
  },
  {
    title: "8. Privacy and data retention",
    paragraphs: [
      "Our handling of personal information is described in the Waka Privacy Policy when one is published. By using Waka, you acknowledge that authentication and other service providers may process information on our behalf.",
      "Ride-group and location information may be limited, expired, or deleted according to the feature's retention settings. You should not assume that content will remain available indefinitely.",
    ],
  },
  {
    title: "9. Availability and changes",
    paragraphs: [
      "Waka is provided on an availability basis and may be changed, interrupted, or discontinued. We may update these terms as the service develops. We will take reasonable steps to communicate material changes.",
      "If you continue using Waka after updated terms take effect, you accept the revised terms. If you do not agree, stop using the service and request account closure where available.",
    ],
  },
  {
    title: "10. Disclaimers and liability",
    paragraphs: [
      "To the extent permitted by law, Waka is not responsible for transportation arranged by users, user conduct, missed departures, inaccurate listings, device or network failures, or losses resulting from relying on information supplied by another user.",
      "Nothing in these terms excludes rights or protections that cannot legally be excluded. These terms do not create an employment, agency, partnership, or transportation-provider relationship between Waka and users.",
    ],
  },
  {
    title: "11. Contact and acceptance",
    paragraphs: [
      "Questions, safety reports, and account concerns should be sent through the support channel provided in the application. By checking the agreement box during signup, you confirm that you have read and agree to these Terms & Conditions.",
    ],
  },
];

export default function TermsPage({ language, onBack }: TermsPageProps) {
  const isFrench = language === "fr";

  return (
    <main className="min-h-[100svh] bg-neutral-50 px-4 pb-12 pt-[max(5rem,calc(1.5rem+env(safe-area-inset-top)))] text-neutral-950 dark:bg-neutral-950 dark:text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex items-center justify-between gap-4">
          <BrandLogo imageClassName="w-28 sm:w-36" />
          <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {isFrench ? "Retour à l’inscription" : "Back to sign up"}
          </button>
        </div>

        <header className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
            Waka rideshare
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            {isFrench ? "Conditions générales d’utilisation" : "Terms & Conditions"}
          </h1>
          <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            {isFrench
              ? "Dernière mise à jour : 7 novembre 2026. Ces conditions expliquent les règles d’utilisation de Waka."
              : "Last updated: November 7, 2026. These terms explain the rules for using Waka."}
          </p>
        </header>

        <article className="mt-6 space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900 sm:p-10">
          {englishSections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold">{isFrench ? section.title.replace(/^\d+\./, "Article") : section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
                  {isFrench ? "Waka est une plateforme de coordination des trajets. Utilisez le service avec honnêteté, respect et prudence. " + paragraph : paragraph}
                </p>
              ))}
            </section>
          ))}
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>
              {isFrench
                ? "En créant un compte, vous confirmez avoir lu et accepté ces conditions."
                : "By creating an account, you confirm that you have read and accepted these terms."}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
