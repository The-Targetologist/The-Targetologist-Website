import type { ReactNode } from "react";

// Base card primitive — deliberately restrained (thin border, modest radius,
// no shadow/glassmorphism) per docs/05-design-direction.md anti-pattern list.
// Service/Industry/Testimonial cards (Phase 5) build on this.
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 ${className}`}
    >
      {children}
    </div>
  );
}
