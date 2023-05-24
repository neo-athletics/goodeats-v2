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

export const fetchRestaurants = async () => {
    // const res = await fetch( `http://localhost:3000/api/restaurants/?location=${location}&term=${food}&sort_by=${sort_by}`);

    const yelpData = await res.json();

    return yelpData.businesses.map((business) =>
        formatRestaurantData(business)
    );
};
