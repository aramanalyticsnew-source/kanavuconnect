export type EnquiryValues = {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  enquiryType: string;
  region: string;
  tier: string;
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts Indian mobiles (+91 optional, 10 digits starting 6–9) and other international numbers (8–15 digits). */
export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-().]/g, "");
  if (/^(\+?91|0)?[6-9]\d{9}$/.test(digits)) return true;
  return /^\+\d{8,15}$/.test(digits);
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = values.fullName.trim();
  if (!name) errors.fullName = "Please enter your full name.";
  else if (name.length < 2) errors.fullName = "Name looks too short.";
  else if (name.length > 80) errors.fullName = "Please keep your name under 80 characters.";

  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";

  const phone = values.phone.trim();
  if (!phone) errors.phone = "Please enter a phone number.";
  else if (!isValidPhone(phone)) errors.phone = "Enter a 10-digit Indian mobile or an international number with country code.";

  if (values.organisation.length > 120) errors.organisation = "Please keep this under 120 characters.";

  if (!values.enquiryType) errors.enquiryType = "Please choose an enquiry type.";

  const message = values.message.trim();
  if (!message) errors.message = "Please tell us a little about your enquiry.";
  else if (message.length < 20) errors.message = "Please add a few more details (at least 20 characters).";
  else if (message.length > 1000) errors.message = "Please keep your message under 1,000 characters.";

  if (!values.consent) errors.consent = "Please confirm we may contact you about this enquiry.";

  return errors;
}
