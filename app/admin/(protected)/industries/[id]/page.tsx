import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createIndustry, updateIndustry, deleteIndustry } from "../actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import type { IndustryCategory } from "@/lib/types/content";

export default async function AdminIndustryFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const supabase = createAdminClient();

  const { data: services } = await supabase.from("services").select("id, name").order("name");

  let industry: (IndustryCategory & { related_service_ids: string[] | null }) | null = null;
  if (!isNew) {
    const { data } = await supabase.from("industry_categories").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    industry = data;
  }

  const action = isNew ? createIndustry : updateIndustry.bind(null, id);
  const relatedIds = new Set(industry?.related_service_ids ?? []);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">{isNew ? "New Industry" : `Edit: ${industry!.name}`}</h1>
      <form action={action} className="mt-6 flex flex-col gap-4">
        <FormField label="Name" htmlFor="name">
          <input id="name" name="name" required defaultValue={industry?.name} className={inputClass} />
        </FormField>
        <FormField label="Slug" htmlFor="slug">
          <input id="slug" name="slug" required defaultValue={industry?.slug} className={inputClass} />
        </FormField>
        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={industry?.description ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Related services" htmlFor="related_service_ids">
          <div className="flex flex-col gap-2">
            {(services ?? []).map((s) => (
              <label key={s.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="related_service_ids"
                  value={s.id}
                  defaultChecked={relatedIds.has(s.id)}
                />
                {s.name}
              </label>
            ))}
          </div>
        </FormField>
        <div className="mt-2 flex items-center justify-between">
          <button
            type="submit"
            className="h-10 rounded-md bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)]"
          >
            {isNew ? "Create" : "Save"}
          </button>
          {!isNew && <DeleteButton action={deleteIndustry.bind(null, id)} label="Delete industry" />}
        </div>
      </form>
    </div>
  );
}
