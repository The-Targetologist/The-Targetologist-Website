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
  const service = await getServiceBySlug("advertisement");
  return pageMetadata({
    title: "Advertisement",
    description:
      service?.one_line_value_prop ??
      "Paid ad campaign management across Google, Meta, and LinkedIn for B2B service businesses.",
    path: "/services/advertisement",
  });
}

export default async function AdvertisementServicePage() {
  const service = await getServiceBySlug("advertisement");
  if (!service) notFound();

  const [processSteps, faqs] = await Promise.all([
    getProcessStepsForService(service.id),
    getFaqsForService(service.id),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service, "/services/advertisement")) }}
      />
      <ServicePageLayout
        service={service}
        processSteps={processSteps}
        faqs={faqs}
        platforms={["Meta", "Google", "LinkedIn"]}
        graphic={
          <Image
            src="/advertisement-photo.jpg"
            alt="A desktop monitor displaying an advertising performance chart trending upward"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        }
        ctaHeadline={SERVICE_PAGE_CTA.advertisement.headline}
        ctaSubhead={SERVICE_PAGE_CTA.advertisement.subhead}
      />
    </>
  );
}
