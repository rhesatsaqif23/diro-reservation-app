export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${API_URL}/v1${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const contentType = res.headers.get("content-type");

  // default undefined, bukan any
  let data: T | undefined = undefined;

  if (contentType?.includes("application/json")) {
    data = (await res.json()) as T;
  } else {
    const text = await res.text();
    console.warn("Non-JSON response:", text);
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : "Request failed";

    throw new Error(message);
  }

  if (!data) {
    throw new Error("Empty response from server");
  }

  return data;
}
