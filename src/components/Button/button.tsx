import classNames from "classnames"
import { ReactElement } from "react"
import { BaseButtonProps, ButtonType, ButtonProps } from "./types/type"
/**
 * ## 按钮用于开始一个即时操作
 * @param props 
 * @returns 
 */
export const Button: React.FC<ButtonProps>= (props) => {
    const { btntype, size,className, disabled, children, href, ...resProps } = props
    let element: ReactElement;

    const btnClass = classNames('btn', className,{
        [`btn-${btntype}`]: btntype,
        [`btn-${size}`]: size,
        'disabled': (btntype === "link") && disabled
    })
    
    if ( btntype === "link" && href){
        element = <a
             className={btnClass}
             {...resProps}
            href={href}
        >
            {children}</a>
    } else {
       element = <button className={btnClass} disabled={disabled} {...resProps}>{children}</button> 
    }
    return element
}

Button.defaultProps = {
    disabled :false,
    btntype : "default"
}
export default Button