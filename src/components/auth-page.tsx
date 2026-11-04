import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { Language } from "./site-navbar";

export type AuthView = "login" | "signup";

interface AuthPageProps {
  language: Language;
  view: AuthView;
  onViewChange: (view: AuthView) => void;
  onAuthenticated: (email: string) => void;
  onBack: () => void;
}

export default function AuthPage({
  language,
  view,
  onViewChange,
  onAuthenticated,
  onBack,
}: AuthPageProps) {
  const isFrench = language === "fr";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const copy = isFrench
    ? {
        loginTitle: "Bon retour sur Waka.",
        signupTitle: "Rejoignez Waka.",
        loginDescription: "Connectez-vous pour retrouver vos groupes de trajet.",
        signupDescription: "Créez votre compte et trouvez des personnes qui vont dans votre direction.",
        name: "Nom complet",
        email: "Adresse e-mail",
        password: "Mot de passe",
        login: "Se connecter",
        signup: "Créer mon compte",
        switchLogin: "Vous avez déjà un compte ?",
        switchSignup: "Pas encore de compte ?",
        loginLink: "Se connecter",
        signupLink: "Créer un compte",
        back: "Retour à l’accueil",
        benefits: ["Trouvez votre corridor", "Organisez un départ partagé", "Rentrez avec plus de sérénité"],
      }
    : {
        loginTitle: "Welcome back to Waka.",
        signupTitle: "Join Waka.",
        loginDescription: "Sign in to find your ride groups.",
        signupDescription: "Create an account and find people going your way.",
        name: "Full name",
        email: "Email address",
        password: "Password",
        login: "Sign in",
        signup: "Create account",
        switchLogin: "Already have an account?",
        switchSignup: "Don't have an account yet?",
        loginLink: "Sign in",
        signupLink: "Create an account",
        back: "Back to home",
        benefits: ["Find your corridor", "Organise a shared departure", "Get home with less stress"],
      };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAuthenticated(email);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 px-4 py-24 text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <div className="auth-blob auth-blob-one" aria-hidden="true" />
      <div className="auth-blob auth-blob-two" aria-hidden="true" />
      <button
        type="button"
        onClick={onBack}
        className="absolute left-5 top-6 z-10 inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white sm:left-8"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {copy.back}
      </button>

      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white/80 shadow-2xl shadow-indigo-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/75 dark:shadow-black/30 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden flex-col justify-between bg-neutral-950 p-10 text-white lg:flex">
          <div>
            <div className="mb-12 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em]">
              Waka<span className="text-indigo-400 dark:text-white">.</span>
            </div>
            <Sparkles className="mb-6 size-8 text-indigo-400 dark:text-neutral-300" aria-hidden="true" />
            <h2 className="max-w-sm text-3xl font-semibold tracking-tight">
              {isFrench ? "Créez sans limites." : "Create without limits."}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
              {isFrench ? "Rejoignez une communauté qui rentre ensemble." : "Join a community that helps people get home together."}
            </p>
          </div>
          <ul className="space-y-4 text-sm text-neutral-300">
            {copy.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 dark:bg-white/10 dark:text-white">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 sm:p-10 lg:p-14">
          <div className="mb-8 lg:hidden">
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Waka<span className="text-indigo-500 dark:text-white">.</span>
            </span>
          </div>
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500 dark:text-neutral-300">
              {view === "login" ? "Welcome back" : "Early access"}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {view === "login" ? copy.loginTitle : copy.signupTitle}
            </h1>
            <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
              {view === "login" ? copy.loginDescription : copy.signupDescription}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === "signup" && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{copy.name}</span>
                <span className="relative block">
                  <UserRound className="pointer-events-none absolute left-3 top-3 size-4 text-neutral-400" aria-hidden="true" />
                  <input required value={name} onChange={(event) => setName(event.target.value)} className="auth-input pl-10" placeholder="Alex Morgan" />
                </span>
              </label>
            )}
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{copy.email}</span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute left-3 top-3 size-4 text-neutral-400" aria-hidden="true" />
                <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="auth-input pl-10" placeholder="you@example.com" />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">{copy.password}</span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute left-3 top-3 size-4 text-neutral-400" aria-hidden="true" />
                <input required minLength={6} type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="auth-input px-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-700 dark:hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </span>
            </label>
            <button type="submit" className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-neutral-950 text-sm font-medium text-white transition-colors hover:bg-indigo-600 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
              {view === "login" ? copy.login : copy.signup}
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            {view === "login" ? copy.switchSignup : copy.switchLogin}{" "}
            <button type="button" onClick={() => onViewChange(view === "login" ? "signup" : "login")} className="font-medium text-indigo-600 hover:underline dark:text-neutral-200">
              {view === "login" ? copy.signupLink : copy.loginLink}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
