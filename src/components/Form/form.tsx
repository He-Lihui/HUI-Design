import React, { ReactNode } from "react";
import { FormProps } from "./types/types";
import useStore from "./store/useStore";
 
export type IFormContext =Pick <ReturnType<typeof useStore>, 'dispatch'| 'fields' | 'validateField'> & Pick<FormProps,'initialValues'>
export const FormContext = React.createContext<IFormContext>({} as IFormContext )
export const Form: React.FC<FormProps> = (props) => { 
    const {
        name,
        children,
        initialValues,
        onFinifshFailed,
        onFinish
    } = props
    const {form, fields, dispatch, validateField, validateAllField}  = useStore()

    const passedContext: IFormContext = {
        dispatch,
        fields,
        initialValues,
        validateField
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const {isValid , errors ,values} = await validateAllField()
        if(isValid && onFinish){
            onFinish(values)
        } else if (!isValid && onFinifshFailed){
            onFinifshFailed(values, errors)
        }  
    }

    let renderChildren: ReactNode;

    if(typeof children === "function"){
        renderChildren = children(form);
    } else {
        renderChildren = children
    }
    return (
        <>
             <form name={name} className="form" onSubmit={submitForm}>
                <FormContext.Provider value={passedContext}>
                { renderChildren}
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