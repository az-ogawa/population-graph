import { FC, memo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DataItem, SelectedPopulationData } from "../../types/populationData";

type PopulationGraphProps = {
  populationDatas: SelectedPopulationData[];
  selectedPopulationType: String;
};

export const PopulationGraph: FC<PopulationGraphProps> = memo((props) => {
  const { populationDatas, selectedPopulationType } = props;
  const filteredData: DataItem[] = populationDatas
    .flatMap((data) => data.data.result.data)
    .filter((pop) => pop.label === selectedPopulationType)
    .flatMap((pop) => pop.data);

  return (
    <div className="container">
      <LineChart
        width={700}
        height={300}
        data={filteredData}
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
          dataKey="value"
          label={{
            value: "人口数",
            offset: -20,
            angle: -90,
            position: "insideLeft",
          }}
        />
        {populationDatas.map((populationData) => (
          <Line
            key={populationData.prefCode}
            type="monotone"
            dataKey="value"
            name={`${populationData.prefName}`}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        ))}
        <Legend />
        <Tooltip />
      </LineChart>
    </div>
  );
});
