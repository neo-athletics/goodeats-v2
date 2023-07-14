import React from "react";
import {
    faStarHalfStroke,
    faStar as starSolid,
    faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CalculateRating = ({ rating }) => {
    //make calculation what is needed for rating

    let total = 5;
    let modRemainder = rating % 1;
    let solidStar;
    let halfStar;

    let content = [
        <FontAwesomeIcon icon={starSolid} color="black" size="lg" />,
        <FontAwesomeIcon icon={starSolid} color="black" size="lg" />,
        <FontAwesomeIcon icon={faStarHalfStroke} color="black" size="lg" />,
        <FontAwesomeIcon icon={faStar} color="black" size="lg" />,
        <FontAwesomeIcon icon={faStar} color="black" size="lg" />,
    ];

    return <div>{content}</div>;
};

export default CalculateRating;
