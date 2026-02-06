import { Search } from "lucide-react";
import RegionDropdown from "./RegionDropdown";
import DistrictDropdown from "./DistrictDropdown";
import AgeDropdown from "./AgeDropdown";

interface ClubFilterBarProps {
  selectedRegion?: string;
  selectedDistrict?: string;
  selectedAgeGroup?: string;
  searchKeyword: string;
  onRegionChange: (region: string | undefined, isAllSelected: boolean) => void;
  onDistrictChange: (
    district: string | undefined,
    districtId: string | undefined
  ) => void;
  onAgeChange: (age: string | undefined) => void;
  onSearchChange: (keyword: string) => void;
  selectedRegionId?: string;
}

const ClubFilterBar = ({
  selectedRegion,
  selectedDistrict,
  selectedAgeGroup,
  searchKeyword,
  onRegionChange,
  onDistrictChange,
  onAgeChange,
  onSearchChange
}: ClubFilterBarProps) => {
  const closeAllDropdowns = () => {
    // 드롭다운 컴포넌트들이 자체적으로 관리
  };

  const handleRegionSelect = (
    region: string | undefined,
    isAllSelected: boolean
  ) => {
    onRegionChange(region, isAllSelected);
    if (isAllSelected || !region) {
      onDistrictChange(undefined, undefined, false);
    }
  };

  return (
    <section className="mb-6 flex items-center gap-2">
      {/* 지역 선택 */}
      <div className="w-[222px]">
        <RegionDropdown
          selectedRegion={selectedRegion}
          onSelect={handleRegionSelect}
          isAllSelected={!selectedRegion}
          onCloseOtherDropdowns={closeAllDropdowns}
        />
      </div>

      {/* 시/군/구 선택 */}
      <div className="w-[222px]">
        <DistrictDropdown
          selectedRegion={selectedRegion}
          selectedDistrict={selectedDistrict}
          onSelect={(district, districtId) =>
            onDistrictChange(district, districtId)
          }
          isAllSelected={!selectedDistrict}
          onCloseOtherDropdowns={closeAllDropdowns}
        />
      </div>

      {/* 연령 선택 */}
      <div className="w-[222px]">
        <AgeDropdown
          selectedAgeGroup={selectedAgeGroup}
          onSelect={(age) => onAgeChange(age)}
          isAllSelected={!selectedAgeGroup}
          onCloseOtherDropdowns={closeAllDropdowns}
        />
      </div>

      {/* 검색어 입력 */}
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={16} className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-full rounded-full border border-gray-300 bg-gray-100 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"
        />
      </div>
    </section>
  );
};

export default ClubFilterBar;
