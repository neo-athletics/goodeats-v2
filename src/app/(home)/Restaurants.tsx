// import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { fetchRestaurants } from "../components/fetchRestaurantData";
import Favorite from "../components/Favorite";

const Restaurants = async ({ searchParams }) => {
    const { location, food, sort_by } = searchParams;

    const requiredParams = ["location", "food", "sort_by"];

    //logic and error handling for searchparams
    const params = Object.keys(searchParams);
    const paramsVal = Object.values(searchParams);

    let error;
    let data;

    let valBool = paramsVal.every((val) => val !== "");

    let keyBool = params.every((val) => requiredParams.includes(val));
    let errBool = false;

    //execute fetch function here
    if (params.length === 3 && valBool && keyBool) {
        data = await fetchRestaurants(location, food, sort_by);
        errBool = false;
    } else if (
        (params.length > 0 && params.length <= 2) ||
        params.length > 3 ||
        (params.length === 3 && !valBool)
    ) {
        error = "please provide the necessary params";
        errBool = true;
    }

    return (
        <div className={styles.results}>
            {Array.isArray(data) && data.length ? (
                data?.map((restaurant, index: number) => (
                    <div key={index} className={styles.box}>
                        <Image
                            src={restaurant.image_url}
                            alt="restaurant food"
                            width={200}
                            height={200}
                        />
                        <Favorite favorite={restaurant.favorite} />
                        <p>{restaurant.name}</p>
                        <p>rating: {restaurant.rating}</p>
                        <p>reviews {restaurant.review_count}</p>
                        <p>{restaurant.display_address}</p>
                    </div>
                ))
            ) : errBool ? (
                <p>{error}</p>
            ) : (
                <p>{data?.error}</p>
            )}
        </div>
    );
};

export default Restaurants;
