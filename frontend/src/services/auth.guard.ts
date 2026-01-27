import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/auth.store";

export const useAuthGuard = () => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);
};
