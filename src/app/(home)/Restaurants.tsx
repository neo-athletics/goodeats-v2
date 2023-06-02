// import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { fetchRestaurants } from "../components/fetchRestaurantData";
const Restaurants = async ({ searchParams }) => {
    const { location, food, sort_by } = searchParams;

    const requiredParams = ["location", "food", "sort_by"];

    //logic and error handling for searchparams
    const params = Object.keys(searchParams);
    const paramsVal = Object.values(searchParams);
    //paramsVal.every(val => val !== '') return true if no key has an empty value
    let bool;
    let error;

    if (params.length === 3) {
        bool = params.every((val) => requiredParams.includes(val));
        if (!bool) error = "incorrect query params provided";
    } else if (params.length <= 2 || params.length > 3) {
        error = "please provide the necessary params";
    }

    /*
    cases
    --params length is 3 but are incorrectly spelled or wrong params
    --params length is less or more than 3
    --how will errors be presented

    -check for this 
    --required params provided but with empty value

    */

    //"please provided the necessary query parameters";
    // if bool true execute fetch function else throw custom error
    console.log(bool, "get bool");
    const data = await fetchRestaurants(location, food, sort_by);

    console.log(searchParams, "params");
    console.log(data, "restaurants");
    return (
        <div className={styles.box}>
            {Array.isArray(data) && data.length ? (
                data?.map((restaurant, index: number) => (
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
                ))
            ) : !bool ? (
                <p>{error}</p>
            ) : (
                <p>{data?.error}</p>
            )}
        </div>
    );
};

export default Restaurants;
