import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ServicePageLayout } from "@/components/content/service-page-layout";
import { getServiceBySlug } from "@/lib/queries/services";
import { getProcessStepsForService } from "@/lib/queries/process-steps";
import { getFaqsForService } from "@/lib/queries/faqs";
import { SERVICE_PAGE_CTA } from "@/lib/content/service-pages";
import { pageMetadata } from "@/lib/seo";
import { serviceJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const service = await getServiceBySlug("automation");
  return pageMetadata({
    title: "Automation",
    description:
      service?.one_line_value_prop ??
      "CRM and pipeline automation, lead nurture sequences, and booking systems for B2B service businesses.",
    path: "/services/automation",
  });
}

export default async function AutomationServicePage() {
  const service = await getServiceBySlug("automation");
  if (!service) notFound();

  const [processSteps, faqs] = await Promise.all([
    getProcessStepsForService(service.id),
    getFaqsForService(service.id),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service, "/services/automation")) }}
      />
      <ServicePageLayout
        service={service}
        processSteps={processSteps}
        faqs={faqs}
        platforms={["GoHighLevel", "Zapier", "Skylead"]}
        graphic={
          <Image
            src="/automation-photo.jpg"
            alt="A kanban-style workflow board tracking tasks through automated stages"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        }
        ctaHeadline={SERVICE_PAGE_CTA.automation.headline}
        ctaSubhead={SERVICE_PAGE_CTA.automation.subhead}
      />
    </>
  );
}
