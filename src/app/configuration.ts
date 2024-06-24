export interface Configuration {
  features: {
    smoothing: { options: Option[] },
    systematical_analysis: { options: Option[] },
    comparison: { options: Option[] },
    time: { options: Option[] }
  };
}
interface Option {
  name: string;
  enabled: boolean;
}
