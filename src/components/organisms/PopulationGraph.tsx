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
import { Population } from "../../types/populationData";

type PopulationGraphProps = {
  populationData: Population;
};

export const PopulationGraph: FC<PopulationGraphProps> = memo((props) => {
  const { populationData } = props;

  return (
    <div className="container">
      <LineChart
        width={700}
        height={300}
        data={populationData.data}
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
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Legend />
        <Tooltip />
      </LineChart>
    </div>
  );
});
