"use client"
import { API_URL } from "@/lib/constants";
import { Item } from "@/lib/types";
import Link from "next/link";
import { cx } from "class-variance-authority";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import CreateReclamationFrom from "./create-reclamation";
import { Badge } from "./ui/badge";
import { ClaimItem } from "./claim-item";

export default function ItemCard({ item, isAdmin }: { item: Item, isAdmin: Boolean }) {
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

            <div className="flex flex-col px-4 pb-2">
                <div className="py-2 flex  items-center  justify-between">
                    <h5 className="text-xl text-wrap">{item.name}</h5>
                    <p className="text-base font-light">{formatDateForHuman(item.foundDateTime)}</p>

                </div>
                <div className="font-light text-sm pb-4">{item.description.slice(0, 200)}  <Badge className="text-xs" variant={'outline'}>{item.status}</Badge></div>

                <div className="flex items-center gap-2">

                    <CreateReclamationFrom objetId={item.id} />
                    {/* <ClaimItem objetId={item.id} /> */}

                    {/* TODO: implement Delete*/}
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

