"use client";
import { useStore } from "../store";
import { useEffect } from "react";

type Restaurant = {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    display_address: string;
    favorite: boolean;
};

function StoreInitializer({
    restaurants,
    searchParams,
}: {
    restaurants: Restaurant[];
    searchParams: { location: string; food: string; sort_by: string };
}) {
    console.log(useStore.getState().keyterms, "keys");
    const { mergeFavandRes } = useStore((state) => state);
    useEffect(() => {
        // might be able to loop through restaurants and update property favorite based on local storage
        useStore.setState((state) => ({
            ...state,
            restaurants: [...restaurants],
            keyterms: { ...state.keyterms, ...searchParams },
        }));
        if (window != undefined) {
            const favorites = JSON.parse(
                localStorage.getItem("favorites") || ""
            ).state.favorites;
            //------ causing maximum re-render------//
            //move this logic to the action in store to update restaurant array
            mergeFavandRes(favorites);
        }
    }, [restaurants, searchParams, mergeFavandRes]);

    return null;
}
export default StoreInitializer;
