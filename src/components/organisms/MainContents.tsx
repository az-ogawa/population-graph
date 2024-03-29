import { FC, memo, useEffect, useState } from "react";
import { SelectedPopulationData } from "../../types/populationData";
import { PrefectureData } from "../../types/prefecturesData";
import { getPrefectureNameByCode } from "../../utils/util";
import { PopulationGraph } from "./PopulationGraph";
import { PopulationTypeSelectArea } from "./PopulationTypeSelectArea";
import { PrefecturesSelectArea } from "./PrefecturesSelectArea";
import { LoadingIndicator } from "../molecules/LoadingIndicator";

export const MainContents: FC = memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckSelecting, setIsCheckSelecting] = useState<boolean>(false);
  const [prefectures, setPreFectures] = useState<PrefectureData | null>(null);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [selectedPopulationType, setSelectedPopulationType] =
    useState<string>("");
  const [selectedPopulationDatas, setSelectedPopulationDatas] = useState<
    SelectedPopulationData[]
  >([]);

  useEffect(() => {
    // 都道府県一覧を取得する
    const apiUrl = "/api/prefectures";

    setIsLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPreFectures(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prefectures data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleCheckbox = (prefCode: number) => {
    const isSelected = selectedPrefectures.includes(prefCode);
    setIsCheckSelecting(true);
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

      setIsCheckSelecting(false);
    } else {
      setSelectedPrefectures([...selectedPrefectures, prefCode]);

      // チェックをつけた都道府県のデータを取得
      const apiUrl = `/api/population?prefCode=${prefCode}`;

      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const prefName = prefectures
            ? getPrefectureNameByCode(prefectures, prefCode)
            : "";

          const populationData: SelectedPopulationData = {
            prefCode: prefCode,
            prefName: prefName,
            data: data,
          };
          setSelectedPopulationDatas([
            ...selectedPopulationDatas,
            populationData,
          ]);
          setIsCheckSelecting(false);
        } catch (error) {
          console.error("Error fetching population data:", error);
        }
      };

      fetchData();
    }
  };

  const handleCheckRadioButton = (selectedPopulationType: string) => {
    setSelectedPopulationType(selectedPopulationType);
  };

  return (
    <main>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <PrefecturesSelectArea
          prefectureData={prefectures}
          selectedPrefectures={selectedPrefectures}
          isCheckSelecting={isCheckSelecting}
          onChange={handleToggleCheckbox}
        />
      )}
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
