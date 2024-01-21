import { PrefectureData } from "../types/prefecturesData";

export const getPrefectureNameByCode = (
  prefectures: PrefectureData,
  prefCode: number
) => {
  const prefName = prefectures.result.find(
    (pref) => pref.prefCode === prefCode
  )?.prefName;
  return prefName !== undefined ? prefName : "";
};
