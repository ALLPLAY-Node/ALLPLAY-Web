import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { GU_BY_REGION, type RegionName } from "@/components/spots/constants";

type GuSelectProps = {
  region?: RegionName;
  value?: string;
  onChange: (gu: string) => void;
  placeholder?: string;
};

export function GuSelect({
  region,
  value,
  onChange,
  placeholder = "구 선택하기"
}: GuSelectProps) {
  const guList = region ? GU_BY_REGION[region] : [];
  return (
    <Select value={value ?? ""} onValueChange={onChange} disabled={!region}>
      <SelectTrigger className="lg:w-[222px] min-w-[160px]">
        <SelectValue
          placeholder={region ? placeholder : "지역을 먼저 선택하세요"}
        />
      </SelectTrigger>
      <SelectContent className="z-100">
        {guList.map((gu) => (
          <SelectItem key={gu} value={gu}>
            {gu}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
