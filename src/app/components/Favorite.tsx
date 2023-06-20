"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";
import { useStore } from "../store";
// build a function to handle setting favorite restaurant and removing it from (favorite) list

const Favorite = ({ restaurant }) => {
    const { addFavorite, removeFavorite } = useStore((state) => state);
    return (
        <div className={styles.favoriteContainer}>
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
        </div>
    );
};

export default Favorite;
