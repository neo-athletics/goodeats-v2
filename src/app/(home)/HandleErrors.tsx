// import React from "react";
import { useStore } from "../store";
import { fetchRestaurants } from "../components/fetchRestaurantData";
import Restaurant from "./Restaurant";
import StoreInitializer from "../components/StoreInitializer";
import { fetchHours } from "../components/fetchHours";

type RestaurantT = {
    id: string;
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    display_address: string;
    favorite: boolean;
};
const HandleErrors = async ({
    searchParams,
}: {
    searchParams: { location: string; food: string; sort_by: string };
}) => {
    const { location, food, sort_by } = searchParams;

    const requiredParams = ["location", "food", "sort_by"];

    //logic and error handling for searchparams
    const params = Object.keys(searchParams);
    const paramsVal = Object.values(searchParams);

    let error;
    let data: RestaurantT[] = [];
    let valBool = paramsVal.every((val) => val !== "");

    let keyBool = params.every((val) => requiredParams.includes(val));
    let errBool = false;

    //execute fetch function here
    if (params.length === 3 && valBool && keyBool) {
        //check params before making api call
        data = await fetchRestaurants(location, food, sort_by);
        console.log(data, "checking again");
        const infoData = await Promise.all(
            data.map(async (item) => {
                const moreInfo = await fetchHours(item.id);
                return {
                    ...item,
                    hours: moreInfo.hours,
                };
            })
        );
        console.log(infoData[0], "ExtraInfo");
        //check if state is being updated
        if (Array.isArray(data) && data.length > 0) {
            useStore.setState((state) => ({
                ...state,
                restaurants: [...data],
                keyterms: { location, food, sort_by },
            }));

            console.log("data logging...");
        }
        errBool = false;
    } else if (
        (params.length > 0 && params.length <= 2) ||
        params.length > 3 ||
        (params.length === 3 && !valBool)
    ) {
        error = "please provide the necessary params";
        errBool = true;
        console.log("error log");
    }

    return (
        <div>
            <StoreInitializer
                restaurants={useStore.getState().restaurants}
                searchParams={searchParams}
            />
            <Restaurant data={data} errBool={errBool} error={error} />
        </div>
    );
};

export default HandleErrors;
