"use client"
import { API_URL } from "@/lib/constants";
import { Item } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";
import { cx } from "class-variance-authority";
import { Button } from "./ui/button";


export default function ItemCard({ item }: { item: Item }) {
    const [currentImage, setCurrentImage] = useState(
        item.images[0]
    );
    const currentImageUrl = API_URL + "/images/" + currentImage.imageUrl;
    function formatDateForHuman(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
    return (
        <div className={" border w-full hover:shadow-md p-0 bg-white hover:shadow-md"}>
            <div className="md:flex-shrink-0 px-4 py-2">
                <img className="h w-full object-cover max-h-56" src={currentImageUrl} alt={item.name} />
            </div>
            <div className="flex overflow-x-auto gap-2 px-4">
                {item.images.map((it, index) => (
                    <ImageSelect
                        key={index}
                        url={it.imageUrl}
                        title={item.name}
                        active={it.imageUrl === currentImage.imageUrl}
                        setActive={() => setCurrentImage(it)}
                    />
                ))}
            </div>

            <div className="flex flex-col px-4 pb-2">
                <div className="py-2 flex  items-center  justify-between">
                    <h5 className="text-xl text-wrap">{item.name}</h5>
                    <p className="text-base font-light">{formatDateForHuman(item.foundDateTime)}</p>
                </div>
                <div className="font-light text-sm pb-4">{item.description.slice(0, 200)}</div>


                <Link href={`/products/${item.name}`}>
                    <Button size={"sm"}>
                        Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}

const ImageSelect = ({
    url,
    active,
    setActive,
    title,
}: {
    url: string;
    title: string;
    active: boolean;
    setActive: () => void;
}) => {
    return (
        <img
            loading="lazy"
            className={cx(
                "w-9 h-9 rounded-md",
                active && "border-main-300",
                "border-2 cursor-pointer"
            )}
            src={`${API_URL}/images/${url}`}
            alt={title}
            onClick={setActive}
        />
    );
};

