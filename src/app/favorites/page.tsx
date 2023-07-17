"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Favorite from "../components/Favorite";
import styles from "../page.module.css";
import { useStore } from "../store";
import { faCheck, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Reorder, useDragControls } from "framer-motion";
import CalculateRating from "../components/CalculateRating";

type Restaurant = {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    display_address: string;
    favorite: boolean;
};

const Favorites = () => {
    const {
        favorites,
        addToAttended,
        removeFromAttended,
        attendedRestaurants,
        updateFavList,
    } = useStore((state) => state);
    const controls = useDragControls();
    const [favs, setFavs] = useState(favorites);
    useEffect(() => {
        setFavs(favorites);
        //list goes back to original order once navigated away from page
    }, [favorites]);

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
                                // whileDrag={{ scale: 1.05 }}
                                // dragTransition={{
                                //     bounceStiffness: 600,
                                //     bounceDamping: 10,
                                // }}
                                dragListener={false}
                                dragControls={controls}
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

                                <div>
                                    <p>
                                        {restaurant.display_address[0] +
                                            " " +
                                            restaurant.display_address[1]}
                                    </p>
                                </div>

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
                                <Favorite restaurant={restaurant} />

                                <FontAwesomeIcon
                                    icon={faGripVertical}
                                    size="xl"
                                    className="reorder-handle"
                                    onPointerDown={(event) =>
                                        controls.start(event, {
                                            snapToCursor: false,
                                        })
                                    }
                                />
                            </Reorder.Item>
                        ))}
                    </>
                )}
            </Reorder.Group>
        </div>
    );
};

export default Favorites;
