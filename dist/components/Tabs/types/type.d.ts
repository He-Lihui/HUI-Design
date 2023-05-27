import { ReactNode } from "react";
type TabStyle = 'line' | 'card';
type selectCallback = (selectedIndex: number) => void;
export interface TabProps {
    type?: TabStyle;
    className?: string;
    defaultIndex?: number;
    onSelect?: selectCallback;
    children: ReactNode;
}
export interface TabItemProps {
    className?: string;
    label: string | React.ReactElement;
    index?: number;
    disabled?: boolean;
    children?: ReactNode;
}
export interface TabContext {
    index: number;
    onSelect?: selectCallback;
}
export {};
