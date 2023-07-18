"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Favorite from "../components/Favorite";
import styles from "../page.module.css";
import { useStore } from "../store";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reorder, stagger, useAnimate } from "framer-motion";
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
    const [scope, animate] = useAnimate();
    useEffect(() => {
        setFavs(favorites);
        animate("li", { opacity: 1 }, { delay: stagger(0.1) });
    }, [favorites, animate, scope]);

    return (
        <Reorder.Group
            ref={scope}
            axis="y"
            onReorder={updateFavList}
            values={favorites}
            className={styles.favoriteList}
        >
            {favorites.length > 0 && (
                <>
                    {favorites.map((restaurant) => (
                        <Reorder.Item
                            value={restaurant}
                            key={restaurant.id}
                            className={styles.favoriteItem}
                        >
                            <div className={styles.imageWrapper}>
                                <p className={styles.title}>
                                    {restaurant.name}
                                </p>
                                <Image
                                    src={
                                        restaurant?.image_url !== ""
                                            ? restaurant?.image_url
                                            : "/../public/coffee_img.jpg"
                                    }
                                    alt="restaurant food"
                                    width={200}
                                    height={150}
                                    className={styles.img}
                                />
                                <div className={styles.critics}>
                                    <CalculateRating
                                        rating={restaurant.rating}
                                    />
                                    <span className={styles.reviewCount}>
                                        {restaurant.review_count}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.address}>
                                <p>{restaurant.display_address[0]}</p>
                                <p>{restaurant.display_address[1]}</p>
                            </div>
                            <div></div>
                            <div className={styles.checkIcon}>
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
                                            ? addToAttended(restaurant)
                                            : removeFromAttended(restaurant)
                                    }
                                />
                            </div>
                            <div className={styles.heartIcon}>
                                <Favorite restaurant={restaurant} />
                            </div>
                        </Reorder.Item>
                    ))}
                </>
            )}
        </Reorder.Group>
    );
};

export default Favorites;
