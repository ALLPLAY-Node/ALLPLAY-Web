import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface SkillLevelDropdownProps {
  skillLevels: string[];
  selectedSkill?: string;
  onSelect: (skill: string | undefined) => void;
  onCloseOtherDropdowns?: () => void;
  id?: string;
}

const SkillLevelDropdown = ({
  skillLevels,
  selectedSkill,
  onSelect,
  onCloseOtherDropdowns,
  id
}: SkillLevelDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onCloseOtherDropdowns?.();
  };

  const handleSelect = (skill: string | undefined) => {
    onSelect(skill);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        className="relative flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#999999] px-[10px] py-1 text-sm text-white"
      >
        <span>{selectedSkill || "실력 선택하기"}</span>
        <ChevronDown size={16} className="absolute right-[10px] shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => handleSelect(undefined)}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
              !selectedSkill
                ? "bg-blue-100 font-semibold text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {!selectedSkill && <Check size={16} className="text-blue-600" />}
            <span>실력 선택하기</span>
          </button>
          {skillLevels.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => handleSelect(skill)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                selectedSkill === skill
                  ? "bg-blue-100 font-semibold text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {selectedSkill === skill && (
                <Check size={16} className="text-blue-600" />
              )}
              <span>{skill}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillLevelDropdown;
