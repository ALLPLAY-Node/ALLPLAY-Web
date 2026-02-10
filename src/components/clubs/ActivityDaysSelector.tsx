interface ActivityDaysSelectorProps {
  activeDays: string[];
  onToggle: (day: string) => void;
  id?: string;
}

const ActivityDaysSelector = ({
  activeDays,
  onToggle,
  id
}: ActivityDaysSelectorProps) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div id={id} className="flex flex-wrap gap-[10px] md:flex-nowrap">
      {days.map((day) => {
        const isActive = activeDays.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => onToggle(day)}
            aria-pressed={isActive}
            className={`flex h-[39px] w-[39px] items-center justify-center rounded-[12px] border p-[10px] text-sm font-medium transition-colors duration-150 ${
              isActive
                ? "border-[#006FFF] bg-[#006FFF] text-white"
                : "border-[#DEDEDE] bg-[#DEDEDE] text-gray-700"
            }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};

export default ActivityDaysSelector;
