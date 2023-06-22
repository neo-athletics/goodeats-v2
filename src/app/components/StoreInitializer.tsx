"use client";
import { useRef } from "react";
import { useStore } from "../store";

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
    const initialized = useRef(false);
    if (!initialized.current) {
        useStore.setState((state) => ({
            ...state,
            restaurants: [...restaurants],
        }));
        initialized.current = true;
    }

    return null;
}
export default StoreInitializer;
