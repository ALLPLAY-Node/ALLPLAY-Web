import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken") ?? params.get("token");
    const refreshToken = params.get("refreshToken");

    if (!accessToken) {
      window.location.replace("/login");
      return;
    }

    localStorage.setItem("accessToken", accessToken);

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    window.location.replace("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      로그인 처리중...
    </div>
  );
}
