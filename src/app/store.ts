import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
    keyterms: {
        location: string;
        food: string;
        sort_by: string;
    };

    restaurants: Restaurant[];
};

type Restaurant = {
    id: string;
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
    removeFavorite: (restaurant: Restaurant) => void;
};

export const useStore = create<State & Action>()(
    persist(
        (set) => ({
            keyterms: {
                location: "",
                food: "",
                sort_by: "best_match",
            },
            restaurants: [],
            updateTerm: (name: string, value: string) =>
                set((state) => ({
                    ...state,
                    keyterms: { ...state.keyterms, [name]: value },
                })),
            addFavorite: (restaurant: Restaurant) =>
                set((state) => ({
                    ...state,
                    restaurants: state.restaurants.map((val) =>
                        val.id === restaurant.id
                            ? { ...val, favorite: true }
                            : val
                    ),
                })),

            removeFavorite: (restaurant: Restaurant) =>
                set((state) => ({
                    ...state,
                    restaurants: state.restaurants.map((val) =>
                        val.id === restaurant.id
                            ? { ...val, favorite: false }
                            : val
                    ),
                })),
        }),
        {
            name: "restaurants",
            partialize: (state) => ({ restaurants: state.restaurants }),
        }
    )
);
