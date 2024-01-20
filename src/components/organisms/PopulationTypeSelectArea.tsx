import { FC, memo } from "react";
import { AreaTitleLabel } from "../molecules/AreaTitleLabel";
import { PopulationTypeRadioButton } from "../molecules/PopulationTypeRadioButton";

type PrefectureProps = {
  populationTypes: string[];
  selectedPopulationType: string;
  onChange: (selectedPopulationType: string) => void;
};

export const PopulationTypeSelectArea: FC<PrefectureProps> = memo((props) => {
  const { populationTypes, selectedPopulationType, onChange } = props;
  return (
    <>
      <AreaTitleLabel>人口種別</AreaTitleLabel>
      {populationTypes.map((populationType, index) => (
        <PopulationTypeRadioButton
          key={index}
          value={populationType}
          onChange={onChange}
          selectedValue={selectedPopulationType}
        />
      ))}
    </>
  );
});
