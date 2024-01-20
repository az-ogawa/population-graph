import { FC, memo } from "react";

type CheckBoxProps = {
  prefCode: number;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  checked: boolean;
  onChange: (prefCode: number) => void;
};

export const PrefecturesCheckBox: FC<CheckBoxProps> = memo((props) => {
  const {
    prefCode,
    value,
    disabled = false,
    loading = false,
    checked = false,
    onChange,
  } = props;
  return (
    <label>
      <input
        type="checkbox"
        disabled={disabled || loading}
        onChange={() => onChange(prefCode)}
        value={value}
        checked={checked}
      />
      {value}
    </label>
  );
});
