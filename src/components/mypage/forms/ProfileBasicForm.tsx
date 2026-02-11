type ProfileBasicFormProps = {
  name: string;
  introduce: string;
  onChangeName: (value: string) => void;
  onChangeIntroduce: (value: string) => void;
  disabled?: boolean;
};

const ProfileBasicForm = ({
  name,
  introduce,
  onChangeName,
  onChangeIntroduce,
  disabled = false
}: ProfileBasicFormProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-base font-normal text-black">닉네임</span>
        <input
          value={name}
          onChange={(event) => onChangeName(event.target.value)}
          className="h-10 w-[222px] rounded-xl border border-[#999999] bg-white px-[25px] text-base text-black placeholder:text-[#A7A7A7]"
          placeholder="홍길동"
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-base font-normal text-black">자기소개</span>
        <textarea
          value={introduce}
          onChange={(event) => onChangeIntroduce(event.target.value)}
          className="h-[100px] w-full max-w-[550px] resize-none rounded-xl border border-[#999999] bg-white px-[25px] py-3 text-base text-black placeholder:text-[#A7A7A7]"
          placeholder="자기소개를 입력해주세요"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ProfileBasicForm;
