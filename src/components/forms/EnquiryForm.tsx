"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { enquiryTypes, site } from "@/content/site";
import { orderedRegions } from "@/content/regions";
import { tiers } from "@/content/sponsorship";
import { validateEnquiry, type EnquiryErrors, type EnquiryValues } from "@/lib/validation";
import { cn } from "@/lib/cn";

type EnquiryFormProps = {
  defaultType?: string;
  /** Hide the enquiry-type selector and keep `defaultType`. */
  lockType?: boolean;
  idPrefix?: string;
};

const FIELD_ORDER: Array<keyof EnquiryValues> = [
  "fullName",
  "email",
  "phone",
  "organisation",
  "enquiryType",
  "region",
  "tier",
  "message",
  "consent",
];

/**
 * Frontend-only enquiry form with client-side validation.
 * No backend is connected yet: on submit it simulates success and offers a
 * pre-filled email so the enquiry can still be sent. Replace `submitEnquiry`
 * with an API call / Server Action when the backend is ready.
 */
async function submitEnquiry(_values: EnquiryValues): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900));
}

export function EnquiryForm({ defaultType = "general", lockType = false, idPrefix = "enquiry" }: EnquiryFormProps) {
  const params = useSearchParams();
  const typeParam = params.get("type");
  const regionParam = params.get("region");
  const tierParam = params.get("tier");

  const initial: EnquiryValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      organisation: "",
      enquiryType:
        !lockType && typeParam && enquiryTypes.some((t) => t.value === typeParam) ? typeParam : defaultType,
      region: regionParam && orderedRegions.some((r) => r.slug === regionParam) ? regionParam : "",
      tier: tierParam && tiers.some((t) => t.slug === tierParam) ? tierParam : "",
      message: "",
      consent: false,
      website: "",
    }),
    [defaultType, lockType, typeParam, regionParam, tierParam],
  );

  const [values, setValues] = useState<EnquiryValues>(initial);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const id = (name: string) => `${idPrefix}-${name}`;
  const typeMeta = enquiryTypes.find((t) => t.value === values.enquiryType) ?? enquiryTypes[0];

  const update = (name: keyof EnquiryValues, value: string | boolean) => {
    const next = { ...values, [name]: value } as EnquiryValues;
    setValues(next);
    if (touched[name]) setErrors(validateEnquiry(next));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name as keyof EnquiryValues;
    update(name, target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value);
  };

  const onBlur = (name: keyof EnquiryValues) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateEnquiry(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.website) return; // bot
    const result = validateEnquiry(values);
    setErrors(result);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    const firstInvalid = FIELD_ORDER.find((f) => result[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    await submitEnquiry(values);
    setStatus("success");
  };

  const mailtoHref = useMemo(() => {
    const region = orderedRegions.find((r) => r.slug === values.region)?.name;
    const tier = tiers.find((t) => t.slug === values.tier)?.name;
    const lines = [`Name: ${values.fullName}`, `Email: ${values.email}`, `Phone: ${values.phone}`];
    if (values.organisation) lines.push(`Organisation: ${values.organisation}`);
    if (region) lines.push(`Region: ${region}`);
    if (tier) lines.push(`Sponsorship tier: ${tier}`);
    lines.push("", values.message);
    const body = lines.join("\n");
    return `mailto:${site.email}?subject=${encodeURIComponent(typeMeta.subject)}&body=${encodeURIComponent(body)}`;
  }, [values, typeMeta.subject]);

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const show = (name: keyof EnquiryValues) => (touched[name] ? errors[name] : undefined);

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          className="py-6"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-maroon-ink">
            <Check className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <h3 className="mt-8 text-[1.875rem]">Thank you, {values.fullName.split(" ")[0]}.</h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Your {typeMeta.label.toLowerCase()} has been recorded on this page. Online submissions are not yet connected,
            so please send it to our team by email to make sure it reaches us.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-3 bg-maroon px-7 py-4 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-maroon-deep"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Send via email
            </a>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center border border-maroon/30 px-7 py-4 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-gold hover:text-gold-ink"
            >
              New enquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-x-10 gap-y-8 sm:grid-cols-2"
          aria-describedby={id("required-note")}
        >
          <p id={id("required-note")} className="text-xs text-muted sm:col-span-2">
            Fields marked <span className="text-gold-ink">*</span> are required.
          </p>

          <Field id={id("fullName")} label="Full name" required error={show("fullName")}>
            <input
              id={id("fullName")}
              name="fullName"
              type="text"
              autoComplete="name"
              value={values.fullName}
              onChange={onChange}
              onBlur={() => onBlur("fullName")}
              aria-invalid={Boolean(show("fullName"))}
              aria-describedby={show("fullName") ? id("fullName-error") : undefined}
              className="field"
              placeholder="Your name"
            />
          </Field>

          <Field id={id("email")} label="Email" required error={show("email")}>
            <input
              id={id("email")}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={onChange}
              onBlur={() => onBlur("email")}
              aria-invalid={Boolean(show("email"))}
              aria-describedby={show("email") ? id("email-error") : undefined}
              className="field"
              placeholder="you@company.com"
            />
          </Field>

          <Field id={id("phone")} label="Phone / WhatsApp" required error={show("phone")}>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={onChange}
              onBlur={() => onBlur("phone")}
              aria-invalid={Boolean(show("phone"))}
              aria-describedby={show("phone") ? id("phone-error") : undefined}
              className="field"
              placeholder="+91 98765 43210"
            />
          </Field>

          <Field id={id("organisation")} label="Organisation" error={show("organisation")}>
            <input
              id={id("organisation")}
              name="organisation"
              type="text"
              autoComplete="organization"
              value={values.organisation}
              onChange={onChange}
              onBlur={() => onBlur("organisation")}
              aria-invalid={Boolean(show("organisation"))}
              aria-describedby={show("organisation") ? id("organisation-error") : undefined}
              className="field"
              placeholder="Company or institution"
            />
          </Field>

          {!lockType && (
            <Field id={id("enquiryType")} label="Enquiry type" required error={show("enquiryType")}>
              <select
                id={id("enquiryType")}
                name="enquiryType"
                value={values.enquiryType}
                onChange={onChange}
                onBlur={() => onBlur("enquiryType")}
                aria-invalid={Boolean(show("enquiryType"))}
                aria-describedby={id("enquiryType-hint")}
                className="field cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat pr-6"
                style={{ backgroundImage: CHEVRON }}
              >
                {enquiryTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <p id={id("enquiryType-hint")} className="mt-2 text-xs text-muted">
                {typeMeta.description}
              </p>
            </Field>
          )}

          <Field id={id("region")} label="Region of interest" error={show("region")}>
            <select
              id={id("region")}
              name="region"
              value={values.region}
              onChange={onChange}
              className="field cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat pr-6"
              style={{ backgroundImage: CHEVRON }}
            >
              <option value="">Not sure yet / all regions</option>
              {orderedRegions.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>

          {values.enquiryType === "sponsorship" && (
            <Field id={id("tier")} label="Sponsorship tier of interest" error={show("tier")}>
              <select
                id={id("tier")}
                name="tier"
                value={values.tier}
                onChange={onChange}
                className="field cursor-pointer appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat pr-6"
                style={{ backgroundImage: CHEVRON }}
              >
                <option value="">Undecided</option>
                {tiers.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </Field>
          )}

          <Field id={id("message")} label="Message" required error={show("message")} className="sm:col-span-2">
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              value={values.message}
              onChange={onChange}
              onBlur={() => onBlur("message")}
              aria-invalid={Boolean(show("message"))}
              aria-describedby={cn(id("message-count"), show("message") && id("message-error")) || undefined}
              className="field resize-y"
              placeholder="Tell us how you'd like to take part"
              maxLength={1000}
            />
            <p id={id("message-count")} className="mt-2 text-right text-[0.7rem] tabular-nums text-muted">
              {values.message.length} / 1000
            </p>
          </Field>

          {/* Honeypot */}
          <div className="hidden" aria-hidden>
            <label htmlFor={id("website")}>Website</label>
            <input id={id("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-charcoal">
              <input
                id={id("consent")}
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={onChange}
                onBlur={() => onBlur("consent")}
                aria-invalid={Boolean(show("consent"))}
                aria-describedby={show("consent") ? id("consent-error") : undefined}
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-gold)]"
              />
              I agree that Kanavu Connect may contact me about this enquiry.
            </label>
            {show("consent") && (
              <p id={id("consent-error")} role="alert" className="mt-2 text-xs text-[#b4533c]">
                {show("consent")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-3 bg-maroon px-8 py-4 text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-maroon-deep disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {status === "submitting" ? "Sending…" : "Submit enquiry"}
            </button>
            <p className="text-xs text-muted">Enquiries are directed to {site.email}</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23B89A66' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, required, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
        {required && <span className="ml-1 text-gold-ink">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-[#b4533c]">
          {error}
        </p>
      )}
    </div>
  );
}
