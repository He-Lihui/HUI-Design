import React,{ useState, useReducer} from "react";
import { FieldAction, FieldsState, FromState } from "../types/types";



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
        default:
            return state;
    }
}
 
function useStore () {
    const [form, setForm] = useState<FromState>({ isValid : true})
    const [fields, dispatch] = useReducer(fieldReducer,{})

    return{
        fields,
        form,
        dispatch
    }
}

export default useStore