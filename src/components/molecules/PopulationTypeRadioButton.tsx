import { ChangeEventHandler, FC, memo } from "react";

type RadioButtonProps = {
  value: string;
  disabled?: boolean;
  loading?: boolean;
  selectedValue: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
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
        value={value}
        disabled={disabled || loading}
        onChange={(e) => onChange(e)}
        checked={value === selectedValue}
      />
      {value}
    </label>
  );
});
