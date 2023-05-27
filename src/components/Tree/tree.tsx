import React from "react";
import { TreeProps } from "./types/type";
import TreeNode from "./treeNode";
export const Tree : React.FC<TreeProps>  = (props) => {
    const {
        data,
        disabled
    } = props

    return (
        <>
            <div>
                <TreeNode data={data}></TreeNode>
            </div>
        </>
    )
}

export default Tree