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

function StoreInitializer({ restaurants }: { restaurants: Restaurant[] }) {
    useEffect(() => {
        // might be able to loop through restaurants and update property favorite based on local storage
        useStore.setState((state) => ({
            ...state,
            restaurants: [...restaurants],
        }));
    }, [restaurants]);

    return null;
}
export default StoreInitializer;
