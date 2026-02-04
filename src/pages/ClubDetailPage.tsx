import { useParams } from "react-router";

const ClubDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="w-full pt-4 pb-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">동호회 상세 페이지</h1>
        <p className="mt-4 text-gray-600">동호회 ID: {id}</p>
        <p className="mt-2 text-sm text-gray-500">
          이 페이지는 추후 구현될 예정입니다.
        </p>
      </div>
    </main>
  );
};

export default ClubDetailPage;
