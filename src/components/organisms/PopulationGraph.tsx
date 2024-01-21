import { FC, memo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SelectedPopulationData } from "../../types/populationData";
import {
  extractGraphData,
  mergeGraphData,
} from "../../utils/populationGraphUtils";

type PopulationGraphProps = {
  populationDatas: SelectedPopulationData[];
  selectedPopulationType: string;
};

export const PopulationGraph: FC<PopulationGraphProps> = memo((props) => {
  const { populationDatas, selectedPopulationType } = props;
  // 選択された人口種別に対応するデータを抽出
  const selectedData = extractGraphData(
    populationDatas,
    selectedPopulationType
  );

  // グラフ表示用データをマージして作成
  const mergedChartData = mergeGraphData(selectedData);

  return (
    <ResponsiveContainer width="100%" height={300} className="graph-container">
      <LineChart
        data={mergedChartData}
        margin={{
          top: 30,
          right: 30,
          left: 50,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          label={{ value: "年度", offset: -5, position: "insideBottomRight" }}
        />
        <YAxis
          label={{
            value: "人口数",
            offset: -20,
            angle: -90,
            position: "insideLeft",
          }}
        />
        {selectedData.map((data) => (
          <Line
            key={data.prefCode}
            type="monotone"
            dataKey={data.prefName}
            name={data.prefName}
            stroke={data.color}
          />
        ))}
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
});
