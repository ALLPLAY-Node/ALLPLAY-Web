import basketball from "@/assets/clubsPage/basketball.png";
import baseball from "@/assets/clubsPage/baseball.png";
import soccer from "@/assets/clubsPage/soccer.png";
import tennis from "@/assets/clubsPage/tennis.png";
import pingpong from "@/assets/clubsPage/pingpong.png";
import badminton from "@/assets/clubsPage/badminton.png";
import { sports } from "@/utils/clubs";

const sportImages: Record<number, string> = {
  1: basketball,
  2: baseball,
  3: soccer,
  4: tennis,
  5: pingpong,
  6: badminton
};

const sportsCategories = sports.map((sport) => ({
  ...sport,
  image: sportImages[sport.id]
}));

interface SportsCategorySelectorProps {
  selectedSport: number | null;
  onSelect: (sportId: number | null) => void;
}

const SportsCategorySelector = ({
  selectedSport,
  onSelect
}: SportsCategorySelectorProps) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-[20px] font-bold leading-[100%] tracking-normal text-gray-700">
        종목별로 찾기
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 pt-2">
        {sportsCategories.map((category) => {
          const isSelected = selectedSport === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                const newSportId = isSelected ? null : category.id;
                onSelect(newSportId);
              }}
              className={`group flex w-[140px] flex-col items-center gap-3 rounded-[20px] border px-4 pb-4 pt-3 shadow-[0_0_4px_rgba(0,0,0,0.08)] transition-all duration-200 ${
                isSelected
                  ? "border-[#3f6fff] bg-[#f3f6ff]"
                  : "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50 hover:shadow-[0_0_8px_rgba(0,0,0,0.15)] hover:-translate-y-1"
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-[90px] w-[90px] rounded-full object-cover"
              />
              <span
                className={`text-base font-medium transition-colors duration-200 ${
                  isSelected ? "text-[#3f6fff]" : "text-gray-800"
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SportsCategorySelector;
