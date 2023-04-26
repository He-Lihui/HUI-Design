import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
export type IconType = 'primary'| 'secondary'| 'success'|'info'|'warning'|'danger'|'light'|'dark'

library.add(fas )
export interface IconProps extends FontAwesomeIconProps {
    theme?: IconType
}  
export const Icon: React.FC<IconProps> = (props) => {
    const {className, theme, ...restProps} = props

    const IconCls = classNames('icon', className,{
        [`icon-${theme}`]:theme
    })

    return(
        <FontAwesomeIcon className={IconCls} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon