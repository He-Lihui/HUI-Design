import React, { ReactNode } from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
type animationType = "zoom-in-top" | "zoom-in-bottom" | "zoom-in-left" | "zoom-in-right";
type TransitionProps = CSSTransitionProps & {
    animation?: animationType;
    children?: ReactNode;
    wrapper?: boolean;
    classNames?: React.ClassicComponentClass;
};
declare const Transition: React.FC<TransitionProps>;
export default Transition;
