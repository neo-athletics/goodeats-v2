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
    //see if is a whole number or half star
    let modRemainder = rating % 1;
    let solidStar;
    let halfStar;
    let remainder = total - rating;
    let starArray = [];
    console.log(remainder, rating, modRemainder);
    if (remainder === 0) {
        starArray = [
            <FontAwesomeIcon icon={starSolid} color="yellow" size="lg" />,
            <FontAwesomeIcon icon={starSolid} color="yellow" size="lg" />,
            <FontAwesomeIcon icon={starSolid} color="yellow" size="lg" />,
            <FontAwesomeIcon icon={starSolid} color="yellow" size="lg" />,
            <FontAwesomeIcon icon={starSolid} color="yellow" size="lg" />,
        ];
    }

    //continue on with configuring star array
    else if (modRemainder === 0) {
        //get remainder and rating, since they are whole #'s
        let i = rating;
        do {
            if (i != 0) {
                starArray.push(
                    <FontAwesomeIcon
                        icon={starSolid}
                        color="yellow"
                        size="lg"
                    />
                );
                i = i - 1;
            } else {
                starArray.push(
                    <FontAwesomeIcon icon={faStar} color="yellow" size="lg" />
                );
            }
        } while (starArray.length != 5);
    } else if (modRemainder === 0.5) {
        //will need half a star and get the remainder to see if we will need a empty star
        if (remainder < 1) {
            //continue with solid and half star
            console.log("remainder less than 1");
            let i = rating - modRemainder;
            do {
                if (i != 0) {
                    console.log(i, rating, "i");
                    starArray.push(
                        <FontAwesomeIcon
                            icon={starSolid}
                            color="yellow"
                            size="lg"
                        />
                    );

                    i = i - 1;
                } else {
                    starArray.push(
                        <FontAwesomeIcon
                            icon={faStarHalfStroke}
                            color="yellow"
                            size="lg"
                        />
                    );
                }
            } while (starArray.length != 5);
        } else {
            //calculate full star, empty stars and half star
            let i = rating - modRemainder; //mod remainder (star) has to be inserted after rating array is complete
            let j = remainder - modRemainder;

            do {
                if (i != 0) {
                    starArray.push(
                        <FontAwesomeIcon
                            icon={starSolid}
                            color="yellow"
                            size="lg"
                        />
                    );
                    i = i - 1;
                } else if (
                    starArray.length === rating - modRemainder &&
                    modRemainder === 0.5
                ) {
                    starArray.push(
                        <FontAwesomeIcon
                            icon={faStarHalfStroke}
                            color="yellow"
                            size="lg"
                        />
                    );
                } else if (j != 0) {
                    starArray.push(
                        <FontAwesomeIcon
                            icon={faStar}
                            color="yellow"
                            size="lg"
                        />
                    );
                    j = j - 1;
                }
            } while (starArray.length != 5);
        }
    }

    return <div>{starArray}</div>;
};
//try do while loop to make more effective calculation of star array
export default CalculateRating;
