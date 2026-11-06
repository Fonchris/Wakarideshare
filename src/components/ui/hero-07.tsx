import { ArrowUpRight, CirclePlay } from "lucide-react";
import type { Language } from "../site-navbar";

interface HeroProps {
  language: Language;
  onGetStarted: () => void;
}

export default function Hero07({ language, onGetStarted }: HeroProps) {
  const isFrench = language === "fr";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0908] px-6 py-24 text-neutral-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(180,111,45,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,111,45,0.13)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(500px_circle_at_center,black,transparent)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,111,45,0.16),transparent_55%)]" />
      <div className="relative z-10 max-w-3xl text-center">
        <button
          type="button"
          onClick={onGetStarted}
          className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-500/20"
        >
          {isFrench ? "Organisez votre prochain trajet" : "Organise your next ride"}
          <ArrowUpRight className="ml-1 size-4" aria-hidden="true" />
        </button>
        <h2 className="mx-auto mt-6 max-w-xl text-4xl font-medium tracking-tight sm:text-[2.75rem] md:text-6xl/[1.2]">
          {isFrench
            ? "Rentrez ensemble, plus sereinement"
            : "Find your route. Share the ride. Get home safer."}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-300 md:text-xl">
          {isFrench
            ? "Waka aide les étudiants et les civils à trouver des personnes qui prennent le même chemin, au même moment."
            : "Waka helps students and civilians find people taking the same route at the same time."}
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onGetStarted}
            className="inline-flex h-11 items-center justify-center rounded-full bg-amber-500 px-8 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400"
          >
            {isFrench ? "Commencer" : "Get started"}
            <ArrowUpRight className="ml-2 size-5" aria-hidden="true" />
          </button>
          <a
            href="#top"
            className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-700 px-8 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-800"
          >
            <CirclePlay className="mr-2 size-5" aria-hidden="true" />
            {isFrench ? "Voir les trajets" : "See departures"}
          </a>
        </div>
      </div>
    </section>
  );
}
