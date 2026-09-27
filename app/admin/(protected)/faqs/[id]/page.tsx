import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createFaq, updateFaq, deleteFaq } from "../actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Faq } from "@/lib/types/content";

export default async function AdminFaqFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const supabase = createAdminClient();

  const { data: services } = await supabase.from("services").select("id, name").order("name");

  let faq: Faq | null = null;
  if (!isNew) {
    const { data } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    faq = data;
  }

  const action = isNew ? createFaq : updateFaq.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">{isNew ? "New FAQ" : "Edit FAQ"}</h1>
      <form action={action} className="mt-6 flex flex-col gap-4">
        <FormField label="Service" htmlFor="service_id">
          <select id="service_id" name="service_id" defaultValue={faq?.service_id ?? ""} className={inputClass}>
            <option value="">General</option>
            {(services ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Question" htmlFor="question">
          <input id="question" name="question" required defaultValue={faq?.question} className={inputClass} />
        </FormField>
        <FormField label="Answer" htmlFor="answer">
          <textarea
            id="answer"
            name="answer"
            rows={4}
            required
            defaultValue={faq?.answer}
            className={inputClass}
          />
        </FormField>
        <FormField label="Sort order" htmlFor="sort_order">
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={faq?.sort_order ?? 0}
            className={inputClass}
          />
        </FormField>
        <div className="mt-2 flex items-center justify-between">
          <button
            type="submit"
            className="h-10 rounded-md bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)]"
          >
            {isNew ? "Create" : "Save"}
          </button>
          {!isNew && <DeleteButton action={deleteFaq.bind(null, id)} label="Delete FAQ" />}
        </div>
      </form>
    </div>
  );
}
