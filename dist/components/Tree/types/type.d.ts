import { ReactNode } from "react";
export interface TreeData {
    title: string;
    key: string;
    type?: string;
    collapsed?: boolean;
    children?: Array<TreeData>;
}
export interface TreeProps {
    data: TreeData;
    disabled?: boolean;
    children?: ReactNode;
}
export interface TreeNodeProps extends TreeProps {
    selectable?: boolean;
}
