"use client";
import { useRef, useEffect, useState } from "react";
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

function StoreInitializer({
    restaurants,
    favorites,
}: {
    restaurants: Restaurant[];
    favorites: Restaurant[];
}) {
    // const [localFav, setLocalFav] = useState([]);

    // useEffect(() => {
    //     try {
    //         const parseFav = localStorage?.getItem("favorites") || "";
    //         setLocalFav(JSON.parse(parseFav).state.favorites);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }, []);

    const initialized = useRef(false);
    if (!initialized.current) {
        useStore.setState((state) => ({
            ...state,
            restaurants: [...restaurants],
            // favorites: [...favorites],
        }));
        initialized.current = true;
    }

    return null;
}
export default StoreInitializer;
