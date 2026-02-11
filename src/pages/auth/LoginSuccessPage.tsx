import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/authStore";

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken") ?? params.get("token");
    const refreshToken = params.get("refreshToken");

    if (!accessToken) {
      navigate("/login", { replace: true });
      return;
    }

    setTokens(accessToken, refreshToken);
    navigate("/", { replace: true });
  }, [navigate, setTokens]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      로그인 처리중...
    </div>
  );
}
