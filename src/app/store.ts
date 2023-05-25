import { create } from "zustand";

type State = {
    keyterms: {
        location: string;
        food: string;
        sort_by: string;
    };
    updateTerm: (name: string, value: string) => void;
};

export const useStore = create<State>((set) => ({
    keyterms: {
        location: "",
        food: "",
        sort_by: "",
    },
    updateTerm: (name: string, value: string) =>
        set((state) => ({
            ...state,
            keyterms: { ...state.keyterms, [name]: value },
        })),
}));
