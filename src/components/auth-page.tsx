import { Check, MapPinned, Route, Sparkles } from "lucide-react";
import { SignIn, SignUp } from "@clerk/react";
import { useState } from "react";
import type { Language } from "./site-navbar";
import { BrandLogo } from "./brand-logo";

export type AuthView = "login" | "signup";

interface AuthPageProps {
  language: Language;
  view: AuthView;
  darkMode: boolean;
  onOpenTerms: () => void;
  onSwitchView: (view: AuthView) => void;
}

export default function AuthPage({
  language,
  view,
  darkMode,
  onOpenTerms,
  onSwitchView,
}: AuthPageProps) {
  const isFrench = language === "fr";
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const copy = isFrench
    ? {
        benefits: ["Trouvez votre corridor", "Organisez un départ partagé", "Rentrez avec plus de sérénité"],
      }
    : {
        benefits: ["Find your corridor", "Organise a shared departure", "Get home with less stress"],
      };

  const clerkAppearance = {
    variables: {
      colorPrimary: "#d97706",
      colorText: darkMode ? "#fafafa" : "#171717",
      colorTextSecondary: darkMode ? "#a3a3a3" : "#525252",
      colorBackground: darkMode ? "#171717" : "#ffffff",
      colorInputBackground: darkMode ? "#262626" : "#ffffff",
      colorInputText: darkMode ? "#fafafa" : "#171717",
      borderRadius: "0.75rem",
    },
    elements: {
      rootBox: "w-full max-w-[26rem]",
      card: "w-full shadow-none p-0",
      main: "w-full",
      formFieldInput: "min-h-11 w-full border border-neutral-300 bg-white text-base text-neutral-950 shadow-none sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white",
      formButtonPrimary: "min-h-11",
      socialButtons: "flex w-full justify-center",
      socialButtonsBlockButton: "min-h-11 border border-neutral-300 dark:border-neutral-700",
      socialButtonsBlockButton__google: "mx-auto w-40 justify-center",
      socialButtonsBlockButton__apple: "hidden",
      dividerRow: "hidden",
      footerAction: "!hidden",
    },
  };

  return (
    <main className="relative flex min-h-[100svh] items-start justify-center overflow-x-hidden overflow-y-auto bg-neutral-50 px-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5rem,calc(1.5rem+env(safe-area-inset-top)))] text-neutral-950 sm:items-center sm:px-4 sm:py-24 dark:bg-neutral-950 dark:text-white">
      <div className="auth-blob auth-blob-one" aria-hidden="true" />
      <div className="auth-blob auth-blob-two" aria-hidden="true" />
      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-neutral-200/80 bg-white/80 shadow-2xl shadow-amber-950/10 backdrop-blur-xl sm:rounded-[2rem] dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-black/30 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden flex-col bg-neutral-100 p-10 text-neutral-950 lg:flex dark:bg-neutral-950 dark:text-white">
          <div>
            <BrandLogo imageClassName="w-36" />
            <Sparkles className="mb-6 size-8 text-amber-400 dark:text-amber-300" aria-hidden="true" />
            <h2 className="max-w-sm text-3xl font-semibold tracking-tight">
              {isFrench ? "Créez sans limites." : "Create without limits."}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {isFrench ? "Rejoignez une communauté qui rentre ensemble." : "Join a community that helps people get home together."}
            </p>
          </div>
          <div className="relative my-10 flex min-h-40 flex-1 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="absolute inset-x-10 top-1/2 border-t border-dashed border-amber-400/40" aria-hidden="true" />
            <div className="relative flex w-full items-center justify-between px-10">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                <MapPinned className="size-5" aria-hidden="true" />
              </span>
              <Route className="size-7 text-amber-300" aria-hidden="true" />
              <span className="flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
            </div>
          </div>
          <ul className="space-y-4 text-sm text-neutral-700 dark:text-neutral-300">
            {copy.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-700 dark:bg-white/10 dark:text-amber-300">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 p-4 sm:p-8 lg:p-14">
          <div className="mb-6 lg:hidden">
            <BrandLogo imageClassName="w-28 sm:w-32" />
          </div>
          <div className="flex min-w-0 flex-col items-center justify-center">
            {view === "signup" && (
              <label className="mb-5 flex w-full max-w-[26rem] items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-1 size-4 accent-amber-500"
                  required
                />
                <span>
                  {isFrench ? "J’accepte les " : "I agree to the "}
                  <button
                    type="button"
                    onClick={onOpenTerms}
                    className="font-medium text-amber-700 underline underline-offset-2 dark:text-amber-300"
                  >
                    {isFrench ? "conditions générales" : "Terms & Conditions"}
                  </button>
                  .
                </span>
              </label>
            )}
            <div className={view === "signup" && !acceptedTerms ? "pointer-events-none w-full opacity-50" : "w-full"}>
              {view === "login" ? (
                <SignIn
                  routing="hash"
                  signUpUrl="#signup"
                  appearance={clerkAppearance}
                />
              ) : (
                <SignUp
                  routing="hash"
                  signInUrl="#login"
                  appearance={clerkAppearance}
                />
              )}
            </div>
            <p className="mt-5 text-center text-sm text-neutral-600 dark:text-neutral-400">
              {view === "login"
                ? (isFrench ? "Pas encore de compte ?" : "Don't have an account?")
                : (isFrench ? "Vous avez déjà un compte ?" : "Already have an account?")}{" "}
              <button
                type="button"
                onClick={() => onSwitchView(view === "login" ? "signup" : "login")}
                className="font-medium text-amber-700 underline underline-offset-2 dark:text-amber-300"
              >
                {view === "login"
                  ? (isFrench ? "Créer un compte" : "Sign up")
                  : (isFrench ? "Se connecter" : "Sign in")}
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
