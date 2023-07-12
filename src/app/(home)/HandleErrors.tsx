// import React from "react";
import { useStore } from "../store";
import { fetchRestaurants } from "../components/fetchRestaurantData";
import Restaurant from "./Restaurant";
import StoreInitializer from "../components/StoreInitializer";

const HandleErrors = async ({ searchParams }) => {
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
    console.log(params, sort_by, "from errorhandler");
    //execute fetch function here
    if (params.length === 3 && valBool && keyBool) {
        //check params before making api call
        data = await fetchRestaurants(location, food, sort_by);
        console.log("cap", location, food, sort_by);
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
