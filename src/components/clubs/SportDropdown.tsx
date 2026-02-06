import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface Sport {
  id: number;
  name: string;
}

interface SportDropdownProps {
  sports: Sport[];
  selectedSport?: number;
  onSelect: (sportId: number | undefined) => void;
  onCloseOtherDropdowns?: () => void;
  width?: string;
}

const SportDropdown = ({
  sports,
  selectedSport,
  onSelect,
  onCloseOtherDropdowns,
  width = "100%"
}: SportDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onCloseOtherDropdowns?.();
  };

  const handleSelect = (sportId: number | undefined) => {
    onSelect(sportId);
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
          {selectedSport
            ? sports.find((s) => s.id === selectedSport)?.name
            : "종목 선택"}
        </span>
        <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => handleSelect(undefined)}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
              !selectedSport
                ? "bg-blue-100 font-semibold text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {!selectedSport && <Check size={16} className="text-blue-600" />}
            <span>종목 선택하기</span>
          </button>
          {sports.map((sport) => (
            <button
              key={sport.id}
              type="button"
              onClick={() => handleSelect(sport.id)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                selectedSport === sport.id
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {selectedSport === sport.id && (
                <Check size={16} className="text-blue-600" />
              )}
              <span>{sport.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SportDropdown;
