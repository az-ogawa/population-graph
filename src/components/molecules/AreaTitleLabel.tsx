import { FC, ReactNode, memo } from "react";

type Props = {
  children: ReactNode;
};

export const AreaTitleLabel: FC<Props> = memo((props) => {
  const { children } = props;
  return <h2>{children}</h2>;
});
