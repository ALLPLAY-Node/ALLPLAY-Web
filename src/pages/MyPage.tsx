import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MyPageLayout from "@/components/layout/mypage/MyPageLayout";
import ClubSection from "@/components/layout/mypage/ClubSection";
import LeaveClubBox from "@/components/layout/mypage/LeaveClubBox";
import LeaveClubDoneBox from "@/components/layout/mypage/LeaveClubDoneBox";
import MyReviewSection, {
  type ReviewListEntry,
  type ReviewUpdateDraftPayload
} from "@/components/layout/mypage/MyReviewSection";
import {
  getManagedClubs,
  getMyClubs,
  getMyReviews,
  issuePresignedUrl,
  leaveClub,
  updateMyReview,
  uploadFileToPresignedUrl,
  type MyReviewListItem,
  type ReviewPhoto
} from "@/api/users";
import { getApiResultType, getResponseMessage } from "@/api/common";
import type { ClubSummary } from "@/types/club";

const ENABLE_LEAVE_CLUB_API = false;
const ENABLE_PLACEHOLDER_CLUBS = true;
const ENABLE_REVIEW_API = false;

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

const getFileExtension = (file: File) => {
  const splitByDot = file.name.split(".");
  if (splitByDot.length > 1) {
    return splitByDot[splitByDot.length - 1].toLowerCase();
  }
  return "jpg";
};

const createReviewUploadFileName = (file: File, index: number) => {
  const extension = getFileExtension(file);
  return `review-${Date.now()}-${index}.${extension}`;
};

const MyPage = () => {
  const navigate = useNavigate();
  const [joinedClubs, setJoinedClubs] = useState<ClubSummary[]>([]);
  const [managedClubs, setManagedClubs] = useState<ClubSummary[]>([]);
  const [reviews, setReviews] = useState<ReviewListEntry[]>([]);
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
  const [activeTab, setActiveTab] = useState<
    "clubs" | "reviews" | "help" | "profile"
  >("clubs");

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
      // Connected API: GET /users/me/reviews
      const response = await getMyReviews();
      const resultType = getApiResultType(response);

      if (resultType !== "SUCCESS") {
        console.error(response);
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

  useEffect(() => {
    void fetchClubs();
    void fetchReviews();
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
          // 오탈자 확인: message 대신 messege가 내려올 수 있어 공통 파서를 사용한다.
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

    const uploadedPhotos = await Promise.all(
      files.map(async (file, index) => {
        const fileName = createReviewUploadFileName(file, index);
        const presignedResponse = await issuePresignedUrl({
          domain: "reviews",
          operation: "PUT",
          fileName,
          fileType: file.type || "image/jpeg"
        });

        const resultType = getApiResultType(presignedResponse);
        if (resultType !== "SUCCESS") {
          // 오탈자 확인: resultTyle/messege 호환을 위해 공통 파서를 사용한다.
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
          // TODO: 백엔드가 photoId 생성 규칙을 제공하면 해당 값으로 교체
          photoId: fileName,
          photoUrl: uploadedUrl
        };
      })
    );

    return uploadedPhotos;
  };

  const handleUpdateReview = async (
    reviewId: string,
    payload: ReviewUpdateDraftPayload
  ) => {
    const { text, photos, localFiles } = payload;

    if (!ENABLE_REVIEW_API) {
      // NOTE: mock mode
      // For local testing, attach selected files as local preview URLs.
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
                photos: [...photos, ...localPreviewPhotos],
                createdAt: new Date().toISOString()
              }
            : review
        )
      );
      return;
    }

    // Connected flow:
    // 1) Issue presigned URL
    // 2) Upload local files directly to S3 via PUT
    // 3) Send final photos[] to review update API
    const uploadedPhotos = await uploadLocalFilesToStorage(localFiles);
    const mergedPhotos = [...photos, ...uploadedPhotos];

    // Connected API: PUT /users/me/reviews/{reviewId}
    const response = await updateMyReview(reviewId, {
      text,
      photos: mergedPhotos
    });
    const resultType = getApiResultType(response);

    if (resultType !== "SUCCESS") {
      // 오탈자 확인: message 대신 messege가 내려올 수 있어 공통 파서를 사용한다.
      throw new Error(getResponseMessage(response, "리뷰 수정 실패"));
    }

    const updatedAt = response.success?.updatedAt ?? new Date().toISOString();

    // Keep optimistic update for immediate feedback.
    setReviews((prev) =>
      prev.map((review) =>
        review.reviewId === reviewId
          ? {
              ...review,
              text,
              photos: mergedPhotos,
              createdAt: updatedAt
            }
          : review
      )
    );

    // TODO: once backend returns canonical review detail consistently,
    // switch to `void fetchReviews();` to sync list from server source-of-truth.
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
