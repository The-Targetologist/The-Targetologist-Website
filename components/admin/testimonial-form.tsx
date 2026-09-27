"use client";

import { useState } from "react";
import { FormField, inputClass } from "@/components/admin/form-field";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Testimonial } from "@/lib/types/content";

export function TestimonialForm({
  testimonial,
  industries,
  action,
  deleteAction,
  isNew,
}: {
  testimonial: Testimonial | null;
  industries: { id: string; name: string }[];
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (formData: FormData) => Promise<void>;
  isNew: boolean;
}) {
  const [permissionConfirmed, setPermissionConfirmed] = useState(
    testimonial?.permission_confirmed ?? false
  );
  const [clientName, setClientName] = useState(testimonial?.client_name ?? "");
  const [clientCompany, setClientCompany] = useState(testimonial?.client_company ?? "");
  const [industryId, setIndustryId] = useState(testimonial?.industry_category_id ?? "");

  const industryName = industries.find((i) => i.id === industryId)?.name ?? "(no industry selected)";
  const previewAttribution =
    permissionConfirmed && clientName.trim()
      ? [clientName, clientCompany].filter(Boolean).join(", ")
      : industryName;

  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      <FormField label="Industry" htmlFor="industry_category_id">
        <select
          id="industry_category_id"
          name="industry_category_id"
          value={industryId}
          onChange={(e) => setIndustryId(e.target.value)}
          className={inputClass}
        >
          <option value="">— None —</option>
          {industries.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Quote" htmlFor="quote">
        <textarea
          id="quote"
          name="quote"
          rows={4}
          required
          defaultValue={testimonial?.quote}
          className={inputClass}
        />
      </FormField>

      <FormField label="Client name (optional)" htmlFor="client_name">
        <input
          id="client_name"
          name="client_name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className={inputClass}
        />
      </FormField>

      <FormField label="Client company (optional)" htmlFor="client_company">
        <input
          id="client_company"
          name="client_company"
          value={clientCompany}
          onChange={(e) => setClientCompany(e.target.value)}
          className={inputClass}
        />
      </FormField>

      <div className="rounded-md border-2 border-amber-400 bg-amber-50 p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="permission_confirmed"
            checked={permissionConfirmed}
            onChange={(e) => setPermissionConfirmed(e.target.checked)}
            className="mt-1 h-5 w-5 accent-amber-600"
          />
          <span>
            <span className="block font-semibold text-amber-900">
              Client has given explicit written permission to use their name/company
            </span>
            <span className="mt-1 block text-sm text-amber-800">
              If unchecked, this testimonial renders on the live site attributed only to its
              industry category — no client name or company will ever show, regardless of what's
              typed above. This is enforced in code, not just here.
            </span>
          </span>
        </label>
      </div>

      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">
          Live site preview
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          Will display as: <span className="font-medium text-[var(--color-foreground)]">{previewAttribution}</span>
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <button
          type="submit"
          className="h-10 rounded-md bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-primary-foreground)]"
        >
          {isNew ? "Create" : "Save"}
        </button>
        {!isNew && deleteAction && <DeleteButton action={deleteAction} label="Delete testimonial" />}
      </div>
    </form>
  );
}
