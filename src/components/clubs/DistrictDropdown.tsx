import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { getDistrictsByRegion } from "@/utils/regions";

interface DistrictDropdownProps {
  selectedRegion?: string;
  selectedDistrict?: string;
  onSelect: (
    district: string | undefined,
    districtId: string | undefined,
    isAllSelected: boolean
  ) => void;
  isAllSelected?: boolean;
  onCloseOtherDropdowns?: () => void;
  width?: string;
}

const DistrictDropdown = ({
  selectedRegion,
  selectedDistrict,
  onSelect,
  isAllSelected = false,
  onCloseOtherDropdowns,
  width = "100%"
}: DistrictDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onCloseOtherDropdowns?.();
  };

  const handleSelect = (
    district: string | undefined,
    districtId: string | undefined,
    isAll: boolean
  ) => {
    onSelect(district, districtId, isAll);
    setIsOpen(false);
  };

  return (
    <div className="relative" style={{ width }}>
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-[#999999] px-[10px] py-1 text-sm text-white"
      >
        <span>
          {isAllSelected
            ? "전체"
            : selectedDistrict
              ? selectedDistrict
              : "시/군/구 선택"}
        </span>
        <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 max-h-[300px] w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => handleSelect(undefined, undefined, true)}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
              isAllSelected
                ? "bg-blue-100 font-semibold text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isAllSelected && <Check size={16} className="text-blue-600" />}
            <span>전체</span>
          </button>
          {selectedRegion &&
            getDistrictsByRegion(selectedRegion).map((district) => (
              <button
                key={district.id}
                type="button"
                onClick={() => handleSelect(district.name, district.id, false)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                  selectedDistrict === district.name
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedDistrict === district.name && (
                  <Check size={16} className="text-blue-600" />
                )}
                <span>{district.name}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default DistrictDropdown;
