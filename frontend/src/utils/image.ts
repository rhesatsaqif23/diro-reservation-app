export function resolveStorageImage(url?: string | null): string {
  const FALLBACK_IMAGE = "/images/image-fallback.jpg";
  // Pindahkan pemanggilan env ke dalam fungsi agar lebih fresh
  const storageBase = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith("http")) return url;

  if (!storageBase) return FALLBACK_IMAGE;
  return `${storageBase}/${url}`;
}
