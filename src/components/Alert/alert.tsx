
import classNames from "classnames";
import React, { ReactElement } from "react";
import Button from "../Button/button";
import { BaseAlertProps } from "./types/types";
import { useState } from "react";
import Transition from '../Transition/transition'
export const Alert: React.FC<BaseAlertProps> = (props) => {
    const {type, message, description, className, closable, showIcon, onClose } = props

    const [close, setClose] = useState(false)
    const [ hide, setHide ] = useState(false)
    const alertClass = classNames('alert',className, {
        [`alert-${type}`]: type,
        'isclose': close
    })
    let element: ReactElement
    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
          onClose()
        }
        setHide(true)
      }

    element = <>
         <Transition
            in={!hide}
            timeout={300}
            animation="zoom-in-top"
            >
            <div className={alertClass} >
                <span className="alert-message">{message}
                {closable && <span className="alert-close-btn" onClick={handleClose}>x</span>}
                </span>
                {description && <p className="alert-description">{description}</p> } 
            </div>
        </Transition>
            </>
    return element
}

Alert.defaultProps = {
    type : 'default'
}
export default Alert