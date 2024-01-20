import { FC, memo } from "react";
import { Header } from "../organisms/Header";
import { MainContents } from "../organisms/MainContents";

export const PopulationTemplate: FC = memo(() => {
  return (
    <>
      <Header />
      <MainContents />
    </>
  );
});
