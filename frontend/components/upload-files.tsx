"use client"
import React, { DragEvent, useRef } from "react";
import { Button } from "./ui/button";
import { ControllerRenderProps } from "react-hook-form";
import { CreateReclamationInput } from "@/lib/types";

export default function UploadFiles({ field, addFiles, isThereIsFiles }: {
    field: ControllerRenderProps<CreateReclamationInput, 'docs'>,
    addFiles: (files: File[]) => void
    isThereIsFiles: boolean
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        addFiles(files)
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        addFiles(files)
    };
    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    return (
        <div>
            {isThereIsFiles && (
                <Button type="button" onClick={handleUploadButtonClick} size='sm'>Select more Files</Button>
            )}
            {!isThereIsFiles&& (
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
