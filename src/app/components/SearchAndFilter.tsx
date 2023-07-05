"use client";
import { useStore } from "../store";
import React, { useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchAndFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const state = useStore();
    const { location, food, sort_by } = state.keyterms;
    //on page load
    //check and update search params
    /*Check if data and location,food,sort_by state/params are present go along with the state of the data. 
    if data is not present clear params 
    else if data is present then update params to necessary values or state of keyterms  */

    console.log(location, food, sort_by, "searching");

    // const current = useMemo(
    //     () => new URLSearchParams(searchParams.toString()),
    //     [searchParams]
    // );

    useEffect(() => {
        const current = new URLSearchParams(searchParams.toString());
        if (state.restaurants.length > 0) {
            //check params if they are blank for location and food and if they are set them and only if restaurant data is present
            console.log(state.keyterms, "init");
            if (current.size < 3) {
                for (const key in state.keyterms) {
                    console.log(state.keyterms[key], "ki");
                    current.set(key, state.keyterms[key]);
                }
                router.push(`${pathname}?${current.toString()}`);
            }
        }
        for (const [key, value] of searchParams.entries()) {
            console.log(key, value, "params");
        }
    });

    const validate = () => {
        if (location === "" || food === "") {
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const current = new URLSearchParams(searchParams.toString());
        console.log("loc", location, "food", food);
        //give user an error message to provide necessary values
        console.log(state.keyterms, "before");
        state.updateTerm(e.target.name, e.target.value);

        for (const key in state.keyterms) {
            if (key === e.target.name) {
                console.log(key, e.target.value);
                current.set(e.target.name, e.target.value);
            } else {
                current.set(key, state.keyterms[key]);
            }
        }
        router.push(`${pathname}?${current.toString()}`);
    };

    const searchHandler = () => {
        const current = new URLSearchParams(searchParams.toString());

        // //get query string if any delete
        for (const [key] of searchParams.entries()) {
            current.delete(key);
        }
        //aggregate new query to pathname
        for (const key in state.keyterms) {
            console.log(state.keyterms[key], "ki-------");
            current.set(key, state.keyterms[key]);
        }
        // push new url
        router.push(`${pathname}?${current.toString()}`);
        // router.refresh();
        console.log(current.toString(), "string");
    };

    return (
        <div>
            <form>
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="location"
                    onChange={(e) =>
                        state.updateTerm(e.target.name, e.target.value)
                    }
                    value={location}
                    required={true}
                />
                <label htmlFor="food">Restaurant</label>
                <input
                    id="food"
                    name="food"
                    type="text"
                    placeholder="food, starbucks"
                    onChange={(e) =>
                        state.updateTerm(e.target.name, e.target.value)
                    }
                    value={food}
                    required={true}
                />
                {/* initial search has a blank value for select(sort_by) */}
                {state.restaurants.length > 0 && (
                    <select
                        value={sort_by}
                        name="sort_by"
                        onChange={(e) => handleChange(e)}
                    >
                        <option value="best_match">Best Match</option>
                        <option value="rating">Rating</option>
                        <option value="review_count">Review</option>
                    </select>
                )}
                <button
                    disabled={!validate() ? true : false}
                    onClick={searchHandler}
                >
                    search
                </button>
            </form>
        </div>
    );
};

export default SearchAndFilter;
