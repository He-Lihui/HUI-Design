import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export type IconType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    theme?: IconType;
}
export declare const Icon: React.FC<IconProps>;
export default Icon;
