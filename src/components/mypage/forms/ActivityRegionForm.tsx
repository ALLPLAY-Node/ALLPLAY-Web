import { useMemo } from "react";
import SectionPanel, {
  type SectionPanelOption
} from "@/components/mypage/forms/SectionPanel";
import type { RegionOption } from "@/components/mypage/regionOptions";

type ActivityRegionFormProps = {
  city: string;
  district: string;
  onChangeCity: (city: string) => void;
  onChangeDistrict: (district: string) => void;
  regionOptions: RegionOption[];
  disabled?: boolean;
};

const normalizeCityName = (city: string) =>
  city
    .replace("특별자치시", "")
    .replace("특별자치도", "")
    .replace("특별시", "")
    .replace("광역시", "")
    .replace("자치시", "")
    .replace("자치도", "")
    .replace("시", "")
    .replace("도", "")
    .trim();

const findCityOption = (city: string, options: RegionOption[]) => {
  if (!city) {
    return null;
  }

  const byExact = options.find((option) => option.city === city);
  if (byExact) {
    return byExact;
  }

  const normalizedTarget = normalizeCityName(city);
  return (
    options.find(
      (option) => normalizeCityName(option.city) === normalizedTarget
    ) ?? null
  );
};

const ActivityRegionForm = ({
  city,
  district,
  onChangeCity,
  onChangeDistrict,
  regionOptions,
  disabled = false
}: ActivityRegionFormProps) => {
  const selectedCityOption = useMemo(
    () => findCityOption(city, regionOptions),
    [city, regionOptions]
  );

  const cityOptions = useMemo<SectionPanelOption[]>(
    () =>
      regionOptions.map((option) => ({
        label: option.city,
        value: option.city
      })),
    [regionOptions]
  );

  const districtOptions = useMemo<SectionPanelOption[]>(
    () =>
      (selectedCityOption?.districts ?? []).map((option) => ({
        label: option.name,
        value: option.name
      })),
    [selectedCityOption]
  );

  const selectedCityValue = selectedCityOption?.city ?? "";
  const selectedDistrictValue = districtOptions.some(
    (option) => option.value === district
  )
    ? district
    : "";

  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-normal text-black">활동지역</div>
      <SectionPanel
        value={selectedCityValue}
        options={cityOptions}
        placeholder="시/도 선택"
        onChange={(nextCity) => {
          onChangeCity(nextCity);
          onChangeDistrict("");
        }}
        disabled={disabled}
      />
      <SectionPanel
        value={selectedDistrictValue}
        options={districtOptions}
        placeholder="구 선택"
        onChange={onChangeDistrict}
        disabled={disabled || !selectedCityOption}
      />
    </div>
  );
};

export default ActivityRegionForm;
