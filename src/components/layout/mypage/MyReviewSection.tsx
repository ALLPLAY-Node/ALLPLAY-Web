import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { ReviewPhoto } from "@/api/users";

export type ReviewListEntry = {
  reviewId: string;
  facilityId: string;
  facilityName: string;
  text: string;
  createdAt: string;
  photos: ReviewPhoto[];
};

type MyReviewSectionProps = {
  reviews: ReviewListEntry[];
  isLoading?: boolean;
  onUpdateReview?: (
    reviewId: string,
    payload: { text: string; photos: ReviewPhoto[] }
  ) => Promise<void>;
};

const toTimestamp = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatReviewDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  return `${year}. ${month}. ${day}`;
};

const getPhotoSlots = (photos: ReviewPhoto[]) => {
  const slots: Array<ReviewPhoto | null> = photos.slice(0, 3);
  while (slots.length < 3) {
    slots.push(null);
  }
  return slots;
};

const scrollItemToViewportCenter = (node: HTMLDivElement) => {
  const rect = node.getBoundingClientRect();
  const currentTop = window.scrollY;
  const centeredTop =
    currentTop + rect.top - (window.innerHeight - rect.height) / 2;
  const targetTop = Math.max(0, centeredTop);

  window.scrollTo({
    top: targetTop,
    behavior: "smooth"
  });
};

const MyReviewSection = ({
  reviews,
  isLoading = false,
  onUpdateReview
}: MyReviewSectionProps) => {
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");
  const [draftPhotoSlots, setDraftPhotoSlots] = useState<
    Array<ReviewPhoto | null>
  >([null, null, null]);
  const [isUpdating, setIsUpdating] = useState(false);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const sortedReviews = useMemo(() => {
    // 최신 등록 날짜 내림차순
    return [...reviews].sort(
      (a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt)
    );
  }, [reviews]);

  useEffect(() => {
    const currentIds = new Set(sortedReviews.map((review) => review.reviewId));
    Object.keys(itemRefs.current).forEach((reviewId) => {
      if (!currentIds.has(reviewId)) {
        delete itemRefs.current[reviewId];
      }
    });
  }, [sortedReviews]);

  useEffect(() => {
    if (!selectedReviewId) {
      return;
    }

    const exists = sortedReviews.some(
      (review) => review.reviewId === selectedReviewId
    );

    if (!exists) {
      setSelectedReviewId(null);
      setEditingReviewId(null);
      setDraftText("");
      setDraftPhotoSlots([null, null, null]);
    }
  }, [selectedReviewId, sortedReviews]);

  useEffect(() => {
    if (!selectedReviewId) {
      return;
    }

    const node = itemRefs.current[selectedReviewId];
    if (!node) {
      return;
    }

    const timerId = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        scrollItemToViewportCenter(node);
      });
    }, 320);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [selectedReviewId]);

  useEffect(() => {
    return () => {
      draftPhotoSlots.forEach((photo) => {
        if (photo?.photoUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(photo.photoUrl);
        }
      });
    };
  }, [draftPhotoSlots]);

  const enterReadMode = () => {
    setEditingReviewId(null);
  };

  const closeDetail = () => {
    setSelectedReviewId(null);
    setEditingReviewId(null);
    setDraftText("");
    setDraftPhotoSlots([null, null, null]);
  };

  const openDetail = (review: ReviewListEntry) => {
    setSelectedReviewId(review.reviewId);
    setEditingReviewId(null);
    setDraftText(review.text);
    setDraftPhotoSlots(getPhotoSlots(review.photos));
  };

  const handleToggleReview = (review: ReviewListEntry) => {
    if (selectedReviewId === review.reviewId) {
      closeDetail();
      return;
    }

    openDetail(review);
  };

  const handleStartEdit = (review: ReviewListEntry) => {
    setEditingReviewId(review.reviewId);
    setDraftText(review.text);
    setDraftPhotoSlots(getPhotoSlots(review.photos));
  };

  const handleCancelEdit = (review: ReviewListEntry) => {
    setDraftText(review.text);
    setDraftPhotoSlots(getPhotoSlots(review.photos));
    enterReadMode();
  };

  const handleRemovePhoto = (slotIndex: number) => {
    setDraftPhotoSlots((prev) => {
      const removed = prev[slotIndex];
      if (removed?.photoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.photoUrl);
      }

      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  const handleClickAttach = (slotIndex: number) => {
    fileInputRefs.current[slotIndex]?.click();
  };

  const handleSelectAttachImage = (
    slotIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // TODO: 백엔드 이미지 업로드 API 연동 후, 여기에서 파일 업로드를 수행하고
    // 서버가 내려주는 photoId/photoUrl 값을 슬롯 상태로 치환한다.
    const previewUrl = URL.createObjectURL(file);
    const localPhoto: ReviewPhoto = {
      photoId: `local-${Date.now()}-${slotIndex}`,
      photoUrl: previewUrl
    };

    setDraftPhotoSlots((prev) => {
      const replaced = prev[slotIndex];
      if (replaced?.photoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(replaced.photoUrl);
      }

      const next = [...prev];
      next[slotIndex] = localPhoto;
      return next;
    });

    event.currentTarget.value = "";
  };

  const handleSave = async (review: ReviewListEntry) => {
    if (isUpdating) {
      return;
    }

    const nextText = draftText.trim();
    if (!nextText) {
      return;
    }

    try {
      setIsUpdating(true);
      const nextPhotos = draftPhotoSlots.filter(
        (photo): photo is ReviewPhoto => photo !== null
      );

      await onUpdateReview?.(review.reviewId, {
        text: nextText,
        photos: nextPhotos
      });
      setDraftText(nextText);
      enterReadMode();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "리뷰 수정 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="hidden rounded-md bg-[#E3E3E3] px-4 py-2 md:grid md:grid-cols-[1.2fr_3fr_1fr] md:items-center md:gap-6">
        <div className="text-center text-lg font-medium">시설 이름</div>
        <div className="text-center text-lg font-medium">작성한 리뷰 내용</div>
        <div className="text-center text-lg font-medium">등록 날짜</div>
      </div>

      {isLoading ? (
        <div className="rounded-lg border border-[#999999] py-8 text-center text-muted-foreground">
          작성한 리뷰를 불러오는 중입니다.
        </div>
      ) : sortedReviews.length === 0 ? (
        <div className="rounded-lg border border-[#999999] py-8 text-center text-muted-foreground">
          작성한 리뷰가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedReviews.map((review) => {
            const isOpen = selectedReviewId === review.reviewId;
            const isEditing = editingReviewId === review.reviewId;
            const photoSlots = isEditing
              ? draftPhotoSlots
              : getPhotoSlots(review.photos);
            const previewText = isOpen ? draftText : review.text;

            return (
              <div
                key={review.reviewId}
                ref={(el) => {
                  itemRefs.current[review.reviewId] = el;
                }}
                className="flex flex-col gap-2"
              >
                <button
                  type="button"
                  onClick={() => handleToggleReview(review)}
                  className={`grid w-full grid-cols-1 gap-2 rounded-md border px-3 py-3 text-left transition-colors md:grid-cols-[1.2fr_3fr_1fr] md:items-center md:gap-6 ${
                    isOpen
                      ? "border-[#4D9AFF] bg-[#F2F8FF]"
                      : "border-[#999999] bg-white hover:bg-[#F9F9F9]"
                  }`}
                >
                  <div className="flex items-center gap-2 md:block">
                    <span className="text-xs text-muted-foreground md:hidden">
                      시설 이름
                    </span>
                    <span className="text-base font-medium md:text-center">
                      {review.facilityName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:block">
                    <span className="text-xs text-muted-foreground md:hidden">
                      리뷰 내용
                    </span>
                    <span className="block truncate text-base md:text-center">
                      {previewText}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:block">
                    <span className="text-xs text-muted-foreground md:hidden">
                      등록 날짜
                    </span>
                    <span className="text-base md:text-center">
                      {formatReviewDate(review.createdAt)}
                    </span>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-[760px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className={`flex flex-col gap-4 rounded-xl border border-[#4D9AFF] p-4 md:p-6 ${
                      isOpen ? "translate-y-0" : "-translate-y-2"
                    } transition-transform duration-300 ease-out`}
                  >
                    <div className="text-xl font-semibold">
                      {review.facilityName}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {photoSlots.map((photo, index) =>
                        photo ? (
                          <div
                            key={photo.photoId}
                            className="relative h-[160px] w-full rounded-md bg-[#B3B3B3]"
                          >
                            <img
                              src={photo.photoUrl}
                              alt={`${review.facilityName} 리뷰 이미지 ${index + 1}`}
                              className="h-full w-full rounded-md object-cover"
                            />
                            {isEditing ? (
                              <button
                                type="button"
                                aria-label="이미지 삭제"
                                className="absolute right-2 top-2 px-1 text-base font-medium text-black hover:opacity-70"
                                onClick={() => handleRemovePhoto(index)}
                              >
                                x
                              </button>
                            ) : null}
                          </div>
                        ) : (
                          <div
                            key={`placeholder-${index}`}
                            className="h-[160px] w-full rounded-md bg-[#B3B3B3]"
                          >
                            {isEditing ? (
                              <div className="flex h-full w-full items-center justify-center">
                                <input
                                  ref={(el) => {
                                    fileInputRefs.current[index] = el;
                                  }}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(event) =>
                                    handleSelectAttachImage(index, event)
                                  }
                                />
                                <button
                                  type="button"
                                  className="rounded-lg border border-[#999999] bg-white px-4 py-2 text-sm font-medium text-black"
                                  onClick={() => handleClickAttach(index)}
                                >
                                  사진 첨부
                                </button>
                              </div>
                            ) : null}
                          </div>
                        )
                      )}
                    </div>

                    {isEditing ? (
                      <textarea
                        value={draftText}
                        onChange={(event) => setDraftText(event.target.value)}
                        className="min-h-[106px] w-full resize-y rounded-xl border border-[#999999] bg-white p-4 text-base"
                      />
                    ) : (
                      <div className="min-h-[106px] w-full rounded-xl border border-[#999999] bg-white p-4 text-base">
                        {isOpen ? draftText : review.text}
                      </div>
                    )}

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        className="h-10 min-w-[120px] rounded-xl border border-[#999999] bg-white px-4 text-sm font-semibold"
                        onClick={() => {
                          if (isEditing) {
                            handleCancelEdit(review);
                            return;
                          }
                          closeDetail();
                        }}
                        disabled={isUpdating}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className="h-10 min-w-[120px] rounded-xl bg-[#006FFF] px-4 text-sm font-semibold text-white disabled:opacity-60"
                        onClick={() => {
                          if (isEditing) {
                            void handleSave(review);
                            return;
                          }
                          handleStartEdit(review);
                        }}
                        disabled={
                          isUpdating ||
                          (isEditing && draftText.trim().length === 0)
                        }
                      >
                        {isEditing ? "저장" : "수정"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MyReviewSection;
