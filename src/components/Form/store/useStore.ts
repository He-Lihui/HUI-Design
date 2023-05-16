import React,{ useState, useReducer} from "react";
import { CustomRule, FieldAction, FieldsState, FromState } from "../types/types";
import Schema, { ValidateError } from "async-validator";



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
 
function useStore () {
    const [form, setForm] = useState<FromState>({ isValid : true})
    const [fields, dispatch] = useReducer(fieldReducer,{})

    const getFieldValue = (key: string) => {
        return fields[key] && fields[key].value
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
    return{
        fields,
        form,
        dispatch,
        validateField
    }
}

export default useStore