import React, {} from "react";
import { UploadFile } from "./types/type";
import Icon from "../Icon/Icon";
import Progress from "../Progress/progress";
interface UploadListProps {
    List: Array<UploadFile>;
    onRemove: (_file: UploadFile) => void
}
const UploadList: React.FC<UploadListProps> = (props) => {
    const {
        List,
        onRemove
    } = props
    return(
        <ul className="upload-list">
            {
                List.map( (item) => {
                    return <li className="upload-list-item" key={item.uid}>
                                <span className={`file-name file-name-${item.status}`}>
                                    <Icon icon="file-alt" theme="secondary"></Icon>
                                    {item.name}
                                </span>
                                <span className="file-status">
                                    {item.status === 'uploading' && <Icon icon="spinner" spin theme="primary"/>}
                                    {item.status === 'success' && <Icon icon="check-circle"  theme="success"/>}
                                    {item.status === 'error' && <Icon icon="times-circle"  theme="danger"/>}
                                </span>
                                <span className="file-actions">
                                    <Icon icon="times" onClick={ () => { onRemove(item)}}></Icon>
                                </span>
                                {
                                    item.status === "uploading" && 
                                        <Progress persent={item.percent || 0 }></Progress>
                                }
                          </li>
                })
            } 
        </ul>
    )
}


export default UploadList