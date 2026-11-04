import type { ReactNode } from "react";
import { NotepadTextDashed } from "lucide-react";
import { cn } from "@/lib/utils";

const CURRENT_YEAR = new Date().getFullYear();

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: ReactNode;
  className?: string;
}

export const Footer = ({
  brandName = "YourBrand",
  brandDescription = "Your description here",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative mt-0 w-full overflow-hidden", className)}>
      <footer className="relative mt-20 border-t border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-950">
        <div className="relative mx-auto flex min-h-[30rem] max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-[35rem] md:min-h-[40rem]">
          <div className="mb-12 flex w-full flex-col sm:mb-20 md:mb-0">
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-1 flex-col items-center space-y-2">
                <span className="text-3xl font-bold text-neutral-950 dark:text-white">
                  {brandName}
                </span>
                <p className="w-full max-w-sm px-4 text-center font-semibold text-neutral-500 dark:text-neutral-400 sm:w-96 sm:px-0">
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="mt-3 mb-8 flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <div className="h-6 w-6 duration-300 hover:scale-110">
                        {link.icon}
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <nav className="flex max-w-full flex-wrap justify-center gap-4 px-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      className="duration-300 hover:font-semibold hover:text-neutral-950 dark:hover:text-white"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-center text-base text-neutral-500 dark:text-neutral-400 md:text-left">
              ©{CURRENT_YEAR} {brandName}. All rights reserved.
            </p>
            {creatorName && creatorUrl && (
              <a
                href={creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-neutral-500 transition-colors duration-300 hover:font-medium hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
              >
                Crafted by {creatorName}
              </a>
            )}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-40 left-1/2 max-w-[95vw] -translate-x-1/2 select-none bg-gradient-to-b from-neutral-950/20 via-neutral-950/10 to-transparent bg-clip-text px-4 text-center text-transparent dark:from-white/20 dark:via-white/10"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)", lineHeight: 1 }}
        >
          {brandName.toUpperCase()}
        </div>

        <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-3xl border-2 border-neutral-200 bg-white/60 p-3 drop-shadow-[0_0px_20px_rgba(0,0,0,0.2)] backdrop-blur-sm duration-300 hover:border-neutral-950 dark:border-white/10 dark:bg-neutral-950/60 dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.15)] dark:hover:border-white md:bottom-20">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-950 to-neutral-700 shadow-lg dark:from-white dark:to-neutral-300 sm:h-16 sm:w-16 md:h-24 md:w-24">
            {brandIcon || (
              <NotepadTextDashed className="h-8 w-8 text-white dark:text-neutral-950 sm:h-10 sm:w-10 md:h-14 md:w-14" />
            )}
          </div>
        </div>

        <div className="absolute bottom-32 left-1/2 h-1 w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-200 to-transparent backdrop-blur-sm dark:via-white/15 sm:bottom-34" />
        <div className="absolute bottom-28 h-24 w-full bg-gradient-to-t from-white via-white/80 to-white/40 blur-[1em] dark:from-neutral-950 dark:via-neutral-950/80 dark:to-neutral-950/40" />
      </footer>
    </section>
  );
};
