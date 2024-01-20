type DataItem = {
  year: number;
  value: number;
  rate?: number; // オプショナルなフィールド
};

export type Population = {
  label: string;
  data: DataItem[];
};

type PopulationResult = {
  boundaryYear: number;
  data: Population[];
};

export type PopulationData = {
  message: null;
  result: PopulationResult;
};
