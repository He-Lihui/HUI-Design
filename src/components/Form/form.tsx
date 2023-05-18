import React, { ReactNode, forwardRef, useImperativeHandle} from "react";
import { FormProps } from "./types/types";
import useStore from "./store/useStore";
 
export type IFormContext =Pick <ReturnType<typeof useStore>, 'dispatch'| 'fields' | 'validateField'> & Pick<FormProps,'initialValues'>
export const FormContext = React.createContext<IFormContext>({} as IFormContext )
export type IFormRef = Omit<ReturnType<typeof useStore>,'dispatch'| 'fields' | 'validateField' | 'form'>
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => { 
    const {
        name,
        children,
        initialValues,
        onFinifshFailed,
        onFinish
    } = props
    const {form, fields, dispatch, ...resProps}  = useStore(initialValues)
    const {validateField, validateAllField } = resProps
    const passedContext: IFormContext = {
        dispatch,
        fields,
        initialValues,
        validateField
    }
    useImperativeHandle(ref, () => {
        return {
            ...resProps
        }
    })
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
        </>
       
    )
})
Form.defaultProps = {
    name: 'Form'
}

export default Form