import { Languages, LogIn, LogOut, Moon, Sun, UserPlus } from "lucide-react";

export type Language = "en" | "fr";

interface SiteNavbarProps {
  language: Language;
  darkMode: boolean;
  onLanguageChange: () => void;
  onThemeChange: () => void;
  authenticatedEmail: string | null;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

export default function SiteNavbar({
  language,
  darkMode,
  onLanguageChange,
  onThemeChange,
  authenticatedEmail,
  onLogin,
  onSignup,
  onLogout,
}: SiteNavbarProps) {
  const isFrench = language === "fr";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-neutral-200/70 bg-white/75 px-4 py-2 shadow-lg shadow-neutral-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70 dark:shadow-black/20">
        <a
          href="#top"
          className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-950 dark:text-white"
        >
          Ether<span className="text-indigo-500 dark:text-white">.</span>
        </a>
        <div className="flex items-center gap-1">
          {authenticatedEmail ? (
            <button type="button" onClick={onLogout} className="hidden h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex">
              <LogOut className="size-4" aria-hidden="true" />
              {isFrench ? "Déconnexion" : "Log out"}
            </button>
          ) : (
            <>
              <button type="button" onClick={onLogin} className="hidden h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white sm:inline-flex">
                <LogIn className="size-4" aria-hidden="true" />
                {isFrench ? "Connexion" : "Log in"}
              </button>
              <button type="button" onClick={onSignup} className="hidden h-9 items-center gap-2 rounded-full bg-neutral-950 px-4 text-xs font-medium text-white transition-colors hover:bg-indigo-600 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:inline-flex">
                <UserPlus className="size-4" aria-hidden="true" />
                {isFrench ? "Commencer" : "Get started"}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onLanguageChange}
            className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={isFrench ? "Switch to English" : "Passer au français"}
          >
            <Languages className="size-4" aria-hidden="true" />
            <span>{isFrench ? "EN" : "FR"}</span>
          </button>
          <button
            type="button"
            onClick={onThemeChange}
            className="inline-flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label={darkMode ? "Use light theme" : "Use dark theme"}
          >
            {darkMode ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
