"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { type FormEvent, useCallback, useRef, useState } from "react";
import { Turnstile } from "@/components/ui/turnstile";
import { contactServices } from "@/content/contact";
import {
  type ContactErrors,
  type ContactFields,
  validateContactFields,
} from "@/lib/contact/validation";

const inputClass =
  "mt-2 block min-h-12 w-full rounded-sm border border-line bg-white px-3.5 py-3 text-base text-graphite placeholder:text-muted/60 focus:border-sage focus:outline-2 focus:outline-offset-2 focus:outline-sage aria-invalid:border-copper";

export function ContactForm({ siteKey }: { siteKey: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const submissionId = useRef("");
  const sendingRef = useRef(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [feedback, setFeedback] = useState("");
  const onToken = useCallback((value: string) => setToken(value), []);
  const onChallengeError = useCallback(() => {
    setToken("");
    setFeedback(
      "The security check could not load. Please try again, or use the contact details beside the form.",
    );
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    setSent(false);
    setFeedback("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = Object.fromEntries(data.entries());
    const validation = validateContactFields(input);
    setErrors(validation.errors);
    const invalid = Object.keys(validation.errors)[0];
    if (invalid) {
      form.querySelector<HTMLElement>(`[name="${invalid}"]`)?.focus();
      return;
    }
    if (!siteKey || !token) {
      setFeedback(
        siteKey
          ? "Please complete the security check before sending."
          : "Online enquiries will be available shortly. Please call, WhatsApp, or email us for now.",
      );
      return;
    }
    sendingRef.current = true;
    setSending(true);
    if (!submissionId.current) submissionId.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          ...validation.fields,
          website: String(data.get("website") ?? ""),
          turnstileToken: token,
          submissionId: submissionId.current,
        }),
        signal: AbortSignal.timeout(40_000),
      });
      const result = (await response.json()) as {
        message?: string;
        errors?: ContactErrors;
      };
      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          const first = Object.keys(result.errors)[0];
          if (first)
            form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
        setFeedback(
          result.message ??
            "Your enquiry could not be sent. Please try again or contact us directly.",
        );
        return;
      }
      setSent(true);
      setFeedback(
        result.message ??
          "Your enquiry has been submitted. We’ll get back to you using the details you provided.",
      );
      form.reset();
      submissionId.current = "";
      setErrors({});
    } catch {
      setFeedback(
        "We couldn’t confirm your enquiry was sent. Your message is still here; please try again or contact us directly.",
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
      setToken("");
      setResetKey((value) => value + 1);
    }
  }

  function errorAttributes(field: keyof ContactFields) {
    return {
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? `${field}-error` : undefined,
    };
  }

  function fieldError(field: keyof ContactFields) {
    return errors[field] ? (
      <p
        className="mt-2 text-xs leading-relaxed text-copper-strong"
        id={`${field}-error`}
      >
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <form
      ref={formRef}
      className="min-w-0"
      method="post"
      action="/api/contact"
      noValidate
      onSubmit={onSubmit}
      onChange={(event) => {
        const fieldName = event.target.getAttribute("name") ?? "";
        if (
          ![
            "name",
            "phone",
            "email",
            "service",
            "location",
            "message",
          ].includes(fieldName)
        )
          return;
        submissionId.current = "";
        if (sent) {
          setSent(false);
          setFeedback("");
        }
      }}
      aria-labelledby="enquiry-form-heading"
    >
      <h2
        id="enquiry-form-heading"
        className="text-xl font-medium tracking-tight"
      >
        Tell us about the work
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        A few details are enough to start. Please include a phone number or
        email so we can reply.
      </p>
      <fieldset disabled={sending} className="mt-7 grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Your enquiry details</legend>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium" htmlFor="contact-name">
            Name <span className="text-muted">(required)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            className={inputClass}
            autoComplete="name"
            maxLength={100}
            required
            {...errorAttributes("name")}
          />
          {fieldError("name")}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-phone">
            Phone / WhatsApp
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={inputClass}
            autoComplete="tel"
            maxLength={30}
            {...errorAttributes("phone")}
          />
          {fieldError("phone")}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={inputClass}
            autoComplete="email"
            maxLength={254}
            {...errorAttributes("email")}
          />
          {fieldError("email")}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-service">
            Service <span className="text-muted">(required)</span>
          </label>
          <select
            id="contact-service"
            name="service"
            className={inputClass}
            defaultValue=""
            required
            {...errorAttributes("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {contactServices.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-location">
            Area or city <span className="text-muted">(optional)</span>
          </label>
          <input
            id="contact-location"
            name="location"
            className={inputClass}
            autoComplete="address-level2"
            maxLength={120}
            {...errorAttributes("location")}
          />
          {fieldError("location")}
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium" htmlFor="contact-message">
            What do you need? <span className="text-muted">(required)</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            className={`${inputClass} min-h-36 resize-y`}
            rows={5}
            minLength={10}
            maxLength={3000}
            placeholder="Tell us about your space and the work you have in mind."
            required
            {...errorAttributes("message")}
          />
          {fieldError("message")}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Leave this field empty</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </fieldset>
      <p className="mt-4 max-w-[62ch] text-xs leading-relaxed text-muted">
        We use these details to respond to your enquiry. Please share only what
        is needed to discuss the work. If you provide an email address, we’ll
        also send a copy of your enquiry to it. Submissions are processed by
        Cloudflare and our email provider, Resend.
      </p>
      <div className="mt-5">
        {siteKey ? (
          <Turnstile
            siteKey={siteKey}
            onToken={onToken}
            onError={onChallengeError}
            resetKey={resetKey}
          />
        ) : (
          <p className="rounded-sm bg-paper/50 px-4 py-3 text-sm leading-relaxed text-muted">
            Online enquiries will be available shortly. You can call, WhatsApp,
            or email us for now.
          </p>
        )}
      </div>
      {feedback && (
        <div
          className={`mt-4 flex items-start gap-2 text-sm leading-relaxed ${sent ? "text-sage" : "text-copper-strong"}`}
          role={sent ? "status" : "alert"}
        >
          {sent && (
            <Check className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
          )}
          <p>{feedback}</p>
        </div>
      )}
      <button
        type="submit"
        className="mt-5 inline-flex min-h-12 items-center gap-8 rounded-sm bg-copper px-5 py-3 text-sm font-semibold text-white hover:bg-copper-strong disabled:cursor-not-allowed disabled:opacity-60"
        disabled={sending || !siteKey || !token}
      >
        {sending ? "Sending enquiry…" : "Send enquiry"}
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
