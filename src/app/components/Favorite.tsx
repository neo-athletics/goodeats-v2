"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";
import { useStore } from "../store";

const Favorite = ({ restaurant }) => {
    //compare favorite list from restaurants being rendered to init favorite value/state
    //get local storage state and compare values and change state if restaurant is in favorite list
    const favorites = JSON.parse(localStorage.getItem("favorites")).state
        .favorites;

    console.log(favorites, "local");

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
