const formatRestaurantData = (restaurant) => {
    const {
        id,
        name,
        image_url,
        rating,
        review_count,
        location: { display_address },
    } = restaurant;
    return {
        id,
        name,
        image_url,
        rating,
        review_count,
        display_address,
        favorite: false,
    };
};

export const fetchRestaurants = async (location, food, sort_by) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/restaurants/?location=${location}&term=${food}&sort_by=${sort_by}`
        );

        if (!res.ok) {
            const error = await res.json();
            throw error;
        }

        const yelpData = await res.json();
        return yelpData.businesses?.map((business) =>
            formatRestaurantData(business)
        );
    } catch (error) {
        console.log(error, "error here");
        return error;
    }
};
