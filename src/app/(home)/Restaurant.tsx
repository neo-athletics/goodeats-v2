"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Favorite from "../components/Favorite";
import styles from "../page.module.css";
import { useStore } from "../store";

const Restaurant = ({ errBool, data, error }) => {
    //compare favorite list from restaurants being rendered to init favorite value/state
    //get local storage state and compare values and change state if restaurant is in favorite list

    //run restaurant array through the above logic to change its init properties
    //set state of store restaurant array
    //update restaurant array with data ?
    const { mergeFavandRes } = useStore((state) => state);

    useEffect(() => {
        if (window != undefined) {
            const favorites = JSON.parse(localStorage.getItem("favorites"))
                .state.favorites;
            //------ causing maximum re-render------//
            //move this logic to the action in store to update restaurant array
            mergeFavandRes(favorites);
        }
    }, [window]);
    const restaurants = useStore((state) => state.restaurants);
    console.log(restaurants);
    // const restaurants = useStore().restaurants;
    return (
        <div className={styles.results}>
            {
                useStore().restaurants.length > 0 && data !== "undefined"
                    ? restaurants?.map((restaurant, index: number) => (
                          <div key={index} className={styles.box}>
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
                              <Favorite restaurant={restaurant} />
                              <p>{restaurant.name}</p>
                              <p>rating: {restaurant.rating}</p>
                              <p>reviews {restaurant.review_count}</p>
                              <p>
                                  {restaurant.display_address[0] +
                                      " " +
                                      restaurant.display_address[1]}
                              </p>
                          </div>
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
