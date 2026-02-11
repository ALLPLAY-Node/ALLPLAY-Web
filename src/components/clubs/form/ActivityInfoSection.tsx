import ActivityDaysSelector from "../ActivityDaysSelector";
import SkillLevelDropdown from "../SkillLevelDropdown";
import { skillLevels } from "@/utils/clubs";

interface ActivityInfoSectionProps {
  maxMembers: string;
  onMaxMembersChange: (value: string) => void;
  activeDays: string[];
  onToggleDay: (day: string) => void;
  selectedSkill?: string;
  onSkillChange: (skill: string | undefined) => void;
  skillLevels: string[];
  onCloseOtherDropdowns: () => void;
}

const ActivityInfoSection = ({
  maxMembers,
  onMaxMembersChange,
  activeDays,
  onToggleDay,
  selectedSkill,
  onSkillChange,
  onCloseOtherDropdowns
}: ActivityInfoSectionProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">활동 정보</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {/* 모집인원 */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="max-members"
          >
            모집인원
          </label>
          <input
            id="max-members"
            type="number"
            placeholder="숫자를 입력해주세요"
            value={maxMembers}
            onChange={(e) => onMaxMembersChange(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
        </div>

        {/* 활동빈도 */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="activity-days"
          >
            활동빈도
          </label>
          <ActivityDaysSelector
            id="activity-days"
            activeDays={activeDays}
            onToggle={onToggleDay}
          />
        </div>

        {/* 실력수준 */}
        <div className="space-y-2">
          <label
            className="block text-sm font-medium text-gray-800"
            htmlFor="skill-level"
          >
            실력수준
          </label>
          <SkillLevelDropdown
            id="skill-level"
            skillLevels={skillLevels}
            selectedSkill={selectedSkill}
            onSelect={onSkillChange}
            onCloseOtherDropdowns={onCloseOtherDropdowns}
          />
        </div>
      </div>
    </section>
  );
};

export default ActivityInfoSection;
