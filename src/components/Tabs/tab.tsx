import classNames from "classnames"
import React, { ReactNode, useState } from "react"
import { TabContext, TabItemProps, TabProps } from "./types/type"

export const Tabs: React.FC<TabProps> = (props) => {

    const {className, onSelect, children, defaultIndex,type} = props
    let element: ReactNode


    const [activeIndex, setActiveIndex] = useState(defaultIndex)

    const handleClick = (e: React.MouseEvent, index:number, disabed: boolean | undefined) => {
        if(!disabed){
            setActiveIndex(index);
            if(onSelect){
                onSelect(index)
            }
        }
    }
    const navCls = classNames('tab', {
        'nav-line': type === 'line',
        'nav-card': type === 'card'
    })
    const renderNav = () => {
        return React.Children.map(children, (child, i) => {
            const childElement =  child as React.FunctionComponentElement<TabItemProps>;
            const { label, disabled } = childElement.props;
            const cls = classNames('tab-item',{
                'is-active': activeIndex === i,
                'disabled': disabled
            })
            return(
                <li className={cls} key={`tab-item-${i}`} onClick={(e) => {handleClick(e, i, disabled)}}>
                    {label}
                </li>
            )
        })
    }

    const renderContent = () => {
        return React.Children.map(children,(child, i) => {
            if( i === activeIndex){
                return child
            }
        })
    }
    element = <div>
        <ul className={navCls}>
            {renderNav()}
        </ul>
        <div className="tab-content">
            {renderContent()}
        </div>
    </div>

    return element
}

Tabs.defaultProps = {
    defaultIndex: 0,
    type:'card'
}
export default Tabs