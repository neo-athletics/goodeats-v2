"use client";

import { useRef } from "react";
import { useStore } from "../store";
function StoreInitializer({ keyterms }) {
    const initialized = useRef(false);
    if (!initialized.current) {
        useStore.setState((state) => ({
            ...state,
            keyterms: { ...state.keyterms, ...keyterms },
        }));
        initialized.current = true;
    }
    return null;
}
export default StoreInitializer;
