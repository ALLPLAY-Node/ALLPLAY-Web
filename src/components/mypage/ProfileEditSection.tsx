import { useEffect, useMemo, useRef, useState } from "react";
import ActivityRegionForm from "@/components/mypage/forms/ActivityRegionForm";
import MemberInfoForm from "@/components/mypage/forms/MemberInfoForm";
import ProfileBasicForm from "@/components/mypage/forms/ProfileBasicForm";
import ProfilePhotoForm from "@/components/mypage/forms/ProfilePhotoForm";
import { REGION_OPTIONS } from "@/components/mypage/regionOptions";
import { findCityOption } from "@/components/mypage/regionUtils";

export type ProfileEditValue = {
  name: string;
  phoneNumber: string;
  introduce: string;
  profilePhotoUrl: string;
  birth: string;
  gender: string;
  city: string;
  district: string;
};

export type ProfileEditSavePayload = {
  name: string;
  phoneNumber: string;
  introduce: string;
  profilePhotoUrl: string;
  city: string;
  district: string;
  regionId: number;
  localProfileFile: File | null;
  birth: string;
  gender: string;
};

type ProfileEditSectionProps = {
  value: ProfileEditValue;
  isLoading?: boolean;
  isSaving?: boolean;
  onSave?: (payload: ProfileEditSavePayload) => Promise<void>;
};

const revokeIfBlobUrl = (url: string) => {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

const ProfileEditSection = ({
  value,
  isLoading = false,
  isSaving = false,
  onSave
}: ProfileEditSectionProps) => {
  const [draftName, setDraftName] = useState(value.name);
  const [draftIntroduce, setDraftIntroduce] = useState(value.introduce);
  const [draftGender, setDraftGender] = useState(value.gender);
  const [draftBirth, setDraftBirth] = useState(value.birth);
  const [draftCity, setDraftCity] = useState(value.city);
  const [draftDistrict, setDraftDistrict] = useState(value.district);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(
    value.profilePhotoUrl
  );
  const [localProfileFile, setLocalProfileFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previousPreviewRef = useRef(profilePhotoPreview);
  const isBusy = isSaving || isSubmitting;

  useEffect(() => {
    setDraftName(value.name);
    setDraftIntroduce(value.introduce);
    setDraftGender(value.gender);
    setDraftBirth(value.birth);
    setDraftCity(value.city);
    setDraftDistrict(value.district);
    setLocalProfileFile(null);
    setProfilePhotoPreview(value.profilePhotoUrl);
  }, [
    value.name,
    value.introduce,
    value.gender,
    value.birth,
    value.city,
    value.district,
    value.profilePhotoUrl
  ]);

  useEffect(() => {
    const previousPreview = previousPreviewRef.current;
    if (previousPreview && previousPreview !== profilePhotoPreview) {
      revokeIfBlobUrl(previousPreview);
    }
    previousPreviewRef.current = profilePhotoPreview;
  }, [profilePhotoPreview]);

  useEffect(() => {
    return () => {
      if (previousPreviewRef.current) {
        revokeIfBlobUrl(previousPreviewRef.current);
      }
    };
  }, []);

  const selectedCityOption = useMemo(
    () => findCityOption(draftCity, REGION_OPTIONS),
    [draftCity]
  );

  const selectedDistrictOption = useMemo(
    () =>
      selectedCityOption?.districts.find(
        (districtOption) => districtOption.name === draftDistrict
      ) ?? null,
    [selectedCityOption, draftDistrict]
  );

  const handleReset = () => {
    setDraftName(value.name);
    setDraftIntroduce(value.introduce);
    setDraftGender(value.gender);
    setDraftBirth(value.birth);
    setDraftCity(value.city);
    setDraftDistrict(value.district);
    setLocalProfileFile(null);
    setProfilePhotoPreview(value.profilePhotoUrl);
  };

  const handleSelectProfileFile = (file: File | null) => {
    if (!file) {
      setLocalProfileFile(null);
      setProfilePhotoPreview(value.profilePhotoUrl);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLocalProfileFile(file);
    setProfilePhotoPreview(previewUrl);
  };

  const handleSave = async () => {
    if (isBusy) {
      return;
    }

    const trimmedName = draftName.trim();
    if (!trimmedName) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (!selectedCityOption || !selectedDistrictOption) {
      alert("활동지역 시/도와 구를 모두 선택해주세요.");
      return;
    }

    if (!onSave) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        name: trimmedName,
        phoneNumber: value.phoneNumber,
        introduce: draftIntroduce.trim(),
        profilePhotoUrl: profilePhotoPreview,
        city: selectedCityOption.city,
        district: selectedDistrictOption.name,
        regionId: selectedDistrictOption.id,
        localProfileFile,
        birth: draftBirth,
        gender: draftGender
      });
    } catch (error) {
      console.error(error);
      alert("개인정보 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="rounded-xl border border-[#999999] py-10 text-center text-base text-muted-foreground">
        개인정보를 불러오는 중입니다.
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <ProfilePhotoForm
            previewUrl={profilePhotoPreview}
            onSelectFile={handleSelectProfileFile}
            disabled={isBusy}
          />
          <div className="pt-7">
            <ProfileBasicForm
              name={draftName}
              introduce={draftIntroduce}
              onChangeName={setDraftName}
              onChangeIntroduce={setDraftIntroduce}
              disabled={isBusy}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-[20px] font-bold leading-6 text-black">
          회원정보
        </div>
        <MemberInfoForm
          gender={draftGender}
          birth={draftBirth}
          onChangeGender={setDraftGender}
          onChangeBirth={setDraftBirth}
          disabled={isBusy}
        />
        <ActivityRegionForm
          city={draftCity}
          district={draftDistrict}
          onChangeCity={setDraftCity}
          onChangeDistrict={setDraftDistrict}
          regionOptions={REGION_OPTIONS}
          disabled={isBusy}
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <button
          type="button"
          className="h-[39px] w-[140px] rounded-xl border border-black text-base font-semibold text-black"
          onClick={handleReset}
          disabled={isBusy}
        >
          취소
        </button>
        <button
          type="button"
          className="h-[39px] w-[140px] rounded-xl bg-[#006FFF] text-base font-semibold text-white disabled:opacity-60"
          onClick={() => {
            void handleSave();
          }}
          disabled={isBusy}
        >
          저장하기
        </button>
      </div>
    </section>
  );
};

export default ProfileEditSection;
