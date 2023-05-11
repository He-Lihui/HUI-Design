import React, { ChangeEvent, Children, useRef, useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import { UploadProps, UploadFile } from "./types/type";
import UploadList from "./uploadList";
import Dragger from "./dragger";
export const Upload: React.FC<UploadProps> = (props) => {
    const { action, 
            onProgress, 
            onSuccess, 
            onError, 
            children, 
            beforeupload,
            onChange, 
            defaultFileList, 
            onRemove,
            header,
            name,
            data,
            withCredentials,
            accept,
            multiple,
            drag
        } = props
     
    const uploadInputRef = useRef<HTMLInputElement>(null)
    const [fileList,setFileList] = useState<UploadFile[]>(defaultFileList ||  [])

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList( (prevList) => {
            return prevList.map( (file) =>{
                if(file.uid === updateFile.uid){
                    return {...file, ...updateObj}
                } else {
                    return file
                }
            } )
        })
    }
    const handleClick = () => { 
        if(uploadInputRef.current){
            uploadInputRef.current.click();
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files){
            return
        }
        uploadFile(files)
        if(uploadInputRef.current){
            uploadInputRef.current.value = ''
        }
    }

    const uploadFile = (file: FileList) => {
        let files = Array.from(file);
        files.forEach( file => {
            if(!beforeupload){
                postFile(file)
            } else {
                const result = beforeupload(file)
                if( result && result instanceof Promise){
                    result.then(processedFile =>{
                        postFile(processedFile)
                    })
                } else if ( result != false){
                    postFile(file) 
                }
            }  
        })
    }

    const postFile = (file: File) => {
        let _file: UploadFile = {
            uid:  Date.now() + 'upload',
            size: file.size,
            name: file.name,
            status: 'ready',
            percent: 0,
            raw: file 
        } 
        // setFileList([_file, ...fileList])
        setFileList( prev => {
            return [_file,...prev]
        })
        const formData = new FormData();
        formData.append(name ||'file' , file)
        if(data){
            Object.keys(data).forEach( key => {
                formData.append(key, data[key])
            })
        }
        axios.post( action, formData ,{
            headers:{
                ...header,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e: AxiosProgressEvent) => {
                if(e.total){
                    const persent = Math.round( (e.loaded) * 100 / e.total) || 0
                    if(persent < 100 ){
                        updateFileList(_file, { percent:persent, status : 'uploading' })
                        if(onProgress){
                            onProgress(persent,file)
                        }
                    }
                }
            }
        }).then( response => {
            updateFileList(_file, { percent: 100, status : 'success', response: response.data })
            if(onSuccess){
                onSuccess(response,file)
            } 
            if(onChange){
                onChange(file)
            }
        }).catch( err => {
            updateFileList(_file, {  status : 'error', error: err })
            if(onError){
                onError( err, file);
            }
            if(onChange){
                onChange(file)
            }
        })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList)=> {
            return prevList.filter( item => item.uid !== file.uid )
        })
        if(onRemove){
            onRemove(file)
        }
    }
    return (
        <div className="upload-component">
            <div className="upload-input"
                 style={{ display: 'inline-block'}}
                 onClick={handleClick}
            > 
            {drag ? <Dragger onFile={(files) => {uploadFile(files)}}>{children}</Dragger> : children}
            <input  
                type="file"
                style={{ display: 'none'}} 
                ref={uploadInputRef}
                className="file-input"
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            /> 
            </div>
            <UploadList List={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

Upload.defaultProps = {
    name:'file'
}


export default Upload