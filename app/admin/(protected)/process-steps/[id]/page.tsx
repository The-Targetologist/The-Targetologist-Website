import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createProcessStep, updateProcessStep, deleteProcessStep } from "../actions";
import { FormField, inputClass } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import type { ProcessStep } from "@/lib/types/content";

export default async function AdminProcessStepFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const supabase = createAdminClient();

  const { data: services } = await supabase.from("services").select("id, name").order("name");

  let step: ProcessStep | null = null;
  if (!isNew) {
    const { data } = await supabase.from("process_steps").select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    step = data;
  }

  const action = isNew ? createProcessStep : updateProcessStep.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl">{isNew ? "New Process Step" : `Edit: ${step!.title}`}</h1>
      <form action={action} className="mt-6 flex flex-col gap-4">
        <FormField label="Belongs to" htmlFor="service_id">
          <select id="service_id" name="service_id" defaultValue={step?.service_id ?? ""} className={inputClass}>
            <option value="">Homepage (general)</option>
            {(services ?? []).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Step number" htmlFor="step_number">
          <input
            id="step_number"
            name="step_number"
            type="number"
            min={1}
            required
            defaultValue={step?.step_number ?? 1}
            className={inputClass}
          />
        </FormField>
        <FormField label="Title" htmlFor="title">
          <input id="title" name="title" required defaultValue={step?.title} className={inputClass} />
        </FormField>
        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={step?.description ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Sub-tags (comma-separated, optional)" htmlFor="sub_tags">
          <input
            id="sub_tags"
            name="sub_tags"
            defaultValue={step?.sub_tags?.join(", ") ?? ""}
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
          {!isNew && <DeleteButton action={deleteProcessStep.bind(null, id)} label="Delete step" />}
        </div>
      </form>
    </div>
  );
}
