interface ImageUploadSectionProps {
  imagePreviews: string[];
  imageFiles: File[];
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: (index: number) => void;
}

const ImageUploadSection = ({
  imagePreviews,
  imageFiles,
  onImageSelect,
  onImageRemove
}: ImageUploadSectionProps) => {
  return (
    <section className="rounded-lg bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">동호회 사진</h2>
      <p className="mb-3 text-xs text-gray-500">
        동호회를 대표할 사진을 등록해주세요 (최대 5장)
      </p>

      {/* 이미지 그리드 (미리보기 + 업로드 버튼) */}
      <div className="grid grid-cols-5 gap-4">
        {/* 업로드된 이미지들 */}
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img
              src={preview}
              alt={`업로드 이미지 ${index + 1}`}
              className="h-32 w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}

        {/* 업로드 버튼 (이미지가 5개 미만일 때만 표시) */}
        {imageFiles.length < 5 && (
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageSelect}
              className="hidden"
              disabled={imageFiles.length >= 5}
            />
            <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xl text-gray-400">
              +
            </div>
            <p className="text-xs text-gray-500">({imageFiles.length}/5)</p>
          </label>
        )}
      </div>
    </section>
  );
};

export default ImageUploadSection;
