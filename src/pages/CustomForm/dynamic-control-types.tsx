import { RegisterOptions } from "react-hook-form";

export type ControlType = "text" | "select" | "number" | "checkbox" | 'multicheckbox' | 'textarea' | "radiogroup" | 'file' | 'date';

export interface SelectOption {
  label: string;
  value: string;
}

export interface DynamicFieldData {
  label: string;
  id: any;
  inputType: string;
  fieldName: string;
  defaultValue: any;
  placeholder?: any,
  options?: SelectOption[];
  config?: RegisterOptions;
  show?:any
  checkFormType?:string
}
