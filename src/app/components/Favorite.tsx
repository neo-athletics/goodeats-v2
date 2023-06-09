"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";

const Favorite = ({ favorite }) => {
    return (
        <div className={styles.favoriteContainer}>
            <FontAwesomeIcon
                className={favorite ? styles.fadeIn : styles.fadeOut}
                // onClick={() => setFavorite(!favorite)}
                icon={faHeartSolid}
                color="red"
                size="xl"
            />
            <FontAwesomeIcon
                className={favorite ? styles.fadeOut : styles.fadeIn}
                // onClick={() => setFavorite(!favorite)}
                icon={faHeart}
                size="xl"
            />
        </div>
    );
};

export default Favorite;
