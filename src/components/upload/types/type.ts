import { AxiosResponse } from "axios";
import { ReactNode } from "react";


export interface UploadProps {
    action: string;
    defaultFileList?: Array<UploadFile>;
    onProgress?: (persentAge:number, file: File) => void;
    onSuccess?: (data: AxiosResponse, file: File  ) => void;
    onError?: (err: any , file: File) => void;
    beforeupload?: (file: File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    children?: ReactNode;
    header?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
type FileStatus = "ready" | "success" | "uploading" | "error" ;

export interface UploadFile extends Partial<File> {
    uid: string;
    size: number;
    name: string;
    status?: FileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}