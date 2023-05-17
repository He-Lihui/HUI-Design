import React,{ useState, useReducer} from "react";
import { CustomRule, FieldAction, FieldsState, FromState, ValidtaeErrorType } from "../types/types";
import Schema, { ValidateError } from "async-validator";
import { mapValues, each } from "lodash-es";


function fieldReducer (state: FieldsState, action: FieldAction): FieldsState  {
    switch (action.type) {
        case 'addField':
            return {
                ...state,
                [action.name]: {...action.value}
            }
        case 'updateValue':
            return {
                ...state,
                [action.name] : {...state[action.name], value : action.value }
            }
        case 'updateValidateResult':
            const { errors, isValid } = action.value
            return {
                ...state,
                [action.name] : {...state[action.name], errors, isValid}
            }
        default:
            return state;
    }
}
 
function useStore (initialValues?: Record<string, any>) {
    const [form, setForm] = useState<FromState>({ isValid : true, isSubmiting: false, errors: {}})
    const [fields, dispatch] = useReducer(fieldReducer,{})

    const getFieldValue = (key: string) => {
        return fields[key] && fields[key].value
    }
    const getAllFieldValue = () => {
        return mapValues(fields, item => item.value)
    }
    const setFieldValue = (name: string, value: any ) => {
        if(fields[name]){
            dispatch({ type :'updateValue', name, value})
        }
    }
    const resetField = () => {
        if(initialValues){
            each(initialValues, (name, value) => {
                if(fields[name]){
                    dispatch({ type:'updateValue', name, value})
                }
            })
        }
    }
    const transfromRules = (rules : CustomRule[]) => {
        return rules.map( (rule) => {
            if( typeof rule === "function"){
                const transRule = rule({getFieldValue})
                return transRule
            } else {
                return rule
            }
        })
    }
    const validateField = async (name: string) => {
        const { value , rules} = fields[name]

        const newRules = transfromRules(rules)
        const desriptor = {
            [name] : newRules
        }
        const valueMap = {
            [name] : value
        }

        const validator = new Schema(desriptor);
        let isValid = true;
        let errors: ValidateError[] = [];
        try {
            await validator.validate(valueMap)
        } catch (e) {
            isValid = false 
            const err = e as any
            console.log(err.errors)
            console.log(err.fields)
            errors = err.errors
        } finally {
            console.log('errors', isValid)
            dispatch({type:"updateValidateResult", name , value:{isValid, errors}})
        }
    }
    
    const validateAllField = async () => {
        let isValid = true;
        let errors: Record<string, ValidateError[]> = {};

        const valueMap = mapValues(fields, item => item.value)
        const desriptor = mapValues(fields, item => transfromRules(item.rules))
        const validator = new Schema(desriptor)
         
        setForm({...form,isSubmiting: true})

        try {
            await validator.validate(valueMap)
        } catch (error) {
            isValid = false;
            const err = error as ValidtaeErrorType
            errors = err.fields 
            each(fields, (value, name) => {

                if(errors[name]){
                    const itmeErrors = errors[name]
                    dispatch({ type:"updateValidateResult", name, value: { isValid: false, errors: itmeErrors}})
                } else if (value.rules.length > 0 && !errors[name]){
                    dispatch({ type:"updateValidateResult", name, value: { isValid: true, errors:[]}})

                }
            })
        } 
        finally {
            setForm({...form, isSubmiting: false, isValid, errors})
            return {
                isValid,
                errors,
                values: valueMap
              }
        }
    }
    return{
        fields,
        form,
        dispatch,
        validateField,
        getFieldValue,
        validateAllField
    }
}

export default useStore