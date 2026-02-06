interface JoinRequirementSectionProps {
  joinRequirement: string;
  onJoinRequirementChange: (value: string) => void;
}

const JoinRequirementSection = ({
  joinRequirement,
  onJoinRequirementChange
}: JoinRequirementSectionProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">참여 조건</h2>
      <textarea
        rows={4}
        placeholder="동호회 참여 조건을 자유롭게 작성해주세요.&#10;예: 매너필수, 정기 참여 가능자"
        value={joinRequirement}
        onChange={(e) => onJoinRequirementChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
      />
    </section>
  );
};

export default JoinRequirementSection;
