import { useAuthStore } from "@/src/store/auth.store";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const token = useAuthStore.getState().token;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}/v1${endpoint}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type");
  let data: T | undefined;

  if (contentType?.includes("application/json")) {
    data = (await res.json()) as T;
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : res.status === 401
          ? "Invalid or expired token"
          : "Request failed";

    throw new Error(message);
  }

  if (!data) {
    throw new Error("Empty response from server");
  }

  return data;
}
