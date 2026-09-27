"use client";

import { useState } from "react";
import type { Faq } from "@/lib/types/content";

export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              <span
                aria-hidden
                className={`shrink-0 text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              hidden={!isOpen}
              className="pb-5 text-[var(--color-muted-foreground)]"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
