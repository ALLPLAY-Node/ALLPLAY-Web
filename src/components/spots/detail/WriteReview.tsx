import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import { getUser } from "@/api/user";
import UserAvatar from "@/components/common/UserAvatar";
import Basic from "@/assets/basic.png";
// import { getPresignedUrl } from "@/api/image";
// import { uploadToS3 } from "@/services/uploadToS3";

const WriteReview = () => {
  const [user, setUser] = useState<User | null>(null);
  const [, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setUser(res.success);
      } catch (e) {
        setError("유저 정보를 불러오지 못했어요.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const [images, setImages] = useState<File[]>([]);

  const previewUrls = images.map((file) => URL.createObjectURL(file));

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images, previewUrls]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (images.length + files.length > 2) {
      alert("사진은 최대 2장까지 업로드 가능합니다.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  // const handleSubmit = async () => {
  //   try {
  //     setIsLoading(true);

  //     const imageUrls = await uploadImages(images);

  //     await createReview({
  //       content,
  //       images: imageUrls
  //     });
  //   } catch (err) {
  //     alert("업로드 실패");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        />
        {images.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((file, index) => (
              <div key={index} className="relative w-20 h-20 flex-shrink-0">
                <img
                  src={previewUrls[index]}
                  className="w-full h-full object-cover rounded-md"
                />
                {/* 삭제 */}
                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs"
                >
                  ✕
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
          <Button variant="customblue" className="text-sm">
            리뷰 등록하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
