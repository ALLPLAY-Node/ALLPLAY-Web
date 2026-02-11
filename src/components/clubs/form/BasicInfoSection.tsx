import SportDropdown from "../SportDropdown";
import RegionDropdown from "../RegionDropdown";
import DistrictDropdown from "../DistrictDropdown";
import AgeDropdown from "../AgeDropdown";
import { sports } from "@/utils/clubs";

interface BasicInfoSectionProps {
  clubName: string;
  onClubNameChange: (value: string) => void;
  selectedSport?: number;
  onSportChange: (sportId: number | undefined) => void;
  selectedRegion?: string;
  onRegionChange: (region: string | undefined, isAllSelected: boolean) => void;
  selectedDistrict?: string;
  onDistrictChange: (
    district: string | undefined,
    districtId: string | undefined,
    isAllSelected: boolean
  ) => void;
  selectedAgeGroup?: string;
  onAgeChange: (age: string | undefined, isAllSelected: boolean) => void;
  isRegionAllSelected: boolean;
  isDistrictAllSelected: boolean;
  isAgeAllSelected: boolean;
  onCloseOtherDropdowns: () => void;
}

const BasicInfoSection = ({
  clubName,
  onClubNameChange,
  selectedSport,
  onSportChange,
  selectedRegion,
  onRegionChange,
  selectedDistrict,
  onDistrictChange,
  selectedAgeGroup,
  onAgeChange,
  isRegionAllSelected,
  isDistrictAllSelected,
  isAgeAllSelected,
  onCloseOtherDropdowns
}: BasicInfoSectionProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">기본 정보</h2>

      <div className="space-y-4">
        {/* 첫 번째 줄: 동호회 이름과 종목 선택 */}
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="club-name"
            >
              동호회 이름
            </label>
            <input
              id="club-name"
              type="text"
              placeholder="예: 초보 테니스 동호회"
              value={clubName}
              onChange={(e) => onClubNameChange(e.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
            />
          </div>
          <div className="w-[222px] space-y-2">
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="sport-select"
            >
              종목 선택
            </label>
            <SportDropdown
              id="sport-select"
              sports={sports}
              selectedSport={selectedSport}
              onSelect={onSportChange}
              onCloseOtherDropdowns={onCloseOtherDropdowns}
              width="100%"
            />
          </div>
        </div>

        {/* 두 번째 줄: 활동지역 + 연령대 */}
        <div className="flex gap-4">
          {/* 활동지역 (시/도 선택, 구 선택) */}
          <div className="flex-1 space-y-2">
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="region-select"
            >
              활동지역
            </label>
            <div className="flex w-full items-center gap-2">
              {/* 시/도 선택 */}
              <div style={{ width: "calc(50% - 4px)" }}>
                <RegionDropdown
                  id="region-select"
                  selectedRegion={selectedRegion}
                  onSelect={onRegionChange}
                  isAllSelected={isRegionAllSelected}
                  onCloseOtherDropdowns={onCloseOtherDropdowns}
                />
              </div>

              {/* 구 선택 */}
              <div style={{ width: "calc(50% - 4px)" }}>
                <DistrictDropdown
                  id="district-select"
                  selectedRegion={selectedRegion}
                  selectedDistrict={selectedDistrict}
                  onSelect={onDistrictChange}
                  isAllSelected={isDistrictAllSelected}
                  onCloseOtherDropdowns={onCloseOtherDropdowns}
                  width="100%"
                />
              </div>
            </div>
          </div>

          {/* 연령대 */}
          <div className="w-[222px] space-y-2">
            <label
              className="block text-sm font-medium text-gray-800"
              htmlFor="age-select"
            >
              연령대
            </label>
            <AgeDropdown
              id="age-select"
              selectedAgeGroup={selectedAgeGroup}
              onSelect={onAgeChange}
              isAllSelected={isAgeAllSelected}
              onCloseOtherDropdowns={onCloseOtherDropdowns}
              width="100%"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;
