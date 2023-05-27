import React from "react";
interface progressProps {
    persent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: string;
}
declare const Progress: React.FC<progressProps>;
export default Progress;
