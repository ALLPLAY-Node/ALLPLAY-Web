import type { AgeGroup, SkillLevel } from "@/types/clubs";

// 종목 정보
export interface Sport {
  id: number;
  name: string;
}

export const sports: Sport[] = [
  { id: 1, name: "농구" },
  { id: 2, name: "야구" },
  { id: 3, name: "축구" },
  { id: 4, name: "테니스" },
  { id: 5, name: "탁구" },
  { id: 6, name: "배드민턴" }
];

// 실력수준 정보
export const skillLevels: string[] = ["초급", "중급", "고급"];

// 연령대 옵션
export const ageGroups: string[] = [
  "10대",
  "20대",
  "30대",
  "40대",
  "50대",
  "60대",
  "70대",
  "80대",
  "90대"
];

// 연령대 매핑 (UI 표시명 <-> API enum)
const uiToApiAgeMap: Record<string, AgeGroup> = {
  "10대": "TEENS",
  "20대": "TWENTIES",
  "30대": "THIRTIES",
  "40대": "FORTIES",
  "50대": "FIFTIES",
  "60대": "OVER_SIXTIES",
  "70대": "OVER_SIXTIES",
  "80대": "OVER_SIXTIES",
  "90대": "OVER_SIXTIES"
};

const apiToUIAgeMap: Record<AgeGroup, string> = {
  TEENS: "10대",
  TWENTIES: "20대",
  THIRTIES: "30대",
  FORTIES: "40대",
  FIFTIES: "50대",
  OVER_SIXTIES: "60대"
};

// 실력수준 매핑 (UI 표시명 <-> API enum)
const uiToApiSkillMap: Record<string, SkillLevel> = {
  초급: "BEGINNER",
  중급: "INTERMEDIATE",
  고급: "ADVANCED"
};

const apiToUISkillMap: Record<SkillLevel, string> = {
  BEGINNER: "초급",
  INTERMEDIATE: "중급",
  ADVANCED: "고급"
};

// 종목명 매핑 (종목명 <-> ID)
const sportNameToIdMap: Record<string, number> = {
  농구: 1,
  야구: 2,
  축구: 3,
  테니스: 4,
  탁구: 5,
  배드민턴: 6
};

const sportIdToNameMap: Record<number, string> = {
  1: "농구",
  2: "야구",
  3: "축구",
  4: "테니스",
  5: "탁구",
  6: "배드민턴"
};

/**
 * UI 표시명을 API 연령대 enum으로 변환
 * @param uiAge UI에서 사용하는 연령대 (예: "20대")
 * @returns API enum (예: "TWENTIES")
 */
export const convertUIToAPIAge = (
  uiAge: string | undefined
): AgeGroup | null => {
  if (!uiAge) return null;
  return uiToApiAgeMap[uiAge] || null;
};

/**
 * API 연령대 enum을 UI 표시명으로 변환
 * @param apiAge API에서 받은 연령대 enum (예: "TWENTIES")
 * @returns UI 표시명 (예: "20대")
 */
export const convertAPIToUIAge = (
  apiAge: AgeGroup | undefined
): string | undefined => {
  if (!apiAge) return undefined;
  return apiToUIAgeMap[apiAge];
};

/**
 * UI 표시명을 API 실력수준 enum으로 변환
 * @param uiSkill UI에서 사용하는 실력수준 (예: "중급")
 * @returns API enum (예: "INTERMEDIATE")
 */
export const convertUIToAPISkill = (
  uiSkill: string | undefined
): SkillLevel | null => {
  if (!uiSkill) return null;
  return uiToApiSkillMap[uiSkill] || null;
};

/**
 * API 실력수준 enum을 UI 표시명으로 변환
 * @param apiSkill API에서 받은 실력수준 enum (예: "INTERMEDIATE")
 * @returns UI 표시명 (예: "중급")
 */
export const convertAPIToUISkill = (
  apiSkill: SkillLevel | undefined
): string | undefined => {
  if (!apiSkill) return undefined;
  return apiToUISkillMap[apiSkill];
};

/**
 * 종목명을 종목 ID로 변환
 * @param sportName 종목명 (예: "테니스")
 * @returns 종목 ID (예: 4)
 */
export const convertSportNameToId = (
  sportName: string | undefined
): number | undefined => {
  if (!sportName) return undefined;
  return sportNameToIdMap[sportName];
};

/**
 * 종목 ID를 종목명으로 변환
 * @param sportId 종목 ID (예: 4)
 * @returns 종목명 (예: "테니스")
 */
export const convertSportIdToName = (
  sportId: number | undefined
): string | null => {
  if (!sportId) return null;
  return sportIdToNameMap[sportId] || null;
};

/**
 * 종목 ID로 종목 정보 가져오기
 * @param sportId 종목 ID
 * @returns 종목 정보 또는 null
 */
export const getSportById = (sportId: number | undefined): Sport | null => {
  if (!sportId) return null;
  return sports.find((s) => s.id === sportId) || null;
};
