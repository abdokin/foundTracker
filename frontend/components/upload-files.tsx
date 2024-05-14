"use client"
import React, { DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ControllerRenderProps } from "react-hook-form";
import { CreateReclamationInput } from "@/lib/types";
import { XIcon } from "lucide-react";


const FileItem = React.memo(({ file, index, onRemove }: { file: File, index: number, onRemove: () => void }) => (
    <div className="relative border w-full">
        <button className="absolute top-0 right-0 bg-black text-white z-50 p-2" onClick={() => onRemove()}><XIcon size={18} /></button>
        {file.type.startsWith('image/') ? (
            <img src={URL.createObjectURL(file)} className="w-full h-full" />
        ) : (
            <iframe key={index} src={URL.createObjectURL(file)} className="w-full h-full" />
        )}
    </div>
));

export default function UploadFiles({ field, addFiles }: {
    field: ControllerRenderProps<CreateReclamationInput, 'docs'>,
    addFiles: (files: File[]) => void
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[] | null>(null);

    const memoizedFiles = useMemo(() => {
        if (!files || files.length === 0) return null;
        return (
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
                {files.map((file, index) => (
                    <FileItem key={index} index={index} file={file} onRemove={() => handleRemoveFile(index)} />
                ))}
            </div>
        );
    }, [files]);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setFiles(files)
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const handleRemoveFile = (index: number) => {
        setFiles(prevImages => {
            if (prevImages) {
                return prevImages?.filter((_, i) => i !== index)
            }
            return prevImages;
        });
    };
    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFiles(files)
    };
    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        files && addFiles(files)
    }, [files]);

    return (
        <div>
            {files && files?.length > 0 ? (
                <div className="flex flex-col gap-8">
                    <div className="w-full col-span-2">
                        {memoizedFiles}
                    </div>
                    {/* <Button type="button" onClick={handleUploadButtonClick} size='sm'>Select more Files</Button> */}
                </div>
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full h-[200px] border-2 border-dashed text-center rounded-md pt-16"
                >
                    <p>Drag & Drop Files Here</p>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        multiple
                        style={{ display: 'none' }}
                        name={field.name}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        onChange={handleFileInputChange}
                        ref={fileInputRef}
                    />
                    <Button type="button" onClick={handleUploadButtonClick} size='sm'>Upload</Button>
                </div>
            )}
        </div>
    );
}
