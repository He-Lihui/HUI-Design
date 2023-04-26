import classNames from "classnames";
import React, { ReactNode, useContext } from "react";
import { MenuItemProps } from "./types/type";
import { menuIndexContext } from './menu'
export const MenuItem: React.FC<MenuItemProps> = (props) => {
    let element: ReactNode
    const {className, style, children, disabled, index } = props
    const itemContext = useContext(menuIndexContext)
    const itemClass = classNames('menu-item', className, {
        'is-disabled': disabled,
        'isActive': itemContext.index === index
    })

    const handleClick = () => {
        if( itemContext.onSelect && !disabled && (typeof index === "string")) {
            itemContext.onSelect(index)
        }      
    }
    element = <> 
        <li className={itemClass} style={style} onClick={handleClick}
        >
            {children}
        </li>
    </>
    return element 
}
MenuItem.defaultProps = {
    disabled : false
}
MenuItem.displayName = "MenuItem"
export default MenuItem