import classNames from "classnames";
import React, { ReactNode, useState} from "react";
import { MenuProps, MenuType, MenuContext, MenuItemProps } from "./types/type"; 


export const menuIndexContext = React.createContext<MenuContext>({index : "0"})

export const Menu: React.FC<MenuProps> = (props) => {

    const {className, mode, style, onSelect, children, defaultIndex, defaultOpen} = props
    let element: ReactNode
    const [currentAction, setAction] = useState(defaultIndex)
    const handleClick = (index: string) => {
        setAction(index)
        if( onSelect) {
            onSelect(index)
        }
            
    }
    const passedContext: MenuContext = {
        index: currentAction ? currentAction : "0",
        onSelect : handleClick,
        mode,
        defaultOpen
    }
    const menuClass = classNames('menu', className, {
        [`menu-${mode}`]: mode 
    })
    
    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if(displayName === "MenuItem"  || displayName === "SubMenu"){
                return React.cloneElement(childElement, {index: i.toString()});
            } else {
                console.error("Warning : Menu has a child which is not a MenuItem!")
            }
        })
    }
    element = <>
        <ul className={menuClass} style={style} >
            <menuIndexContext.Provider value={passedContext}>
            {renderChildren( )}
            </menuIndexContext.Provider>
        </ul>
    </>
    return element
}

Menu.defaultProps = {
    mode : 'horizontal',
    defaultIndex: "0" 
}
export default Menu