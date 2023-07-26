import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import CalculateRating from "../components/CalculateRating";
import Favorite from "../components/Favorite";
import ItemDate from "./ItemDate";
type Restaurant = {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    display_address: string;
    favorite: boolean;
    hours: any;
};
const Item = ({ restaurant, key }: { restaurant: Restaurant; key: number }) => {
    return (
        <div className={styles.box}>
            <div className={styles.itemImageCon}>
                <p className={styles.itemName}>{restaurant.name}</p>
                <Image
                    src={
                        restaurant?.image_url !== ""
                            ? restaurant?.image_url
                            : "/../public/coffee_img.jpg"
                    }
                    alt="restaurant food"
                    width={200}
                    height={200}
                    priority
                />
                <div className={styles.critics}>
                    <CalculateRating rating={restaurant.rating} />
                    <span className={styles.reviewCount}>
                        {restaurant.review_count}
                    </span>
                </div>
            </div>
            <div className={styles.infoCon}>
                <div className={styles.heartCon}>
                    <Favorite restaurant={restaurant} />
                </div>
                <div className={styles.address}>
                    <p>{restaurant.display_address[0]}</p>
                    <p>{restaurant.display_address[1]}</p>
                    <ItemDate time={restaurant.hours} />
                </div>
            </div>
        </div>
    );
};

export default Item;
