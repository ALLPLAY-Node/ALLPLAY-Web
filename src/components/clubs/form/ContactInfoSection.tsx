interface ContactInfoSectionProps {
  contact: string;
  onContactChange: (value: string) => void;
  homepageUrl: string;
  onHomepageUrlChange: (value: string) => void;
}

const ContactInfoSection = ({
  contact,
  onContactChange,
  homepageUrl,
  onHomepageUrlChange
}: ContactInfoSectionProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">공지사항</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            연락처
          </label>
          <input
            type="text"
            placeholder="연락처를 입력해주세요"
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            홈페이지 URL
          </label>
          <input
            type="text"
            placeholder="있다면 홈페이지 URL을 입력해주세요"
            value={homepageUrl}
            onChange={(e) => onHomepageUrlChange(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
