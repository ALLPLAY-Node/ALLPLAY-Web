import type { RegionOption } from "@/components/mypage/regionOptions";

export const normalizeCityName = (city: string) =>
  city
    .replace("\uD2B9\uBCC4\uC790\uCE58\uC2DC", "")
    .replace("\uD2B9\uBCC4\uC790\uCE58\uB3C4", "")
    .replace("\uD2B9\uBCC4\uC2DC", "")
    .replace("\uAD11\uC5ED\uC2DC", "")
    .replace("\uC790\uCE58\uC2DC", "")
    .replace("\uC790\uCE58\uB3C4", "")
    .replace("\uC2DC", "")
    .replace("\uB3C4", "")
    .trim();

export const findCityOption = (city: string, options: RegionOption[]) => {
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
