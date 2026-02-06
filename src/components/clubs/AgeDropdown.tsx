import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ageGroups } from "@/utils/clubs";

interface AgeDropdownProps {
  selectedAgeGroup?: string;
  onSelect: (age: string | undefined, isAllSelected: boolean) => void;
  isAllSelected?: boolean;
  onCloseOtherDropdowns?: () => void;
  width?: string;
}

const AgeDropdown = ({
  selectedAgeGroup,
  onSelect,
  isAllSelected = false,
  onCloseOtherDropdowns,
  width = "100%"
}: AgeDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onCloseOtherDropdowns?.();
  };

  const handleSelect = (age: string | undefined, isAll: boolean) => {
    onSelect(age, isAll);
    setIsOpen(false);
  };

  const ageOptions = ["전체", ...ageGroups];

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
            : selectedAgeGroup
              ? selectedAgeGroup
              : "연령 선택"}
        </span>
        <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {ageOptions.map((age) => {
            const isSelected =
              (age === "전체" && isAllSelected) ||
              (age !== "전체" && selectedAgeGroup === age);

            return (
              <button
                key={age}
                type="button"
                onClick={() =>
                  handleSelect(age === "전체" ? undefined : age, age === "전체")
                }
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                  isSelected
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isSelected && <Check size={16} className="text-blue-600" />}
                <span>{age}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AgeDropdown;
