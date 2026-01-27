import { apiFetch } from "../lib/api";
import { useAuthStore } from "@/src/store/auth.store";

interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
  };
}

export async function login(email: string, password: string) {
  const res = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const token = res.data.access_token;

  localStorage.setItem("token", token);
  useAuthStore.getState().login(token);

  return res;
}

export async function register(name: string, email: string, password: string) {
  return apiFetch<void>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function logout() {
  useAuthStore.getState().logout();
}
