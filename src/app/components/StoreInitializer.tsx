"use client";
type Restaurant = {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    display_address: string;
    favorite: boolean;
};
import { useRef } from "react";
import { useStore } from "../store";

function StoreInitializer({ restaurants }: { restaurants: Restaurant[] }) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useStore.setState((state) => ({
            ...state,
            restaurants: [...restaurants],
        }));
        initialized.current = true;
    } else if (initialized.current) {
        useStore.setState((state) => ({
            ...state,
            restaurants: [...state.restaurants],
        }));
    }
    return null;
}
export default StoreInitializer;
