"use client";
import { useStore } from "../store";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchAndFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { location, food, sort_by } = useStore((state) => state.keyterms);
    const state = useStore();

    const validate = () => {
        if (location === "" || food === "") {
            return false;
        }

        return true;
    };

    const searchHandler = () => {
        const current = new URLSearchParams(searchParams.toString());
        console.log(current.toString());
        //get query string if any delete
        for (const [key] of searchParams.entries()) {
            console.log(key);
            current.delete(key);
        }
        //aggregate new query to pathname
        for (const key in state.keyterms) {
            console.log(key, state.keyterms[key]);
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
                    onChange={(e) =>
                        state.updateTerm(e.target.name, e.target.value)
                    }
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
        </div>
    );
};

export default SearchAndFilter;
