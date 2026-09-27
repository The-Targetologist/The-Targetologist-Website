import { Card } from "@/components/ui/card";
import type { IndustryCategory, Testimonial } from "@/lib/types/content";

/**
 * Only rendered when a testimonial has explicit client permission on file.
 * HARD RULE: never render client_name/client_company unless
 * permission_confirmed is true — enforced here, in the render layer, not
 * left to callers to remember. See docs/09-content-and-database-model.md
 * and docs/16-claude-project-rules.md.
 */
export function TestimonialCard({
  testimonial,
  industry,
  compact = false,
}: {
  testimonial: Testimonial;
  industry?: Pick<IndustryCategory, "name"> | null;
  compact?: boolean;
}) {
  const attribution =
    testimonial.permission_confirmed && testimonial.client_name
      ? [testimonial.client_name, testimonial.client_company].filter(Boolean).join(", ")
      : (industry?.name ?? "Client work");

  const content = (
    <>
      <p className="text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      <p className="mt-4 text-sm font-medium text-[var(--color-muted-foreground)]">{attribution}</p>
    </>
  );

  if (compact) return <div>{content}</div>;

  return <Card>{content}</Card>;
}
