import type { ProcessStep as ProcessStepType } from "@/lib/types/content";

// Reused on Home and each service page, but not forced to look identical
// across contexts — see docs/08-component-system.md. "compact" is a tighter
// horizontal layout for denser contexts (e.g. a service page sidebar);
// "default" is the fuller vertical treatment for a dedicated process
// section. Both are cards (border/bg/padding) — no plain text blocks,
// per the business owner's sitewide card-UI request (2026-09-27).
export function ProcessStep({
  step,
  variant = "default",
}: {
  step: Pick<ProcessStepType, "step_number" | "title" | "description" | "sub_tags">;
  variant?: "default" | "compact";
}) {
  const isCompact = variant === "compact";
  const number = String(step.step_number).padStart(2, "0");

  return (
    <div
      className={
        isCompact
          ? "flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5"
          : "flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6"
      }
    >
      <span
        className={
          isCompact
            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-sm font-semibold"
            : "text-4xl font-bold text-[var(--color-accent)]"
        }
      >
        {number}
      </span>
      <div>
        <h3 className={isCompact ? "text-base font-semibold" : "mt-2 text-xl"}>{step.title}</h3>
        {step.description && (
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{step.description}</p>
        )}
        {step.sub_tags && step.sub_tags.length > 0 && (
          <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {step.sub_tags.join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}
