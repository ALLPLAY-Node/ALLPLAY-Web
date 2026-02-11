import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFacilityDetail } from "@/api/facilities";
import type { FacilityDetail } from "@/types/facilities";

const FacilityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState<FacilityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getFacilityDetail(id);
        setFacility(response.success ?? null);
      } catch (error) {
        console.error("Failed to fetch facility detail:", error);
        setFacility(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const summary = useMemo(() => {
    if (!facility) return null;
    return {
      name: facility.facilityName,
      sportType: facility.sportType,
      visibility: facility.isPublic ? "공공" : "민간",
      location: `${facility.city} ${facility.district}`,
      address: facility.address,
      cost: facility.cost,
      hours: facility.operatingHours,
      contact: facility.contact,
      homepageUrl: facility.homepageUrl
    };
  }, [facility]);

  if (!id) {
    return (
      <main className="w-full px-4 py-10 text-center text-gray-500">
        잘못된 접근입니다.
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate("/spots")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            목록으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="w-full px-4 py-10 text-center text-gray-500">
        로딩 중...
      </main>
    );
  }

  if (!facility || !summary) {
    return (
      <main className="w-full px-4 py-10 text-center text-gray-500">
        시설 정보를 불러오지 못했습니다.
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate("/spots")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            목록으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{summary.visibility} SPOT</p>
          <h1 className="text-2xl font-bold text-gray-900">{summary.name}</h1>
          <p className="mt-1 text-sm text-gray-600">
            {summary.sportType} · {summary.location}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/spots")}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          목록으로
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            {facility.imageUrl ? (
              <img
                src={facility.imageUrl}
                alt={summary.name}
                className="h-[320px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center text-gray-500">
                이미지가 없습니다.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              시설 소개
            </h2>
            <p className="text-gray-700">{facility.introduction || "-"}</p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              이용 안내
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>{facility.information || "-"}</p>
              <p>{facility.usageGuide || "-"}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              기본 정보
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>주소: {summary.address}</p>
              <p>운영시간: {summary.hours}</p>
              <p>이용요금: {summary.cost}</p>
              <p>연락처: {summary.contact}</p>
            </div>
          </div>

          {summary.homepageUrl && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                홈페이지
              </h2>
              <p className="break-all text-sm text-blue-600">
                {summary.homepageUrl}
              </p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default FacilityDetailPage;
