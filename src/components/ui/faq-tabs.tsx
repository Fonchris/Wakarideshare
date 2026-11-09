import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Language } from "../site-navbar";

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  language: Language;
}

const faqContent = {
  en: {
    eyebrow: "Need to know",
    title: "Frequently asked questions",
    description: "Everything you need to know before your next ride home.",
    categories: {
      gettingStarted: "Getting started",
      rides: "Rides",
      safety: "Safety",
    },
    questions: {
      gettingStarted: [
        {
          question: "What is Waka?",
          answer:
            "Waka helps people travelling in the same direction find each other, organise a shared ride, and get home together with less stress.",
        },
        {
          question: "How do I find people going my way?",
          answer:
            "Choose a destination corridor on the ride board and browse the available departures. You can then join a group that matches your route and timing.",
        },
        {
          question: "Do I need an account to browse rides?",
          answer:
            "You can explore available routes without signing in. You will need an account to join a group, create a ride, or coordinate with other passengers.",
        },
      ],
      rides: [
        {
          question: "How does a shared ride work?",
          answer:
            "Passengers agree on a destination and a public meeting point. One person orders the ride, the group travels together, and everyone contributes their agreed share.",
        },
        {
          question: "Who orders the vehicle?",
          answer:
            "The group decides who will request the vehicle. Waka helps you coordinate the group, but the ride is ordered through your preferred transport provider.",
        },
        {
          question: "Can I leave a group after joining?",
          answer:
            "Yes. If your plans change, let the group know as soon as possible so everyone can adjust the meeting point or ride arrangement.",
        },
      ],
      safety: [
        {
          question: "Where should we meet?",
          answer:
            "Always choose a visible, public meeting point that everyone can reach safely. Avoid isolated areas and share the exact location with the group before departure.",
        },
        {
          question: "What should I do if something feels wrong?",
          answer:
            "Trust your instincts and do not get into a vehicle or meeting situation that feels unsafe. Leave the group, contact someone you trust, and use local emergency services when necessary.",
        },
        {
          question: "Does Waka verify passengers?",
          answer:
            "Waka is designed to help people coordinate rides, but you should still use good judgement before travelling with someone new. Keep conversations in the group and meet in public places.",
        },
      ],
    },
  },
  fr: {
    eyebrow: "À savoir",
    title: "Questions fréquentes",
    description: "Tout ce qu’il faut savoir avant votre prochain trajet.",
    categories: {
      gettingStarted: "Bien démarrer",
      rides: "Trajets",
      safety: "Sécurité",
    },
    questions: {
      gettingStarted: [
        {
          question: "Qu’est-ce que Waka ?",
          answer:
            "Waka aide les personnes qui vont dans la même direction à se retrouver, organiser un trajet partagé et rentrer ensemble plus sereinement.",
        },
        {
          question: "Comment trouver des personnes qui vont dans ma direction ?",
          answer:
            "Choisissez un corridor de destination sur le tableau des trajets et consultez les départs disponibles. Rejoignez ensuite le groupe qui correspond à votre itinéraire et votre horaire.",
        },
        {
          question: "Dois-je créer un compte pour consulter les trajets ?",
          answer:
            "Vous pouvez consulter les itinéraires disponibles sans vous connecter. Un compte est nécessaire pour rejoindre ou créer un groupe et échanger avec les autres passagers.",
        },
      ],
      rides: [
        {
          question: "Comment fonctionne un trajet partagé ?",
          answer:
            "Les passagers se mettent d’accord sur une destination et un point de rencontre public. Une personne commande le trajet, le groupe voyage ensemble et chacun participe selon l’accord établi.",
        },
        {
          question: "Qui commande le véhicule ?",
          answer:
            "Le groupe choisit qui commande le véhicule. Waka facilite l’organisation, mais le trajet est commandé auprès de votre service de transport habituel.",
        },
        {
          question: "Puis-je quitter un groupe après l’avoir rejoint ?",
          answer:
            "Oui. Si vos plans changent, prévenez le groupe dès que possible afin que chacun puisse adapter le point de rencontre ou l’organisation du trajet.",
        },
      ],
      safety: [
        {
          question: "Où devons-nous nous retrouver ?",
          answer:
            "Choisissez toujours un point de rencontre visible et public, facile d’accès pour tout le monde. Évitez les endroits isolés et partagez l’emplacement exact avec le groupe.",
        },
        {
          question: "Que faire si une situation semble inquiétante ?",
          answer:
            "Fiez-vous à votre instinct et ne montez pas dans un véhicule ou ne vous rendez pas à un rendez-vous qui ne vous inspire pas confiance. Prévenez un proche et contactez les services d’urgence si nécessaire.",
        },
        {
          question: "Waka vérifie-t-il les passagers ?",
          answer:
            "Waka facilite l’organisation des trajets, mais gardez votre discernement avant de voyager avec une nouvelle personne. Échangez dans le groupe et privilégiez les lieux publics.",
        },
      ],
    },
  },
} satisfies Record<Language, {
  eyebrow: string;
  title: string;
  description: string;
  categories: Record<string, string>;
  questions: Record<string, FAQItemData[]>;
}>;

type FAQCategory = keyof typeof faqContent.en.categories;

function FAQItem({ question, answer }: FAQItemData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-2xl border transition-colors",
        isOpen
          ? "border-neutral-300 bg-neutral-50 dark:border-white/20 dark:bg-white/10"
          : "border-neutral-200 bg-white dark:border-white/10 dark:bg-white/[0.03]",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <span className="text-base font-semibold text-neutral-900 dark:text-white sm:text-lg">
          {question}
        </span>
        <motion.span
          variants={{ open: { rotate: 45 }, closed: { rotate: 0 } }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <Plus className="size-5 text-neutral-500 dark:text-neutral-400" aria-hidden="true" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          marginBottom: isOpen ? 20 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden px-5 sm:px-6"
      >
        <p className="pb-1 text-sm leading-7 text-neutral-600 dark:text-neutral-300 sm:text-base">
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQSection({ language }: FAQSectionProps) {
  const content = faqContent[language];
  const categoryKeys = Object.keys(content.categories) as FAQCategory[];
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>("gettingStarted");

  return (
    <section id="faq" className="relative overflow-hidden bg-neutral-50 px-4 py-20 dark:bg-neutral-900/40 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-300/5" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
            {content.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categoryKeys.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 dark:border-white/15 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-white/30",
              )}
            >
              {content.categories[category]}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {content.questions[selectedCategory].map((item) => (
                <FAQItem key={item.question} {...item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
