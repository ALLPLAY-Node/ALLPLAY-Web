import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { createClub, updateClub, getClubDetail } from "@/api/clubs";
import { convertUIToAPIRegion, convertAPIToUIRegion } from "@/utils/regions";
import {
  convertUIToAPIAge,
  convertUIToAPISkill,
  convertSportIdToName,
  convertSportNameToId,
  skillLevels
} from "@/utils/clubs";
import ImageUploadSection from "@/components/clubs/ImageUploadSection";
import SuccessModal from "@/components/clubs/SuccessModal";
import BasicInfoSection from "@/components/clubs/form/BasicInfoSection";
import ActivityInfoSection from "@/components/clubs/form/ActivityInfoSection";
import ClubDescriptionSection from "@/components/clubs/form/ClubDescriptionSection";
import JoinRequirementSection from "@/components/clubs/form/JoinRequirementSection";
import ContactInfoSection from "@/components/clubs/form/ContactInfoSection";
import FormActions from "@/components/clubs/form/FormActions";

const ClubCreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const [activeDays, setActiveDays] = useState<string[]>([]);
  const [selectedSport, setSelectedSport] = useState<number | undefined>();
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();
  const [selectedDistrict, setSelectedDistrict] = useState<
    string | undefined
  >();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<
    string | undefined
  >();
  const [isRegionAllSelected, setIsRegionAllSelected] = useState(false);
  const [isDistrictAllSelected, setIsDistrictAllSelected] = useState(false);
  const [isAgeAllSelected, setIsAgeAllSelected] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>();
  const [clubName, setClubName] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [description, setDescription] = useState("");
  const [joinRequirement, setJoinRequirement] = useState("");
  const [contact, setContact] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 수정 모드일 때 기존 데이터 불러오기
  useEffect(() => {
    if (isEditMode && id) {
      const loadClubData = async () => {
        setIsLoading(true);
        try {
          const response = await getClubDetail(id);
          if (response.resultType === "SUCCESS" && response.success) {
            const club = response.success;

            // 데이터 매핑
            setClubName(club.facilityName || "");
            setDescription(club.introduction || "");
            setJoinRequirement(club.usageGuide || "");
            setContact(club.contact || "");
            setHomepageUrl(club.homepageUrl || "");

            // 종목 선택
            const sportId = convertSportNameToId(club.sportType);
            setSelectedSport(sportId);

            // 지역 정보
            const uiRegion = convertAPIToUIRegion(club.city);
            if (uiRegion) {
              setSelectedRegion(uiRegion);
            }
            setSelectedDistrict(club.district || "");

            // 연령대 (API에서 받은 데이터가 없으면 기본값 유지)
            // 실력수준 (API에서 받은 데이터가 없으면 기본값 유지)

            // 이미지 URL
            if (club.imageUrl) {
              setImagePreviews([club.imageUrl]);
            }
          }
        } catch (error) {
          console.error("Failed to load club data:", error);
          alert("동호회 정보를 불러오는 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      loadClubData();
    }
  }, [isEditMode, id]);

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // 종목명 가져오기
  const getSportType = (): string | null => {
    return convertSportIdToName(selectedSport);
  };

  // 활동빈도 문자열 생성
  const getActivityFrequency = (): string => {
    if (activeDays.length === 0) return "";
    return activeDays.join(", ");
  };

  // 지역 정보 파싱 (시/도, 구)
  const getCityAndDistrict = (): {
    city: string | null;
    district: string | null;
  } => {
    if (!selectedRegion || !selectedDistrict) {
      return { city: null, district: null };
    }

    const city = convertUIToAPIRegion(selectedRegion);
    return { city: city || null, district: selectedDistrict };
  };

  // 이미지 파일 선택 처리
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: File[] = [];

    // 최대 5장 제한
    const remainingSlots = 5 - imageFiles.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newFiles.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });

    setImageFiles((prev) => [...prev, ...newFiles]);
  };

  // 이미지 삭제
  const handleImageRemove = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // 이미지 업로드 (실제 API가 준비되면 연결)
  const uploadImages = async (files: File[]): Promise<string[]> => {
    // TODO: 실제 이미지 업로드 API 연결
    // 예시: const formData = new FormData(); files.forEach(file => formData.append('images', file));
    // const response = await fetch('/api/upload', { method: 'POST', body: formData });
    // return response.json().urls;

    // 임시: 파일을 base64로 변환하여 반환 (실제로는 서버에 업로드 후 URL 받아야 함)
    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // 실제로는 서버에 업로드하고 URL을 받아야 하지만,
          // 지금은 임시로 data URL을 반환
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    return Promise.all(uploadPromises);
  };

  // 등록 처리
  const handleSubmit = async () => {
    // 필수 필드 검증
    if (!clubName.trim()) {
      alert("동호회 이름을 입력해주세요.");
      return;
    }
    if (!selectedSport) {
      alert("종목을 선택해주세요.");
      return;
    }
    if (!selectedRegion || !selectedDistrict) {
      alert("활동지역을 선택해주세요.");
      return;
    }
    if (!selectedAgeGroup) {
      alert("연령대를 선택해주세요.");
      return;
    }
    if (!maxMembers || Number(maxMembers) <= 0) {
      alert("모집인원을 입력해주세요.");
      return;
    }
    if (activeDays.length === 0) {
      alert("활동빈도를 선택해주세요.");
      return;
    }
    if (!selectedSkill) {
      alert("실력수준을 선택해주세요.");
      return;
    }
    if (!description.trim()) {
      alert("동호회 소개를 입력해주세요.");
      return;
    }
    if (!joinRequirement.trim()) {
      alert("참여 조건을 입력해주세요.");
      return;
    }
    if (!contact.trim()) {
      alert("연락처를 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const ageGroupEnum = convertUIToAPIAge(selectedAgeGroup);
    const skillLevelEnum = convertUIToAPISkill(selectedSkill);
    const sportType = getSportType();
    const { city, district } = getCityAndDistrict();

    if (!ageGroupEnum || !skillLevelEnum || !sportType || !city || !district) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode && id) {
        // 수정 모드
        const response = await updateClub(
          id,
          {
            clubName: clubName.trim(),
            sportType: sportType,
            city: city,
            district: district,
            ageGroup: ageGroupEnum,
            images: imageFiles.length > 0 ? imageFiles : undefined,
            maxMembers: Number(maxMembers),
            activityFrequency: getActivityFrequency(),
            level: skillLevelEnum,
            description: description.trim(),
            joinRequirement: joinRequirement.trim(),
            contact: contact.trim(),
            hompageUrl: homepageUrl.trim() || undefined
          },
          token
        );

        if (response.resultType === "SUCCESS") {
          setIsUpdateModalOpen(true);
        } else {
          alert(response.message || "동호회 수정에 실패했습니다.");
        }
      } else {
        // 등록 모드
        // 이미지 업로드
        let uploadedImageURLs: string[] = [];
        if (imageFiles.length > 0) {
          uploadedImageURLs = await uploadImages(imageFiles);
        }

        const response = await createClub(
          {
            clubName: clubName.trim(),
            sportType: sportType,
            city: city,
            district: district,
            ageGroup: ageGroupEnum,
            imageURL:
              uploadedImageURLs.length > 0 ? uploadedImageURLs : undefined,
            maxMembers: Number(maxMembers),
            activityFrequency: getActivityFrequency(),
            level: skillLevelEnum,
            description: description.trim(),
            joinRequirement: joinRequirement.trim(),
            contact: contact.trim(),
            hompageUrl: homepageUrl.trim() || undefined
          },
          token
        );

        if (response.resultType === "SUCCESS") {
          setIsCreateModalOpen(true);
        } else {
          alert(response.message || "동호회 등록에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} club:`,
        error
      );
      alert(`동호회 ${isEditMode ? "수정" : "등록"} 중 오류가 발생했습니다.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="w-full pt-4 pb-10">
        <div className="text-center py-10">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full pt-4 pb-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        {isEditMode ? "동호회 수정" : "동호회 등록"}
      </h1>
      <p className="mb-8 text-sm text-gray-600">
        {isEditMode
          ? "동호회 정보를 수정해주세요."
          : "새로운 동호회를 만들어 함께 운동할 멤버를 모집해보세요."}
      </p>

      <div className="space-y-8">
        <BasicInfoSection
          clubName={clubName}
          onClubNameChange={setClubName}
          selectedSport={selectedSport}
          onSportChange={setSelectedSport}
          selectedRegion={selectedRegion}
          onRegionChange={(region, isAll) => {
            setSelectedRegion(region);
            setIsRegionAllSelected(isAll);
            if (isAll || !region) {
              setSelectedDistrict(undefined);
              setIsDistrictAllSelected(false);
            }
          }}
          selectedDistrict={selectedDistrict}
          onDistrictChange={(district, _districtId, isAll) => {
            setSelectedDistrict(district);
            setIsDistrictAllSelected(isAll);
          }}
          selectedAgeGroup={selectedAgeGroup}
          onAgeChange={(age, isAll) => {
            setSelectedAgeGroup(age);
            setIsAgeAllSelected(isAll);
          }}
          isRegionAllSelected={isRegionAllSelected}
          isDistrictAllSelected={isDistrictAllSelected}
          isAgeAllSelected={isAgeAllSelected}
          onCloseOtherDropdowns={() => {
            // 드롭다운 컴포넌트들이 자체적으로 관리하므로 여기서는 빈 함수
          }}
        />

        <ImageUploadSection
          imagePreviews={imagePreviews}
          imageFiles={imageFiles}
          onImageSelect={handleImageSelect}
          onImageRemove={handleImageRemove}
        />

        <ActivityInfoSection
          maxMembers={maxMembers}
          onMaxMembersChange={setMaxMembers}
          activeDays={activeDays}
          onToggleDay={toggleDay}
          selectedSkill={selectedSkill}
          onSkillChange={setSelectedSkill}
          skillLevels={skillLevels}
          onCloseOtherDropdowns={() => {
            // 드롭다운 컴포넌트들이 자체적으로 관리하므로 여기서는 빈 함수
          }}
        />

        <ClubDescriptionSection
          description={description}
          onDescriptionChange={setDescription}
        />

        <JoinRequirementSection
          joinRequirement={joinRequirement}
          onJoinRequirementChange={setJoinRequirement}
        />

        <ContactInfoSection
          contact={contact}
          onContactChange={setContact}
          homepageUrl={homepageUrl}
          onHomepageUrlChange={setHomepageUrl}
        />

        <FormActions
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        />
      </div>

      {/* 등록 완료 모달 */}
      <SuccessModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          navigate("/mypage");
        }}
        title="동호회 등록 완료"
        message="동호회 등록 상태는 마이페이지 > MY 동호회에서 확인할 수 있어요."
        onConfirm={() => {
          setIsCreateModalOpen(false);
          navigate("/mypage");
        }}
        confirmText="MY 동호회로 이동"
      />

      {/* 정보 수정 완료 모달 */}
      <SuccessModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="정보 수정 완료"
        message="동호회 상태는 마이페이지 > MY 동호회에서 확인할 수 있어요."
        onConfirm={() => {
          setIsUpdateModalOpen(false);
          navigate("/mypage");
        }}
        confirmText="MY 동호회로 이동"
      />
    </main>
  );
};

export default ClubCreatePage;
