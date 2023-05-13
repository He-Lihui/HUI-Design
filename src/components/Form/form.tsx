import React from "react";
import { FormProps } from "./types/types";
import useStore from "./store/useStore";
 
export type IFormContext =Pick <ReturnType<typeof useStore>, 'dispatch'| 'fields'>
export const FormContext = React.createContext<IFormContext>({} as IFormContext )
export const Form: React.FC<FormProps> = (props) => { 
    const {
        name,
        children
    } = props
    const {form, fields, dispatch}  = useStore()

    const passedContext: IFormContext = {
        dispatch,
        fields
    }
    return (
        <>
             <form name={name} className="form">
                <FormContext.Provider value={passedContext}>
                { children}
                </FormContext.Provider>
             </form>
             <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(fields)}</pre>
             <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(form)}</pre>
        </>
       
    )
}
Form.defaultProps = {
    name: 'Form'
}

export default Form