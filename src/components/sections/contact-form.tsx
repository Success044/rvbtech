"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
  const t = useTranslations("contactForm");
  const formRef = useRef<HTMLFormElement>(null);
  const submissionId = useRef("");
  const sendingRef = useRef(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [feedback, setFeedback] = useState("");
  const serviceLabels: Record<
    (typeof contactServices)[number]["value"],
    string
  > = {
    plumbing: t("services.plumbing"),
    electrical: t("services.electrical"),
    both: t("services.both"),
    "not-sure": t("services.notSure"),
  };
  const validationMessages: Record<string, string> = {
    "Enter text in this field.": t("errors.text"),
    "Enter your name using 2 to 100 characters.": t("errors.name"),
    "Enter a phone number or email so we can get back to you.": t(
      "errors.phoneOrEmail",
    ),
    "Enter an email or phone number so we can get back to you.": t(
      "errors.emailOrPhone",
    ),
    "Enter a valid phone number, including the country code if needed.":
      t("errors.phoneFormat"),
    "Enter a valid email address.": t("errors.emailFormat"),
    "Choose the service you need.": t("errors.service"),
    "Keep the location to 120 characters, on one line.": t("errors.location"),
    "Describe the work using 10 to 3,000 characters.": t("errors.message"),
  };
  const serverMessages = [
    "We can’t send your enquiry right now. Please call or email us instead.",
    "You’ve tried a few times. Please wait before sending another enquiry.",
    "Your enquiry could not be read. Keep the message within the form’s limits and try again.",
    "Check the form and try again.",
    "Your enquiry could not be accepted. Please call or email us instead.",
    "Refresh the contact page and try again.",
    "Complete the security check, then try again.",
    "The security check expired or could not be verified. Please try again.",
    "Online enquiries are temporarily busy. Please call or email us instead.",
    "Your enquiry could not be sent. Your message is still here; please try again or contact us directly.",
    "Your enquiry was sent, but we couldn’t send a copy to your email address. We’ll contact you using the details you provided.",
    "Your enquiry was submitted to our team. Resend accepted a copy for sending to your email address; inbox delivery may vary.",
    "Your enquiry was submitted to our team, but we couldn’t confirm that Resend accepted the email copy.",
    "Your enquiry was submitted to our team. We’ll get back to you using the contact details you provided.",
  ];
  const translatedServerMessages = [
    t("serverMessages.0"),
    t("serverMessages.1"),
    t("serverMessages.2"),
    t("serverMessages.3"),
    t("serverMessages.4"),
    t("serverMessages.5"),
    t("serverMessages.6"),
    t("serverMessages.7"),
    t("serverMessages.8"),
    t("serverMessages.9"),
    t("serverMessages.10"),
    t("serverMessages.11"),
    t("serverMessages.12"),
    t("serverMessages.13"),
  ];

  function localizeErrors(source: ContactErrors): ContactErrors {
    const localized: ContactErrors = {};
    for (const field of Object.keys(source) as (keyof ContactFields)[]) {
      const message = source[field];
      if (message)
        localized[field] = validationMessages[message] ?? t("errors.text");
    }
    return localized;
  }

  function localizeServerMessage(
    message: string | undefined,
    fallback: string,
  ) {
    if (!message) return fallback;
    if (message === "Please check the highlighted fields.")
      return t("checkFields");
    const index = serverMessages.indexOf(message);
    return index === -1 ? fallback : translatedServerMessages[index];
  }

  const onToken = useCallback((value: string) => setToken(value), []);
  const onChallengeError = useCallback(() => {
    setToken("");
    setFeedback(t("securityUnavailable"));
  }, [t]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    setSent(false);
    setFeedback("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = Object.fromEntries(data.entries());
    const validation = validateContactFields(input);
    const localizedErrors = localizeErrors(validation.errors);
    setErrors(localizedErrors);
    const invalid = Object.keys(validation.errors)[0];
    if (invalid) {
      form.querySelector<HTMLElement>(`[name="${invalid}"]`)?.focus();
      return;
    }
    if (!siteKey || !token) {
      setFeedback(siteKey ? t("securityRequired") : t("unavailable"));
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
          locale,
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
          const localizedErrors = localizeErrors(result.errors);
          setErrors(localizedErrors);
          const first = Object.keys(result.errors)[0];
          if (first)
            form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
        setFeedback(localizeServerMessage(result.message, t("sendFailed")));
        return;
      }
      setSent(true);
      setFeedback(localizeServerMessage(result.message, t("sent")));
      form.reset();
      submissionId.current = "";
      setErrors({});
    } catch {
      setFeedback(t("uncertain"));
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
        {t("heading")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("intro")}</p>
      <fieldset disabled={sending} className="mt-7 grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">{t("legend")}</legend>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium" htmlFor="contact-name">
            {t("name")} <span className="text-muted">({t("required")})</span>
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
            {t("phone")}
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
            {t("email")}
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
            {t("service")} <span className="text-muted">({t("required")})</span>
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
              {t("selectService")}
            </option>
            {contactServices.map((service) => (
              <option key={service.value} value={service.value}>
                {serviceLabels[service.value]}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="contact-location">
            {t("location")}{" "}
            <span className="text-muted">({t("optional")})</span>
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
            {t("message")} <span className="text-muted">({t("required")})</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            className={`${inputClass} min-h-36 resize-y`}
            rows={5}
            minLength={10}
            maxLength={3000}
            placeholder={t("messagePlaceholder")}
            required
            {...errorAttributes("message")}
          />
          {fieldError("message")}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">{t("honeypot")}</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </fieldset>
      <p className="mt-4 max-w-[62ch] text-xs leading-relaxed text-muted">
        {t("privacy")}
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
            {t("unavailable")}
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
        {sending ? t("sending") : t("send")}
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
