export interface ConfigSection {
  name: string;
  label:string;
  options: CheckboxOption[];
}
export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxState {
 [key: string]: { label: string; value: string; checked: boolean };
}

export interface DataItem {
  timestamp: string;
  repository: string;
  value: number;
}
