import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LocationSelect } from "@/components/spots/LocationSelect";
import { GuSelect } from "@/components/spots/GuSelect";
import {
  REGION_CODE_TO_FULL,
  type RegionCode,
  type RegionName
} from "@/components/spots/constants";
import { createFacility } from "@/api/facilities";
import {
  issuePresignedUrl,
  uploadFileToPresignedUrl
} from "@/api/presigned-url";
import type { CreateFacilityRequest } from "@/types/facilities";

const SPORTS = ["농구", "야구", "축구", "테니스", "탁구", "배드민턴"] as const;

const FacilityCreatePage = () => {
  const navigate = useNavigate();

  const [facilityName, setFacilityName] = useState("");
  const [sportType, setSportType] = useState("");

  const [regionCode, setRegionCode] = useState<RegionCode | undefined>();
  const [city, setCity] = useState<RegionName | undefined>();
  const [district, setDistrict] = useState("");

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const [introduction, setIntroduction] = useState("");
  const [information, setInformation] = useState("");
  const [usageGuide, setUsageGuide] = useState("");
  const [contact, setContact] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const operatingHours = useMemo(
    () => `${startTime}~${endTime}`,
    [startTime, endTime]
  );

  const mergedInformation = useMemo(() => {
    const info = information.trim();
    const guide = usageGuide.trim();

    if (!guide) return info;
    if (!info) return `[이용 안내]\n${guide}`;

    return `${info}\n\n[이용 안내]\n${guide}`;
  }, [information, usageGuide]);

  const handleRegionChange = (code: RegionCode) => {
    setRegionCode(code);
    setCity(REGION_CODE_TO_FULL[code]);
    setDistrict("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 5);
    setImages(files);
  };

  const uploadImageFiles = async () => {
    if (images.length === 0) return [] as string[];

    return Promise.all(
      images.map(async (file) => {
        const issued = await issuePresignedUrl({
          domain: "facilities",
          operation: "PUT",
          fileName: `${crypto.randomUUID()}-${file.name}`,
          fileType: file.type || "application/octet-stream"
        });

        if (!issued.success) {
          throw new Error("Failed to issue presigned url");
        }

        return uploadFileToPresignedUrl(file, issued.success);
      })
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!city || !district) {
      alert("시/도와 구를 선택해주세요.");
      return;
    }

    if (!sportType) {
      alert("종목을 선택해주세요.");
      return;
    }

    if (
      !facilityName.trim() ||
      !introduction.trim() ||
      !mergedInformation.trim() ||
      !contact.trim()
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageURL = await uploadImageFiles();

      const payload: CreateFacilityRequest = {
        facilityName: facilityName.trim(),
        sportType,
        city,
        district,
        operatingHours,
        introduction: introduction.trim(),
        information: mergedInformation,
        contact: contact.trim(),
        ...(homepageUrl.trim() ? { hompageUrl: homepageUrl.trim() } : {}),
        ...(imageURL.length > 0 ? { imageURL } : {})
      };

      const response = await createFacility(payload);

      alert(response.message || "시설이 성공적으로 등록되었습니다.");

      if (response.success?.id) {
        navigate(`/spots/${response.success.id}`);
        return;
      }

      navigate("/spots");
    } catch (error) {
      console.error(error);
      alert(
        error instanceof Error ? error.message : "시설 등록에 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[760px] py-10">
      <h1 className="text-3xl font-bold">시설 등록</h1>
      <p className="mt-2 text-sm text-gray-600">새로운 시설을 등록해주세요.</p>

      <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
        <section className="rounded-xl border border-gray-200 p-5">
          <h2 className="text-lg font-semibold">기본 정보</h2>

          <div className="mt-4 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                시설 이름
              </label>
              <Input
                value={facilityName}
                onChange={(event) => setFacilityName(event.target.value)}
                placeholder="예: 올플레이 실내 테니스장"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  종목 선택
                </label>
                <select
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  value={sportType}
                  onChange={(event) => setSportType(event.target.value)}
                  required
                >
                  <option value="">종목 선택</option>
                  {SPORTS.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  운영시간
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(event) => setStartTime(event.target.value)}
                    required
                  />
                  <span className="text-sm text-gray-500">~</span>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(event) => setEndTime(event.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">활동지역</label>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <LocationSelect
                  value={regionCode}
                  onChange={handleRegionChange}
                />
                <GuSelect
                  region={city}
                  value={district}
                  onChange={setDistrict}
                  placeholder="구 선택"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                시설 사진 (최대 5장)
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {images.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  선택된 파일: {images.map((file) => file.name).join(", ")}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">시설 소개</label>
            <Textarea
              value={introduction}
              onChange={(event) => setIntroduction(event.target.value)}
              placeholder="시설 소개를 입력해주세요"
              className="min-h-28"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">시설 정보</label>
            <Textarea
              value={information}
              onChange={(event) => setInformation(event.target.value)}
              placeholder="시설 정보를 입력해주세요"
              className="min-h-28"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">이용 안내</label>
            <Textarea
              value={usageGuide}
              onChange={(event) => setUsageGuide(event.target.value)}
              placeholder="이용 안내를 입력해주세요"
              className="min-h-28"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">문의 번호</label>
            <Input
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="연락처"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              홈페이지 URL
            </label>
            <Input
              value={homepageUrl}
              onChange={(event) => setHomepageUrl(event.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/spots")}
          >
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "등록하기"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FacilityCreatePage;
