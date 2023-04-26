import classNames from "classnames";
import React, { ReactNode} from "react";
import { TabItemProps } from "./types/type";

const TabItem: React.FC<TabItemProps> = (props) => {
    const {className, label, index, disabled, children} = props
    let element: ReactNode;
    element =  <div className="tab-panel">{children}</div>

    return element
}

TabItem.displayName = "TabItem";

export default TabItem