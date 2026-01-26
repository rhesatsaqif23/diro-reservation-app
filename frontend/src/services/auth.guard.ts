import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Mencegah akses halaman jika user belum login
export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // token JWT di localStorage
    if (!token) {
      router.replace("/login"); // redirect ke login
    }
  }, [router]);
};
