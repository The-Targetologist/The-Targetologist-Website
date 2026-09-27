"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/lib/actions/submit-inquiry";
import { CHALLENGE_OPTIONS } from "@/lib/constants/inquiry";
import { Button } from "@/components/ui/button";

const initialState: InquiryFormState = { status: "idle" };

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]";

// Native form replacing the GHL iframe embed — business owner request,
// 2026-09-27. Single step (no calendar/time-picker), submits to
// lib/actions/submit-inquiry.ts which stores the lead and best-effort
// forwards it to a webhook once configured. Same component used on both
// Home and Contact.
export function LeadForm() {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-8 text-center">
        <p className="text-lg font-semibold">Thanks, that&rsquo;s in.</p>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          We&rsquo;ll review your details and follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="lead-name" className="text-sm font-medium">
            Full Name
          </label>
          <input id="lead-name" name="name" required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="lead-email" className="text-sm font-medium">
            Work Email
          </label>
          <input id="lead-email" name="email" type="email" required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="lead-phone" className="text-sm font-medium">
            Phone <span className="font-normal text-[var(--color-muted-foreground)]">(Optional)</span>
          </label>
          <input id="lead-phone" name="phone" type="tel" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="lead-company" className="text-sm font-medium">
            Company <span className="font-normal text-[var(--color-muted-foreground)]">(Optional)</span>
          </label>
          <input id="lead-company" name="company" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="lead-challenge" className="text-sm font-medium">
            What&rsquo;s Your Biggest Challenge Right Now?
          </label>
          <select id="lead-challenge" name="challenge" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose one
            </option>
            {CHALLENGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="lead-website" className="text-sm font-medium">
            Website <span className="font-normal text-[var(--color-muted-foreground)]">(Optional)</span>
          </label>
          <input id="lead-website" name="website" type="url" placeholder="https://" className={fieldClass} />
        </div>

        {state.status === "error" && <p className="text-sm text-red-600">{state.error}</p>}

        <Button type="submit" size="lg" disabled={pending} className="mt-2 w-full">
          {pending ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
