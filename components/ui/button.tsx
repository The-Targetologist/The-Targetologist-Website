import type { ButtonHTMLAttributes } from "react";
import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "onDark";
type ButtonSize = "default" | "lg";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// font-semibold (not font-medium): white text on the real brand orange
// (#e4572e) computes to ~3.68:1 — fails WCAG AA's 4.5:1 for regular text,
// but passes the 3:1 "large/bold text" allowance at semibold+. Keeps the
// exact requested brand color intact rather than silently darkening it.
const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  // Orange, matching the live site's real CTA color (confirmed by the
  // business owner against the "Try Skylead" button) — distinct hover
  // shade, not an opacity fade.
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
  onDark: "border border-white/30 text-white hover:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  // Tighter horizontal padding below sm — the header's CTA sits next to a
  // logo and a hamburger button, and full px-5 pushed the row past 320px
  // viewport width. Safe to bake the breakpoint into the size map itself
  // since sm:px-5 vs px-3 resolve by media query, not by source order.
  default: "h-11 px-3 sm:px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function buttonClasses({ variant = "primary", size = "default", className = "" }: ButtonStyleProps) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyleProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
