"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Favorite from "../components/Favorite";
import styles from "../page.module.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem("favorites") || "").state
            .favorites;
        console.log(favs);
        setFavorites(favs);
    }, []);
    return (
        <div className={styles.main}>
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
