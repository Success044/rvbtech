export const maxContactBodyBytes = 16_384;

export type ContactFields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

function hasForbiddenControls(value: string, multiline = false): boolean {
  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return (
      code === 127 || (code < 32 && (!multiline || ![9, 10, 13].includes(code)))
    );
  });
}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isContactEmail(value: string): boolean {
  return (
    value.length <= 254 &&
    !hasForbiddenControls(value) &&
    emailPattern.test(value)
  );
}

export function validateContactFields(value: unknown): {
  fields: ContactFields;
  errors: ContactErrors;
} {
  const record =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const fields: ContactFields = {
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    message: "",
  };
  const errors: ContactErrors = {};
  for (const key of Object.keys(fields) as (keyof ContactFields)[]) {
    if (typeof record[key] === "string") fields[key] = record[key].trim();
    else if (record[key] !== undefined)
      errors[key] = "Enter text in this field.";
  }

  if (
    fields.name.length < 2 ||
    fields.name.length > 100 ||
    hasForbiddenControls(fields.name)
  ) {
    errors.name = "Enter your name using 2 to 100 characters.";
  }
  if (!fields.phone && !fields.email) {
    errors.phone = "Enter a phone number or email so we can get back to you.";
    errors.email = "Enter an email or phone number so we can get back to you.";
  }
  if (
    fields.phone &&
    (!/^\+?[\d ()-]{7,29}$/.test(fields.phone) ||
      fields.phone.replace(/\D/g, "").length < 7 ||
      fields.phone.replace(/\D/g, "").length > 15)
  ) {
    errors.phone =
      "Enter a valid phone number, including the country code if needed.";
  }
  if (fields.email && !isContactEmail(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (
    !["plumbing", "electrical", "both", "not-sure"].includes(fields.service)
  ) {
    errors.service = "Choose the service you need.";
  }
  if (fields.location.length > 120 || hasForbiddenControls(fields.location)) {
    errors.location = "Keep the location to 120 characters, on one line.";
  }
  if (
    fields.message.length < 10 ||
    fields.message.length > 3000 ||
    hasForbiddenControls(fields.message, true)
  ) {
    errors.message = "Describe the work using 10 to 3,000 characters.";
  }
  return { fields, errors };
}
