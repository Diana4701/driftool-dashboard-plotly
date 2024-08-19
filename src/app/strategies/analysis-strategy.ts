import { DataItem} from "../models/toggles-models";

export interface AnalysisStrategy {
  data: DataItem[];
  operation: string;
  timePeriod: string;
  execute(data: DataItem[], timePeriod: string): number;
  plot(data: DataItem[], timePeriod: string): void;
}


// time-period-strategy.ts
export interface TimePeriodStrategy {
  execute(data: DataItem[], timePeriod: string): DataItem[];
}
