"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";
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
const Favorite = ({ restaurant }: { restaurant: Restaurant }) => {
    const { addFavorite, removeFavorite } = useStore((state) => state);
    return (
        <>
            <FontAwesomeIcon
                className={
                    !restaurant.favorite ? styles.fadeOut : styles.fadeIn
                }
                onClick={() =>
                    !restaurant.favorite
                        ? addFavorite(restaurant)
                        : removeFavorite(restaurant)
                }
                icon={faHeartSolid}
                size="xl"
            />
        </>
    );
};

export default Favorite;
