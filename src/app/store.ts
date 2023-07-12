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
    attendedRestaurants: RestaurantRef[];
};

type RestaurantRef = {
    id: string;
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
    mergeFavandRes: (favorite: Restaurant[]) => void;
    addToAttended: (restaurant: Restaurant) => void;
    removeFromAttended: (restaurant: Restaurant) => void;
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
            favorites: [],
            attendedRestaurants: [],

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
            mergeFavandRes: (favorite: Restaurant[]) =>
                set((state) => ({
                    ...state,
                    restaurants: state.restaurants.map((restaurant) => {
                        const favoriteRes = favorite.find(
                            (val) => val.id === restaurant.id
                        );

                        if (favoriteRes === undefined) {
                            return restaurant;
                        }
                        return favoriteRes;
                    }),
                })),

            addToAttended: (restaurant: Restaurant) =>
                set((state) => ({
                    ...state,
                    attendedRestaurants: [
                        ...state.attendedRestaurants,
                        { id: restaurant.id },
                    ],
                })),
            removeFromAttended: (restaurant: Restaurant) =>
                set((state) => ({
                    ...state,
                    attendedRestaurants: state.attendedRestaurants.filter(
                        (value) => value.id !== restaurant.id
                    ),
                })),
        }),
        {
            name: "favorites",
            partialize: (state) => ({
                favorites: state.favorites,
                attendedRestaurants: state.attendedRestaurants,
            }),
        }
    )
);
