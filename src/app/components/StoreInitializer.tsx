"use client";
type keyterms = {
    keyterms: {
        location: string;
        food: string;
        sort_by: string;
    };
};
import { useRef } from "react";
import { useStore } from "../store";
function StoreInitializer({ keyterms }: { keyterms: keyterms }) {
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
