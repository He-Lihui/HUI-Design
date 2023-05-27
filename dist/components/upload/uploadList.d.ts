import React from "react";
import { UploadFile } from "./types/type";
interface UploadListProps {
    List: Array<UploadFile>;
    onRemove: (_file: UploadFile) => void;
}
declare const UploadList: React.FC<UploadListProps>;
export default UploadList;
