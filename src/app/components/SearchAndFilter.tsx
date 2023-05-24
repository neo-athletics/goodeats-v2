"use client";
import React, { useState } from "react";

const SearchAndFilter = () => {
    const [keyterms, setKeyterms] = useState({
        location: "",
        food: "",
        sort_by: "",
    });

    const handleChange = (e) => {
        setKeyterms({ ...keyterms, [e.target.name]: e.target.value });
    };

    const searchHandler = async () => {
        const { location, food, sort_by } = keyterms;
        console.log(await fetchRestaurants(location, food, sort_by));
    };

    return (
        <div>
            <label htmlFor="location">Location</label>
            <input
                id="location"
                name="location"
                type="text"
                placeholder="location"
                onChange={handleChange}
                value={keyterms.location}
            />
            <label htmlFor="food">Restaurant</label>
            <input
                id="food"
                name="food"
                type="text"
                placeholder="food, starbucks"
                onChange={handleChange}
                value={keyterms.food}
            />

            <select
                value={keyterms.sort_by}
                name="sort_by"
                onChange={handleChange}
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
