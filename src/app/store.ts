import { create } from "zustand";

export const useStore = create((set) => ({
    keyterms: {
        food: "",
        location: "",
        sort_by: "",
    },
}));
