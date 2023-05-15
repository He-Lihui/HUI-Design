import { ReactNode } from "react";
import Schema,{ RuleItem, ValidateError} from "async-validator";
export interface FormProps {
    name?: string;
    children?: ReactNode;
    initialValues?: Record< string, any>
}

export interface FormItemProps {
    label?: string;
    children?: ReactNode;
    name: string;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (event: any) => any;
    rules?: RuleItem[];
    validTrigger?: string
}

export interface FieldDetail {
    name: string;
    value: string; 
    rules: Array<RuleItem>;
    isValid: boolean;   // valid  [ˈvælɪd] adj. （文件或票证）有效的；正当的，合理的
    errors: Array<ValidateError >;
}

export interface FieldsState {
    [key: string]: FieldDetail
}

export interface FromState {
    isValid: boolean
}

export interface FieldAction {
    type:'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any
}
export interface FieldContext {
    action: FieldAction
}