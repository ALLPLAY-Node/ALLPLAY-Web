import { useEffect, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { User } from "@/types/user";
import { getUser } from "@/api/user";
import UserAvatar from "@/components/common/UserAvatar";
import Basic from "@/assets/basic.png";
import { createSpotReview } from "@/api/reviews";
import { getAccessToken } from "@/api/auth";
import {
  issuePresignedUrl,
  uploadFileToPresignedUrl
} from "@/api/presigned-url";

type WriteReviewProps = {
  spotId?: string;
  onSuccess?: () => void | Promise<void>;
};

const WriteReview = ({ spotId, onSuccess }: WriteReviewProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setUser(res.success);
      } catch {
        setError("유저 정보를 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const nextPreviewUrls = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(nextPreviewUrls);

    return () => {
      nextPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (images.length + files.length > 2) {
      alert("사진은 최대 2장까지 업로드 가능합니다.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const uploadImages = async (files: File[]) => {
    if (files.length === 0) return [] as string[];

    return Promise.all(
      files.map(async (file, index) => {
        const issued = await issuePresignedUrl({
          domain: "reviews",
          operation: "PUT",
          fileName: `review-${Date.now()}-${index}-${file.name}`,
          fileType: file.type || "image/jpeg"
        });

        if (!issued.success) {
          throw new Error("Presigned URL 발급 실패");
        }

        return uploadFileToPresignedUrl(file, issued.success);
      })
    );
  };

  const handleSubmit = async () => {
    const token = getAccessToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!spotId) {
      alert("시설 정보가 올바르지 않습니다.");
      return;
    }

    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const uploadedUrls = await uploadImages(images);

      await createSpotReview(spotId, {
        text: content.trim(),
        ...(uploadedUrls.length ? { photoUrl: uploadedUrls } : {})
      });

      setContent("");
      setImages([]);
      await onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("리뷰 등록에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex bg-gray-100 rounded-xl px-4 py-5">
      <div className="w-[120px] flex flex-col justify-center items-center">
        {user?.profilePhotoUrl ? (
          <div className="flex flex-col items-center justify-center gap-1">
            <UserAvatar image={user.profilePhotoUrl} username={user.name} />
            <span
              className="text-xs max-w-[72px] truncate text-center leading-tight"
              title={user.name}
            >
              {user.name}
            </span>
          </div>
        ) : (
          <UserAvatar image={Basic} />
        )}
      </div>

      <div className="w-full flex flex-col gap-4">
        <Textarea
          className="max-w-full max-h-[160px] resize-none overflow-y-auto rounded-xl border border-gray-400 p-4"
          placeholder="리뷰를 작성해주세요"
          maxLength={10000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="relative w-20 h-20 flex-shrink-0"
              >
                <img
                  src={previewUrls[index]}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="w-full flex justify-between">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />

          <label
            htmlFor="image-upload"
            className="flex items-center text-sm text-[#006FFF] font-semibold cursor-pointer hover:text-[#005EDB]"
          >
            사진 첨부
          </label>

          <Button
            variant="customblue"
            className="text-sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "등록 중..." : "리뷰 등록하기"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
