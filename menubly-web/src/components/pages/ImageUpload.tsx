import React, { useEffect, useState } from "react";
import iconUpload from 'assets/images/upload.png';
import { DeleteIcon } from "assets/icons/Delete";
import AuthService from "services/auth.service";
import { useAuth } from "contexts/Auth/AuthContext";
import customToast from "components/Toast/ToastSuccess";

const ImageUpload = ({type, imageDefault, onSelect}: {type?: string, imageDefault?: string, onSelect: (data: any) => void}) => {
    const auth = useAuth();
    const [file, setFile] = useState<string>();
    const [fileUpload, setFileUpload] = useState<any>();
    const [progress, setProgress] = useState<number>();

    useEffect(() => {
        if(imageDefault) {
            setFile(imageDefault);
        }
    }, [imageDefault]);

    const onChange = async (event: any) => {
        try {
            const file = event?.target?.files[0];
            const sizFile = file?.size / (1024 ** 2);
            if(Number(sizFile) > 10) {
                return customToast.error('File size should not exceed 10 MB');
            }
            setFileUpload(file);
            setProgress(0);
            const response = await AuthService.uploadFile(auth?.user?.userId, file, (value: any) => {
                setProgress(value);
            });
            const objectUrl = URL.createObjectURL(file);
            onSelect(response.data);
            setFileUpload(null);
            setFile(objectUrl);
        } catch {

        }

    }

    const reset = () => {
        setFile(''); 
        onSelect('');
        setFileUpload(null);
    }

    return (
        <>
            <div className="relative w-[300px] h-[200px] rounded-md overflow-hidden shadow-xSmall cursor-pointer">
                {file && <button type="button" onClick={() => reset()} className=" absolute top-2 right-2 z-[11] w-5 h-5 bg-white hover:text-red-30 hover:shadow-xSmall rounded-md transition">
                    <DeleteIcon />
                </button>}
                <input type={'file'} className="cursor-pointer absolute top-0 left-0 w-[300px] h-[200px] opacity-0 z-10" 
                onChange={onChange} />
                <div className="flex items-center justify-center absolute top-0 left-0 w-[300px] h-[200px] z-1 bg-cover bg-center"
                style={{
                    backgroundImage: `url("${type != 'image' ? file : ''}")` 
                }}
                >
                    {type == 'image' && file && <img src={file} className="w-full h-auto" />}
                    {!file && !fileUpload && <div className="text-center leading-8">
                            <div className="text-base font-normal text-neutral-30">Drop your image here</div>
                            <div className="text-base font-normal text-neutral-30">or</div>
                            <div className="text-base font-normal text-teal-50 underline">click to select file</div>
                        </div>}
                    {fileUpload && <>
                        <div className="flex flex-col items-center max-w-[220px] mx-auto px-4">
                            <div className="relative w-full h-2 rounded-[5px] bg-neutral-30">
                                <div className="bg-primary-light h-2 rounded-[5px] transition-all" style={{width: progress + '%'}}></div>
                            </div>
                            <div className="w-full text-center text-neutral-40 text-base mt-2.5">{fileUpload?.name}</div>
                        </div>
                    </>}    
                </div>
            </div>
            <p className="body-small mt-2.5 !text-[#878B9B]">File size should not exceed 10 MB.<br />
                You can use tool such as <a href="https://tinypng.com/" target="_blank" rel="noreferrer">tinypng.com</a> to reduce file size.</p>
        </>
    );
}

export default ImageUpload;