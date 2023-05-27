import { ReactNode } from "react";
import { RuleItem, ValidateError } from "async-validator";
export type CustomRuleFunc = ({ getFieldValue }: any) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc;
export type renderProps = (form: FromState) => ReactNode;
export interface FormProps {
    name?: string;
    children?: ReactNode | renderProps;
    initialValues?: Record<string, any>;
    onFinish?: (values: Record<string, any>) => void;
    onFinifshFailed?: (value: Record<string, any>, error: Record<string, ValidateError[]>) => void;
}
export interface FormItemProps {
    label?: string;
    children?: ReactNode;
    name: string;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (event: any) => any;
    rules?: CustomRule[];
    validTrigger?: string;
}
export interface FieldDetail {
    name: string;
    value: string;
    rules: Array<CustomRule>;
    isValid: boolean;
    errors: Array<ValidateError>;
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface FromState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}
export interface FieldAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}
export interface FieldContext {
    action: FieldAction;
}
export interface ValidtaeErrorType extends Error {
    errors: Array<ValidateError>;
    fields: Record<string, ValidateError[]>;
}
