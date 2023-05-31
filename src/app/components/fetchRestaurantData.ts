const formatRestaurantData = (restaurant) => {
    const {
        name,
        image_url,
        rating,
        review_count,
        location: { display_address },
    } = restaurant;
    return {
        name,
        image_url,
        rating,
        review_count,
        display_address,
    };
};

export const fetchRestaurants = async (location, food, sort_by) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/restaurants/?location=${location}&term=${food}&sort_by=${sort_by}`,
            { cache: "no-cache" }
        );

        const yelpData = await res.json();
        console.log(yelpData, "data");
        return yelpData.businesses?.map((business) =>
            formatRestaurantData(business)
        );
    } catch (error) {
        console.log(error, "error here");
    }
};
