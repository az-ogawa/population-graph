import { FC, memo } from "react";

type RadioButtonProps = {
  value: string;
  disabled?: boolean;
  loading?: boolean;
  selectedValue: string;
  onChange: (selectedPopulationType: string) => void;
};

export const PopulationTypeRadioButton: FC<RadioButtonProps> = memo((props) => {
  const {
    value,
    disabled = false,
    loading = false,
    selectedValue = "",
    onChange,
  } = props;
  return (
    <label>
      <input
        type="radio"
        name="radioGroup"
        disabled={disabled || loading}
        onChange={() => onChange(value)}
        checked={value === selectedValue}
      />
      {value}
    </label>
  );
});
