
import { SubMenuProps, MenuItemProps } from './types/type'
import React, { ReactNode, useContext, useState} from 'react'
import classNames from 'classnames'
import Menu, { menuIndexContext } from './menu'
import Icon from '../Icon/Icon'
import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/transition'
export const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {index, title, className, children} = props;
    const context = useContext(menuIndexContext)
    const defOpenSubMenu = context.defaultOpen
    const defOpen = ( index && context.mode === 'vartical') ? defOpenSubMenu?.includes(index) : false
    const [isOpen, setOpen] = useState(defOpen)
    let element: ReactNode; 
    const subMenuClass = classNames('menu-item submenu-item',className, {
        'isActive': context.index === index,
        'is-opened': isOpen,
        'is-vertical': context.mode === "vartical"
    })
    const handleClick = (e: React.MouseEvent) => {
        if( context.onSelect &&  (typeof index === "number")) {
            context.onSelect(index)
        }
        e.preventDefault()
        setOpen(!isOpen)    
    }
    let time: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(time);
        e.preventDefault();
        time = setTimeout( () => {
            setOpen(toggle)  
        }, 300)
    }
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
    }: {}

    const clickEvents = context.mode ==='vartical' ? {
        onClick: handleClick
    } : {}
    const renderChildren = () => {
        const cls = classNames('submenu',{
            'menu-opened': isOpen
        }) 
         const childrenComponent = React.Children.map(children, (child, i) => {
            const elementChildren = child as React.FunctionComponentElement<MenuItemProps >
            if(elementChildren.type.displayName === "MenuItem"){
                return React.cloneElement(elementChildren,{index: `${index}-${i}`})
                // return elementChildren
            } else{
                console.error("Warning : subMenu has a child which is not a MenuItem!")
            }
         })

         return(
            <Transition
                in={isOpen }
                timeout={300}
                animation="zoom-in-top"
                appear
                unmountOnExit
            >
                 <ul className={cls}>
                     {childrenComponent}
                </ul>
            </Transition>
           
         )
    }
    element = <>
        <li key={index} className={subMenuClass} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents} >
                {title}
                <Icon icon={"angle-down"} className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    </>
    return  element
}

SubMenu.displayName = 'SubMenu'


export default SubMenu