"use client";
import { useStore } from "../store";

import React from "react";

const test = () => {
    const { location, food } = useStore((state) => state.keyterms);
    return (
        <div>
            <p>test</p>
            <p>{location}</p>
            {food}
        </div>
    );
};

export default test;
