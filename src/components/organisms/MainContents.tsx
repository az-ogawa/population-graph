import { FC, memo, useEffect, useState } from "react";
import { PrefecturesSelectArea } from "./PrefecturesSelectArea";
import { PopulationGraph } from "./PopulationGraph";
import { PrefectureData } from "../../types/prefecturesData";
import { SelectedPopulationData } from "../../types/populationData";
import { PopulationTypeSelectArea } from "./PopulationTypeSelectArea";
import axios from "axios";
import { getPrefectureNameByCode } from "../../utils/util";

export const MainContents: FC = memo(() => {
  const [prefectures, setPreFectures] = useState<PrefectureData | null>(null);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [selectedPopulationType, setSelectedPopulationType] =
    useState<string>("");
  const [selectedPopulationDatas, setSelectedPopulationDatas] = useState<
    SelectedPopulationData[]
  >([]);

  useEffect(() => {
    // 都道府県一覧を取得する
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": process.env.REACT_APP_API_KEY },
      })
      .then((results) => {
        setPreFectures(results.data);
      })
      .catch((error) => {
        console.log("都道府県取得エラー:", error);

        window.alert("都道府県情報の取得に失敗しました。");
      });
  }, []);

  const handleToggleCheckbox = (prefCode: number) => {
    const isSelected = selectedPrefectures.includes(prefCode);
    if (isSelected) {
      setSelectedPrefectures(
        selectedPrefectures.filter((code) => code !== prefCode)
      );

      // 取得データからチェックを解除したデータを除外
      setSelectedPopulationDatas(
        selectedPopulationDatas.filter(
          (selectedPopulationData) =>
            selectedPopulationData.prefCode !== prefCode
        )
      );
    } else {
      setSelectedPrefectures([...selectedPrefectures, prefCode]);

      // チェックをつけた都道府県のデータを取得
      axios
        .get(
          `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${String(
            prefCode
          )}`,
          {
            headers: { "X-API-KEY": process.env.REACT_APP_API_KEY },
          }
        )
        .then((results) => {
          const prefName = prefectures
            ? getPrefectureNameByCode(prefectures, prefCode)
            : "";

          const populationData: SelectedPopulationData = {
            prefCode: prefCode,
            prefName: prefName,
            data: results.data,
          };
          setSelectedPopulationDatas([
            ...selectedPopulationDatas,
            populationData,
          ]);
        })
        .catch((error) => {
          console.log("人口取得エラー:", error);

          window.alert("人口情報の取得に失敗しました。");
        });
    }
  };

  const handleCheckRadioButton = (selectedPopulationType: string) => {
    setSelectedPopulationType(selectedPopulationType);
  };

  return (
    <main>
      <PrefecturesSelectArea
        prefectureData={prefectures}
        selectedPrefectures={selectedPrefectures}
        onChange={handleToggleCheckbox}
      />
      {selectedPopulationDatas.length !== 0 && (
        <>
          <PopulationTypeSelectArea
            populationTypes={selectedPopulationDatas[0].data.result.data.map(
              (category) => category.label
            )}
            selectedPopulationType={selectedPopulationType}
            onChange={handleCheckRadioButton}
          />
          <PopulationGraph
            populationDatas={selectedPopulationDatas}
            selectedPopulationType={selectedPopulationType}
          />
        </>
      )}
    </main>
  );
});
