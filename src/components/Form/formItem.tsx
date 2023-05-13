import React, { FormEvent, ReactElement, useContext, useEffect }from "react";
import { FormItemProps } from "./types/types";
import classNames from "classnames";
import { FormContext } from "./form";
const FormItem: React.FC<FormItemProps> = (props) => {
    const {
        label,
        children,
        name,
        valuePropName,
        trigger,
        getValueFromEvent
    } = props
    const cls = classNames('row',{
        'row-no-label': !label
    })

    const { dispatch, fields} = useContext(FormContext)
    useEffect( () => {
        dispatch({ type:'addField', name ,value:{ label, name, value: '' }})
    },[]) 
    const fieldState = fields[name];
    const value = fieldState && fieldState.value

    const onValueUpdate = (e: any) => {
       const value = getValueFromEvent && getValueFromEvent(e)
       console.log('newvalue'+ value);
       dispatch({ type:'updateValue', name ,value})
    }

    const renderChildren = () => {
        // 手动创建属性列表
        const controlProps: Record<string, any> = {} 
        controlProps[valuePropName!] = value;
        controlProps[trigger!] = onValueUpdate
        // 获取第一个child节点

         const childList = React.Children.toArray(children)
         if (childList.length === 0) {
            console.error('No child element found in Form.Item, please provide one form component')
          }
          // 子组件大于一个
          if (childList.length > 1) {
            console.warn('Only support one child element in Form.Item, others will be omitted')
          }
          // 不是 ReactElement 的子组件
          if (!React.isValidElement(childList[0])) {
            console.error('Child component is not a valid React Element')
          }
         const child = childList[0] as ReactElement
        // cloneELement 混合属性列表
        const returnChild = React.cloneElement(
            child,{ ...child.props, ...controlProps}
        )
        return returnChild
    }
    
    return (
        <div
            className={cls}
        >
            {
                label && 
                <div className="form-item-label">
                    <label title={label}>
                        {label}
                    </label>
                </div>
            }
            <div className="form-item">{renderChildren()}</div>
        </div>
    )
}

FormItem.defaultProps = {
    valuePropName : 'value',
    trigger: 'onChange',
    getValueFromEvent: (e) => e.target.value
}
export default FormItem