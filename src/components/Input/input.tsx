import React, { ReactElement, useState } from "react";
import { InputProps } from "./types/types";
import classNames from "classnames";
import Icon from "../Icon/Icon";
export const Input: React.FC<InputProps> = (props) => {
    const {disabled, size, icon, prefixes, suffixes, className, onChange, ...resprops}  = props;

    const inputCls = classNames('input-wrapper', className ,{
        [`input-${size}`]: size,
        'disabled': disabled,
        'input-group': prefixes || suffixes ,
        'input-group-pre': !!prefixes,
        'input-group-suf': !!suffixes
    }) 
    const fixedControlledValue = (value: any) => {
        if( typeof value === 'undefined' || value === null){
            return ''
        }
        return value;
    }
    if('value' in props){
        delete resprops.defaultValue
        resprops.value = fixedControlledValue(props.value)
    }
    return (<>
            <div className={inputCls}>
            {prefixes && <div className="input-prefix-group">{prefixes}</div> }
            {icon && <div className="input-icon-wrapper"><Icon icon={icon}></Icon></div>}
            <input
             className="input-inner"
             disabled={disabled}  
             onChange={onChange} 
             {...resprops}/>
            {suffixes && <div className="input-suffix-group">{suffixes}</div>}
            </div>
     </>)
}

export default Input