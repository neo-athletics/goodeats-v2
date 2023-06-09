import { create } from "zustand";

type State = {
    keyterms: {
        location: string;
        food: string;
        sort_by: string;
    };

    favorites: [];
    restaurants: [];
};

type Restaurant = {
    name: string;
    image_url: string;
    rating: number;
    review_count: number;
    display_address: string;
    favorite: boolean;
};

type Action = {
    updateTerm: (name: string, value: string) => void;
    //add restaurant to favorite list
    addFavorite: (restaurant: Restaurant) => void;
    //remove restaurant from favorite list
    //pass by id or name
    removeFavorite: () => void;
};

export const useStore = create<State & Action>((set) => ({
    keyterms: {
        location: "",
        food: "",
        sort_by: "best_match",
    },
    favorites: [],
    restaurants: [],
    updateTerm: (name: string, value: string) =>
        set((state) => ({
            ...state,
            keyterms: { ...state.keyterms, [name]: value },
        })),
    addFavorite: () => set(() => ({})),
    removeFavorite: () => set(() => ({})),
}));
// what will these functions take in as parameters and articulate their intent
