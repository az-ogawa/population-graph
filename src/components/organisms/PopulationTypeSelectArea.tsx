import { ChangeEventHandler, FC, memo } from "react";
import { AreaTitleLabel } from "../atoms/AreaTitleLabel";
import { PopulationTypeRadioButton } from "../molecules/PopulationTypeRadioButton";

type PrefectureProps = {
  populationTypes: string[];
  selectedPopulationType: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const PopulationTypeSelectArea: FC<PrefectureProps> = memo((props) => {
  const { populationTypes, selectedPopulationType, onChange } = props;
  return (
    <>
      <AreaTitleLabel title="人口種別" />
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
