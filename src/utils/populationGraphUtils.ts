import { SelectedPopulationData, DataItem } from "../types/populationData";

export const extractGraphData = (
  data: SelectedPopulationData[],
  selectedPopulationType: string
) => {
  return data.map((population, index) => ({
    prefCode: population.prefCode,
    prefName: population.prefName,
    data:
      population.data.result.data.find(
        (pop) => pop.label === selectedPopulationType
      )?.data || [],
    color: getRandomColor(index),
  }));
};

export const getRandomColor = (index: number): string => {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#800080",
    "#008080",
    "#C0C0C0",
    "#808080",
    "#000000",
    "#F08080",
    "#FA8072",
    "#FFA07A",
    "#FF4500",
    "#FF6347",
    "#FFD700",
    "#FF8C00",
    "#FFA500",
    "#FFDAB9",
    "#FFE4B5",
    "#EEE8AA",
    "#8B4513",
    "#A52A2A",
    "#2E8B57",
    "#3CB371",
    "#228B22",
    "#20B2AA",
    "#00CED1",
    "#4169E1",
    "#4682B4",
    "#00BFFF",
    "#1E90FF",
    "#9370DB",
    "#8A2BE2",
    "#6A5ACD",
    "#7B68EE",
    "#9370DB",
    "#9932CC",
    "#8B008B",
    "#800080",
    "#4B0082",
    "#9400D3",
  ];
  return colors[index % colors.length];
};

export const mergeGraphData = (
  selectedData: {
    prefCode: number;
    prefName: string;
    data: DataItem[];
    color: string;
  }[]
) => {
  return selectedData
    .flatMap((data) =>
      data.data.map((item) => ({
        year: item.year,
        [data.prefName]: item.value,
        prefName: data.prefName,
      }))
    )
    .reduce((acc, item) => {
      const existingItem = acc.find((i) => i.year === item.year);

      if (existingItem) {
        existingItem[item.prefName] = +item[item.prefName];
      } else {
        acc.push({ year: item.year, [item.prefName]: +item[item.prefName] });
      }

      return acc;
    }, [] as { year: number; [key: string]: number }[]);
};
