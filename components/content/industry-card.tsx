import { Card } from "@/components/ui/card";
import { TestimonialCard } from "./testimonial-card";
import {
  HeartPulseIcon,
  UsersIcon,
  ShoppingBagIcon,
  HomeIcon,
  BriefcaseIcon,
} from "@/components/ui/icons";
import type { IndustryCategory, Testimonial } from "@/lib/types/content";
import type { ComponentType, SVGProps } from "react";

const ICONS_BY_SLUG: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "healthcare-medical-services": HeartPulseIcon,
  "recruitment-staffing": UsersIcon,
  "apparel-retail": ShoppingBagIcon,
  "home-services": HomeIcon,
  "b2b-agencies": BriefcaseIcon,
};

export function IndustryCard({
  industry,
  testimonial,
}: {
  industry: Pick<IndustryCategory, "name" | "description" | "slug">;
  testimonial?: Testimonial | null;
}) {
  const Icon = ICONS_BY_SLUG[industry.slug] ?? BriefcaseIcon;

  return (
    <Card>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg">{industry.name}</h3>
      {industry.description && (
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{industry.description}</p>
      )}
      {testimonial && (
        <div className="mt-4 border-t border-[var(--color-border)] pt-4">
          <TestimonialCard testimonial={testimonial} industry={industry} compact />
        </div>
      )}
    </Card>
  );
}
