import { useEffect, useState, useMemo } from "react";
import { ListingCard } from "@/components/common/ListingCard";
import BallButton from "@/components/layout/button/BallButton";
import { LocationSelect } from "@/components/spots/LocationSelect";
import { GuSelect } from "@/components/spots/GuSelect";
import SpotSearch from "@/components/spots/SpotSearch";
import {
  REGION_TO_FULL,
  type RegionLabel,
  type RegionName
} from "@/components/spots/constants";
import { Button } from "@/components/ui/button";
import { ID_MAP } from "@/components/spots/map";
import { getSpots } from "@/api/spots/spots";
import type { Spot } from "@/types/spots";

const FindSpotPage = () => {
  // 지역
  const [regionLabel, setRegionLabel] = useState<RegionLabel | undefined>();
  const [region, setRegion] = useState<RegionName | undefined>();

  // 구
  const [gu, setGu] = useState("");

  const handleRegionChange = (label: RegionLabel) => {
    setRegionLabel(label);

    const full = REGION_TO_FULL[label];
    setRegion(full);

    setGu("");
  };

  const regionId = useMemo(() => {
    if (!region || !gu) return undefined;
    return ID_MAP[`${region}_${gu}`];
  }, [region, gu]);

  // 필터
  const [sportId, setSportId] = useState<number>();
  const [isPublic, setIsPublic] = useState<boolean>();
  const [isNotPublic, setIsNotPublic] = useState<boolean>();
  const [isReservable, setIsReservable] = useState<boolean>();
  const [isFree, setIsFree] = useState<boolean>();
  const [isNotFree, setIsNotFree] = useState<boolean>();

  console.log(isNotPublic, isNotFree);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 400);

    return () => clearTimeout(t);
  }, [keyword]);

  useEffect(() => {
    // console.log(
    //   "지역id:",
    //   regionId,
    //   "종목:",
    //   sportId,
    //   "유료/무료:",
    //   isFree,
    //   "예약가능:",
    //   isReservable,
    //   "공공/민간",
    //   isPublic,
    //   "검색어:",
    //   debouncedKeyword
    // );

    (async () => {
      const data = await getSpots({
        regionId,
        sportId,
        keyword: debouncedKeyword,
        isPublic,
        isReservable,
        isFree
      });

      console.log("조회 결과:", data);

      setSpots(data.success.items);
    })();
  }, [regionId, sportId, debouncedKeyword, isPublic, isReservable, isFree]);

  return (
    <div className="flex flex-col gap-10 py-10">
      <div>
        <div className="text-black text-[20px] font-semibold py-3">
          종목별로 찾기
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <BallButton ball="BASKETBALL" func={setSportId} />
          <BallButton ball="BASEBALL" func={() => setSportId(2)} />
          <BallButton ball="TENNIS" func={() => setSportId(4)} />
          <BallButton ball="PINGPONG" func={() => setSportId(5)} />
          <BallButton ball="SOCCER" func={() => setSportId(3)} />
          <BallButton ball="BADMINTON" func={() => setSportId(6)} />
        </div>
      </div>

      {/* 검색 필터링 */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <div className="flex gap-2">
            <LocationSelect value={regionLabel} onChange={handleRegionChange} />
            <GuSelect region={region} value={gu} onChange={setGu} />
          </div>
          <SpotSearch onSearch={setKeyword} />
        </div>
        <div className="flex gap-3">
          <Button
            variant="customfilter"
            size="filter"
            onClick={() => setIsPublic((p) => !p)}
          >
            공공
          </Button>
          <Button
            variant="customfilter"
            size="filter"
            onClick={() => setIsNotPublic((p) => !p)}
          >
            민간
          </Button>
          <Button
            variant="customfilter"
            size="filter"
            onClick={() => setIsReservable((p) => !p)}
          >
            예약가능
          </Button>
          <Button
            variant="customfilter"
            size="filter"
            onClick={() => setIsNotFree((p) => !p)}
          >
            유료
          </Button>
          <Button
            variant="customfilter"
            size="filter"
            onClick={() => setIsFree((p) => !p)}
          >
            무료
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spots.map((s) => (
          <ListingCard key={s.id} spot={s} />
        ))}
      </div>
    </div>
  );
};

export default FindSpotPage;
