import { TreeData, TreeNodeProps } from "./types/type";
import React from "react";

const TreeNode: React.FC<TreeNodeProps> = (props) => {
    const {
        data
    } = props
    const {title, children } = data as TreeData
    return (
        <div className="tree-node">
            <div className="tree-node-inner">
                <span className="inner-context">{ title }</span>
                {
                   ( children && children.length > 0 ) && 
                        <div className="children">
                            {
                                children.map( (item: TreeData) => (
                                    <TreeNode data={item} key={item.key}></TreeNode>
                                ))  
                            }
                        </div>
                }
            </div>
        </div>
    )
}   

export default TreeNode