// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "pt", "es", "fr", "it", "bg", "el", "pl", "tr"];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) notFound();

  // ── Fix: use absolute path from project root ─────────────────
  const messages = (await import(`../messages/${locale}.json`)).default;

  return { locale, messages };
});