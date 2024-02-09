import { FC, memo } from "react";
import { PrefectureData } from "../../types/prefecturesData";
import { AreaTitleLabel } from "../atoms/AreaTitleLabel";
import { PrefecturesCheckBox } from "../molecules/PrefecturesCheckbox";

type PrefectureProps = {
  prefectureData: PrefectureData | null;
  selectedPrefectures: number[];
  onChange: (prefCode: number) => void;
};

export const PrefecturesSelectArea: FC<PrefectureProps> = memo((props) => {
  const { prefectureData, selectedPrefectures, onChange } = props;
  return (
    <>
      <AreaTitleLabel title="都道府県" />
      <div className="custom-checkbox-container">
        {prefectureData &&
          prefectureData.result &&
          prefectureData.result.map((prefecture) => (
            <PrefecturesCheckBox
              key={prefecture.prefCode}
              prefCode={prefecture.prefCode}
              value={prefecture.prefName}
              onChange={onChange}
              checked={selectedPrefectures.includes(prefecture.prefCode)}
            />
          ))}
      </div>
    </>
  );
});
