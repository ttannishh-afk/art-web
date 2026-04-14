import { adminEmails } from "@/lib/env";

const adminEmailSet = new Set(adminEmails);

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  return adminEmailSet.has(email.trim().toLowerCase());
}

export { adminEmails as ADMIN_EMAILS };
