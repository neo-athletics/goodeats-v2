"use client";
import { useStore } from "../store";
import React from "react";
import { useRouter } from "next/navigation";

const SearchAndFilter = () => {
    const router = useRouter();
    const { location, food, sort_by } = useStore((state) => state.keyterms);
    const state = useStore();

    const searchHandler = () => {
        console.log(location, food, sort_by);
    };

    return (
        <div>
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
            <button onClick={searchHandler}>search</button>
        </div>
    );
};

export default SearchAndFilter;
