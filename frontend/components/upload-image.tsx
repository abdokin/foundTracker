"use client"
import React, { useState, DragEvent, useRef, useEffect } from "react";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";
import { AddItemInput } from "@/lib/types";

export default function ImagesUpload({ field, addImages }: {
    field: ControllerRenderProps<AddItemInput, "images">,
    addImages: (images: File[]) => void

}) {
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const updateImage = (value: React.SetStateAction<File[]>) => {
        setImages(value);
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        // Filter out non-image files if necessary
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        updateImage(prevImages => prevImages.concat(imageFiles));

    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        // Filter out non-image files if necessary
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        updateImage(prevImages => prevImages.concat(imageFiles));


    };

    const handleRemoveImage = (index: number) => {
        updateImage(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        addImages(images)
    }, [images]);
    return (
        <div>
            {images.length > 0 && <div className="flex flex-wrap items-center gap-1 p-2 overflow-x-scolll">
                {images.map((image, index) => (
                    <div key={index} className="relative border">

                        <Image src={URL.createObjectURL(image)} alt={`Image ${index}`} className="max-w-[100px] max-h-[100px]" height={100} width={100} />
                        <button className="absolute top-0 right-0 bg-black text-white" onClick={() => handleRemoveImage(index)}><XIcon size={18} /></button>
                    </div>
                ))}
            </div>}
            {/* {images.length > 0 && <Button type="button" onClick={handleUploadButtonClick} size='sm'>Select more Images</Button>} */}
            {images.length == 0 &&
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="w-full h-[200px] border-2 border-dashed text-center rounded-md pt-16">
                    <p>Drag & Drop Images Here</p>
                    <input
                        type="file"
                        accept="image/*"
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
            }
        </div>
    );
};

