"use client"
import { API_URL } from "@/lib/constants";
import { Image, Item, User } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";
import { cx } from "class-variance-authority";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import CreateReclamationFrom from "./create-reclamation";

export default function ItemCard({ item, isAdmin }: { item: Item, isAdmin: Boolean }) {
    // const [currentImage, setCurrentImage] = useState<Image>(
    //     item.images[0]
    // );
    // const currentImageUrl = API_URL + "/files/" + currentImage?.imageUrl;
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
            <div className="md:flex-shrink-0 px-4 py-2w">
                <Carousel>
                    <CarouselContent>
                        {item.images.map((it, index) => <CarouselItem key={index}>
                            <img className="h w-full object-cover max-h-56" src={API_URL + "/files/" + it?.imageUrl} alt={item.name} />
                        </CarouselItem>)}
                    </CarouselContent>

                </Carousel>
            </div>
            {/* <div className="flex overflow-x-auto gap-2 px-4 pt-2">
                {item.images.map((it, index) => (
                    <ImageSelect
                        key={index}
                        url={it.imageUrl}
                        title={item.name}
                        active={it.imageUrl === currentImage?.imageUrl}
                        setActive={() => setCurrentImage(it)}
                    />
                ))}
            </div> */}

            <div className="flex flex-col px-4 pb-2">
                <div className="py-2 flex  items-center  justify-between">
                    <h5 className="text-xl text-wrap">{item.name}</h5>
                    <p className="text-base font-light">{formatDateForHuman(item.foundDateTime)}</p>
                </div>
                <div className="font-light text-sm pb-4">{item.description.slice(0, 200)}</div>


                <div className="flex items-center gap-2">
                    <Link href={`/products/${item.name}`}>
                        <Button size={"sm"}>
                            Details
                        </Button>
                    </Link>
                    <Link href={`/dashboard/reclamations/create/${item.id}/`}>
                        <Button size={"sm"}>
                            Claim
                        </Button>
                    </Link>
                    <CreateReclamationFrom objetId={item.id} />
                    {isAdmin && <Link href={`/products/${item.name}`}>
                        <Button size={"sm"} variant={'destructive'}>
                            Delete
                        </Button>
                    </Link>}
                </div>
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
                active && "border-primary",
                "border-2 cursor-pointer"
            )}
            src={`${API_URL}/images/${url}`}
            alt={title}
            onClick={setActive}
        />
    );
};

