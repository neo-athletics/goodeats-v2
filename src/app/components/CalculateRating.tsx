import React from "react";
import {
    faStarHalfStroke,
    faStar as starSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../page.module.css";

const CalculateRating = ({ rating }: { rating: number }) => {
    let total = 5;
    let modRemainder = rating % 1;
    let solidStar = (
        <FontAwesomeIcon icon={starSolid} color="yellow" size="lg" />
    );
    let halfStar = (
        <FontAwesomeIcon icon={faStarHalfStroke} color="yellow" size="lg" />
    );
    let emptyStar = <FontAwesomeIcon icon={faStar} color="black" size="lg" />;
    let remainder = total - rating;
    let starArray = [];

    let i = rating - modRemainder;
    let j = remainder - modRemainder;

    do {
        if (i != 0) {
            starArray.push(solidStar);
            i = i - 1;
        } else if (
            starArray.length === rating - modRemainder &&
            modRemainder === 0.5
        ) {
            starArray.push(halfStar);
        } else if (j != 0) {
            starArray.push(emptyStar);
            j = j - 1;
        }
    } while (starArray.length != 5);

    return <span className={styles.rating}>{starArray}</span>;
};
export default CalculateRating;
