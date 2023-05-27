import React, { ReactNode } from "react";
export type MenuType = "horizontal" | "vartical";
type selectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuType;
    style?: React.CSSProperties;
    onSelect?: selectCallback;
    children: ReactNode;
    defaultOpen?: string[];
}
export interface MenuItemProps {
    index?: string;
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
    disabled?: boolean;
}
export interface SubMenuProps {
    index?: string;
    title?: string;
    className?: string;
    children: ReactNode;
}
export interface MenuContext {
    index: string;
    onSelect?: selectCallback;
    mode?: MenuType;
    defaultOpen?: string[];
}
export {};
