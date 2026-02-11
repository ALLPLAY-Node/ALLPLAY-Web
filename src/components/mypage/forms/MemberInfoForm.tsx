import CalendarPanel from "@/components/mypage/forms/CalendarPanel";
import SectionPanel from "@/components/mypage/forms/SectionPanel";

type MemberInfoFormProps = {
  gender: string;
  birth: string;
  onChangeGender: (value: string) => void;
  onChangeBirth: (value: string) => void;
  disabled?: boolean;
};

const GENDER_OPTIONS = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" }
];

const MemberInfoForm = ({
  gender,
  birth,
  onChangeGender,
  onChangeBirth,
  disabled = false
}: MemberInfoFormProps) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[140px_1fr]">
      <div className="flex flex-col gap-1">
        <span className="text-base font-normal text-black">성별</span>
        <SectionPanel
          value={gender}
          options={GENDER_OPTIONS}
          placeholder="선택"
          onChange={onChangeGender}
          widthClassName="w-[140px]"
          panelMaxHeightClassName="max-h-[172px]"
          disabled={disabled}
        />
      </div>

      <CalendarPanel
        value={birth}
        onChange={onChangeBirth}
        disabled={disabled}
      />
    </div>
  );
};

export default MemberInfoForm;
