import { useMemo } from "react";
import SectionPanel, {
  type SectionPanelOption
} from "@/components/mypage/forms/SectionPanel";
import type { RegionOption } from "@/components/mypage/regionOptions";
import { findCityOption } from "@/components/mypage/regionUtils";

type ActivityRegionFormProps = {
  city: string;
  district: string;
  onChangeCity: (city: string) => void;
  onChangeDistrict: (district: string) => void;
  regionOptions: RegionOption[];
  disabled?: boolean;
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
