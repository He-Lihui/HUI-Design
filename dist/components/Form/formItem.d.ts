import React from "react";
import { FormItemProps } from "./types/types";
export type RequiredProps<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
declare const FormItem: React.FC<FormItemProps>;
export default FormItem;
