// import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { fetchRestaurants } from "../components/fetchRestaurantData";

//render data in this component or separate

const Restaurants = () => {
    // const restaurants = await fetchRestaurants(location, food);
    console.log("restaurant", "component");
    return (
        <div className={styles.box}>
            <p>hello</p>
            {/* {restaurants?.map((restaurant, index: number) => (
                <div key={index} className={styles.box}>
                    <Image
                        src={restaurant.image_url}
                        alt="restaurant food"
                        width={200}
                        height={200}
                    />
                    <p>{restaurant.name}</p>
                    <p>rating: {restaurant.rating}</p>
                    <p>reviews {restaurant.review_count}</p>
                    <p>{restaurant.display_address}</p>
                </div>
            ))} */}
        </div>
    );
};

export default Restaurants;
