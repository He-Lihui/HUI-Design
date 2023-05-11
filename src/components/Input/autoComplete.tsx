import React ,{ ChangeEvent, KeyboardEvent, ReactNode, useState, useEffect, useRef } from "react";
import Input from "./input";
import { DataSourceType, autoCompleteProps } from "./types/types";
import Icon from "../Icon/Icon";
import useDebounce from "./hooks/useDebounce";
import useClickOutSide from "./hooks/useClickOutSide";
import classNames from "classnames";
import Transition from "../Transition/transition";
export const AutoComplete: React.FC<autoCompleteProps> = (props) => {
    const {
        onSelect,
        fetchSuggestion,
        value,
        customRenderOptions,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType []>([])
    const [loading, setLoading] = useState(false)
    const [higthLightIndex, setHightLightIndex] = useState(-1)
    const [ showDropdown, setShowDropdown] = useState(false)
    const debouncedValue = useDebounce(inputValue, 500)
    const trigger = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useEffect( () => { 
        if(debouncedValue && trigger.current){
            const res = fetchSuggestion(debouncedValue)
            if( res instanceof Promise){
                setLoading(true)
                res.then( data => {
                    setLoading(false)
                    setSuggestions (data)
                    if(data.length > 0) setShowDropdown(true)
                })
            }  else {
                setSuggestions(res)
                setShowDropdown(true)
                if (res.length > 0) {
                    setShowDropdown(true)
                } 
            }
        } else { 
            setSuggestions([])
        }
        setHightLightIndex(-1);
    }, [debouncedValue, fetchSuggestion])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);

        trigger.current = true
    }
    const renderTemplate = (item: DataSourceType) => {
        return customRenderOptions ? customRenderOptions(item) : item.value
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if(onSelect){
            onSelect(item)
        }
        trigger.current = false;
    }
    const hightLight = (index: number) => {
        if(index < 0) index = 0;
        if( index >= suggestions.length){
            index = suggestions.length - 1; 
        }
        setHightLightIndex(index);
    }
    const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.code){
            case 'ArrowDown':
                hightLight(higthLightIndex +1);
                break;
            case 'ArrowUp':
                hightLight(higthLightIndex - 1);
                break;
            case 'Enter':
                if(suggestions[higthLightIndex]){
                    handleSelect(suggestions[higthLightIndex])
                }
                break;
            case 'Escape':
                setShowDropdown(false)
                break;
            default:
                break;
        }
    }
    // const renderList = () => {
    //     return (
    //         <ul>
    //             {
    //                 suggestions.map( (item, index) => {
    //                     const cls = classNames('suggestion-item',{
    //                         'item-highlighted': index === higthLightIndex
    //                     })
    //                     return(
    //                         <li key={index}
    //                         onClick={() => handleSelect(item)}
    //                         className={cls}
    //                         >{renderTemplate(item) as ReactNode }</li>
    //                     )
    //                 })
    //             }
    //         </ul>
    //     )
    // }
    const generateDropdown = () => {
        return (
          <Transition
            in={showDropdown || loading}
            animation="zoom-in-top"
            timeout={300}
            onExited={() => {setSuggestions([])}}
          > 
                <ul className="suggestion-list">
                 { loading &&
                   <div className="suggstions-loading-icon">
                     <Icon icon="spinner" spin/>
                   </div>
                 }
                 {suggestions.map((item, index) => {
                   const cnames = classNames('suggestion-item', {
                     'is-active': index === higthLightIndex
                   })
                   return (
                     <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                       {renderTemplate(item)}
                     </li>
                   )
                 })}
               </ul>
          </Transition>
        )
      }
    useClickOutSide(componentRef, () => { setSuggestions([])})
    return (
        <div className="auto-complete" ref={componentRef}>
            <Input
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              {...restProps}
            />
            { generateDropdown()}
        </div>
    ) 
}

export default AutoComplete