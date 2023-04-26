import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type animationType = "zoom-in-top" | "zoom-in-bottom" | "zoom-in-left" | "zoom-in-right"

type TransitionProps = CSSTransitionProps & {
    animation?: animationType,
    children?: ReactNode,
    wrapper?: boolean,
    classNames?: React.ClassicComponentClass
}
const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props

    return(
        <CSSTransition
            classNames={ classNames ? classNames : animation}
            {...restProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear:true
}
export default Transition