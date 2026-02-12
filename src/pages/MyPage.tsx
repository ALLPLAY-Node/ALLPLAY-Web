import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MyPageLayout from "@/components/mypage/MyPageLayout";
import ClubSection from "@/components/mypage/ClubSection";
import LeaveClubBox from "@/components/mypage/LeaveClubBox";
import LeaveClubDoneBox from "@/components/mypage/LeaveClubDoneBox";
import MyReviewSection, {
  type ReviewListEntry,
  type ReviewUpdateDraftPayload
} from "@/components/mypage/MyReviewSection";
import ProfileEditSection, {
  type ProfileEditSavePayload,
  type ProfileEditValue
} from "@/components/mypage/ProfileEditSection";
import { leaveClub } from "@/api/clubs";
import {
  getManagedClubs,
  getMyClubs,
  getMyInfo,
  getMyReviews,
  updateMyInfo,
  updateMyReview,
  type MyInfo,
  type MyReviewListItem,
  type ReviewPhoto
} from "@/api/users";
import {
  issuePresignedUrl,
  uploadFileToPresignedUrl
} from "@/api/presigned-url";
import { getApiResultType, getResponseMessage } from "@/api/auth";
import type { ClubSummary } from "@/types/club";
import type { MyPageTab } from "@/components/mypage/MyPageTabs";

const ENABLE_LEAVE_CLUB_API = true;
const ENABLE_PLACEHOLDER_CLUBS = false;
const ENABLE_REVIEW_API = true;
const ENABLE_PROFILE_API = true;

const placeholderClubs: ClubSummary[] = [
  {
    id: "placeholder-1",
    name: "임시 동호회 1",
    sportType: "테니스",
    regionCity: "서울",
    joinStatus: "PENDING"
  },
  {
    id: "placeholder-2",
    name: "임시 동호회 2",
    sportType: "배드민턴",
    regionCity: "경기",
    joinStatus: "APPROVED"
  }
];

const managedPlaceholders: ClubSummary[] = [
  {
    id: "managed-placeholder-1",
    name: "직장인 배드민턴 모임",
    sportType: "배드민턴",
    regionCity: "경기",
    summary:
      "배드민턴을 처음 시작하는 분들을 위한 친목 동호회입니다. 기초부터 천천히 배우면서 즐겁게 운동하는 것을 목표로 합니다.",
    level: "초보",
    capacity: 20,
    joinRequirement: "배드민턴 초보도 환영, 매너 필수, 주 2회 참여 가능자",
    contact: "010-1234-5678",
    url: "https://allplay.example.com"
  },
  {
    id: "managed-placeholder-2",
    name: "운영 동호회 B",
    sportType: "풋살",
    regionCity: "서울"
  }
];

const mockReviews: ReviewListEntry[] = [
  {
    reviewId: "mock-review-1",
    facilityId: "facility-1",
    facilityName: "동대문 운동장",
    text: "시설은 좋았지만 라커룸 동선은 조금 아쉬웠습니다.",
    createdAt: "2025-10-29T09:00:00+09:00",
    photos: []
  },
  {
    reviewId: "mock-review-2",
    facilityId: "facility-2",
    facilityName: "잠실 체육관",
    text: "예약제 운영이라 편했지만 주차 안내는 더 필요해 보였습니다.",
    createdAt: "2025-10-31T18:30:00+09:00",
    photos: []
  },
  {
    reviewId: "mock-review-3",
    facilityId: "facility-3",
    facilityName: "성수 스포츠센터",
    text: "코트 상태와 조명이 좋아서 재방문 의사가 있습니다.",
    createdAt: "2025-11-01T14:10:00+09:00",
    photos: []
  }
];

const mockProfile: ProfileEditValue = {
  name: "홍길동",
  phoneNumber: "010-1234-5678",
  introduce: "자기소개를 입력해주세요",
  profilePhotoUrl: "",
  birth: "2000-12-12",
  gender: "",
  city: "서울",
  district: "강남구"
};

const toReviewEntry = (item: MyReviewListItem): ReviewListEntry | null => {
  const createdAt = item.createdAt ?? item.created_at;
  if (!item.reviewId || !item.facilityName || !createdAt) {
    return null;
  }

  return {
    reviewId: item.reviewId,
    facilityId: item.facilityID ?? item.facilityId ?? "",
    facilityName: item.facilityName,
    text: item.text ?? "",
    createdAt,
    photos: item.photos ?? []
  };
};

const toProfileValue = (info: MyInfo): ProfileEditValue => {
  return {
    name: info.name ?? "홍길동",
    phoneNumber: info.phoneNumber ?? "010-0000-0000",
    introduce: info.introduce ?? "",
    profilePhotoUrl: info.profilePhotoUrl ?? "",
    birth: info.birth ?? "",
    // TODO: 성별 필드 API 명세 확정 후 서버 값으로 매핑
    gender: info.gender ?? "",
    city: info.region?.city ?? "",
    district: info.region?.district ?? ""
  };
};

const getFileExtension = (file: File) => {
  const splitByDot = file.name.split(".");
  if (splitByDot.length > 1) {
    return splitByDot[splitByDot.length - 1].toLowerCase();
  }
  return "jpg";
};

const createUploadFileName = (prefix: string, file: File, index: number) => {
  const extension = getFileExtension(file);
  return `${prefix}-${Date.now()}-${index}.${extension}`;
};

const shouldNavigateToClubCreate = (club: ClubSummary) => {
  const clubId = club.id?.trim();
  if (!clubId) {
    return true;
  }

  return (
    clubId.startsWith("managed-placeholder") || clubId.startsWith("placeholder")
  );
};

const MyPage = () => {
  const navigate = useNavigate();

  const [joinedClubs, setJoinedClubs] = useState<ClubSummary[]>([]);
  const [managedClubs, setManagedClubs] = useState<ClubSummary[]>([]);
  const [reviews, setReviews] = useState<ReviewListEntry[]>([]);
  const [profile, setProfile] = useState<ProfileEditValue>(mockProfile);

  const [selectedJoinedClubId, setSelectedJoinedClubId] = useState<
    string | null
  >(null);
  const [selectedManagedClubId, setSelectedManagedClubId] = useState<
    string | null
  >(null);
  const [clubToLeave, setClubToLeave] = useState<ClubSummary | null>(null);
  const [completedLeaveClubId, setCompletedLeaveClubId] = useState<
    string | null
  >(null);

  const [isLeaveDoneOpen, setIsLeaveDoneOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isClubsLoading, setIsClubsLoading] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isProfileSaving, setIsProfileSaving] = useState(false);

  const [activeTab, setActiveTab] = useState<MyPageTab>("clubs");

  const fetchClubs = async () => {
    setIsClubsLoading(true);
    try {
      const [joinedRes, managedRes] = await Promise.all([
        getMyClubs(),
        getManagedClubs()
      ]);

      const joinedResultType = getApiResultType(joinedRes);
      const managedResultType = getApiResultType(managedRes);

      setJoinedClubs(
        joinedResultType === "SUCCESS" ? (joinedRes.success?.items ?? []) : []
      );
      setManagedClubs(
        managedResultType === "SUCCESS" ? (managedRes.success?.items ?? []) : []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsClubsLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!ENABLE_REVIEW_API) {
      setReviews(mockReviews);
      return;
    }

    setIsReviewsLoading(true);
    try {
      const response = await getMyReviews();
      const resultType = getApiResultType(response);
      if (resultType !== "SUCCESS") {
        setReviews([]);
        return;
      }

      const normalized = (response.success?.items ?? [])
        .map(toReviewEntry)
        .filter((item): item is ReviewListEntry => item !== null);

      setReviews(normalized);
    } catch (error) {
      console.error(error);
      setReviews([]);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  const fetchProfile = async () => {
    if (!ENABLE_PROFILE_API) {
      setProfile(mockProfile);
      return;
    }

    setIsProfileLoading(true);
    try {
      // API: GET /users/me
      const response = await getMyInfo();
      // 오탈자 확인: resultType 대신 resultTyle이 내려올 수 있다.
      const resultType = getApiResultType(response);

      if (resultType !== "SUCCESS") {
        throw new Error(getResponseMessage(response, "개인정보 조회 실패"));
      }

      setProfile(toProfileValue(response.success ?? {}));
    } catch (error) {
      console.error(error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  useEffect(() => {
    void fetchClubs();
    void fetchReviews();
    void fetchProfile();
  }, []);

  const joinedList =
    ENABLE_PLACEHOLDER_CLUBS && !isClubsLoading && joinedClubs.length === 0
      ? placeholderClubs
      : joinedClubs;

  const managedList =
    ENABLE_PLACEHOLDER_CLUBS && !isClubsLoading && managedClubs.length === 0
      ? managedPlaceholders
      : managedClubs;

  const handleSelectJoinedClub = (club: ClubSummary) => {
    setSelectedJoinedClubId((prev) => (prev === club.id ? null : club.id));
  };

  const handleSelectManagedClub = (club: ClubSummary) => {
    setSelectedManagedClubId((prev) => (prev === club.id ? null : club.id));
  };

  const handleEditManagedClub = (club: ClubSummary) => {
    if (shouldNavigateToClubCreate(club)) {
      navigate("/clubs/new");
      return;
    }

    navigate(`/clubs/${club.id}/edit`);
  };

  const handleLeaveClub = (club: ClubSummary) => {
    setClubToLeave(club);
  };

  const handleCancelLeave = () => {
    setClubToLeave(null);
  };

  const handleConfirmLeave = async () => {
    if (!clubToLeave || isLeaving) {
      return;
    }

    try {
      setIsLeaving(true);
      const targetClubId = clubToLeave.id;

      if (ENABLE_LEAVE_CLUB_API) {
        const response = await leaveClub(targetClubId);
        const resultType = getApiResultType(response);
        if (resultType !== "SUCCESS") {
          // 오탈자 확인: message 대신 messege가 내려올 수 있다.
          throw new Error(getResponseMessage(response, "동호회 탈퇴 실패"));
        }
      }

      setClubToLeave(null);
      setCompletedLeaveClubId(targetClubId);
      setIsLeaveDoneOpen(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "탈퇴 처리 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLeaving(false);
    }
  };

  const handleCloseLeaveDone = () => {
    if (completedLeaveClubId) {
      setJoinedClubs((prev) =>
        prev.filter((item) => item.id !== completedLeaveClubId)
      );
      setSelectedJoinedClubId((prev) =>
        prev === completedLeaveClubId ? null : prev
      );
    }

    setCompletedLeaveClubId(null);
    setIsLeaveDoneOpen(false);
    if (ENABLE_LEAVE_CLUB_API) {
      void fetchClubs();
    }
  };

  const uploadLocalFilesToStorage = async (files: File[]) => {
    if (files.length === 0) {
      return [] as ReviewPhoto[];
    }

    return Promise.all(
      files.map(async (file, index) => {
        const fileName = createUploadFileName("review", file, index);
        const presignedResponse = await issuePresignedUrl({
          domain: "reviews",
          operation: "PUT",
          fileName,
          fileType: file.type || "image/jpeg"
        });

        // 오탈자 확인: resultType 대신 resultTyle이 내려올 수 있다.
        const resultType = getApiResultType(presignedResponse);
        if (resultType !== "SUCCESS") {
          throw new Error(
            getResponseMessage(presignedResponse, "Presigned URL 발급 실패")
          );
        }

        const presigned = presignedResponse.success;
        if (!presigned?.url) {
          throw new Error("Presigned URL 응답이 비어있습니다.");
        }

        const uploadedUrl = await uploadFileToPresignedUrl(file, presigned);
        return {
          // TODO: 백엔드가 photoId 생성 규칙을 제공하면 교체
          photoId: fileName,
          photoUrl: uploadedUrl
        };
      })
    );
  };

  const uploadProfilePhotoToStorage = async (file: File) => {
    const fileName = createUploadFileName("profile", file, 0);
    const presignedResponse = await issuePresignedUrl({
      domain: "user-profile",
      operation: "PUT",
      fileName,
      fileType: file.type || "image/jpeg"
    });

    // 오탈자 확인: resultType 대신 resultTyle이 내려올 수 있다.
    const resultType = getApiResultType(presignedResponse);
    if (resultType !== "SUCCESS") {
      throw new Error(
        getResponseMessage(presignedResponse, "사진 업로드 실패")
      );
    }

    const presigned = presignedResponse.success;
    if (!presigned?.url) {
      throw new Error("프로필 presigned URL 응답이 비어있습니다.");
    }

    return uploadFileToPresignedUrl(file, presigned);
  };

  const handleUpdateReview = async (
    reviewId: string,
    payload: ReviewUpdateDraftPayload
  ) => {
    const { text, photos, localFiles } = payload;

    if (!ENABLE_REVIEW_API) {
      const localPreviewPhotos: ReviewPhoto[] = localFiles.map(
        (file, index) => ({
          photoId: `local-${Date.now()}-${index}`,
          photoUrl: URL.createObjectURL(file)
        })
      );

      setReviews((prev) =>
        prev.map((review) =>
          review.reviewId === reviewId
            ? {
                ...review,
                text,
                photos: [...photos, ...localPreviewPhotos]
              }
            : review
        )
      );
      return;
    }

    const uploadedPhotos = await uploadLocalFilesToStorage(localFiles);
    const mergedPhotos = [...photos, ...uploadedPhotos];
    const response = await updateMyReview(reviewId, {
      text,
      photos: mergedPhotos
    });
    const resultType = getApiResultType(response);

    if (resultType !== "SUCCESS") {
      // 오탈자 확인: message 대신 messege가 내려올 수 있다.
      throw new Error(getResponseMessage(response, "리뷰 수정 실패"));
    }

    setReviews((prev) =>
      prev.map((review) =>
        review.reviewId === reviewId
          ? {
              ...review,
              text,
              photos: mergedPhotos
            }
          : review
      )
    );
  };

  const handleSaveProfile = async (payload: ProfileEditSavePayload) => {
    if (isProfileSaving) {
      return;
    }

    try {
      setIsProfileSaving(true);
      let profilePhotoUrl = payload.profilePhotoUrl;

      if (!ENABLE_PROFILE_API) {
        setProfile((prev) => ({
          ...prev,
          name: payload.name,
          phoneNumber: payload.phoneNumber,
          introduce: payload.introduce,
          profilePhotoUrl,
          birth: payload.birth,
          gender: payload.gender,
          city: payload.city,
          district: payload.district
        }));
        return;
      }

      if (payload.localProfileFile) {
        profilePhotoUrl = await uploadProfilePhotoToStorage(
          payload.localProfileFile
        );
      }

      // API: PUT /users/me
      const response = await updateMyInfo({
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        introduce: payload.introduce,
        profilePhotoUrl,
        regionId: payload.regionId
      });

      // 오탈자 확인: resultType 대신 resultTyle이 내려올 수 있다.
      const resultType = getApiResultType(response);
      if (resultType !== "SUCCESS") {
        throw new Error(getResponseMessage(response, "개인정보 수정 실패"));
      }

      setProfile((prev) => ({
        ...prev,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        introduce: payload.introduce,
        profilePhotoUrl,
        birth: payload.birth,
        gender: payload.gender,
        city: payload.city,
        district: payload.district
      }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "개인정보 저장 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsProfileSaving(false);
    }
  };

  return (
    <>
      <MyPageLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "reviews" ? (
          <MyReviewSection
            reviews={reviews}
            isLoading={isReviewsLoading}
            onUpdateReview={handleUpdateReview}
          />
        ) : activeTab === "profile" ? (
          <ProfileEditSection
            value={profile}
            isLoading={isProfileLoading}
            isSaving={isProfileSaving}
            onSave={handleSaveProfile}
          />
        ) : (
          <>
            <ClubSection
              title="가입한 동호회"
              clubs={joinedList}
              variant="joined"
              onSelect={handleSelectJoinedClub}
              onLeaveClub={handleLeaveClub}
              selectedClubId={selectedJoinedClubId}
            />
            <ClubSection
              title="운영중인 동호회"
              clubs={managedList}
              variant="managed"
              onSelect={handleSelectManagedClub}
              onUpdateManagedClub={handleEditManagedClub}
              selectedClubId={selectedManagedClubId}
            />
          </>
        )}
      </MyPageLayout>

      {clubToLeave ? (
        <LeaveClubBox
          isSubmitting={isLeaving}
          onCancel={handleCancelLeave}
          onConfirm={handleConfirmLeave}
        />
      ) : null}

      {isLeaveDoneOpen ? (
        <LeaveClubDoneBox onClose={handleCloseLeaveDone} />
      ) : null}
    </>
  );
};

export default MyPage;
