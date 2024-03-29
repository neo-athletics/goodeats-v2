export const fetchRestaurants = async (
    location: string,
    food: string,
    sort_by: string
) => {
    try {
        const res = await fetch(
            `http://localhost:3000/api/restaurants/?location=${location}&term=${food}&sort_by=${sort_by}`
        );

        if (!res.ok) {
            const error = await res.json();
            throw error;
        }

        const yelpData = await res.json();

        return yelpData?.businesses.map((business: any) => {
            const {
                id,
                name,
                image_url,
                rating,
                review_count,
                location: { display_address },
            } = business;

            return {
                id,
                name,
                image_url,
                rating,
                review_count,
                display_address,
                favorite: false,
            };
        });
    } catch (error) {
        console.log(error, "error here");
        return error;
    }
};
