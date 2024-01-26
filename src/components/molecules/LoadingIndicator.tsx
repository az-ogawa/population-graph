import { FC, memo } from "react";

export const LoadingIndicator: FC = memo(() => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
});
