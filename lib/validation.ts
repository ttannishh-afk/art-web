import {
  Category,
  GalleryCategory,
  InquiryStatus,
  InquiryType,
  OrderStatus,
} from "@prisma/client";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function ensureString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function requireText(
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number },
) {
  const text = ensureString(value).trim();
  const min = options?.min ?? 1;
  const max = options?.max ?? 500;

  if (text.length < min) {
    throw new ValidationError(`${fieldName} is required.`);
  }

  if (text.length > max) {
    throw new ValidationError(`${fieldName} must be ${max} characters or fewer.`);
  }

  return text;
}

export function optionalText(value: unknown, max = 120) {
  const text = ensureString(value).trim();

  if (!text) {
    return null;
  }

  if (text.length > max) {
    throw new ValidationError(`This field must be ${max} characters or fewer.`);
  }

  return text;
}

export function requireEmail(value: unknown) {
  const email = normalizeEmail(requireText(value, "Email", { max: 320 }));

  if (!validateEmail(email)) {
    throw new ValidationError("Please enter a valid email address.");
  }

  return email;
}

export function requirePassword(value: unknown) {
  const password = ensureString(value);

  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters long.");
  }

  if (password.length > 128) {
    throw new ValidationError("Password must be 128 characters or fewer.");
  }

  return password;
}

export function requirePositiveInteger(value: unknown, fieldName: string) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    throw new ValidationError(`${fieldName} must be a whole number greater than 0.`);
  }

  return number;
}

export function requireNonNegativeInteger(value: unknown, fieldName: string) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 0) {
    throw new ValidationError(`${fieldName} must be a whole number greater than or equal to 0.`);
  }

  return number;
}

export function requirePrice(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    throw new ValidationError("Price must be a valid number.");
  }

  return Number(number.toFixed(2));
}

export function requireEnumValue<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  fieldName: string,
) {
  const parsed = ensureString(value) as T;

  if (!allowedValues.includes(parsed)) {
    throw new ValidationError(`Invalid ${fieldName.toLowerCase()} selected.`);
  }

  return parsed;
}

export function requireCategory(value: unknown) {
  return requireEnumValue(value, Object.values(Category), "Category");
}

export function requireGalleryCategory(value: unknown) {
  return requireEnumValue(
    value,
    Object.values(GalleryCategory),
    "Gallery category",
  );
}

export function requireOrderStatus(value: unknown) {
  return requireEnumValue(value, Object.values(OrderStatus), "Order status");
}

export function requireInquiryType(value: unknown) {
  return requireEnumValue(value, Object.values(InquiryType), "Inquiry type");
}

export function requireInquiryStatus(value: unknown) {
  return requireEnumValue(value, Object.values(InquiryStatus), "Inquiry status");
}

export function requireUuidLike(value: unknown, fieldName: string) {
  const id = requireText(value, fieldName, { max: 100 });

  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    throw new ValidationError(`Invalid ${fieldName.toLowerCase()}.`);
  }

  return id;
}

export function validateImageFile(file: FormDataEntryValue | null, required: boolean) {
  if (!(file instanceof File) || file.size === 0) {
    if (required) {
      throw new ValidationError("An image is required.");
    }

    return null;
  }

  if (!file.type.startsWith("image/")) {
    throw new ValidationError("Please upload a valid image file.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new ValidationError("Image size must be 5MB or smaller.");
  }

  return file;
}

export function formatErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (error instanceof ValidationError) {
    return error.message;
  }

  return fallback;
}
