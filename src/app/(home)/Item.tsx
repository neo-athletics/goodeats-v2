import React from "react";
import Image from "next/image";
import styles from "../page.module.css";
import CalculateRating from "../components/CalculateRating";
import Favorite from "../components/Favorite";

const Item = ({ restaurant, key }) => {
    return (
        <div key={key} className={styles.box}>
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
                    height={200}
                />
            </div>
            <div>
                <p>
                    {restaurant.display_address[0] +
                        " " +
                        restaurant.display_address[1]}
                </p>

                <CalculateRating rating={restaurant.rating} />
                <p> {restaurant.review_count}</p>
                <Favorite restaurant={restaurant} />
            </div>
        </div>
    );
};

export default Item;
