import React from "react";
interface progressProps {
    persent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties; 
    theme?: string
}
const Progress: React.FC<progressProps> = (props) => {
    const {
        persent,
        strokeHeight,
        showText,
        styles,
        theme
    } = props;



    return (
        <div className="progress-bar" style={styles}>
            <div className="progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
                <div className={`progress-bar-inner color-${theme}`}
                    style={{ width: `${persent}px`}}               
                >
                    {showText && <span className="inner-text">{`${persent}%`}</span>}
                </div>
            </div>
        </div>
    )
} 

Progress.defaultProps = {
    showText: true,
    strokeHeight: 15,
    theme: 'primary'
}

export default Progress