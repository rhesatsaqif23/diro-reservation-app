const FALLBACK_IMAGE = "/images/image-fallback.jpg";
const STORAGE_BASE = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL ?? "";

export function resolveStorageImage(url?: string | null): string {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith("http")) return url;
  if (!STORAGE_BASE) return FALLBACK_IMAGE;
  return `${STORAGE_BASE}/${url}`;
}
