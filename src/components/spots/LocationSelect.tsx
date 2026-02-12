import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { REGION_GROUPS } from "./constants";
import type { RegionLabel } from "@/components/spots/constants";

type LocationSelectProps = {
  value?: RegionLabel;
  onChange: (code: RegionLabel) => void;
};

export function LocationSelect({ value, onChange }: LocationSelectProps) {
  return (
    <Select
      value={value ?? ""}
      onValueChange={(v) => onChange(v as RegionLabel)}
    >
      <SelectTrigger className="lg:w-[222px] min-w-[160px]">
        <SelectValue placeholder="지역 선택" />
      </SelectTrigger>

      <SelectContent className="z-[100]">
        {REGION_GROUPS.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel className="text-muted-foreground font-semibold">
              {group.label}
            </SelectLabel>

            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
