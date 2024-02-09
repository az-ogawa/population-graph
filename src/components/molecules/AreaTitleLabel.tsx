import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AreaTitleLabel = (props: Props) => {
  const { children } = props;
  return <h2>{children}</h2>;
};
