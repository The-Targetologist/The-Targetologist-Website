import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Service } from "@/lib/types/content";

// Used on Home (2 instances) and possibly the Work page. A plain numbered
// mark instead of a generic icon grid — see docs/05-design-direction.md
// anti-pattern list.
export function ServiceCard({
  service,
  index,
}: {
  service: Pick<Service, "name" | "slug" | "one_line_value_prop">;
  index: number;
}) {
  return (
    <Card className="flex h-full flex-col">
      <span className="text-sm font-semibold text-[var(--color-accent)]">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-xl">{service.name}</h3>
      {service.one_line_value_prop && (
        <p className="mt-2 flex-1 text-[var(--color-muted-foreground)]">
          {service.one_line_value_prop}
        </p>
      )}
      <Link
        href={`/services/${service.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)]"
      >
        Learn more <span aria-hidden>→</span>
      </Link>
    </Card>
  );
}
