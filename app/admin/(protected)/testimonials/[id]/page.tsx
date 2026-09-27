import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "../actions";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import type { Testimonial } from "@/lib/types/content";

export default async function AdminTestimonialFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const supabase = createAdminClient();

  const { data: industries } = await supabase.from("industry_categories").select("id, name").order("name");

  let testimonial: Testimonial | null = null;
  if (!isNew) {
    const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    testimonial = data;
  }

  const action = isNew ? createTestimonial : updateTestimonial.bind(null, id);
  const deleteActionBound = isNew ? undefined : deleteTestimonial.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">{isNew ? "New Testimonial" : "Edit Testimonial"}</h1>
      <TestimonialForm
        testimonial={testimonial}
        industries={industries ?? []}
        action={action}
        deleteAction={deleteActionBound}
        isNew={isNew}
      />
    </div>
  );
}
