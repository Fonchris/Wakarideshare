import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
}

export function BrandLogo({ className, imageClassName }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/logo-light.png"
        alt="Waka rideshare"
        className={cn("hidden h-auto dark:block", imageClassName)}
      />
      <img
        src="/logo-dark.png"
        alt="Waka rideshare"
        className={cn("h-auto dark:hidden", imageClassName)}
      />
    </span>
  );
}
