import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface RegionDropdownProps {
  selectedRegion?: string;
  onSelect: (region: string | undefined, isAllSelected: boolean) => void;
  isAllSelected?: boolean;
  onCloseOtherDropdowns?: () => void;
  forceCloseKey?: number;
  id?: string;
}

const RegionDropdown = ({
  selectedRegion,
  onSelect,
  isAllSelected = false,
  onCloseOtherDropdowns,
  forceCloseKey,
  id
}: RegionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // 부모에서 강제 닫기
  useEffect(() => {
    if (forceCloseKey !== undefined) {
      setIsOpen(false);
    }
  }, [forceCloseKey]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onCloseOtherDropdowns?.();
  };

  const handleSelect = (region: string | undefined, isAll: boolean) => {
    onSelect(region, isAll);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        className="relative flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-[#999999] px-[10px] py-1 text-sm text-white"
      >
        <span>
          {isAllSelected
            ? "전체"
            : selectedRegion
              ? selectedRegion
              : "지역선택"}
        </span>
        <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-[400px] w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => handleSelect(undefined, true)}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
              isAllSelected
                ? "bg-blue-100 font-semibold text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isAllSelected && <Check size={16} className="text-blue-600" />}
            <span>전체</span>
          </button>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              수도권
            </div>
            {["서울", "인천", "경기"].map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleSelect(region, false)}
                className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                  selectedRegion === region
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedRegion === region && (
                  <Check size={16} className="text-blue-600" />
                )}
                <span>{region}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              광역시/특별시
            </div>
            {["광주", "대전", "대구", "세종", "부산", "울산"].map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleSelect(region, false)}
                className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                  selectedRegion === region
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedRegion === region && (
                  <Check size={16} className="text-blue-600" />
                )}
                <span>{region}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              강원
            </div>
            <button
              type="button"
              onClick={() => handleSelect("강원도", false)}
              className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                selectedRegion === "강원도"
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {selectedRegion === "강원도" && (
                <Check size={16} className="text-blue-600" />
              )}
              <span>강원도</span>
            </button>
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              경상도
            </div>
            {["경상북도", "경상남도"].map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleSelect(region, false)}
                className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                  selectedRegion === region
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedRegion === region && (
                  <Check size={16} className="text-blue-600" />
                )}
                <span>{region}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              충청도
            </div>
            {["충청북도", "충청남도"].map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleSelect(region, false)}
                className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                  selectedRegion === region
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedRegion === region && (
                  <Check size={16} className="text-blue-600" />
                )}
                <span>{region}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              전라도
            </div>
            {["전라북도", "전라남도"].map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => handleSelect(region, false)}
                className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                  selectedRegion === region
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {selectedRegion === region && (
                  <Check size={16} className="text-blue-600" />
                )}
                <span>{region}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2">
            <div className="mb-1 px-2 text-xs font-semibold text-gray-500">
              제주
            </div>
            <button
              type="button"
              onClick={() => handleSelect("제주도", false)}
              className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-sm ${
                selectedRegion === "제주도"
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {selectedRegion === "제주도" && (
                <Check size={16} className="text-blue-600" />
              )}
              <span>제주도</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionDropdown;
