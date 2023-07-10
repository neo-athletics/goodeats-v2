"use client";
import { useStore } from "../store";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchAndFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [error, setError] = useState({ status: false, message: "" });

    const state = useStore();
    const { location, food, sort_by } = state.keyterms;
    console.log(state.favorites, "fav");
    useEffect(() => {
        const current = new URLSearchParams(searchParams.toString());
        if (state.restaurants.length > 0) {
            if (current.size < 3) {
                for (const key in state.keyterms) {
                    console.log(state.keyterms[key], "ki");
                    current.set(key, state.keyterms[key]);
                }
                router.push(`${pathname}?${current.toString()}`);
            }
        }
    }, []);

    const validate = () => {
        if (location === "" || food === "") {
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        if (location != "" && food != "") {
            setError({ ...error, status: false, message: "" });
            const current = new URLSearchParams(searchParams.toString());

            //give user an error message to provide necessary values

            state.updateTerm(e.target.name, e.target.value);

            for (const key in state.keyterms) {
                if (key === e.target.name) {
                    console.log(key, e.target.value);
                    current.set(e.target.name, e.target.value);
                } else {
                    current.set(key, state.keyterms[key]);
                }
            }
            //makes request
            router.push(`${pathname}?${current.toString()}`);
        } else {
            //handle error message here
            setError({
                ...error,
                status: true,
                message:
                    "please provide the necessary values before making selection",
            });
        }
    };

    const searchHandler = () => {
        const current = new URLSearchParams(searchParams.toString());

        // //get query string if any delete
        // for (const [key] of searchParams.entries()) {
        //     current.delete(key);
        // }
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

                <select
                    value={sort_by}
                    name="sort_by"
                    onChange={(e) => handleChange(e)}
                >
                    <option value="best_match">Best Match</option>
                    <option value="rating">Rating</option>
                    <option value="review_count">Review</option>
                </select>
                <button
                    disabled={!validate() ? true : false}
                    onClick={searchHandler}
                >
                    search
                </button>
            </form>
            {error.status ? error.message : null}
        </div>
    );
};

export default SearchAndFilter;
