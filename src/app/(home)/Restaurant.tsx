"use client";
import React from "react";
import styles from "../page.module.css";
import { useStore } from "../store";
import Item from "./Item";

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

const Restaurant = ({
    errBool,
    data,
    error,
}: {
    data: Restaurant[] | "undefined";
}) => {
    // const restaurants = useStore((state) => state.restaurants);
    const restaurants = useStore().restaurants;

    return (
        <div className={styles.results}>
            {
                useStore().restaurants.length > 0 && data !== "undefined"
                    ? restaurants?.map((restaurant, index: number) => (
                          <Item restaurant={restaurant} key={index} />
                      ))
                    : null
                // errBool
                // ? (
                //     <p>{error}</p>
                // ) : (
                //     <p>{data?.error}</p>
                // )
            }
        </div>
    );
};

export default Restaurant;
