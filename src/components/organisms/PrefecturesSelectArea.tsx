import { FC, memo } from "react";
import { PrefecturesCheckBox } from "../molecules/PrefecturesCheckbox";
import { AreaTitleLabel } from "../molecules/AreaTitleLabel";
import { PrefectureData } from "../../types/prefecturesData";

type PrefectureProps = {
  prefectureData: PrefectureData;
  selectedPrefectures: number[];
  onChange: (prefCode: number) => void;
};

export const PrefecturesSelectArea: FC<PrefectureProps> = memo((props) => {
  const { prefectureData, selectedPrefectures, onChange } = props;
  return (
    <>
      <AreaTitleLabel>都道府県</AreaTitleLabel>
      {prefectureData.result.map((prefectureData) => (
        <PrefecturesCheckBox
          key={prefectureData.prefCode}
          prefCode={prefectureData.prefCode}
          value={prefectureData.prefName}
          onChange={onChange}
          checked={selectedPrefectures.includes(prefectureData.prefCode)}
        />
      ))}
    </>
  );
});
