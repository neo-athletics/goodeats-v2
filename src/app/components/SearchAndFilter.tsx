"use client";
import React, { useState } from "react";

const SearchAndFilter = () => {
    const [keyterms, setKeyterms] = useState({ location: "", food: "" });

    const handleChange = (e) => {
        console.log(e.target.value);

        setKeyterms({ ...keyterms, [e.target.name]: e.target.value });
    };

    const searchHandler = () => {
        

        console.log(keyterms);
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
            <button onClick={searchHandler}>search</button>
            <select>
                <option value=""></option>
            </select>
        </div>
    );
};

export default SearchAndFilter;
