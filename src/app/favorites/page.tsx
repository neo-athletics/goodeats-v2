"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Favorite from "../components/Favorite";
import styles from "../page.module.css";
import { useStore } from "../store";
import { faCheck, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reorder } from "framer-motion";
import CalculateRating from "../components/CalculateRating";

const Favorites = () => {
    const {
        favorites,
        addToAttended,
        removeFromAttended,
        attendedRestaurants,
        updateFavList,
    } = useStore((state) => state);
    const [favs, setFavs] = useState(favorites);
    useEffect(() => {
        setFavs(favorites);
        //list goes back to original order once navigated away from page
    }, [favorites]);

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
        <div>
            Favorites
            <Reorder.Group
                axis="y"
                onReorder={updateFavList}
                values={favorites}
                className={styles.favoriteList}
            >
                {favorites.length > 0 && (
                    <>
                        {favorites?.map((restaurant) => (
                            <Reorder.Item
                                value={restaurant}
                                key={restaurant.id}
                                className={styles.favoriteItem}
                            >
                                <div>
                                    <p>{restaurant.name}</p>
                                    <Image
                                        src={
                                            restaurant?.image_url !== ""
                                                ? restaurant?.image_url
                                                : "/../public/coffee_img.jpg"
                                        }
                                        alt="restaurant food"
                                        width={200}
                                        height={150}
                                    />
                                </div>

                                {/* convert the rating from  integer to star */}
                                <p>rating: {restaurant.rating}</p>
                                <CalculateRating rating={restaurant.rating} />
                                <p>reviews {restaurant.review_count}</p>
                                <p>
                                    {restaurant.display_address[0] +
                                        " " +
                                        restaurant.display_address[1]}
                                </p>
                                <div>
                                    <Favorite restaurant={restaurant} />
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        size="xl"
                                        className={
                                            attendedRestaurants.find(
                                                (val) =>
                                                    restaurant.id === val.id
                                            ) != undefined
                                                ? styles.attended
                                                : styles.notAttended
                                        }
                                        onClick={() =>
                                            attendedRestaurants.find(
                                                (val) =>
                                                    restaurant.id === val.id
                                            ) === undefined
                                                ? handleTruth(restaurant)
                                                : handleFalse(restaurant)
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faGripVertical}
                                        size="xl"
                                    />
                                </div>
                            </Reorder.Item>
                        ))}
                    </>
                )}
            </Reorder.Group>
        </div>
    );
};

export default Favorites;
