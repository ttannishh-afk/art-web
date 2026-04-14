const DEFAULT_DEV_SITE_URL = "http://localhost:3000";
const DEFAULT_DEV_AUTH_SECRET = "dev-only-secret-change-me";
const DEFAULT_DEV_ADMIN_EMAILS = ["tanishgupta69@gmail.com"];

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function parseAdminEmails() {
  const value = process.env.ADMIN_EMAILS;

  if (!value) {
    return process.env.NODE_ENV === "production"
      ? []
      : DEFAULT_DEV_ADMIN_EMAILS;
  }

  return value
    .split(",")
    .map(normalizeEmail)
    .filter(Boolean);
}

export const siteUrl = (() => {
  const candidate = process.env.NEXTAUTH_URL?.trim();

  if (candidate && isValidUrl(candidate)) {
    return candidate;
  }

  return DEFAULT_DEV_SITE_URL;
})();

export const adminEmails = parseAdminEmails();

export const nextAuthSecret = (() => {
  const secret = process.env.NEXTAUTH_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXTAUTH_SECRET must be set in production.");
  }

  return DEFAULT_DEV_AUTH_SECRET;
})();
