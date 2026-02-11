import { Button } from "@/components/ui/button";
import KaKao from "@/assets/social/kakao-logo.png";
import Naver from "@/assets/social/naver-logo.png";
import Google from "@/assets/social/google-logo.png";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  type SocialProvider = "KAKAO" | "NAVER" | "GOOGLE";
  const handleLogin = (social: SocialProvider) => {
    if (social === "KAKAO") {
      console.log("kakao");
    } else if (social === "NAVER") {
      console.log("naver");
    } else if (social === "GOOGLE") {
      window.location.href = `${baseURL}/auth/google`;
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] w-full flex flex-col items-center justify-center gap-4 px-4">
      <div className="text-black text-[28px] font-semibold">로그인하기</div>
      <Button
        className="bg-[#FEE500] w-[500px] h-[40px] text-black hover:bg-[#FEE500]"
        onClick={() => handleLogin("KAKAO")}
      >
        <img src={KaKao} className="w-[32px] h-[32px]" />
        카카오로 간편 로그인
      </Button>
      <Button
        className="bg-[#00C73C] w-[500px] h-[40px] hover:bg-[#00C73C]"
        onClick={() => handleLogin("NAVER")}
      >
        <img src={Naver} className="w-[32px] h-[32px]" />
        네이버로 간편 로그인
      </Button>
      <Button
        className="bg-white border border-[#B3B3B3] text-black w-[500px] h-[40px] hover:bg-white"
        onClick={() => handleLogin("GOOGLE")}
      >
        <img src={Google} className="w-[32px] h-[32px]" />
        구글로 간편 로그인
      </Button>
    </div>
  );
};

export default LoginPage;
