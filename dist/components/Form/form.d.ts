import React from "react";
import { FormProps } from "./types/types";
import useStore from "./store/useStore";
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export declare const FormContext: React.Context<IFormContext>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField' | 'form'>;
export declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;
