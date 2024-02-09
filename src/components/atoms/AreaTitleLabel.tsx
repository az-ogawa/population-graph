type Props = {
  readonly title: string;
};

export const AreaTitleLabel = (props: Props) => {
  return <h2>{props.title}</h2>;
};
