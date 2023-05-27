import React from "react";
import { FieldAction, FieldsState, FromState } from "../types/types";
import { ValidateError } from "async-validator";
declare function useStore(initialValues?: Record<string, any>): {
    fields: FieldsState;
    form: FromState;
    dispatch: React.Dispatch<FieldAction>;
    validateField: (name: string) => Promise<void>;
    getFieldValue: (key: string) => string;
    validateAllField: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: string;
        };
    }>;
    getAllFieldValue: () => {
        [x: string]: string;
    };
    setFieldValue: (name: string, value: any) => void;
    resetField: () => void;
};
export default useStore;
