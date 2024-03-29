import { FC, memo } from "react";
import { PrefecturesCheckBox } from "../molecules/PrefecturesCheckbox";
import { AreaTitleLabel } from "../molecules/AreaTitleLabel";
import { PrefectureData } from "../../types/prefecturesData";

type PrefectureProps = {
  prefectureData: PrefectureData | null;
  selectedPrefectures: number[];
  isCheckSelecting: boolean;
  onChange: (prefCode: number) => void;
};

export const PrefecturesSelectArea: FC<PrefectureProps> = memo((props) => {
  const { prefectureData, selectedPrefectures, isCheckSelecting, onChange } =
    props;
  return (
    <>
      <AreaTitleLabel>都道府県</AreaTitleLabel>
      <div className="custom-checkbox-container">
        {prefectureData &&
          prefectureData.result &&
          prefectureData.result.map((prefecture) => (
            <PrefecturesCheckBox
              key={prefecture.prefCode}
              prefCode={prefecture.prefCode}
              value={prefecture.prefName}
              disabled={isCheckSelecting}
              onChange={onChange}
              checked={selectedPrefectures.includes(prefecture.prefCode)}
            />
          ))}
      </div>
    </>
  );
});
