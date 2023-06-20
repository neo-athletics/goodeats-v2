import { create } from "zustand";
import { persist } from "zustand/middleware";
type State = {
    keyterms: {
        location: string;
        food: string;
        sort_by: string;
    };

    restaurants: Restaurant[];
    favorites: Restaurant[];
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
    // initFav: (restaurants: Restaurant[]) => void;
};

const getInitialFav = () => {
    let favsParse;
    if (typeof window !== "undefined") {
        const favs = localStorage?.getItem("favorites") || "";
        console.log(JSON.parse(favs).state.favorites, "loggin");
        favsParse = JSON.parse(favs).state.favorites;
    }
    return favsParse;
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
            favorites: getInitialFav(),
            // initFav: (favlist: Restaurant[]) =>
            //     set((state) => ({
            //         ...state,
            //         favorites: [...favlist],
            //     })),
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
                    //add restaurant to favorites array
                    favorites: [
                        ...state.favorites,
                        { ...restaurant, favorite: true },
                    ],
                })),

            removeFavorite: (restaurant: Restaurant) =>
                set((state) => ({
                    ...state,
                    restaurants: state.restaurants.map((val) =>
                        val.id === restaurant.id
                            ? { ...val, favorite: false }
                            : val
                    ),
                    //remove restaurant from favorites array
                    favorites: state.favorites.filter(
                        (val) => val.id !== restaurant.id
                    ),
                })),
        }),
        {
            name: "favorites",
            partialize: (state) => ({
                favorites: state.favorites,
            }),
        }
    )
);
