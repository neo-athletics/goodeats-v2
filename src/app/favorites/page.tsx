"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Favorite from "../components/Favorite";
import styles from "../page.module.css";
import { useStore } from "../store";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favorites = () => {
    const {
        favorites,
        addToAttended,
        removeFromAttended,
        attendedRestaurants,
    } = useStore((state) => state);

    console.log(attendedRestaurants);
    const handleTruth = (restaurant) => {
        console.log("truth");

        addToAttended(restaurant);
    };
    const handleFalse = (restaurant) => {
        console.log("false");
        removeFromAttended(restaurant);
    };
    return (
        <div className={styles.results}>
            Favorites
            {favorites.length > 0 && (
                <>
                    {favorites?.map((restaurant) => (
                        <div key={restaurant.id} className={styles.box}>
                            <Image
                                src={
                                    restaurant?.image_url !== ""
                                        ? restaurant?.image_url
                                        : "/../public/coffee_img.jpg"
                                }
                                alt="restaurant food"
                                width={200}
                                height={200}
                            />
                            <Favorite restaurant={restaurant} />
                            <FontAwesomeIcon
                                icon={faCheck}
                                size="xl"
                                className={
                                    attendedRestaurants.find(
                                        (val) => restaurant.id === val.id
                                    ) != undefined
                                        ? styles.attended
                                        : styles.notAttended
                                }
                                onClick={() =>
                                    attendedRestaurants.find(
                                        (val) => restaurant.id === val.id
                                    ) === undefined
                                        ? handleTruth(restaurant)
                                        : handleFalse(restaurant)
                                }
                            />
                            <p>{restaurant.name}</p>
                            <p>rating: {restaurant.rating}</p>
                            <p>reviews {restaurant.review_count}</p>
                            <p>
                                {restaurant.display_address[0] +
                                    " " +
                                    restaurant.display_address[1]}
                            </p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Favorites;
