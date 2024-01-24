import Head from "next/head";
import React from "react";
import { PopulationTemplate } from "../src/components/templates/PopulationTemplate";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>都道府県別人口推移グラフ</title>
      </Head>
      <PopulationTemplate />
    </>
  );
};

export default HomePage;
