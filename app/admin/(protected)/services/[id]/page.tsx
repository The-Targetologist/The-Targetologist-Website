import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createService, updateService, deleteService } from "../actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Service } from "@/lib/types/content";

export default async function AdminServiceFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let service: Service | null = null;

  if (!isNew) {
    const supabase = createAdminClient();
    const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    service = data;
  }

  const action = isNew ? createService : updateService.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">{isNew ? "New Service" : `Edit: ${service!.name}`}</h1>
      <form action={action} className="mt-6 flex flex-col gap-4">
        <FormField label="Name" htmlFor="name">
          <input id="name" name="name" required defaultValue={service?.name} className={inputClass} />
        </FormField>
        <FormField label="Slug" htmlFor="slug">
          <input id="slug" name="slug" required defaultValue={service?.slug} className={inputClass} />
        </FormField>
        <FormField label="Tagline (punchy hero headline)" htmlFor="tagline">
          <input
            id="tagline"
            name="tagline"
            defaultValue={service?.tagline ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="One-line value prop" htmlFor="one_line_value_prop">
          <input
            id="one_line_value_prop"
            name="one_line_value_prop"
            defaultValue={service?.one_line_value_prop ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Problem statement" htmlFor="problem_statement">
          <textarea
            id="problem_statement"
            name="problem_statement"
            rows={3}
            defaultValue={service?.problem_statement ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="How we do it" htmlFor="how_we_do_it">
          <textarea
            id="how_we_do_it"
            name="how_we_do_it"
            rows={3}
            defaultValue={service?.how_we_do_it ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="What's included (one item per line)" htmlFor="whats_included">
          <textarea
            id="whats_included"
            name="whats_included"
            rows={4}
            defaultValue={service?.whats_included ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Why it works (one item per line)" htmlFor="why_it_works">
          <textarea
            id="why_it_works"
            name="why_it_works"
            rows={4}
            defaultValue={service?.why_it_works ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Status" htmlFor="status">
          <select id="status" name="status" defaultValue={service?.status ?? "draft"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </FormField>
        <div className="mt-2 flex items-center justify-between">
          <button
            type="submit"
            className="h-10 rounded-md bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)]"
          >
            {isNew ? "Create" : "Save"}
          </button>
          {!isNew && <DeleteButton action={deleteService.bind(null, id)} label="Delete service" />}
        </div>
      </form>
    </div>
  );
}
