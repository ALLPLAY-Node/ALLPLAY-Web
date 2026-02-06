interface ClubDescriptionSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

const ClubDescriptionSection = ({
  description,
  onDescriptionChange
}: ClubDescriptionSectionProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">동호회 소개</h2>
      <textarea
        rows={5}
        placeholder="동호회의 목적, 분위기, 활동 내용을 자유롭게 작성해주세요."
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
      />
    </section>
  );
};

export default ClubDescriptionSection;
